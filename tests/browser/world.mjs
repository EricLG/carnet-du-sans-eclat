import assert from 'node:assert/strict';
import { APP_ID } from '../../src/config/identity.ts';
import { bosses, graces } from '../../src/catalog/world/index.ts';
import { browser } from './cdp.mjs';

const b = await browser();
const name = `Exploration-${Date.now()}`;
async function open() {
  await b.send('Page.navigate', { url: 'http://127.0.0.1:8081' });
  await b.wait('Ouvrir mon carnet'); await b.click('Ouvrir mon carnet'); await b.wait('Mes quêtes');
}
async function exploration() { await open(); await b.click('Exploration'); await b.wait('Boss et sites de grâce'); }
async function readSave() {
  return b.evaluate(`new Promise((resolve,reject)=>{const r=indexedDB.open(${JSON.stringify(APP_ID)},1);r.onsuccess=()=>{const db=r.result;const t=db.transaction('saves').objectStore('saves').get('progress');t.onsuccess=()=>{resolve(t.result);db.close()};t.onerror=reject};r.onerror=reject})`);
}
function part(save) {
  const character = save.characters.find(character => character.id === save.selected.characterId);
  return { character, run: character.runs.find(run => run.id === save.selected.runId) };
}
async function checked(label, value) {
  await b.evaluate(`new Promise((resolve,reject)=>{const deadline=Date.now()+15000;const t=setInterval(()=>{const el=[...document.querySelectorAll('[role="checkbox"]')].find(el=>el.getAttribute('aria-label')===${JSON.stringify(label)}&&!el.closest('[aria-hidden="true"]'));if(el?.getAttribute('aria-checked')===${JSON.stringify(String(value))}){clearInterval(t);resolve(true)}else if(Date.now()>deadline){clearInterval(t);reject(new Error('Checkbox '+${JSON.stringify(label)}))}},60)})`);
}
async function select(label, value) {
  await b.evaluate(`(()=>{const el=document.querySelector('select[aria-label='+JSON.stringify(${JSON.stringify(label)})+']');el.value=${JSON.stringify(value)};el.dispatchEvent(new Event('change',{bubbles:true}))})()`);
}
const godrick = 'Godrick le Greffé · Voilorage';
try {
  await open(); await b.click('Parties'); await b.fill('Nom du personnage', name); await b.click('Créer le personnage'); await b.wait(`Nouveau cycle pour ${name}`);
  await b.click('Exploration'); await b.wait(`${bosses.length} résultats parmi les boss`);
  for (const [w,h] of [[390,844],[360,800]]) await b.layout('world-bosses',w,h);
  await b.click('Voir la couverture de l’exploration'); await b.wait('Catalogue d’exploration partiel');
  await b.layout('world-coverage',360,800); await b.click('Masquer la couverture de l’exploration');
  await b.fill('Rechercher dans l’exploration','Erdtree Burial Watchdog'); await b.wait('2 résultats parmi les boss');
  await b.click('Afficher les filtres d’exploration'); await select('Région d’exploration','weeping'); await b.wait('1 résultat parmi les boss');
  const watchdog = 'Vaincu : Chat de garde funéraire · Catacombes de l’Empaleur';
  await b.click(watchdog); await checked(watchdog,true);
  let saved = part(await readSave()); assert.equal(saved.run.bosses['boss.watchdog.impalers'],true); assert.equal(saved.run.bosses['boss.watchdog.stormfoot'],undefined);
  await select('Progression d’exploration','done'); await b.wait('1 résultat parmi les boss');
  await select('Progression d’exploration','missing'); await b.wait('0 résultats parmi les boss');
  await b.click('Réinitialiser les filtres d’exploration'); await b.click('Masquer les filtres d’exploration');
  await b.fill('Rechercher dans l’exploration','Godrick'); await b.wait('1 résultat parmi les boss');
  await b.click(`Voir le boss : ${godrick}`); await b.wait('Accès'); await b.click(`Vaincu : ${godrick}`); await checked(`Vaincu : ${godrick}`,true);
  await b.layout('world-boss-detail',390,844); await b.layout('world-boss-detail',360,800);
  await b.click('Grâce associée : Godrick le Greffé'); await b.wait('Site de grâce'); await checked('Activée : Godrick le Greffé',false);
  await b.click('Activée : Godrick le Greffé'); await checked('Activée : Godrick le Greffé',true);
  await b.layout('world-grace-detail',390,844); await b.layout('world-grace-detail',360,800);
  await b.click(`Boss associé : ${godrick}`); await checked(`Vaincu : ${godrick}`,true);
  await b.click(`Vaincu : ${godrick}`); await checked(`Vaincu : ${godrick}`,false);
  saved = part(await readSave()); assert.equal(saved.run.graces['grace.godrick'],true); assert.deepEqual(saved.character.collection,{}); assert.deepEqual(saved.run.quests,{}); assert.deepEqual(saved.run.pickups,{});
  await b.click('Objet associé : Souvenir du Greffé'); await b.wait('Comment l’obtenir'); await checked('Déjà obtenu : Souvenir du Greffé',false);
  await b.click('Déjà obtenu : Souvenir du Greffé'); await checked('Déjà obtenu : Souvenir du Greffé',true);
  await b.click(`Rencontre : ${godrick}`); await b.wait('Accès'); await b.click('Parcours associé : Gostoc le gardien'); await b.wait('Exploration associée');
  await b.click(`Boss associé : ${godrick}`); await checked(`Vaincu : ${godrick}`,false);
  await exploration(); await b.click('Sites de grâce'); await b.wait(`${graces.length} résultats parmi les sites de grâce`);
  await b.layout('world-graces',390,844); await b.layout('world-graces',360,800);
  const last = graces.filter(grace=>grace.regionIds.includes('gelmir'))[0];
  await b.evaluate(`(()=>{const el=[...document.querySelectorAll('[role="button"]')].find(el=>el.getAttribute('aria-label')===${JSON.stringify('Voir la grâce : '+last.name)});el.scrollIntoView({block:'end'})})()`);
  await b.layout('world-graces-bottom',360,800);
  assert.equal(await b.evaluate(`(()=>{const el=[...document.querySelectorAll('[role="button"]')].find(el=>el.getAttribute('aria-label')===${JSON.stringify('Voir la grâce : '+last.name)});return el.getBoundingClientRect().bottom<=document.querySelector('[role="tablist"]').getBoundingClientRect().top+1})()`),true);
  await b.fill('Rechercher dans l’exploration','Church of Elleh'); await b.wait('1 résultat parmi les sites de grâce');
  await b.click('Activée : Église d’Elleh'); await checked('Activée : Église d’Elleh',true);
  await b.click('Voir la grâce : Église d’Elleh'); await b.wait('Objets près de cette grâce');
  await b.click('Objet associé : Torche'); await b.wait('Comment l’obtenir'); await b.click('Grâce de référence : Église d’Elleh'); await checked('Activée : Église d’Elleh',true);
  await exploration(); await b.click('Sites de grâce'); await b.fill('Rechercher dans l’exploration','Church of Elleh'); await checked('Activée : Église d’Elleh',true);
  saved = part(await readSave()); const originalRun = saved.run.id; const originalCharacter = saved.character.id;
  await b.click('Parties'); await b.click(`Nouveau cycle pour ${name}`); await b.click('Confirmer le nouveau cycle'); await b.wait('NG+');
  await b.click('Exploration'); await b.wait(`0/${bosses.length} boss référencés vaincus`); await b.wait(`0/${graces.length} grâces référencées activées`);
  saved = part(await readSave()); assert.deepEqual(saved.run.bosses,{}); assert.deepEqual(saved.run.graces,{}); assert.equal(saved.character.collection['item.remembrance-grafted'],true);
  await b.click('Parties'); await b.fill('Nom du personnage',name+'-B'); await b.click('Créer le personnage'); await b.wait(`Nouveau cycle pour ${name}-B`);
  saved=part(await readSave()); assert.deepEqual(saved.run.bosses,{}); assert.deepEqual(saved.run.graces,{}); assert.deepEqual(saved.character.collection,{});
  // L’export/import suivant doit inclure les nouvelles coches du premier cycle.
  await b.evaluate(`(()=>{const heading=[...document.querySelectorAll('[role="heading"]')].find(el=>el.textContent===${JSON.stringify(name)});const radio=[...heading.parentElement.querySelectorAll('[role="radio"]')].find(el=>el.textContent==='Première partie');radio.click()})()`);
  await b.click('Exploration'); await b.wait('2/40 grâces référencées activées');
  saved=part(await readSave()); assert.equal(saved.character.id,originalCharacter); assert.equal(saved.run.id,originalRun);
  assert.equal(saved.run.bosses['boss.godrick.stormveil'],false); assert.equal(saved.run.graces['grace.godrick'],true);
  assert.equal(b.errors.length,0,JSON.stringify(b.errors));
  console.log('Lot 5 : filtres, homonymes, liens réciproques, coches indépendantes, persistance, NG+, isolation et formats mobiles vérifiés');
} finally { b.close(); }
