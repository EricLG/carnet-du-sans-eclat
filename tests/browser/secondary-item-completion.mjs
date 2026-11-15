import assert from 'node:assert/strict';
import { APP_ID } from '../../src/config/identity.ts';
import { items } from '../../src/catalog/items/index.ts';
import { quests } from '../../src/catalog/quests.ts';
import { bosses } from '../../src/catalog/world/index.ts';
import { browser } from './cdp.mjs';

const b = await browser();
const name = `Talismans-et-cendres-${Date.now()}`;
function item(english, category) {
  const entry = items.find(entry => entry.category === category && entry.aliases.includes(english));
  assert.ok(entry, `${category}: ${english}`);
  return entry;
}
async function collection() {
  await b.send('Page.navigate', { url: 'http://127.0.0.1:8081' });
  await b.wait('Ouvrir mon carnet'); await b.click('Ouvrir mon carnet'); await b.wait('Mes quêtes');
  await b.click('Collection'); await b.wait('Ma collection');
}
async function open(entry, english) {
  await collection();
  // Le filtre distingue aussi les objets dont les noms français sont identiques.
  await b.click('Afficher les filtres des objets');
  await b.evaluate(`(()=>{const select=document.querySelector('select[aria-label="Catégorie"]');select.value=${JSON.stringify(entry.category)};select.dispatchEvent(new Event('change',{bubbles:true}))})()`);
  await b.fill('Rechercher un objet', english);
  await b.click(`Voir l’objet : ${entry.name}`); await b.wait('Comment l’obtenir');
  await b.wait(entry.aliases.join(' · '));
}
async function checked(label, expected) {
  await b.evaluate(`new Promise((resolve,reject)=>{const until=Date.now()+10000;const timer=setInterval(()=>{const el=[...document.querySelectorAll('[role="checkbox"]')].find(el=>el.getAttribute('aria-label')===${JSON.stringify(label)}&&!el.closest('[aria-hidden="true"]'));if(el?.getAttribute('aria-checked')===${JSON.stringify(String(expected))}){clearInterval(timer);resolve(true)}else if(Date.now()>until){clearInterval(timer);reject(new Error('Missing checkbox state: '+${JSON.stringify(label)}))}},60)})`);
}
async function obtain(entry) {
  const label = `Déjà obtenu : ${entry.name}`;
  await checked(label, false); await b.click(label); await checked(label, true);
}
async function readSave() {
  return b.evaluate(`new Promise((resolve,reject)=>{const request=indexedDB.open(${JSON.stringify(APP_ID)},1);request.onsuccess=()=>{const db=request.result;const read=db.transaction('saves').objectStore('saves').get('progress');read.onsuccess=()=>{resolve(read.result);db.close()};read.onerror=reject};request.onerror=reject})`);
}
function current(save) {
  const character = save.characters.find(entry => entry.id === save.selected.characterId);
  assert.equal(character.name, name);
  return { character, run: character.runs.find(run => run.id === save.selected.runId) };
}
async function mobileLayouts(category) {
  for (const [width, height] of [[390, 844], [360, 800]]) await b.layout(`secondary-${category}`, width, height);
}
async function unchangedBoss(entry, bossId) {
  const boss = bosses.find(boss => boss.id === bossId);
  assert.ok(boss, bossId);
  assert.ok(entry.acquisitions.some(acquisition => acquisition.sourceEntityId === boss.id));
  await b.click(`Rencontre : ${boss.name}`); await b.wait('Accès');
  await checked(`Vaincu : ${boss.name}`, false);
}
function assertSave(save, obtained, missing, cycle) {
  const { character, run } = current(save);
  assert.equal(run.cycle, cycle);
  for (const entry of obtained) assert.equal(character.collection[entry.id], true, entry.id);
  for (const entry of missing) assert.equal(!!character.collection[entry.id], false, entry.id);
  for (const journey of character.runs) {
    assert.deepEqual(journey.bosses, {});
    assert.deepEqual(journey.quests, {});
    assert.deepEqual(journey.graces, {});
    assert.deepEqual(journey.pickups, {});
  }
}

