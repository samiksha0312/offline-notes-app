import React, { useEffect, useState } from 'react';
import { View, TextInput, Image, StyleSheet, Alert, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../hooks/useAuth';
import { getNoteById, saveNote, deleteNote } from '../storage/notes';
import { kawaii, shadows } from '../theme/colors';

export default function EditNoteScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params || {};
  const { currentUser } = useAuth();
  const username = currentUser?.username;

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [imageUri, setImageUri] = useState('');

  useEffect(() => {
    (async () => {
      if (id && username) {
        const note = await getNoteById(username, String(id));
        if (note) {
          setTitle(note.title);
          setBody(note.body);
          setImageUri(note.imageUri || '');
        }
      }
    })();
  }, [id, username]);

  const pickFromLibrary = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.9,
    });
    if (!res.canceled) setImageUri(res.assets[0].uri);
  };

  const captureWithCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission', 'Camera access is needed 📷');
      return;
    }
    const res = await ImagePicker.launchCameraAsync({ quality: 0.9 });
    if (!res.canceled) setImageUri(res.assets[0].uri);
  };

  const onSave = async () => {
    if (!title.trim()) {
      Alert.alert('Validation', 'Title is required 💡');
      return;
    }
    const ok = await saveNote(username, {
      id: id ? String(id) : undefined,
      title: title.trim(),
      body,
      imageUri: imageUri || undefined,
    });
    if (ok) navigation.replace('NotesList');
    else Alert.alert('Error', 'Could not save note 💔');
  };

  const onDelete = async () => {
    if (!id) return;
    const ok = await deleteNote(username, String(id));
    if (ok) navigation.replace('NotesList');
    else Alert.alert('Error', 'Could not delete note 💔');
  };

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Title ✨"
          style={styles.inputTitle}
        />
        <TextInput
          value={body}
          onChangeText={setBody}
          placeholder="Write your note… 🫶"
          multiline
          style={styles.inputBody}
        />

        {imageUri ? <Image source={{ uri: imageUri }} style={styles.image} /> : null}

        <View style={styles.row}>
          <TouchableOpacity style={styles.btn} onPress={pickFromLibrary}><Text style={styles.btnText}>Gallery 🎀</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.btn, { backgroundColor: kawaii.purple }]} onPress={captureWithCamera}><Text style={styles.btnText}>Camera 📷</Text></TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={[styles.btn, { backgroundColor: kawaii.pink }]} onPress={onSave}><Text style={styles.btnText}>Save 💖</Text></TouchableOpacity>
          {id ? <TouchableOpacity style={[styles.btn, { backgroundColor: kawaii.red }]} onPress={onDelete}><Text style={styles.btnText}>Delete 🗑️</Text></TouchableOpacity> : null}
        </View>

        <TouchableOpacity style={[styles.btn, { backgroundColor: '#fff', borderWidth: 1, borderColor: kawaii.border }]} onPress={() => navigation.goBack()}>
          <Text style={[styles.btnText, { color: kawaii.text }]}>Cancel ↩️</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { backgroundColor: kawaii.bg },
  container: { padding: 16 },
  card: { backgroundColor: kawaii.card, borderRadius: 20, padding: 16, ...shadows.soft },
  inputTitle: { backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: kawaii.border, padding: 12, fontSize: 16, marginBottom: 10 },
  inputBody: { backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: kawaii.border, padding: 12, minHeight: 160, textAlignVertical: 'top' },
  image: { width: '100%', height: 240, borderRadius: 16, marginVertical: 10, backgroundColor: kawaii.pinkLight },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginTop: 10 },
  btn: { backgroundColor: kawaii.pinkLight, borderRadius: 14, paddingVertical: 10, paddingHorizontal: 12, alignItems: 'center', flex: 1 },
  btnText: { color: '#fff', fontWeight: '700' },
});