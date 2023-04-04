import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './srceens/WelcomeScreen';
import ChatLogScreen from './srceens/ChatLogScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  const FavouriteTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#ddebf3',
    },
  };

  const [loaded] = useFonts({
    // "Prompt-Bold": require("./assets/fonts/Prompt-Bold.ttf"),
    // "Prompt-Medium": require("./assets/fonts/Prompt-Medium.ttf"),
    // "Prompt-Regular": require("./assets/fonts/Prompt-Regular.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    // "SpaceGrotesk-Regular": require("./assets/fonts/SpaceGrotesk-Regular.ttf"),
    // "SpaceGrotesk-Medium": require("./assets/fonts/SpaceGrotesk-Medium.ttf"),

  });

  if (!loaded) return null;
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <NavigationContainer theme={FavouriteTheme}  >
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='HomeScreen'  >
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ title: "Welcome" }} />
          <Stack.Screen name="ChatLogScreen" component={ChatLogScreen} options={{ title: "ChatLog" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
