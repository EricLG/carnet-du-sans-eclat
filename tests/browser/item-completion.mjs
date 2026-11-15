import assert from 'node:assert/strict';
import { items } from '../../src/catalog/items/index.ts';
import { bosses } from '../../src/catalog/world/index.ts';
import { browser } from './cdp.mjs';

const b = await browser();
const name = `Equipement-complet-${Date.now()}`;
const item = english => items.find(item => item.aliases.includes(english));
async function collection() {
  await b.send('Page.navigate', { url: 'http://127.0.0.1:8081' });
  await b.wait('Ouvrir mon carnet'); await b.click('Ouvrir mon carnet'); await b.wait('Mes quêtes');
  await b.click('Collection'); await b.wait('Ma collection');
}
async function open(english) {
  const entry = item(english); assert.ok(entry, english);
  await collection(); await b.fill('Rechercher un objet', english);
  await b.click(`Voir l’objet : ${entry.name}`); await b.wait('Comment l’obtenir');
  return entry;
}
async function checked(label, expected) {
  await b.evaluate(`new Promise((resolve,reject)=>{const until=Date.now()+10000;const timer=setInterval(()=>{const el=[...document.querySelectorAll('[role="checkbox"]')].find(el=>el.getAttribute('aria-label')===${JSON.stringify(label)}&&!el.closest('[aria-hidden="true"]'));if(el?.getAttribute('aria-checked')===${JSON.stringify(String(expected))}){clearInterval(timer);resolve(true)}else if(Date.now()>until){clearInterval(timer);reject(new Error('Missing checkbox state'))}},60)})`);
}
try {
  await collection(); await b.click('Parties'); await b.fill('Nom du personnage', name);
  await b.click('Créer le personnage'); await b.wait(`Nouveau cycle pour ${name}`);
  const moonveil = await open('Moonveil');
  await b.click(`Déjà obtenu : ${moonveil.name}`); await checked(`Déjà obtenu : ${moonveil.name}`, true);
  for (const [width, height] of [[390, 844], [360, 800]]) await b.layout('complete-weapon', width, height);
  const boss = bosses.find(boss => boss.id === 'boss.magma-wyrm.gael');
  await b.click(`Rencontre : ${boss.name}`); await b.wait('Accès'); await checked(`Vaincu : ${boss.name}`, false);
  const original = await open("Malenia's Armor"); await b.click(`Déjà obtenu : ${original.name}`); await checked(`Déjà obtenu : ${original.name}`, true);
  const altered = await open("Malenia's Armor (Altered)"); await checked(`Déjà obtenu : ${altered.name}`, false);
  await b.click(`Objet requis : ${original.name}`); await checked(`Déjà obtenu : ${original.name}`, true);
  for (const [width, height] of [[390, 844], [360, 800]]) await b.layout('complete-armor', width, height);
  const shield = await open('Fingerprint Stone Shield');
  await checked(`Déjà obtenu : ${shield.name}`, false); await b.wait('Prison souterraine');
  for (const [width, height] of [[390, 844], [360, 800]]) await b.layout('complete-shield', width, height);
  const sorcery = await open('Great Glintstone Shard'); await b.wait('2 000 runes');
  await checked(`Déjà obtenu : ${sorcery.name}`, false);
  for (const [width, height] of [[390, 844], [360, 800]]) await b.layout('complete-sorcery', width, height);
  const scroll = item('Academy Scroll'); await b.click(`Objet requis : ${scroll.name}`); await b.wait('Cimetière');
  await checked(`Déjà obtenu : ${scroll.name}`, false);
  const moon = await open("Rennala's Full Moon"); await b.wait('Échange de souvenir');
  const souvenir = items.find(entry => entry.id === moon.acquisitions[0].requiredItemId);
  await b.click(`Objet requis : ${souvenir.name}`); await b.wait('Récompense de boss');
  await checked(`Déjà obtenu : ${souvenir.name}`, false);
  await collection(); await b.click('Parties'); await b.click(`Nouveau cycle pour ${name}`); await b.click('Confirmer le nouveau cycle'); await b.wait('NG+');
  await open('Moonveil'); await checked(`Déjà obtenu : ${moonveil.name}`, true);
  await b.click(`Rencontre : ${boss.name}`); await checked(`Vaincu : ${boss.name}`, false);
  assert.equal(b.errors.length, 0, JSON.stringify(b.errors));
  console.log('Complétion : quatre catégories, références, variantes, parchemins, souvenirs, NG+ et formats mobiles vérifiés');
} finally { b.close(); }
