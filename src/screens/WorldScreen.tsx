import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { bosses, graces, worldScope } from '../catalog/world';
import { emptyWorldFilter, filterWorld, worldProgress, type WorldFilter } from '../catalog/world/query';
import { regions } from '../catalog/regions';
import { Select } from '../components/Select';
import { Button, Card, Choice, Field, Heading, Page, ui } from '../components/ui';
import { currentPart, cycleLabel, toggleFlag } from '../domain/save';
import type { WorldEntry, WorldKind } from '../domain/world';
import { useProgress } from '../state/ProgressProvider';
import { theme } from '../theme';

export function WorldScreen({ onOpen, onParties }: { onOpen: (kind: WorldKind, id: string) => void; onParties: () => void }) {
  const { data, loading, pending, error, service } = useProgress();
  const { character, run } = currentPart(data);
  const [kind, setKind] = useState<WorldKind>('boss');
  const [filter, setFilter] = useState<WorldFilter>(emptyWorldFilter);
  const [showFilters, setShowFilters] = useState(false);
  const [showCoverage, setShowCoverage] = useState(false);
  const isBoss = kind === 'boss';
  const entries: WorldEntry[] = isBoss ? bosses : graces;
  const flags = isBoss ? run?.bosses : run?.graces;
  const filtered = filterWorld(entries, filter, flags);
  const bossProgress = worldProgress(bosses, run?.bosses);
  const graceProgress = worldProgress(graces, run?.graces);
  const groups = regions.map(region => ({ ...region, entries: filtered.filter(entry => entry.regionIds.includes(region.id)) })).filter(group => group.entries.length);
  return <Page title="Boss et sites de grâce" subtitle="Un suivi indépendant pour chaque cycle.">
    <Card>{character && run ? <>
      <View style={ui.row}><View style={ui.grow}><Text style={ui.checkLabel}>{character.name}</Text><Text style={ui.label}>{cycleLabel(run.cycle)}</Text></View>
        <Button title="Changer de partie" variant="quiet" onPress={onParties} /></View>
      <Text style={ui.caption}>{bossProgress.done}/{bossProgress.total} boss référencés vaincus · {graceProgress.done}/{graceProgress.total} grâces référencées activées</Text>
    </> : <><Text style={ui.body}>Consultez les fiches librement. Choisissez un personnage et un cycle pour enregistrer vos coches.</Text>
      <Button title="Choisir une partie pour l’exploration" onPress={onParties} /></>}</Card>
    <View style={ui.wrap}>
      <Choice label="Boss" selected={isBoss} onPress={() => { setKind('boss'); setFilter(emptyWorldFilter); }} />
      <Choice label="Sites de grâce" selected={!isBoss} onPress={() => { setKind('grace'); setFilter(emptyWorldFilter); }} />
    </View>
    <Text style={ui.caption}>{isBoss ? 'Une coche par rencontre, même si plusieurs boss portent le même nom.' : 'Cochez les grâces que vous avez activées dans le jeu.'} Les coches ne modifient ni les objets ni les quêtes.</Text>
    <Button title={showCoverage ? 'Masquer la couverture de l’exploration' : 'Voir la couverture de l’exploration'} variant="quiet" onPress={() => setShowCoverage(value => !value)} />
    {showCoverage && <Card><Heading>Catalogue d’exploration partiel</Heading><Text style={ui.body}>{worldScope.description}</Text>
      <Text style={ui.caption}>{bosses.length} rencontres et {graces.length} sites de grâce référencés. Un résultat absent ne signifie pas que le lieu ou le boss n’existe pas dans le jeu.</Text></Card>}
    <Field label="Rechercher dans l’exploration" value={filter.search} placeholder="Nom français, anglais ou lieu…" onChangeText={search => setFilter(previous => ({ ...previous, search }))} />
    <Button title={showFilters ? 'Masquer les filtres d’exploration' : 'Afficher les filtres d’exploration'} variant="quiet" onPress={() => setShowFilters(value => !value)} />
    {showFilters && <Card>
      <Select label="Région d’exploration" selected={filter.region} onChange={region => setFilter(previous => ({ ...previous, region }))}
        choices={{ all: 'Toutes les régions', ...Object.fromEntries(regions.filter(region => entries.some(entry => entry.regionIds.includes(region.id))).map(region => [region.id, region.name])) }} />
      <Select label="Progression d’exploration" selected={filter.status} onChange={status => setFilter(previous => ({ ...previous, status: status as WorldFilter['status'] }))}
        choices={{ all: 'Tous', done: isBoss ? 'Vaincus' : 'Activées', missing: isBoss ? 'À vaincre' : 'À activer' }} />
      <Button title="Réinitialiser les filtres d’exploration" variant="quiet" onPress={() => setFilter(emptyWorldFilter)} />
    </Card>}
    <Text style={ui.caption}>{filtered.length} résultat{filtered.length !== 1 ? 's' : ''} parmi les {isBoss ? 'boss' : 'sites de grâce'} référencés</Text>
    {!filtered.length && <Text style={ui.body}>Aucune fiche de cette sélection ne correspond à vos filtres.</Text>}
    {groups.map(group => <View key={group.id} style={{ gap: 12 }}><Heading>{group.name} · {group.entries.length}</Heading>
      <View style={styles.list}>{group.entries.map((entry, index) => <View key={entry.id} style={[styles.row, index > 0 && styles.divider]}>
        {run && <Pressable accessibilityRole="checkbox" accessibilityLabel={`${isBoss ? 'Vaincu' : 'Activée'} : ${entry.name}`}
          accessibilityState={{ checked: !!flags?.[entry.id], disabled: loading || pending > 0 || !!error }} aria-checked={!!flags?.[entry.id]}
          disabled={loading || pending > 0 || !!error} onPress={() => void service.mutate(save => toggleFlag(save, isBoss ? 'bosses' : 'graces', entry.id))}
          style={({ pressed }) => [styles.check, pressed && ui.dim]}>
          <View style={[ui.checkbox, flags?.[entry.id] && ui.checked]}><Text style={ui.tick}>{flags?.[entry.id] ? '✓' : ''}</Text></View>
        </Pressable>}
        <Pressable accessibilityRole="button" accessibilityLabel={`Voir ${isBoss ? 'le boss' : 'la grâce'} : ${entry.name}`}
          onPress={() => onOpen(kind, entry.id)} style={({ pressed }) => [styles.name, pressed && ui.dim]}>
          <Text style={styles.title}>{entry.name}</Text><Text style={ui.caption}>{entry.location}</Text>
        </Pressable>
      </View>)}</View>
    </View>)}
  </Page>;
}
const styles = StyleSheet.create({
  list: { borderWidth: 1, borderColor: theme.colors.border, backgroundColor: theme.colors.surface, borderRadius: 10 },
  row: { flexDirection: 'row', alignItems: 'stretch', minHeight: 48 },
  divider: { borderTopWidth: 1, borderTopColor: theme.colors.border },
  check: { width: 44, justifyContent: 'center', alignItems: 'center' },
  name: { flex: 1, minWidth: 0, padding: 12, gap: 4, justifyContent: 'center' },
  title: { fontSize: 15, lineHeight: 22, color: theme.colors.goldSoft, textDecorationLine: 'underline' },
});
