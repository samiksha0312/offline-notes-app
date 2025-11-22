import React, { createContext, useContext, useState } from 'react';
import { getNotes } from '../storage/notes';

const NotesContext = createContext(null);

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);

  const refreshNotes = async (username) => {
    const items = await getNotes(username);
    setNotes(items);
  };

  const value = { notes, setNotes, refreshNotes };
  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}

export function useNotes() {
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error('useNotes must be used within NotesProvider');
  return ctx;
}