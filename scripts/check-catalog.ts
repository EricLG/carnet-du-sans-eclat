import { writeFile } from 'node:fs/promises';
import { auditCatalog, formatCatalogAudit } from '../src/catalog/audit';
import { publishedCatalog } from '../src/catalog/snapshot';

async function main() {
  const args = process.argv.slice(2);
  if (args.length > 1 || args.some(arg => !['--json', '--markdown', '--write-report'].includes(arg))) throw new Error('Options : --json, --markdown ou --write-report (une seule à la fois).');
  const report = auditCatalog(publishedCatalog, new Date().toISOString().slice(0, 10));
  if (args.includes('--write-report')) {
    await writeFile('docs/CATALOG_AUDIT.md', formatCatalogAudit(report), 'utf8');
    console.log('Rapport actualisé : docs/CATALOG_AUDIT.md');
  } else if (args.includes('--json')) console.log(JSON.stringify(report, null, 2));
  else if (args.includes('--markdown')) console.log(formatCatalogAudit(report));
  else {
    const p = report.publication;
    console.log(`${report.errors.length} erreur(s) d’intégrité · ${p.quests} parcours PNJ · ${p.items} objets · ${p.acquisitions} acquisitions · ${p.pickups} ramassages · ${p.bosses} boss · ${p.graces} grâces`);
    console.log(`${report.sources.unique} URL documentaires distinctes. Contrôle local ; disponibilité des pages non vérifiée.`);
    console.log(report.limits.slice(0, 3).join('\n'));
    for (const error of report.errors) console.error(error);
  }
  process.exitCode = report.errors.length ? 1 : 0;
}
void main().catch(error => { console.error(error instanceof Error ? error.message : String(error)); process.exitCode = 1; });
