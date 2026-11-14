import { APP_ID } from '../config/identity';
export async function pickBackup(): Promise<string | null> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,application/json';
    input.style.display = 'none';
    document.body.appendChild(input);
    input.oncancel = () => { input.remove(); resolve(null); };
    input.onchange = async () => {
      const file = input.files?.[0];
      input.remove();
      if (!file) { resolve(null); return; }
      if (file.size > 10_000_000) { reject(new Error('Le fichier dépasse 10 Mo.')); return; }
      try { resolve(await file.text()); } catch { reject(new Error('Impossible de lire ce fichier.')); }
    };
    input.click();
  });
}
export async function downloadBackup(content: string): Promise<void> {
  const url = URL.createObjectURL(new Blob([content], { type: 'application/json' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = `${APP_ID}-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
