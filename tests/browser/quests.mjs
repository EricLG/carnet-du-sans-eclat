import { APP_ID } from '../../src/config/identity.ts';
import assert from 'node:assert/strict';
import { browser } from './cdp.mjs';
const b = await browser();
const name = `Quêtes-${Date.now()}`;
async function readSave() {
  return b.evaluate(`new Promise((resolve,reject)=>{const request=indexedDB.open(${JSON.stringify(APP_ID)},1);request.onsuccess=()=>{const db=request.result;const read=db.transaction('saves').objectStore('saves').get('progress');read.onsuccess=()=>{resolve(read.result);db.close()};read.onerror=reject};request.onerror=reject})`);
}
try {
  await b.send('Page.navigate', { url: 'http://127.0.0.1:8081' });
  await b.wait('Ouvrir mon carnet'); await b.click('Ouvrir mon carnet'); await b.wait('Mes quêtes');
  await b.click('Parties'); await b.wait('Nom du personnage'); await b.fill('Nom du personnage', name); await b.click('Créer le personnage'); await b.wait(`Nouveau cycle pour ${name}`);
  await b.click('Quêtes'); await b.wait('Mes quêtes');
  await b.layout('quests',390,844); await b.layout('quests',360,800);
  await b.fill('Rechercher une quête', 'RODÉRIKA'); await b.wait('1 résultat parmi');
  assert.equal(await b.evaluate(`document.body.innerText.includes('Voir la quête de Ranni')`), false);
  await b.fill('Rechercher une quête', ''); await b.wait('5 résultats parmi');
  await b.click('Statut : tous'); await b.click('Échouée'); await b.wait('0 résultats parmi');
  await b.click('Toutes'); await b.wait('5 résultats parmi');
  await b.click('Région : toutes'); await b.click('Nécrolimbe'); await b.wait('4 résultats parmi');
  await b.click('Toutes les régions'); await b.wait('5 résultats parmi');
  await b.click('Voir la quête de Sellen la sorcière'); await b.wait('Le duel de la bibliothèque');
  await b.click('Échouée'); await b.click('Aider Sellen'); await b.click('Devenir son élève');
  await b.wait('1 étape cochée');
  await b.layout('quest-detail',390,844); await b.layout('quest-detail',360,800);
  let save = await readSave();
  let character = save.characters.find(character=>character.id===save.selected.characterId);
  let quest = character.runs.find(run=>run.id===save.selected.runId).quests['quest.sellen'];
  assert.equal(quest.status,'failed'); assert.equal(quest.branches['sellen.duel'],'sellen'); assert.equal(quest.steps['sellen.teacher'],true);
  await b.click('Aider Jerren'); await b.wait('Voie : Aider Jerren');
  await b.send('Page.reload',{ignoreCache:true}); await b.wait('Ouvrir mon carnet'); await b.click('Ouvrir mon carnet'); await b.wait('Mes quêtes');
  await b.click('Voir la quête de Sellen la sorcière'); await b.wait('Le duel de la bibliothèque');
  assert.equal(await b.evaluate(`document.querySelector('[role="checkbox"][aria-label="Devenir son élève"]').getAttribute('aria-checked')`),'true');
  await b.click('Devenir son élève'); await b.wait('0 étape cochée');
  await b.send('Page.reload',{ignoreCache:true}); await b.wait('Ouvrir mon carnet'); await b.click('Ouvrir mon carnet'); await b.wait('Mes quêtes');
  await b.click('Parties'); await b.wait(name); await b.click(`Nouveau cycle pour ${name}`); await b.click('Confirmer le nouveau cycle'); await b.wait('NG+');
  await b.click('Quêtes'); await b.wait('Mes quêtes');
  save=await readSave(); character=save.characters.find(character=>character.id===save.selected.characterId);
  assert.deepEqual(character.runs.find(run=>run.id===save.selected.runId).quests,{});
  const previous=character.runs.find(run=>run.cycle===0).quests['quest.sellen'];
  assert.equal(previous.status,'failed'); assert.equal(previous.branches['sellen.duel'],'jerren'); assert.equal(previous.steps['sellen.teacher'],false);
  assert.equal(b.errors.length,0,JSON.stringify(b.errors));
  console.log('Lot 2: manual status, branching, check/uncheck, reload, cycle isolation and mobile layouts passed');
} finally { b.close(); }
