import { useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { npcs, quests, regions } from '../catalog/quests';
import { questScope, scopeDescription, scopeSource } from '../catalog/questScope';
import { questCoverage } from '../catalog/coverage';
import { filterQuests, groupQuestsByStartRegion, questKindLabels, questStatusLabels, type QuestFilter } from '../catalog/query';
import { Button, Card, CheckRow, Choice, Field, Heading, Page, SourceLink, ui } from '../components/ui';
import { currentPart, cycleLabel, updateQuest } from '../domain/save';
import { useProgress } from '../state/ProgressProvider';

const coverage = questCoverage(quests, questScope);
export function QuestsScreen({ onOpen, onParties }: { onOpen: (id: string) => void; onParties: () => void }) {
  const { data, service } = useProgress();
  const { character, run } = currentPart(data);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<QuestFilter['status']>('all');
  const [kind, setKind] = useState<QuestFilter['kind']>('all');
  const [region, setRegion] = useState('all');
  const [showRegions, setShowRegions] = useState(false);
  const [showStatuses, setShowStatuses] = useState(false);
  const [showKinds, setShowKinds] = useState(false);
  const [showCoverage, setShowCoverage] = useState(false);
  const filtered = useMemo(() => filterQuests(quests, npcs, { search, region, status: filter, kind }, run?.quests), [search, region, filter, kind, run]);
  const groups = useMemo(() => groupQuestsByStartRegion(filtered, regions), [filtered]);
  return <Page title="Mes quêtes" subtitle="Suivez vos rencontres, étape par étape.">
    <Card>
      {character && run ? <View style={ui.row}><View style={ui.grow}><Text style={ui.checkLabel}>{character.name}</Text><Text style={ui.label}>{cycleLabel(run.cycle)}</Text></View>
        <Button title="Changer" variant="quiet" onPress={onParties} /></View> :
        <><Heading>Choisissez votre voyage</Heading><Text style={ui.body}>Sélectionnez une partie pour enregistrer votre progression.</Text>
          <Button title="Créer ou sélectionner une partie" variant="quiet" onPress={onParties} /></>}
    </Card>
    <Text style={ui.caption}>Jeu de base · {coverage.published}/{coverage.expected} parcours PNJ du périmètre référencés</Text>
    <Button title={showCoverage ? 'Masquer le périmètre du catalogue' : 'Voir le périmètre du catalogue'} variant="quiet" onPress={() => setShowCoverage(value => !value)} />
    {showCoverage && <Card>
      <Heading>Couverture du catalogue</Heading>
      <Text style={ui.body}>{coverage.quests} quêtes · {coverage.encounters} rencontres · {coverage.stories} parcours principal</Text>
      <Text style={ui.body}>{scopeDescription}</Text>
      <Text style={ui.caption}>Fiches synthétiques et vérification documentaire ; elles ne recensent pas chaque réplique. La collection, les boss et les grâces auront leurs propres catalogues.</Text>
      <SourceLink label={scopeSource.label} url={scopeSource.url} />
    </Card>}
    <Field label="Rechercher une quête" value={search} onChangeText={setSearch} placeholder="Nom d’un personnage…" />
    <View style={ui.row}><View style={ui.grow}><Button title={`Statut : ${filter === 'all' ? 'tous' : questStatusLabels[filter]}`} variant="quiet" onPress={() => setShowStatuses(value => !value)} /></View>
      <View style={ui.grow}><Button title={`Région : ${regions.find(entry => entry.id === region)?.name ?? 'toutes'}`} variant="quiet" onPress={() => setShowRegions(value => !value)} /></View></View>
    {showStatuses && <View style={ui.wrap}><Choice label="Toutes" selected={filter === 'all'} onPress={() => setFilter('all')} />
      {Object.entries(questStatusLabels).map(([key, label]) => <Choice key={key} label={label} selected={filter === key} onPress={() => setFilter(key as QuestFilter['status'])} />)}</View>}
    {showRegions && <View style={ui.wrap}><Choice label="Toutes les régions" selected={region === 'all'} onPress={() => setRegion('all')} />
      {regions.map(entry => <Choice key={entry.id} label={entry.name} selected={region === entry.id} onPress={() => setRegion(entry.id)} />)}</View>}
    <Button title={`Type : ${kind === 'all' ? 'tous' : questKindLabels[kind]}`} variant="quiet" onPress={() => setShowKinds(value => !value)} />
    {showKinds && <View style={ui.wrap}><Choice label="Tous les parcours" selected={kind === 'all'} onPress={() => setKind('all')} />
      {Object.entries(questKindLabels).map(([key, label]) => <Choice key={key} label={label} selected={kind === key} onPress={() => setKind(key as QuestFilter['kind'])} />)}</View>}
    <Text style={ui.caption}>{filtered.length} résultat{filtered.length !== 1 ? 's' : ''} parmi les fiches disponibles</Text>
    <Text style={ui.caption}>Classés par région de départ. Le filtre régional inclut aussi les lieux visités pendant le parcours.</Text>
    {groups.map(group => <View key={group.id} style={{ gap: 16 }}>
      <Heading>Départ : {group.name}</Heading>
      {group.quests.map(quest => <Card key={quest.id}>
        <Heading>{quest.name}</Heading><Text style={ui.label}>{questKindLabels[quest.kind ?? 'quest']}</Text>
        <Text style={ui.body}>{quest.summary}</Text>
        <Text style={ui.label}>{questStatusLabels[run?.quests[quest.id]?.status ?? 'not_started']}</Text>
        {run && <CheckRow label={`Quête terminée : ${quest.name}`} checked={run.quests[quest.id]?.status === 'completed'} onPress={() => void service.mutate(save =>
          updateQuest(save, quest.id, progress => ({ ...progress, status: progress.status === 'completed' ? 'in_progress' : 'completed' })))} />}
        <Button title={`Voir la quête de ${quest.name}`} variant="quiet" onPress={() => onOpen(quest.id)} />
      </Card>)}
    </View>)}
    {!filtered.length && <Text style={ui.body}>Aucune fiche ne correspond à ces filtres.</Text>}
  </Page>;
}
