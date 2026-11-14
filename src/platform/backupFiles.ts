import { APP_ID } from '../config/identity';
import * as DocumentPicker from 'expo-document-picker';
import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export async function pickBackup(): Promise<string | null> {
  const result = await DocumentPicker.getDocumentAsync({ type: ['application/json', 'text/plain'], copyToCacheDirectory: true });
  if (result.canceled) return null;
  const file = new File(result.assets[0].uri);
  if (file.size > 10_000_000) throw new Error('Le fichier dépasse 10 Mo.');
  return file.text();
}
export async function downloadBackup(content: string): Promise<void> {
  if (!await Sharing.isAvailableAsync()) throw new Error('Le partage de fichiers est indisponible sur cet appareil.');
  const file = new File(Paths.cache, `${APP_ID}-${Date.now()}.json`);
  file.create({ overwrite: true });
  file.write(content);
  try { await Sharing.shareAsync(file.uri, { mimeType: 'application/json', UTI: 'public.json' }); }
  finally { file.delete(); }
}
