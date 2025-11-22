import React from 'react';
import { View, TextInput, StyleSheet, Text, Platform } from 'react-native';
import { kawaii } from '../theme/colors';

export default function SearchBar({ value, onChangeText, sortBy, onChangeSort }) {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search by title or body 🔍"
        style={styles.input}
      />
      <View style={styles.sortRow}>
        <Text style={styles.label}>Sort:</Text>
        {Platform.OS === 'web' ? (
          <select
            value={sortBy}
            onChange={(e) => onChangeSort(e.target.value)}
            style={styles.select}
          >
            <option value="updatedDesc">Newest → Oldest</option>
            <option value="updatedAsc">Oldest → Newest</option>
            <option value="titleAsc">Title A → Z</option>
            <option value="titleDesc">Title Z → A</option>
          </select>
        ) : (
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Text style={styles.pill} onPress={() => onChangeSort('updatedDesc')}>🕒 Newest</Text>
            <Text style={styles.pill} onPress={() => onChangeSort('updatedAsc')}>🕒 Oldest</Text>
            <Text style={styles.pill} onPress={() => onChangeSort('titleAsc')}>🔤 A→Z</Text>
            <Text style={styles.pill} onPress={() => onChangeSort('titleDesc')}>🔤 Z→A</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10, gap: 8 },
  input: { backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: kawaii.border, padding: 10 },
  sortRow: { flexDirection: 'row', alignItems: 'center', gap: 8, justifyContent: 'space-between' },
  label: { fontWeight: '700', color: kawaii.text },
  select: { flex: 1, padding: 8, borderRadius: 10, border: '1px solid #e9d7ff', background: '#fff' },
  pill: { backgroundColor: kawaii.pinkLight, color: kawaii.text, paddingVertical: 6, paddingHorizontal: 10, borderRadius: 12, overflow: 'hidden' },
});