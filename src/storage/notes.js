// src/storage/notes.js
import { getItem, setItem } from './storage';
import { v4 as uuidv4 } from 'uuid'; // ✅ Correct import

function key(username) {
  return `notes_${username}`;
}

export async function getNotes(username) {
  if (!username) return [];
  return await getItem(key(username), []);
}

export async function getNoteById(username, id) {
  const items = await getNotes(username);
  return items.find(n => n.id === id) || null;
}

export async function saveNote(username, partial) {
  if (!username) return false;
  const items = await getNotes(username);
  const now = new Date().toISOString();
  let updated;

  if (partial.id) {
    const idx = items.findIndex(n => n.id === partial.id);
    if (idx === -1) return false;
    updated = { ...items[idx], ...partial, updatedAt: now };
    items[idx] = updated;
  } else {
    updated = {
      id: uuidv4(), // ✅ Safe usage
      title: partial.title || '',
      body: partial.body || '',
      imageUri: partial.imageUri || '',
      updatedAt: now,
    };
    items.unshift(updated);
  }

  await setItem(key(username), items);
  return true;
}

export async function deleteNote(username, id) {
  const items = await getNotes(username);
  const filtered = items.filter(n => n.id !== id);
  await setItem(key(username), filtered);
  return true;
}