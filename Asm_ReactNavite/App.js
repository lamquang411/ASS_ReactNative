import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './Components/account/Login';
import Register from './Components/account/Register';
import Main from './Components/Main';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName='Login'
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={Main}/>
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
