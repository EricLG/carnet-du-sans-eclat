import { useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { quests, regions } from '../catalog/quests';
import { Button, Card, CheckRow, Choice, Field, Heading, Page, ui } from '../components/ui';
import { currentPart, cycleLabel, updateQuest } from '../domain/save';
import { useProgress } from '../state/ProgressProvider';

export const questStatusLabels = { not_started: 'Non commencée', in_progress: 'En cours', completed: 'Terminée', failed: 'Échouée' } as const;
export const normalizeSearch = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('fr');
type Filter = 'all' | keyof typeof questStatusLabels;
export function QuestsScreen({ onOpen, onParties }: { onOpen: (id: string) => void; onParties: () => void }) {
  const { data, service } = useProgress();
  const { character, run } = currentPart(data);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [region, setRegion] = useState('all');
  const [showRegions, setShowRegions] = useState(false);
  const [showStatuses, setShowStatuses] = useState(false);
  const filtered = useMemo(() => quests.filter(quest => normalizeSearch(`${quest.name} ${quest.summary}`).includes(normalizeSearch(search)) &&
    (region === 'all' || quest.regionIds.includes(region)) &&
    (filter === 'all' || (run?.quests[quest.id]?.status ?? 'not_started') === filter)), [search, region, filter, run]);
  return <Page title="Mes quêtes" subtitle="Suivez vos rencontres, étape par étape.">
    <Card>
      {character && run ? <View style={ui.row}><View style={ui.grow}><Text style={ui.checkLabel}>{character.name}</Text><Text style={ui.label}>{cycleLabel(run.cycle)}</Text></View>
        <Button title="Changer" variant="quiet" onPress={onParties} /></View> :
        <><Heading>Choisissez votre voyage</Heading><Text style={ui.body}>Sélectionnez une partie pour enregistrer votre progression.</Text>
          <Button title="Créer ou sélectionner une partie" variant="quiet" onPress={onParties} /></>}
    </Card>
    <Text style={ui.caption}>Catalogue partiel · {quests.length} quêtes du jeu de base</Text>
    <Field label="Rechercher une quête" value={search} onChangeText={setSearch} placeholder="Nom d’un personnage…" />
    <View style={ui.row}><View style={ui.grow}><Button title={`Statut : ${filter === 'all' ? 'tous' : questStatusLabels[filter]}`} variant="quiet" onPress={() => setShowStatuses(value => !value)} /></View>
      <View style={ui.grow}><Button title={`Région : ${regions.find(entry => entry.id === region)?.name ?? 'toutes'}`} variant="quiet" onPress={() => setShowRegions(value => !value)} /></View></View>
    {showStatuses && <View style={ui.wrap}><Choice label="Toutes" selected={filter === 'all'} onPress={() => setFilter('all')} />
      {Object.entries(questStatusLabels).map(([key, label]) => <Choice key={key} label={label} selected={filter === key} onPress={() => setFilter(key as Filter)} />)}</View>}
    {showRegions && <View style={ui.wrap}><Choice label="Toutes les régions" selected={region === 'all'} onPress={() => setRegion('all')} />
      {regions.map(entry => <Choice key={entry.id} label={entry.name} selected={region === entry.id} onPress={() => setRegion(entry.id)} />)}</View>}
    <Text style={ui.caption}>{filtered.length} résultat{filtered.length !== 1 ? 's' : ''} parmi les fiches disponibles</Text>
    {filtered.map(quest => <Card key={quest.id}>
      <Heading>{quest.name}</Heading><Text style={ui.body}>{quest.summary}</Text>
      <Text style={ui.label}>{questStatusLabels[run?.quests[quest.id]?.status ?? 'not_started']}</Text>
      {run && <CheckRow label={`Quête terminée : ${quest.name}`} checked={run.quests[quest.id]?.status === 'completed'} onPress={() => void service.mutate(save =>
        updateQuest(save, quest.id, progress => ({ ...progress, status: progress.status === 'completed' ? 'in_progress' : 'completed' })))} />}
      <Button title={`Voir la quête de ${quest.name}`} variant="quiet" onPress={() => onOpen(quest.id)} />
    </Card>)}
    {!filtered.length && <Text style={ui.body}>Aucune fiche ne correspond à ces filtres.</Text>}
  </Page>;
}
