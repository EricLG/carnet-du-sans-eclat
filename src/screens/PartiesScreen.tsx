import { useState } from 'react';
import { collectionItems } from '../catalog/items';
import { Text, View } from 'react-native';
import { addCharacter, addCycle, cycleLabel, selectRun } from '../domain/save';
import { catalogProgress } from '../domain/catalogProgress';
import { Button, Card, Choice, Field, Heading, Page, ui } from '../components/ui';
import { useProgress } from '../state/ProgressProvider';

export function PartiesScreen({ onBackup }: { onBackup: () => void }) {
  const { data, loading, pending, service } = useProgress();
  const [name, setName] = useState('');
  const [confirmCycle, setConfirmCycle] = useState<string | null>(null);
  const create = async () => {
    if (!name.trim() || name.trim().length > 60) return;
    if (await service.mutate(save => addCharacter(save, name))) setName('');
  };
  return <Page title="Mes parties" subtitle="Un personnage, plusieurs voyages. Chaque cycle garde son propre carnet.">
    <Card>
      <Heading>Nouveau personnage</Heading>
      <Field label="Nom du personnage" value={name} onChangeText={setName} placeholder="Votre Sans-éclat" onSubmitEditing={() => void create()} />
      <Text style={ui.caption}>De 1 à 60 caractères. La première partie sera créée avec le personnage.</Text>
      <Button title="Créer le personnage" onPress={() => void create()} disabled={loading || pending > 0 || !name.trim() || name.trim().length > 60} />
    </Card>
    {data.characters.length === 0 && <Text style={ui.body}>Créez votre premier personnage pour commencer à remplir le carnet.</Text>}
    {data.characters.map(character => <Card key={character.id}>
      <Heading>{character.name}</Heading>
      <Text style={ui.caption}>{catalogProgress(collectionItems, character.collection).done} objets déjà obtenus · Collection conservée entre les cycles</Text>
      <View style={ui.wrap}>{character.runs.map(run => <Choice key={run.id} label={cycleLabel(run.cycle)}
        selected={data.selected?.characterId === character.id && data.selected.runId === run.id}
        onPress={() => void service.mutate(save => selectRun(save, character.id, run.id))} />)}</View>
      {confirmCycle === character.id ? <>
        <Text style={ui.body}>Créer le prochain cycle ? Les quêtes, boss, grâces et ramassages commenceront à zéro. Les cycles précédents et la collection resteront disponibles.</Text>
        <Button title="Confirmer le nouveau cycle" disabled={pending > 0} onPress={() => {
          void service.mutate(save => addCycle(save, character.id)).then(success => { if (success) setConfirmCycle(null); });
        }} />
        <Button title="Annuler" variant="quiet" onPress={() => setConfirmCycle(null)} />
      </> : <Button title={`Nouveau cycle pour ${character.name}`} variant="quiet" onPress={() => setConfirmCycle(character.id)} />}
    </Card>)}
    <Button title="Sauvegardes et transfert" variant="quiet" onPress={onBackup} />
  </Page>;
}
