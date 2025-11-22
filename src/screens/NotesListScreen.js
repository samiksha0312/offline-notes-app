import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../hooks/useAuth';
import { useNotes } from '../hooks/useNotes';
import { kawaii } from '../theme/colors';
import NoteCard from '../components/NoteCard';
import SearchBar from '../components/SearchBar';

export default function NotesListScreen() {
  const { currentUser, logout } = useAuth();
  const username = currentUser?.username;
  const { notes, refreshNotes } = useNotes();
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('updatedDesc');

  useEffect(() => {
    if (username) refreshNotes(username);
  }, [username]);

  const filteredSorted = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = notes.filter(n =>
      n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q)
    );
    if (sortBy === 'updatedDesc') return [...filtered].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    if (sortBy === 'updatedAsc') return [...filtered].sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
    if (sortBy === 'titleAsc') return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    if (sortBy === 'titleDesc') return [...filtered].sort((a, b) => b.title.localeCompare(a.title));
    return filtered;
  }, [notes, query, sortBy]);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.greet}>Hi, {username}! 🧁</Text>
        <TouchableOpacity onPress={() => { logout(); navigation.replace('Login'); }}>
          <Text style={styles.logout}>Logout 🚪</Text>
        </TouchableOpacity>
      </View>

      <SearchBar value={query} onChangeText={setQuery} sortBy={sortBy} onChangeSort={setSortBy} />

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('EditNote')}>
        <Text style={styles.addText}>Add note ✍️</Text>
      </TouchableOpacity>

      <FlatList
        data={filteredSorted}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 12 }}
        renderItem={({ item }) => (
          <NoteCard note={item} onPress={() => navigation.navigate('EditNote', { id: item.id })} />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No notes yet. Tap “Add note” to start 🌟</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: kawaii.bg, padding: 16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  greet: { fontSize: 18, fontWeight: '700', color: kawaii.text },
  logout: { color: kawaii.red, fontWeight: '700' },
  addButton: { backgroundColor: kawaii.purple, borderRadius: 14, padding: 12, alignItems: 'center', marginBottom: 10 },
  addText: { color: '#fff', fontWeight: '700' },
  empty: { textAlign: 'center', marginTop: 24, color: kawaii.textMuted },
});