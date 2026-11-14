import { useState } from 'react';
import { Text, View } from 'react-native';
import { Button, Card, Heading, Page, ui } from '../components/ui';
import { exportSave, importCopies, parseBackup, type Backup } from '../domain/save';
import { downloadBackup, pickBackup } from '../platform/backupFiles';
import { useProgress } from '../state/ProgressProvider';

export function BackupScreen() {
  const { data, pending, loading, service } = useProgress();
  const [preview, setPreview] = useState<Backup | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [working, setWorking] = useState(false);
  async function perform(action: () => Promise<void>) {
    setWorking(true); setError(''); setMessage('');
    try { await action(); } catch (error) { setError(error instanceof Error ? error.message : 'Opération impossible.'); }
    finally { setWorking(false); }
  }
  return <Page title="Sauvegardes" subtitle="Gardez une copie de votre carnet et transférez-la entre vos appareils.">
    <Card>
      <Heading>Sur cet appareil</Heading>
      <Text style={ui.body}>La progression est enregistrée automatiquement. Dans le navigateur, elle appartient à cette adresse et à ce navigateur : l’IP locale, localhost et le futur domaine ont des sauvegardes distinctes.</Text>
      <Text style={ui.body}>Effacer les données du site ou utiliser la navigation privée peut supprimer cette progression. Exportez régulièrement un fichier.</Text>
      <Text style={ui.label}>{data.characters.length} personnages · {data.characters.reduce((sum, character) => sum + character.runs.length, 0)} cycles</Text>
      <Button title="Exporter mes parties" disabled={loading || pending > 0 || working || !data.characters.length} onPress={() => void perform(async () => {
        await downloadBackup(exportSave(data)); setMessage('Export transmis au navigateur ou au partage de fichiers. Conservez le fichier téléchargé.');
      })} />
    </Card>
    <Card>
      <Heading>Importer une sauvegarde</Heading>
      <Text style={ui.body}>Les personnages seront ajoutés comme copies. Aucune partie présente sur cet appareil ne sera remplacée.</Text>
      <Button title="Choisir un fichier JSON" variant="quiet" disabled={working || loading || pending > 0} onPress={() => void perform(async () => {
        setPreview(null);
        const text = await pickBackup();
        if (text !== null) setPreview(parseBackup(text));
      })} />
      {preview && <View style={{ gap: 12 }}>
        <Text style={ui.label}>Export du {new Date(preview.exportedAt).toLocaleString('fr-FR')}</Text>
        {preview.data.characters.map(character => <Text key={character.id} style={ui.body}>{character.name} · {character.runs.length} cycles</Text>)}
        {!preview.data.characters.length && <Text style={ui.body}>Ce fichier ne contient aucun personnage à importer.</Text>}
        <Button title={`Importer ${preview.data.characters.length} personnage${preview.data.characters.length > 1 ? 's' : ''} en ${preview.data.characters.length > 1 ? 'copies' : 'copie'}`} disabled={working || pending > 0 || !preview.data.characters.length}
          onPress={() => void perform(async () => {
            if (await service.mutate(save => importCopies(save, preview))) {
              setPreview(null); setMessage('Personnages importés. Les parties existantes ont été conservées.');
            }
          })} />
        <Button title="Annuler l’import" variant="quiet" onPress={() => setPreview(null)} />
      </View>}
    </Card>
    {!!error && <Text accessibilityRole="alert" style={ui.error}>{error}</Text>}
    {!!message && <Text accessibilityLiveRegion="polite" style={ui.label}>{message}</Text>}
  </Page>;
}
