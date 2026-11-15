import assert from 'node:assert/strict';
import { APP_ID } from '../../src/config/identity.ts';
import { collectionItems, collectionScope, items, pickups } from '../../src/catalog/items/index.ts';
import { collectionCategoryLabels } from '../../src/catalog/items/query.ts';
import { regions } from '../../src/catalog/regions.ts';
import { browser } from './cdp.mjs';

const b = await browser();
const name = `Collection-${Date.now()}`;
async function readSave() {
  return b.evaluate(`new Promise((resolve,reject)=>{const request=indexedDB.open(${JSON.stringify(APP_ID)},1);request.onsuccess=()=>{const db=request.result;const read=db.transaction('saves').objectStore('saves').get('progress');read.onsuccess=()=>{resolve(read.result);db.close()};read.onerror=reject};request.onerror=reject})`);
}
function current(save) {
  const character = save.characters.find(c => c.id === save.selected.characterId);
  return { character, run: character.runs.find(r => r.id === save.selected.runId) };
}
async function collection() {
  await b.send('Page.navigate', { url: 'http://127.0.0.1:8081' });
  await b.wait('Ouvrir mon carnet'); await b.click('Ouvrir mon carnet'); await b.wait('Mes quêtes');
  await b.click('Collection'); await b.wait('Ma collection');
}
async function selectFilter(label, value) {
  await b.evaluate(`(()=>{const select=document.querySelector('select[aria-label='+JSON.stringify(${JSON.stringify(label)})+']');if(!select)throw new Error('Select missing');if(![...select.options].some(option=>option.value===${JSON.stringify(value)}))throw new Error('Option missing');select.value=${JSON.stringify(value)};select.dispatchEvent(new Event('change',{bubbles:true}))})()`);
}
async function checked(label, value) {
  await b.evaluate(`new Promise((resolve,reject)=>{const deadline=Date.now()+10000;const timer=setInterval(()=>{const el=[...document.querySelectorAll('[role="checkbox"]')].find(el=>el.getAttribute('aria-label')===${JSON.stringify(label)});if(el?.getAttribute('aria-checked')===${JSON.stringify(String(value))}){clearInterval(timer);resolve(true)}else if(Date.now()>deadline){clearInterval(timer);reject(new Error('Checkbox state missing'))}},50)})`);
}
try {
  await collection();
  await b.click('Parties'); await b.fill('Nom du personnage', name); await b.click('Créer le personnage'); await b.wait(`Nouveau cycle pour ${name}`);
  await b.click('Collection'); await b.wait('Ma collection');
  await b.layout('collection',390,844); await b.layout('collection',360,800);
  const groupedItems = Object.keys(collectionCategoryLabels).flatMap(category => collectionItems.filter(item => item.category === category).sort((a,b)=>a.name.localeCompare(b.name,'fr')));
  assert.deepEqual(await b.evaluate(`[...document.querySelectorAll('[role="button"]')].filter(el=>el.getAttribute('aria-label')?.startsWith('Voir l’objet : ')&&!el.closest('[aria-hidden="true"]')).map(el=>el.textContent.trim())`), groupedItems.map(item=>item.name));
  assert.equal(await b.evaluate(`document.body.innerText.includes('Voir l’objet : Graine dorée')`),false);
  await b.click('Déjà obtenu : Croc de limier'); await checked('Déjà obtenu : Croc de limier',true); await b.wait('Ma collection');
  await b.click('Voir l’objet : Croc de limier'); await b.wait('Comment l’obtenir'); await checked('Déjà obtenu : Croc de limier',true);
  await collection();
  for (const [width,height] of [[390,844],[360,800]]) {
    await b.send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:true});
    await b.evaluate(`(()=>{const heading=[...document.querySelectorAll('[role="heading"]')].find(el=>el.textContent.startsWith('Armes ·'));heading.scrollIntoView({block:'start'})})()`);
    await b.layout('collection-compact-list',width,height);
    const visible = await b.evaluate(`(()=>{const top=document.querySelector('[role="tablist"]').getBoundingClientRect().top;return [...document.querySelectorAll('[role="button"]')].filter(el=>{if(!el.getAttribute('aria-label')?.startsWith('Voir l’objet : '))return false;const r=el.getBoundingClientRect();return r.height>0&&r.top>=64&&r.bottom<=top}).length})()`);
    assert.ok(visible>=8,`Expected at least 8 visible item rows at ${width}px, got ${visible}`);
    console.log(`Collection compacte : ${visible} objets entièrement visibles à ${width} × ${height}`);
  }
  const lastLabel = JSON.stringify(`Voir l’objet : ${groupedItems.at(-1).name}`);
  await b.evaluate(`(()=>{const el=[...document.querySelectorAll('[role="button"]')].find(el=>el.getAttribute('aria-label')===${lastLabel});el.scrollIntoView({block:'end'})})()`);
  await b.layout('collection-bottom',390,844); await b.layout('collection-bottom',360,800);
  assert.equal(await b.evaluate(`(()=>{const el=[...document.querySelectorAll('[role="button"]')].find(el=>el.getAttribute('aria-label')===${lastLabel});return el.getBoundingClientRect().bottom<=document.querySelector('[role="tablist"]').getBoundingClientRect().top+1})()`),true);
  // Simuler une taille de texte minimale imposée par le navigateur mobile.
  await b.evaluate(`(()=>{window.collectionTabStyles=[...document.querySelectorAll('[role="tab"]')].map(tab=>{const label=[...tab.querySelectorAll('*')].find(el=>!el.children.length&&['Quêtes','Collection','Parties'].includes(el.textContent));const previous=label.getAttribute('style');label.style.fontSize='24px';label.style.lineHeight='normal';return {label,previous}})})()`);
  await b.layout('collection-large-tab-labels',390,844); await b.layout('collection-large-tab-labels',360,800);
  assert.equal(await b.evaluate(`window.collectionTabStyles.every(({label})=>{const r=label.getBoundingClientRect();const tab=label.closest('[role="tab"]').getBoundingClientRect();return label.scrollHeight<=label.clientHeight+1 && r.bottom<=tab.bottom+1})`),true);
  await b.evaluate(`window.collectionTabStyles.forEach(({label,previous})=>{if(previous===null)label.removeAttribute('style');else label.setAttribute('style',previous)});delete window.collectionTabStyles`);
  await b.click('Voir la couverture des objets'); await b.wait(collectionScope.description);
  await b.evaluate(`(()=>{const title=[...document.querySelectorAll('[role="heading"]')].find(el=>el.textContent===${JSON.stringify(collectionScope.label)});title.scrollIntoView({block:'start'})})()`);
  await b.layout('collection-coverage',390,844); await b.layout('collection-coverage',360,800);
  await b.click('Masquer la couverture des objets');
  await b.fill('Rechercher un objet','EPEE A DOUBLE LAME'); await b.wait('1 résultat parmi les objets');
  await b.fill('Rechercher un objet','Lantern'); await b.wait('1 résultat parmi les objets');
  await b.click('Voir l’objet : Lanterne'); await b.wait('1 800 runes');
  assert.ok(await b.evaluate(`document.body.innerText.includes('Péninsule larmoyante') && document.body.innerText.includes('Liurnia')`));
  await b.click('Déjà obtenu : Lanterne'); await checked('Déjà obtenu : Lanterne',true);
  await b.layout('item-merchant',390,844); await b.layout('item-merchant',360,800);
  await b.evaluate(`(()=>{const source=[...document.querySelectorAll('[role="button"]')].filter(el=>el.getAttribute('aria-label')==='Eldenpedia — Lantern'&&!el.closest('[aria-hidden="true"]')).at(-1);source.scrollIntoView({block:'center'})})()`);
  await b.layout('item-sources',390,844); await b.layout('item-sources',360,800);
  await collection(); await b.fill('Rechercher un objet','Lanterne'); await checked('Déjà obtenu : Lanterne',true);
  await b.fill('Rechercher un objet',''); await b.click('Afficher les filtres des objets');
  await selectFilter('Catégorie','tool'); await selectFilter('Méthode d’obtention','exploration'); await selectFilter('Région d’obtention','roundtable'); await b.wait('0 résultats parmi les objets');
  await selectFilter('Région d’obtention','limgrave'); await b.wait('2 résultats parmi les objets');
  assert.equal(await b.evaluate(`!!document.querySelector('select[aria-label="Catégorie"] option[value="upgrade"]')`),false);
  assert.equal(await b.evaluate(`document.querySelectorAll('select').length`),4);
  await b.evaluate(`document.querySelector('select[aria-label="Catégorie"]').scrollIntoView({block:'start'})`);
  await b.layout('collection-filters',390,844); await b.layout('collection-filters',360,800);
  await b.click('Réinitialiser les filtres des objets');
  assert.deepEqual(await b.evaluate(`[...document.querySelectorAll('select')].map(select=>select.value)`),['all','all','all','all']);
  await b.evaluate(`document.querySelector('select[aria-label="Catégorie"]').focus()`);
  await b.send('Input.dispatchKeyEvent',{type:'keyDown',key:'ArrowDown',code:'ArrowDown',windowsVirtualKeyCode:40});
  await b.send('Input.dispatchKeyEvent',{type:'keyUp',key:'ArrowDown',code:'ArrowDown',windowsVirtualKeyCode:40});
  await b.send('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
  await b.send('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
  await b.wait(`${collectionItems.filter(item=>item.category==='weapon').length} résultats parmi les objets`);
  await selectFilter('Catégorie','armor'); await b.wait(`${collectionItems.filter(item=>item.category==='armor').length} résultats parmi les objets`);
  await selectFilter('Catégorie','tool'); await selectFilter('Statut de collection','obtained'); await b.wait('1 résultat parmi les objets');
  await selectFilter('Statut de collection','missing'); await b.wait(`${collectionItems.filter(item=>item.category==='tool').length-1} résultats parmi les objets`);
  await b.click('Réinitialiser les filtres des objets'); await b.click('Masquer les filtres des objets');
  await b.fill('Rechercher un objet','Lordsworn'); await b.click('Voir l’objet : Épée droite seigneuriale'); await b.wait('Butin aléatoire — 2 %');
  await b.layout('item-drop',390,844); await b.layout('item-drop',360,800);
  await collection(); await b.fill('Rechercher un objet','Entaille sanglante'); await b.click('Voir l’objet : Entaille sanglante'); await b.wait('Butin d’ennemi'); await b.wait('Obtention garantie');
  await collection(); await b.fill('Rechercher un objet','Hache de Godrick'); await b.click('Voir l’objet : Hache de Godrick'); await b.wait('Échange de souvenir');
  await b.click('Déjà obtenu : Hache de Godrick'); await checked('Déjà obtenu : Hache de Godrick',true);
  await b.click('Objet requis : Souvenir du Greffé'); await b.wait('Récompense de boss'); await checked('Déjà obtenu : Souvenir du Greffé',false);
  let saved=current(await readSave()); assert.deepEqual(saved.run.bosses,{}); assert.deepEqual(saved.run.quests,{});
  await collection(); await b.fill('Rechercher un objet','Dague en acier-monde'); await b.click('Voir l’objet : Dague en acier-monde');
  await b.click('Parcours associé : Kenneth Haight'); await b.wait('Libérer le fort Haight'); await b.click('Objet associé : Dague en acier-monde'); await b.wait('Récompense de quête');
  await collection(); await b.fill('Rechercher un objet','Knight Armor'); await b.click('Voir l’objet : Armure de chevalier'); await b.wait('4 500 runes');
  await b.layout('item-new-armor',390,844); await b.layout('item-new-armor',360,800);
  await collection(); await b.fill('Rechercher un objet','Carian Slicer'); await b.click('Voir l’objet : Trancheuse de Caria'); await b.wait('Église des vœux');
  await b.click('Objet requis : Parchemin de la maison royale'); await b.wait('Comment l’obtenir'); await checked('Déjà obtenu : Parchemin de la maison royale',false);
  await b.layout('item-new-scroll',390,844); await b.layout('item-new-scroll',360,800);
  await collection(); await b.fill('Rechercher un objet','Graine dorée'); await b.wait('0 résultats parmi les objets');
  await b.click('Améliorations du cycle'); await b.wait('6 résultats parmi les emplacements');
  const pickup='Récupéré : Graine dorée · Route de Valorage';
  const otherPickup='Récupéré : Graine dorée · Devant le fort Haight';
  await checked(pickup,false); await b.click(pickup); await checked(pickup,true); await checked(otherPickup,false);
  assert.equal(await b.evaluate(`[...document.querySelectorAll('[role="heading"]')].filter(el=>el.textContent==='Graine dorée · 6').length`),1);
  await b.click('Voir l’emplacement : Graine dorée · Route de Valorage'); await b.wait('Comment l’obtenir');
  await checked(pickup,true);
  assert.equal(await b.evaluate(`!!document.querySelector('[role="checkbox"][aria-label="Déjà obtenu : Graine dorée"]')`),false);
  await b.layout('item-upgrade',390,844); await b.layout('item-upgrade',360,800);
  await collection(); await b.click('Améliorations du cycle'); await b.wait(`${pickups.length} résultats parmi les emplacements`); await checked(pickup,true);
  assert.equal(await b.evaluate(`[...document.querySelectorAll('[role="heading"]')].filter(el=>/^(Graine dorée|Larme de vie|Pierre de mémoire|Larme de cristal pourpre) ·/.test(el.textContent)).length`),4);
  for (const place of pickups) {
    const item=items.find(item=>item.id===place.itemId);
    const acquisition=item.acquisitions.find(acquisition=>acquisition.id===place.acquisitionId);
    assert.deepEqual(await b.evaluate(`(()=>{const row=[...document.querySelectorAll('[role="button"]')].find(el=>el.getAttribute('aria-label')===${JSON.stringify('Voir l’emplacement : '+place.name)});return [...row.children].map(child=>child.textContent)})()`),[acquisition.location,regions.find(region=>region.id===place.regionIds[0]).name]);
  }
  for (const [width,height] of [[390,844],[360,800]]) {
    await b.send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:true});
    await b.evaluate(`[...document.querySelectorAll('[role="heading"]')].find(el=>el.textContent==='Graine dorée · 6').scrollIntoView({block:'start'})`);
    await b.layout('cycle-pickups',width,height);
  }
  await b.click(pickup); await checked(pickup,false); await checked(otherPickup,false);
  await b.click(pickup); await checked(pickup,true);
  await b.click('Afficher les filtres des objets'); await selectFilter('Ramassages du cycle','obtained'); await b.wait('1 résultat parmi les emplacements');
  assert.equal(await b.evaluate(`document.querySelectorAll('select').length`),3);
  await b.click('Réinitialiser les filtres des objets'); await b.click('Masquer les filtres des objets');
  await b.click('Parties'); await b.click(`Nouveau cycle pour ${name}`); await b.click('Confirmer le nouveau cycle'); await b.wait('NG+');
  await b.click('Collection'); await b.click('Objets du personnage'); await b.fill('Rechercher un objet','Lanterne'); await checked('Déjà obtenu : Lanterne',true);
  saved=current(await readSave()); assert.equal(saved.character.collection['item.golden-seed'],undefined); assert.deepEqual(saved.run.pickups,{});
  const firstCycle=saved.character.runs.find(run=>run.cycle===0); assert.equal(firstCycle.pickups['pickup.golden-seed.stormhill'],true); assert.deepEqual(saved.run.bosses,{});
  await b.click('Parties'); await b.fill('Nom du personnage', name+'-B'); await b.click('Créer le personnage'); await b.wait(`Nouveau cycle pour ${name}-B`);
  await b.click('Collection'); await checked('Déjà obtenu : Lanterne',false);
  saved=current(await readSave()); assert.deepEqual(saved.character.collection,{}); assert.deepEqual(saved.run.pickups,{});
  // Rattacher le parcours d’export suivant à la partie contenant les nouvelles coches.
  await b.click('Parties');
  await b.evaluate(`(()=>{const heading=[...document.querySelectorAll('[role="heading"]')].find(el=>el.textContent===${JSON.stringify(name)});const option=[...heading.parentElement.querySelectorAll('[role="radio"]')].find(el=>el.textContent==='NG+');option.click()})()`);
  await b.click('Collection'); await checked('Déjà obtenu : Lanterne',true);
  assert.equal(items.length,collectionScope.itemIds.length);
  assert.equal(b.errors.length,0,JSON.stringify(b.errors));
  console.log('Lot 4 : recherche, filtres corrélés, acquisitions, liens, coches indépendantes, rechargement, NG+, isolation et formats mobiles vérifiés');
} finally { b.close(); }
