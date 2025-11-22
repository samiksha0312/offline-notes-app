import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { signup } from '../storage/auth';
import { useNavigation } from '@react-navigation/native';
import { kawaii, shadows } from '../theme/colors';

export default function SignupScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const onSignup = async () => {
    const ok = await signup(username.trim(), password);
    if (ok) {
      alert('Account created 🥳');
      navigation.replace('Login');
    } else {
      alert('Username already exists 💌');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Create account 🎀</Text>
        <TextInput value={username} onChangeText={setUsername} placeholder="Username" style={styles.input} />
        <TextInput value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry style={styles.input} />
        <TouchableOpacity style={styles.button} onPress={onSignup}>
          <Text style={styles.buttonText}>Sign up 🌟</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Already have an account? Login 🌸</Text>
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