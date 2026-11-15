import { auditCatalog } from '../src/catalog/audit';
import { publishedCatalog } from '../src/catalog/snapshot';
import { checkSourceLinks } from '../src/catalog/sourceLinks';

async function main() {
  const args = process.argv.slice(2);
  if (args.length > 1 || args.some(arg => arg !== '--json')) throw new Error('Option disponible : --json.');
  const audit = auditCatalog(publishedCatalog, new Date().toISOString().slice(0, 10));
  if (audit.errors.length) throw new Error('Corriger l’audit local avant le contrôle réseau.');
  const results = await checkSourceLinks(audit.sources.entries.map(source => source.url));
  const summary = { checkedAt: new Date().toISOString(), total: results.length,
    available: results.filter(result => result.status === 'available').length,
    broken: results.filter(result => result.status === 'broken').length,
    unverified: results.filter(result => result.status === 'unverified').length, results };
  if (args.includes('--json')) console.log(JSON.stringify(summary, null, 2));
  else {
    console.log(`${summary.available}/${summary.total} pages accessibles · ${summary.broken} absences confirmées (404/410) · ${summary.unverified} accès non vérifiés`);
    for (const result of results.filter(result => result.status === 'broken')) console.log(`${result.httpStatus} ${result.url}`);
    console.log('Un refus d’accès ou un délai dépassé reste non vérifié. Les dates de revue documentaire ne sont pas modifiées.');
  }
  process.exitCode = summary.broken ? 1 : summary.unverified ? 2 : 0;
}
void main().catch(error => { console.error(error instanceof Error ? error.message : String(error)); process.exitCode = 1; });
