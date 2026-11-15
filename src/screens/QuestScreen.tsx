import { Text, View } from 'react-native';
import { npcs, quests, regions } from '../catalog/quests';
import { items } from '../catalog/items';
import { bosses, graces } from '../catalog/world';
import type { WorldKind } from '../domain/world';
import { Button, Card, CheckRow, Choice, Heading, Page, SourceLink, ui } from '../components/ui';
import { currentPart, updateQuest } from '../domain/save';
import { useProgress } from '../state/ProgressProvider';
import { questKindLabels, questStatusLabels } from '../catalog/query';

export function QuestScreen({ id, onParties, onQuest, onItem, onWorld }: { id: string; onParties: () => void; onQuest: (id: string) => void; onItem: (id: string) => void; onWorld: (kind: WorldKind, id: string) => void }) {
  const quest = quests.find(quest => quest.id === id);
  const { data, service } = useProgress();
  const { character, run } = currentPart(data);
  if (!quest) return <Page title="Quête introuvable"><Text style={ui.body}>Cette fiche n’est pas disponible dans ce catalogue.</Text></Page>;
  const relatedItems = items.filter(item => item.acquisitions.some(acquisition => acquisition.relatedQuestId === id));
  const relatedBosses = bosses.filter(boss => boss.relatedQuestIds.includes(id));
  const relatedGraces = graces.filter(grace => grace.relatedQuestIds.includes(id));
  const progress = run?.quests[id];
  const checkedSteps = quest.steps.filter(step => progress?.steps[step.id]).length;
  return <Page title={quest.name} subtitle={quest.summary}>
    {character && run ? <Card>
      <Text style={ui.label}>{character.name} · Statut renseigné manuellement</Text>
      <View style={ui.wrap}>{(['in_progress', 'completed', 'failed'] as const).map(status => <Choice key={status}
        label={questStatusLabels[status]} selected={progress?.status === status}
        onPress={() => void service.mutate(save => updateQuest(save, id, value => ({ ...value, status })))} />)}</View>
      <Text style={ui.caption}>Le statut global est indépendant des étapes cochées.</Text>
    </Card> : <Button title="Choisir une partie pour suivre cette quête" onPress={onParties} />}
    <Card>
      <Text style={ui.label}>{questKindLabels[quest.kind ?? 'quest']} · Départ : {regions.find(region => region.id === quest.startRegionId)?.name}</Text>
      <Text style={ui.body}>Personnages : {[quest.npcId, ...(quest.relatedNpcIds ?? [])].map(id => npcs.find(npc => npc.id === id)?.name).join(', ')}</Text>
      <Text style={ui.caption}>Lieux : {quest.regionIds.map(id => regions.find(region => region.id === id)?.name).join(' · ')}</Text>
    </Card>
    {!!quest.relatedQuestIds?.length && <Card>
      <Heading>Parcours associés</Heading>
      <Text style={ui.caption}>Consulter une autre fiche ne modifie aucune progression.</Text>
      {quest.relatedQuestIds.map(id => <Button key={id} title={`Consulter : ${quests.find(entry => entry.id === id)?.name ?? id}`} variant="quiet" onPress={() => onQuest(id)} />)}
    </Card>}
    {!!quest.requirements.length && <Card><Heading>Prérequis</Heading>{quest.requirements.map(text => <Text key={text} style={ui.body}>{text}</Text>)}</Card>}
    {!!quest.warnings.length && <Card><Heading>À savoir avant de continuer</Heading>{quest.warnings.map(text => <Text key={text} style={ui.body}>{text}</Text>)}</Card>}
    {quest.branches.map(branch => <Card key={branch.id}>
      <Heading>{branch.label}</Heading>
      <Text style={ui.caption}>Ce choix décrit votre partie. Le modifier ne décoche pas les étapes déjà saisies.</Text>
      {branch.options.map(option => <View key={option.id} style={{ gap: 6 }}>
        {run ? <Choice label={option.label} selected={progress?.branches[branch.id] === option.id} onPress={() => void service.mutate(save =>
          updateQuest(save, id, value => ({ ...value, branches: { ...value.branches, [branch.id]: value.branches[branch.id] === option.id ? '' : option.id } })))} /> : <Text style={ui.label}>{option.label}</Text>}
        <Text style={ui.body}>{option.consequence}</Text>
      </View>)}
    </Card>)}
    <Heading>Étapes</Heading>
    <Text style={ui.caption}>{checkedSteps} étape{checkedSteps > 1 ? 's' : ''} cochée{checkedSteps > 1 ? 's' : ''} sur {quest.steps.length}, voies alternatives incluses. Vous pouvez les renseigner dans l’ordre de votre choix.</Text>
    {quest.steps.map(step => {
      const branch = step.branch && quest.branches.find(branch => branch.id === step.branch!.groupId);
      const option = branch?.options.find(option => option.id === step.branch!.optionId);
      return <Card key={step.id}>
        {step.optional && <Text style={ui.label}>Facultatif</Text>}
        {branch && option && <Text style={ui.label}>Voie : {option.label}{progress?.branches[branch.id] === option.id ? ' · choisie' : ''}</Text>}
        {run ? <CheckRow label={step.title} detail={step.location} checked={progress?.steps[step.id] ?? false}
          onPress={() => void service.mutate(save => updateQuest(save, id, value => ({ ...value,
            steps: { ...value.steps, [step.id]: !value.steps[step.id] } })))} /> : <><Heading>{step.title}</Heading><Text style={ui.label}>{step.location}</Text></>}
        <Text style={ui.body}>{step.detail}</Text>
      </Card>;
    })}
    <Card><Heading>Récompenses</Heading>{quest.rewards.map(text => <Text key={text} style={ui.body}>{text}</Text>)}
      <Text style={ui.caption}>Les objets obtenus ne sont pas cochés automatiquement.</Text></Card>
    {!!relatedItems.length && <Card><Heading>Objets associés</Heading>
      <Text style={ui.caption}>Cette sélection est partielle. Consulter ou cocher un objet ne termine aucune étape.</Text>
      {relatedItems.map(item => <Button key={item.id} title={`Objet associé : ${item.name}`} variant="quiet" onPress={() => onItem(item.id)} />)}
    </Card>}
    {(!!relatedBosses.length || !!relatedGraces.length) && <Card><Heading>Exploration associée</Heading>
      <Text style={ui.caption}>Liens de consultation ; les coches de boss, de grâces et de quêtes restent indépendantes.</Text>
      {relatedBosses.map(boss => <Button key={boss.id} title={`Boss associé : ${boss.name}`} variant="quiet" onPress={() => onWorld('boss', boss.id)} />)}
      {relatedGraces.map(grace => <Button key={grace.id} title={`Grâce associée : ${grace.name}`} variant="quiet" onPress={() => onWorld('grace', grace.id)} />)}
    </Card>}
    <Card><Heading>Références</Heading>{quest.sources.map(source => <View key={source.url} style={{ gap: 6 }}>
      <SourceLink url={source.url} label={source.label} /><Text style={ui.caption}>Vérification documentaire : {source.verifiedAt}</Text>
    </View>)}<Text style={ui.caption}>Parcours synthétique, sans lecture de votre sauvegarde de jeu.</Text></Card>
  </Page>;
}
