// App.js
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/hooks/useAuth';
import { NotesProvider } from './src/hooks/useNotes';

export default function App() {
  return (
    <AuthProvider>
      <NotesProvider>
        <AppNavigator />
      </NotesProvider>
    </AuthProvider>
  );
}