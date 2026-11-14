import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DarkTheme, type NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HomeScreen } from './screens/HomeScreen';
import { theme } from './theme';
import { APP_NAME } from './config/identity';

type NotebookParams = { Quests: undefined; Parties: undefined };
export type RootStackParams = { Home: undefined; Notebook: NavigatorScreenParams<NotebookParams> | undefined; Backup: undefined; Quest: { id: string } };
const Stack = createNativeStackNavigator<RootStackParams>();
const Tabs = createBottomTabNavigator<NotebookParams>();
const navigationTheme = { ...DarkTheme, colors: { ...DarkTheme.colors,
  background: theme.colors.background, card: theme.colors.surface, text: theme.colors.text,
  primary: theme.colors.gold, border: theme.colors.border } };

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator screenOptions={{ headerTintColor: theme.colors.goldSoft, headerBackButtonDisplayMode: 'minimal' }}>
          <Stack.Screen name="Home" options={{ title: APP_NAME, headerShown: false }}>
            {() => <HomeScreen />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
