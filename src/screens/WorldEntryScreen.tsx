import { Text, View } from 'react-native';
import { bosses, graces } from '../catalog/world';
import { worldItems } from '../catalog/world/query';
import { items } from '../catalog/items';
import { quests } from '../catalog/quests';
import { regions } from '../catalog/regions';
import { Button, Card, CheckRow, Heading, Page, SourceLink, ui } from '../components/ui';
import { currentPart, cycleLabel, toggleFlag } from '../domain/save';
import type { WorldKind } from '../domain/world';
import { useProgress } from '../state/ProgressProvider';

export function WorldEntryScreen({ kind, id, onOpen, onItem, onQuest, onParties }: {
  kind: WorldKind; id: string; onOpen: (kind: WorldKind, id: string) => void;
  onItem: (id: string) => void; onQuest: (id: string) => void; onParties: () => void;
}) {
  const { data, service, pending, loading, error } = useProgress();
  const { character, run } = currentPart(data);
  const boss = kind === 'boss' ? bosses.find(entry => entry.id === id) : undefined;
  const grace = kind === 'grace' ? graces.find(entry => entry.id === id) : undefined;
  const entry = boss ?? grace;
  if (!entry) return <Page title="Fiche introuvable"><Text style={ui.body}>Cette fiche ne fait pas partie du catalogue d’exploration publié.</Text></Page>;
  const relatedItems = worldItems(kind, id, items);
  const relatedBosses = grace ? bosses.filter(candidate => candidate.graceIds.includes(id) || grace.bossId === candidate.id) : [];
  return <Page title={entry.name} subtitle={entry.location}>
    <Text style={ui.label}>{entry.regionIds.map(id => regions.find(region => region.id === id)?.name).join(' · ')} · Jeu de base</Text>
    <Text style={ui.caption}>{entry.aliases.join(' · ')}</Text>
    <Card>{character && run ? <>
      <Text style={ui.label}>{character.name} · {cycleLabel(run.cycle)}</Text>
      <CheckRow label={`${boss ? 'Vaincu' : 'Activée'} : ${entry.name}`} checked={!!(boss ? run.bosses : run.graces)[id]}
        disabled={loading || pending > 0 || !!error} onPress={() => void service.mutate(save => toggleFlag(save, boss ? 'bosses' : 'graces', id))} />
    </> : <Button title="Choisir un cycle pour cette fiche" onPress={onParties} />}
      <Text style={ui.caption}>Suivi manuel de ce cycle. Cocher ou décocher cette fiche ne modifie aucun objet, aucune quête et aucune autre coche.</Text>
    </Card>
    <Card><Heading>Accès</Heading><Text style={ui.body}>{entry.access}</Text>
      {entry.conditions.map(condition => <Text key={condition} style={ui.label}>{condition}</Text>)}
      {boss && <Text style={ui.caption}>Cette rencontre ne réapparaît pas après sa défaite dans le cycle.</Text>}
    </Card>
    {!!boss?.graceIds.length && <Card><Heading>Sites de grâce associés</Heading>
      <Text style={ui.caption}>Points de repère et grâces de l’arène. Leur accès peut dépendre de la victoire ; leur activation reste à renseigner séparément.</Text>
      {boss.graceIds.map(id => <Button key={id} title={`Grâce associée : ${graces.find(entry => entry.id === id)!.name}`} variant="quiet" onPress={() => onOpen('grace', id)} />)}
    </Card>}
    {!!relatedBosses.length && <Card><Heading>Rencontres associées</Heading>{relatedBosses.map(boss => <Button key={boss.id}
      title={`Boss associé : ${boss.name}`} variant="quiet" onPress={() => onOpen('boss', boss.id)} />)}</Card>}
    {!!relatedItems.length && <Card><Heading>{boss ? 'Objets liés à cette rencontre' : 'Objets près de cette grâce'}</Heading>
      <Text style={ui.caption}>Objets et acquisitions déjà publiés dans le carnet ; les récompenses et les emplacements restent partiels.</Text>
      {relatedItems.map(item => <Button key={item.id} title={`Objet associé : ${item.name}`} variant="quiet" onPress={() => onItem(item.id)} />)}
    </Card>}
    {!!entry.relatedQuestIds.length && <Card><Heading>Parcours associés</Heading>{entry.relatedQuestIds.map(id => <Button key={id}
      title={`Parcours associé : ${quests.find(quest => quest.id === id)!.name}`} variant="quiet" onPress={() => onQuest(id)} />)}</Card>}
    <Card><Heading>Références</Heading>{entry.sources.map(source => <View key={source.url} style={{ gap: 6 }}>
      <SourceLink label={source.label} url={source.url} /><Text style={ui.caption}>Vérification documentaire : {source.verifiedAt}</Text>
    </View>)}<Text style={ui.caption}>Catalogue partiel, sans lecture de votre sauvegarde de jeu.</Text></Card>
  </Page>;
}
