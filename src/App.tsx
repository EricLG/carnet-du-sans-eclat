import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DarkTheme, type NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, StyleSheet, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HomeScreen } from './screens/HomeScreen';
import { PartiesScreen } from './screens/PartiesScreen';
import { BackupScreen } from './screens/BackupScreen';
import { QuestsScreen } from './screens/QuestsScreen';
import { QuestScreen } from './screens/QuestScreen';
import { ProgressProvider } from './state/ProgressProvider';
import { theme } from './theme';
import { APP_NAME } from './config/identity';

type NotebookParams = { Quests: undefined; Parties: undefined };
export type RootStackParams = { Home: undefined; Notebook: NavigatorScreenParams<NotebookParams> | undefined; Backup: undefined; Quest: { id: string } };
const Stack = createNativeStackNavigator<RootStackParams>();
const Tabs = createBottomTabNavigator<NotebookParams>();
const navigationTheme = { ...DarkTheme, colors: { ...DarkTheme.colors,
  background: theme.colors.background, card: theme.colors.surface, text: theme.colors.text,
  primary: theme.colors.gold, border: theme.colors.border } };

// La hauteur du texte web reste naturelle, y compris quand le navigateur agrandit la police.
function WebTabLabel({ color, children, position }: {
  color: string; children: string; position: 'below-icon' | 'beside-icon';
}) {
  return <Text style={[styles.webTabLabel, { color }, position === 'beside-icon' && styles.webTabLabelBeside]}>
    {children}
  </Text>;
}

const styles = StyleSheet.create({
  webTabBar: { height: 'auto', flexShrink: 0 },
  webTabLabel: { fontSize: 12, fontWeight: '500', textAlign: 'center', paddingVertical: 2, flexShrink: 0 },
  webTabLabelBeside: { marginStart: 8 },
});

export default function App() {
  return (
    <SafeAreaProvider><ProgressProvider>
      <StatusBar style="light" />
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator screenOptions={{ headerTintColor: theme.colors.goldSoft, headerBackButtonDisplayMode: 'minimal' }}>
          <Stack.Screen name="Home" options={{ title: APP_NAME, headerShown: false }}>
            {({ navigation }) => <HomeScreen onOpen={() => navigation.navigate('Notebook')} />}
          </Stack.Screen>
          <Stack.Screen name="Notebook" options={{ title: 'Mon carnet' }}>
            {({ navigation }) => <Tabs.Navigator screenOptions={{ headerShown: false,
              tabBarActiveTintColor: theme.colors.goldSoft, tabBarInactiveTintColor: theme.colors.muted,
              tabBarStyle: [{ backgroundColor: theme.colors.surface, borderTopColor: theme.colors.border, minHeight: 64 },
                Platform.OS === 'web' && styles.webTabBar],
              tabBarLabel: Platform.OS === 'web' ? WebTabLabel : undefined,
              tabBarLabelStyle: { fontSize: 12, lineHeight: 18 }, tabBarHideOnKeyboard: true }}>
              <Tabs.Screen name="Quests" options={{ title: 'Quêtes', tabBarAccessibilityLabel: 'Quêtes', tabBarIcon: ({ color }) => <Text accessible={false} style={{ color, fontSize: 20 }}>✧</Text> }}>
                {({ navigation: tabs }) => <QuestsScreen onOpen={id => navigation.navigate('Quest', { id })} onParties={() => tabs.navigate('Parties')} />}
              </Tabs.Screen>
              <Tabs.Screen name="Parties" options={{ title: 'Parties', tabBarAccessibilityLabel: 'Parties', tabBarIcon: ({ color }) => <Text accessible={false} style={{ color, fontSize: 20 }}>☷</Text> }}>
                {() => <PartiesScreen onBackup={() => navigation.navigate('Backup')} />}
              </Tabs.Screen>
            </Tabs.Navigator>}
          </Stack.Screen>
          <Stack.Screen name="Backup" component={BackupScreen} options={{ title: 'Sauvegardes' }} />
          <Stack.Screen name="Quest" options={{ title: 'Quête' }}>
            {({ route, navigation }) => <QuestScreen id={route.params.id} onParties={() => navigation.navigate('Notebook', { screen: 'Parties' })} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </ProgressProvider></SafeAreaProvider>
  );
}
