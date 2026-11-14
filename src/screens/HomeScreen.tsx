import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';
import { APP_NAME } from '../config/identity';

const { colors, fonts } = theme;

export function HomeScreen() {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.scrollContent}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View style={styles.page}>
        <View style={styles.header}>
          <View accessible={false} style={styles.brandMark}>
            <Text style={styles.brandStar}>✧</Text>
          </View>
          <View style={styles.brandCopy}>
            <Text style={styles.brandName}>CARNET DU SANS ÉCLAT</Text>
            <Text style={styles.brandCaption}>Un voyage, à votre rythme.</Text>
          </View>
        </View>

        <View style={styles.hero}>
          <View accessible={false} style={styles.emblem}>
            <View style={styles.emblemInner}>
              <Text style={styles.emblemStar}>✧</Text>
            </View>
          </View>

          <Text style={styles.eyebrow}>VOTRE CARNET DE VOYAGE</Text>
          <Text accessibilityRole="header" style={styles.title}>
            {APP_NAME}
          </Text>
          <View accessible={false} style={styles.ornament}>
            <View style={styles.ornamentLine} />
            <Text style={styles.ornamentDiamond}>◆</Text>
            <View style={styles.ornamentLine} />
          </View>
          <Text style={styles.introduction}>
            Une rencontre, une promesse, un chemin à retrouver.
          </Text>
          <Text style={styles.description}>
            Gardez le fil de vos quêtes dans l’Entre-terre et reprenez votre aventure là où vous
            l’avez laissée.
          </Text>
        </View>

        <View style={styles.notice}>
          <Text style={styles.noticeEyebrow}>LES PREMIÈRES PAGES</Text>
          <Text accessibilityRole="header" style={styles.noticeTitle}>
            Le carnet prend forme.
          </Text>
          <Text style={styles.noticeDescription}>
            Retrouvez vos personnages et leurs voyages. Votre progression reste sur cet appareil,
            avec une sauvegarde exportable à tout moment.
          </Text>
          <View style={styles.noticeFooter}>
            <View accessible={false} style={styles.statusDot} />
            <Text style={styles.statusText}>Votre aventure, un voyage à la fois</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Chaque rencontre mérite une trace.</Text>
          <Text style={styles.footerCaption}>Application non officielle · Elden Ring</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 48 : 24,
    paddingBottom: 32,
  },
  page: {
    width: '100%',
    maxWidth: 480,
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingBottom: 22,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  brandMark: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandStar: { color: colors.gold, fontSize: 28, lineHeight: 32 },
  brandCopy: { flex: 1, gap: 5 },
  brandName: { color: colors.goldSoft, fontSize: 10, fontWeight: '600', letterSpacing: 1.5 },
  brandCaption: { color: colors.muted, fontSize: 12, lineHeight: 18 },
  hero: { alignItems: 'center', paddingTop: 38, paddingBottom: 32 },
  emblem: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emblemInner: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 1,
    borderColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emblemStar: { color: colors.gold, fontSize: 55, lineHeight: 64 },
  eyebrow: { color: colors.gold, fontSize: 10, letterSpacing: 2, textAlign: 'center' },
  title: {
    fontFamily: fonts.heading,
    color: colors.text,
    fontSize: 42,
    lineHeight: 49,
    textAlign: 'center',
    marginTop: 14,
  },
  ornament: { flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 20 },
  ornamentLine: { width: 36, height: 1, backgroundColor: colors.border },
  ornamentDiamond: { color: colors.gold, fontSize: 7 },
  introduction: {
    color: colors.goldSoft,
    fontFamily: fonts.heading,
    fontSize: 20,
    lineHeight: 29,
    textAlign: 'center',
    maxWidth: 320,
  },
  description: { color: colors.muted, fontSize: 14, lineHeight: 23, textAlign: 'center', marginTop: 14 },
  notice: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 22,
  },
  noticeEyebrow: { color: colors.gold, fontSize: 10, letterSpacing: 1.5, lineHeight: 16 },
  noticeTitle: { color: colors.text, fontFamily: fonts.heading, fontSize: 24, lineHeight: 31, marginTop: 10 },
  noticeDescription: { color: colors.muted, fontSize: 14, lineHeight: 23, marginTop: 10 },
  noticeFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 16,
    marginTop: 18,
  },
  statusDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: colors.gold },
  statusText: { flex: 1, color: colors.goldSoft, fontSize: 11, lineHeight: 17 },
  footer: { alignItems: 'center', gap: 8, marginTop: 'auto', paddingTop: 30 },
  footerText: { color: colors.muted, fontFamily: fonts.heading, fontSize: 14, textAlign: 'center' },
  footerCaption: { color: colors.muted, fontSize: 10, lineHeight: 16, textAlign: 'center' },
});
