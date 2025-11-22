import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { login } from '../storage/auth';
import { useNavigation } from '@react-navigation/native';
import { kawaii, shadows } from '../theme/colors';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const onLogin = async () => {
    const user = await login(username.trim(), password);
    if (user) navigation.replace('NotesList');
    else alert('Invalid username or password 💔');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome back 🌸</Text>
        <TextInput value={username} onChangeText={setUsername} placeholder="Username" style={styles.input} />
        <TextInput value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry style={styles.input} />
        <TouchableOpacity style={styles.button} onPress={onLogin}>
          <Text style={styles.buttonText}>Login ✨</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.link}>New here? Sign up 🎀</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: kawaii.bg, justifyContent: 'center', padding: 20 },
  card: { backgroundColor: kawaii.card, borderRadius: 20, padding: 18, ...shadows.soft },
  title: { fontSize: 22, fontWeight: '700', color: kawaii.text, marginBottom: 12, textAlign: 'center' },
  input: { backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: kawaii.border, padding: 12, marginBottom: 10 },
  button: { backgroundColor: kawaii.pink, borderRadius: 14, padding: 12, alignItems: 'center', marginVertical: 10 },
  buttonText: { color: '#fff', fontWeight: '700' },
  link: { color: kawaii.pink, textAlign: 'center', marginTop: 10 },
});