import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import NotesListScreen from '../screens/NotesListScreen';
import EditNoteScreen from '../screens/EditNoteScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#FFF7F9' },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: '🌸 Login' }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ title: '🎀 Sign Up' }} />
        <Stack.Screen name="NotesList" component={NotesListScreen} options={{ title: '🧁 Your Notes' }} />
        <Stack.Screen name="EditNote" component={EditNoteScreen} options={{ title: '📝 Edit Note' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}