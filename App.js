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
    "Sen-Bold": require("./assets/fonts/Sen-Bold.ttf"),
    "Sen-ExtraBold": require("./assets/fonts/Sen-ExtraBold.ttf"),
    "Sen-Regular": require("./assets/fonts/Sen-Regular.ttf"),
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