try {
  await collection(); await b.click('Parties'); await b.fill('Nom du personnage', name);
  await b.click('Créer le personnage'); await b.wait(`Nouveau cycle pour ${name}`);

  const base = item('Crimson Amber Medallion', 'talisman');
  const plusOne = item('Crimson Amber Medallion +1', 'talisman');
  const plusTwo = item('Crimson Amber Medallion +2', 'talisman');
  assert.equal(new Set([base.id, plusOne.id, plusTwo.id]).size, 3);
  await open(plusOne, 'Crimson Amber Medallion +1'); await obtain(plusOne);
  await open(plusTwo, 'Crimson Amber Medallion +2'); await checked(`Déjà obtenu : ${plusTwo.name}`, false);
  await b.wait('Vaincre Maliketh');
  await open(base, 'Crimson Amber Medallion'); await checked(`Déjà obtenu : ${base.name}`, false);

  const rotten = item('Rotten Winged Sword Insignia', 'talisman');
  const prosthesis = item("Millicent's Prosthesis", 'talisman');
  const millicent = quests.find(quest => quest.id === 'quest.millicent');
  assert.ok(millicent);
  assert.ok([rotten, prosthesis].every(entry => entry.acquisitions.some(acquisition => acquisition.relatedQuestId === millicent.id)));
  await open(rotten, 'Rotten Winged Sword Insignia'); await b.wait('signe doré');
  await b.wait('cycles distincts'); await obtain(rotten); await mobileLayouts('talisman');
  await b.click(`Parcours associé : ${millicent.name}`); await b.wait('Statut renseigné manuellement');
  await b.click(`Objet associé : ${prosthesis.name}`); await b.wait('signe rouge');
  await b.wait('exclut'); await checked(`Déjà obtenu : ${prosthesis.name}`, false);

  const lightning = item('Lightning Spear', 'incantation');
  const prayerbook = item('Dragon Cult Prayerbook', 'key_item');
  await open(lightning, 'Lightning Spear'); await b.wait('6 000 runes');
  await b.wait('Remettre le bréviaire'); await obtain(lightning); await mobileLayouts('incantation');
  await b.click(`Objet requis : ${prayerbook.name}`); await b.wait('Comment l’obtenir');
  await checked(`Déjà obtenu : ${prayerbook.name}`, false);

  const bloodhound = item("Ash of War: Bloodhound's Step", 'ash_of_war');
  await open(bloodhound, "Ash of War: Bloodhound's Step"); await b.wait('Venir de nuit');
  await obtain(bloodhound); await mobileLayouts('ash-of-war');
  await unchangedBoss(bloodhound, 'boss.nights-cavalry.lenne');

  const tiche = item('Black Knife Tiche', 'spirit_ash');
  await open(tiche, 'Black Knife Tiche'); await b.wait('autel lunaire');
  await obtain(tiche); await mobileLayouts('spirit-ash');
  await unchangedBoss(tiche, 'boss.alecto.ringleader');

  const goldenSpell = item('Golden Vow', 'incantation');
  const goldenAsh = item('Ash of War: Golden Vow', 'ash_of_war');
  assert.notEqual(goldenSpell.id, goldenAsh.id);
  await open(goldenSpell, 'Golden Vow'); await obtain(goldenSpell);
  await open(goldenAsh, 'Ash of War: Golden Vow'); await obtain(goldenAsh);

  const obtained = [plusOne, rotten, lightning, bloodhound, tiche, goldenSpell, goldenAsh];
  const missing = [base, plusTwo, prosthesis, prayerbook];
  // Un rechargement relit IndexedDB ; aucune récompense liée ne doit être cochée.
  await collection(); assertSave(await readSave(), obtained, missing, 0);
  await open(goldenSpell, 'Golden Vow'); await checked(`Déjà obtenu : ${goldenSpell.name}`, true);

  await collection(); await b.click('Parties'); await b.click(`Nouveau cycle pour ${name}`);
  await b.click('Confirmer le nouveau cycle'); await b.wait('NG+');
  await collection(); assertSave(await readSave(), obtained, missing, 1);
  for (const [entry, english] of [[plusOne, 'Crimson Amber Medallion +1'], [lightning, 'Lightning Spear'],
    [bloodhound, "Ash of War: Bloodhound's Step"], [tiche, 'Black Knife Tiche']]) {
    await open(entry, english); await checked(`Déjà obtenu : ${entry.name}`, true);
    if (entry === bloodhound) await unchangedBoss(entry, 'boss.nights-cavalry.lenne');
    if (entry === tiche) await unchangedBoss(entry, 'boss.alecto.ringleader');
  }
  assert.equal(b.errors.length, 0, JSON.stringify(b.errors));
  console.log('Complétion secondaire : variantes, Millicent, bréviaire, rencontres, homonymes, rechargement, NG+ et quatre catégories aux deux formats mobiles vérifiés');
} finally { b.close(); }
