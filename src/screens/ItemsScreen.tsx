import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { collectionItems, collectionScope, itemActors, items, pickups } from '../catalog/items';
import { collectionCategoryLabels, emptyCollectionFilter, filterItems, filterPickups, groupPickupsByItem, methodLabels, type CollectionFilter } from '../catalog/items/query';
import { regions } from '../catalog/regions';
import { Button, Card, Choice, Field, Heading, Page, ui } from '../components/ui';
import { Select } from '../components/Select';
import { currentPart, cycleLabel, toggleFlag } from '../domain/save';
import { catalogProgress } from '../domain/catalogProgress';
import { theme } from '../theme';
import { useProgress } from '../state/ProgressProvider';

function CollectionRow({ label, detail, checkboxLabel, openLabel, checked, disabled, last, onToggle, onOpen }: {
  label: string; detail?: string; checkboxLabel: string; openLabel: string; checked: boolean; disabled: boolean; last: boolean; onToggle: () => void; onOpen: () => void;
}) {
  return <View style={[styles.itemRow, !last && styles.itemDivider]}>
    <Pressable accessibilityRole="checkbox" accessibilityLabel={checkboxLabel}
      accessibilityState={{ checked, disabled }} aria-checked={checked} aria-disabled={disabled}
      disabled={disabled} onPress={onToggle}
      style={({ pressed }) => [styles.checkTarget, (pressed || disabled) && ui.dim]}>
      <View style={[ui.checkbox, checked && ui.checked]}><Text style={ui.tick}>{checked ? '✓' : ''}</Text></View>
    </Pressable>
    <Pressable accessibilityRole="button" accessibilityLabel={openLabel} accessibilityHint={detail}
      onPress={onOpen} style={({ pressed }) => [styles.nameTarget, pressed && ui.dim]}>
      <Text style={styles.itemName}>{label}</Text>
      {detail && <Text style={ui.caption}>{detail}</Text>}
    </Pressable>
  </View>;
}
const styles = StyleSheet.create({
  itemList: { backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 10 },
  itemRow: { flexDirection: 'row', alignItems: 'stretch', minHeight: 44 },
  itemDivider: { borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  checkTarget: { width: 44, alignItems: 'center', justifyContent: 'center' },
  nameTarget: { flex: 1, minWidth: 0, minHeight: 44, justifyContent: 'center', paddingVertical: 10, paddingEnd: 12, gap: 2 },
  itemName: { color: theme.colors.goldSoft, fontSize: 15, lineHeight: 22, textDecorationLine: 'underline' },
});

export function ItemsScreen({ onOpen, onParties }: { onOpen: (id: string) => void; onParties: () => void }) {
  const { data, service } = useProgress();
  const { character, run } = currentPart(data);
  const [view, setView] = useState<'collection' | 'pickups'>('collection');
  const [filter, setFilter] = useState<CollectionFilter>(emptyCollectionFilter);
  const [showFilters, setShowFilters] = useState(false);
  const [showCoverage, setShowCoverage] = useState(false);
  function updateFilter<K extends keyof CollectionFilter>(key: K, value: CollectionFilter[K]) {
    setFilter(previous => ({ ...previous, [key]: value }));
  }
  const filteredItems = useMemo(() => filterItems(collectionItems, itemActors, filter, character?.collection), [filter, character]);
  const itemGroups = useMemo(() => Object.entries(collectionCategoryLabels)
    .map(([id, label]) => ({ id, label, items: filteredItems.filter(item => item.category === id) }))
    .filter(group => group.items.length > 0), [filteredItems]);
  const filteredPickups = useMemo(() => filterPickups(pickups, items, itemActors, filter, run?.pickups), [filter, run]);
  const pickupGroups = useMemo(() => groupPickupsByItem(filteredPickups, items), [filteredPickups]);
  const isCollection = view === 'collection';
  const count = isCollection ? filteredItems.length : filteredPickups.length;
  const collectionProgress = catalogProgress(collectionItems, character?.collection);
  const pickupProgress = catalogProgress(pickups, run?.pickups);
  return <Page title="Ma collection" subtitle="Retrouvez les objets et les moyens de les obtenir.">
    <Card>
      {character && run ? <><View style={ui.row}><View style={ui.grow}><Text style={ui.checkLabel}>{character.name}</Text><Text style={ui.label}>{cycleLabel(run.cycle)}</Text></View>
        <Button title="Changer de partie" variant="quiet" onPress={onParties} /></View>
        <Text style={ui.caption}>{collectionProgress.done}/{collectionProgress.total} objets référencés déjà obtenus · {pickupProgress.done}/{pickupProgress.total} améliorations référencées récupérées dans ce cycle.</Text></> :
        <><Heading>Choisissez votre voyage</Heading><Text style={ui.body}>Le catalogue est consultable. Choisissez une partie pour enregistrer vos coches.</Text>
          <Button title="Choisir une partie pour la collection" onPress={onParties} /></>}
    </Card>
    <View style={ui.wrap}>
      <Choice label="Objets du personnage" selected={isCollection} onPress={() => { setView('collection'); setFilter(previous => ({ ...previous, category: 'all', status: 'all' })); }} />
      <Choice label="Améliorations du cycle" selected={!isCollection} onPress={() => { setView('pickups'); setFilter(previous => ({ ...previous, category: 'all', status: 'all' })); }} />
    </View>
    <Text style={ui.body}>{isCollection ? '« Déjà obtenu » reste coché en NG+. Cela ne représente pas votre inventaire actuel ni une quantité.' : 'Les améliorations sont regroupées par objet. Chaque emplacement possède sa coche, propre au cycle sélectionné.'}</Text>
    <Text style={ui.caption}>Jeu de base · catalogue partiel · {collectionItems.length} objets et {pickups.length} emplacements référencés</Text>
    <Button title={showCoverage ? 'Masquer la couverture des objets' : 'Voir la couverture des objets'} variant="quiet" onPress={() => setShowCoverage(value => !value)} />
    {showCoverage && <Card><Heading>{collectionScope.label}</Heading>
      <Text style={ui.body}>{collectionScope.description}</Text>
      <Text style={ui.caption}>{Object.keys(collectionCategoryLabels).length} catégories d’objets. Les améliorations sont suivies séparément par cycle. Les consommables ordinaires, munitions et ressources ordinaires d’amélioration sont exclus. Les sources affichées ne sont pas encore exhaustives.</Text>
      <Text style={ui.caption}>Vérification documentaire ; les références sont accessibles dans chaque fiche.</Text>
    </Card>}
    <Field label="Rechercher un objet" value={filter.search} onChangeText={value => updateFilter('search', value)} placeholder="Nom français, anglais, marchand ou lieu…" />
    <Button title={showFilters ? 'Masquer les filtres des objets' : 'Afficher les filtres des objets'} variant="quiet" onPress={() => setShowFilters(value => !value)} />
    {showFilters && <Card>
      {isCollection && <Select label="Catégorie" choices={{ all: 'Toutes les catégories', ...collectionCategoryLabels }} selected={filter.category} onChange={value => updateFilter('category', value as CollectionFilter['category'])} />}
      <Select label="Région d’obtention" choices={{ all: 'Toutes les régions', ...Object.fromEntries(regions.map(region => [region.id, region.name])) }} selected={filter.region} onChange={value => updateFilter('region', value)} />
      <Select label="Méthode d’obtention" choices={{ all: 'Toutes les méthodes', ...methodLabels }} selected={filter.method} onChange={value => updateFilter('method', value as CollectionFilter['method'])} />
      <Select label={isCollection ? 'Statut de collection' : 'Ramassages du cycle'} choices={{ all: 'Tous les statuts', obtained: isCollection ? 'Déjà obtenus' : 'Déjà récupérés', missing: isCollection ? 'À obtenir' : 'À récupérer' }} selected={filter.status} onChange={value => updateFilter('status', value as CollectionFilter['status'])} />
      <Button title="Réinitialiser les filtres des objets" variant="quiet" onPress={() => setFilter({ ...emptyCollectionFilter })} />
    </Card>}
    <Text style={ui.caption}>{count} résultat{count !== 1 ? 's' : ''} parmi les {isCollection ? 'objets' : 'emplacements'} référencés</Text>
    {isCollection ? itemGroups.map(group => <View key={group.id} style={{ gap: 8 }}>
      <Heading>{group.label} · {group.items.length}</Heading>
      <View style={styles.itemList}>{group.items.map((item, index) => <CollectionRow key={item.id}
        label={item.name} checkboxLabel={`Déjà obtenu : ${item.name}`} openLabel={`Voir l’objet : ${item.name}`} checked={!!character?.collection[item.id]} disabled={!character} last={index === group.items.length - 1}
        onToggle={() => void service.mutate(save => toggleFlag(save, 'collection', item.id))}
        onOpen={() => onOpen(item.id)} />)}</View>
    </View>) : pickupGroups.map(group => <View key={group.item.id} style={{ gap: 8 }}>
      <Heading>{group.item.name} · {group.pickups.length}</Heading>
      <View style={styles.itemList}>{group.pickups.map((pickup, index) => <CollectionRow key={pickup.id}
        label={group.item.acquisitions.find(acquisition => acquisition.id === pickup.acquisitionId)!.location}
        detail={regions.find(region => region.id === pickup.regionIds[0])?.name}
        checkboxLabel={`Récupéré : ${pickup.name}`} openLabel={`Voir l’emplacement : ${pickup.name}`}
        checked={!!run?.pickups[pickup.id]} disabled={!run} last={index === group.pickups.length - 1}
        onToggle={() => void service.mutate(save => toggleFlag(save, 'pickups', pickup.id))}
        onOpen={() => onOpen(group.item.id)} />)}</View>
    </View>)}

    {!count && <Text style={ui.body}>Aucun résultat ne correspond à ces filtres dans le catalogue publié.</Text>}
  </Page>;
}
