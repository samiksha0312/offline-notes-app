import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { kawaii, shadows } from '../theme/colors';

export default function KawaiiButton({ label, onPress, tone = 'primary', small = false }) {
  const toneStyles = {
    primary: { backgroundColor: kawaii.pink, color: '#fff' },
    accent: { backgroundColor: kawaii.purple, color: '#fff' },
    danger: { backgroundColor: kawaii.red, color: '#fff' },
    ghost: { backgroundColor: '#fff', color: kawaii.text, borderColor: kawaii.border, borderWidth: 1 },
  }[tone];

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={[
        styles.btn,
        small && styles.small,
        { backgroundColor: toneStyles.backgroundColor },
        tone === 'ghost' && { borderColor: toneStyles.borderColor, borderWidth: toneStyles.borderWidth }
      ]}
    >
      <View style={[styles.inner, shadows.tiny]}>
        <Text style={[styles.label, { color: toneStyles.color }, small && styles.smallText]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: { borderRadius: 16, padding: 2, marginVertical: 6 },
  inner: { paddingVertical: 12, paddingHorizontal: 14, borderRadius: 14 },
  label: { textAlign: 'center', fontSize: 16, fontWeight: '700' },
  small: { borderRadius: 14 },
  smallText: { fontSize: 14, fontWeight: '700' },
});