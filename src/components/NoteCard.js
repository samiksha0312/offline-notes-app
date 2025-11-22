import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { kawaii, shadows } from '../theme/colors';

export default function NoteCard({ note, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card} activeOpacity={0.9}>
      <View style={styles.row}>
        {note.imageUri ? (
          <Image source={{ uri: note.imageUri }} style={styles.thumb} />
        ) : (
          <View style={[styles.thumb, styles.placeholder]}><Text style={{ color: kawaii.textMuted }}>🗒️</Text></View>
        )}
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={styles.title}>{note.title}</Text>
          <Text numberOfLines={2} style={styles.preview}>{note.body}</Text>
          <Text style={styles.meta}>Updated: {new Date(note.updatedAt).toLocaleString()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: kawaii.card, borderRadius: 18, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: kawaii.border, ...shadows.soft },
  row: { flexDirection: 'row', gap: 12 },
  thumb: { width: 64, height: 64, borderRadius: 12, backgroundColor: '#fff', borderWidth: 1, borderColor: kawaii.border },
  placeholder: { justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 16, fontWeight: '700', color: kawaii.text, marginBottom: 4 },
  preview: { color: kawaii.textMuted },
  meta: { marginTop: 6, color: kawaii.textMuted, fontSize: 12 },
});