import { Text, View } from 'react-native';
import { itemActors, itemGraces, items, pickups } from '../catalog/items';
import { armorSlotLabels, categoryLabels, methodLabels } from '../catalog/items/query';
import { quests } from '../catalog/quests';
import { regions } from '../catalog/regions';
import { Button, Card, CheckRow, Heading, Page, SourceLink, ui } from '../components/ui';
import { probabilityLabel } from '../domain/items';
import { currentPart, cycleLabel, toggleFlag } from '../domain/save';
import { useProgress } from '../state/ProgressProvider';

export function ItemScreen({ id, onParties, onQuest, onItem }: {
  id: string; onParties: () => void; onQuest: (id: string) => void; onItem: (id: string) => void;
}) {
  const { data, service } = useProgress();
  const { character, run } = currentPart(data);
  const item = items.find(item => item.id === id);
  if (!item) return <Page title="Objet introuvable"><Text style={ui.body}>Cet objet ne fait pas partie du catalogue publié.</Text></Page>;
  return <Page title={item.name} subtitle={item.summary}>
    <Text style={ui.label}>{categoryLabels[item.category]}{item.armorSlot ? ` · ${armorSlotLabels[item.armorSlot]}` : ''}</Text>
    <Text style={ui.caption}>{item.aliases.join(' · ')}</Text>
    {item.category === 'upgrade' ? <Card>
      <Text style={ui.label}>Améliorations du cycle · {run ? cycleLabel(run.cycle) : 'aucune partie sélectionnée'}</Text>
      <Text style={ui.body}>Cochez chaque emplacement récupéré dans les sources ci-dessous.</Text>
    </Card> : <Card>
      {character ? <><Text style={ui.label}>Collection de {character.name} · tous les cycles</Text>
        <CheckRow label={`Déjà obtenu : ${item.name}`} checked={!!character.collection[id]} onPress={() => void service.mutate(save => toggleFlag(save, 'collection', id))} /></> :
        <Button title="Choisir une partie pour suivre cet objet" onPress={onParties} />}
      <Text style={ui.caption}>Cette coche conserve le fait de l’avoir obtenu. Elle ne représente pas une quantité et ne modifie aucune quête ni aucun ramassage.</Text>
    </Card>}
    <Heading>Comment l’obtenir</Heading>
    <Text style={ui.caption}>Sources référencées dans cette sélection ; d’autres sources peuvent exister. Les conditions restent à vérifier dans votre partie.</Text>
    {item.acquisitions.map(acquisition => {
      const actor = itemActors.find(actor => actor.id === acquisition.sourceEntityId);
      const grace = itemGraces.find(grace => grace.id === acquisition.graceId);
      const pickup = pickups.find(pickup => pickup.acquisitionId === acquisition.id);
      const required = items.find(item => item.id === acquisition.requiredItemId);
      const relatedQuest = quests.find(quest => quest.id === acquisition.relatedQuestId);
      return <Card key={acquisition.id}>
        <Heading>{methodLabels[acquisition.method]}</Heading>
        <Text style={ui.label}>{probabilityLabel(acquisition.probability)}</Text>
        {acquisition.probability.kind === 'chance' && <Text style={ui.body}>{acquisition.probability.conditions}</Text>}
        {acquisition.probability.kind === 'unknown' && <Text style={ui.caption}>Aucun pourcentage vérifié n’est renseigné pour cette source.</Text>}
        {actor && <Text style={ui.body}>{actor.name}</Text>}
        <Text style={ui.label}>{regions.find(region => region.id === acquisition.regionId)?.name} · {acquisition.location}</Text>
        {grace && <Text style={ui.caption}>Grâce de référence : {grace.name}</Text>}
        <Text style={ui.body}>{acquisition.description}</Text>
        {acquisition.price && <Text style={ui.body}>Prix : {acquisition.price}</Text>}
        {acquisition.conditions.map(condition => <Text key={condition} style={ui.body}>{condition}</Text>)}
        {required && <Button title={`Objet requis : ${required.name}`} variant="quiet" onPress={() => onItem(required.id)} />}
        {relatedQuest && <Button title={`Parcours associé : ${relatedQuest.name}`} variant="quiet" onPress={() => onQuest(relatedQuest.id)} />}
        {pickup && <View style={{ gap: 8 }}>
          <Text style={ui.label}>Amélioration du cycle · {run ? cycleLabel(run.cycle) : 'aucune partie sélectionnée'}</Text>
          {run ? <CheckRow label={`Récupéré : ${pickup.name}`} checked={!!run.pickups[pickup.id]} onPress={() => void service.mutate(save => toggleFlag(save, 'pickups', pickup.id))} /> :
            <Button title="Choisir un cycle pour cet emplacement" variant="quiet" onPress={onParties} />}
          <Text style={ui.caption}>Cette coche concerne cet emplacement uniquement et reste propre au cycle sélectionné.</Text>
        </View>}
        {acquisition.sources.map(source => <View key={source.url} style={{ gap: 6 }}>
          <SourceLink label={source.label} url={source.url} /><Text style={ui.caption}>Vérification documentaire : {source.verifiedAt}</Text>
        </View>)}
      </Card>;
    })}
  </Page>;
}
