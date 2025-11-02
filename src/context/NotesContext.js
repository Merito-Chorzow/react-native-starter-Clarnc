import React, { createContext, useState, useContext } from 'react';

const NotesContext = createContext();

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  const addNote = (note) => {
    const newNote = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...note,
    };
    setNotes(prev => [newNote, ...prev]);
    return newNote;
  };

  const updateNote = (id, updatedNote) => {
    setNotes(prev => prev.map(note => 
      note.id === id ? { ...note, ...updatedNote, updatedAt: new Date().toISOString() } : note
    ));
  };

  const deleteNote = (id) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const getNote = (id) => {
    return notes.find(note => note.id === id);
  };

  const value = {
    notes,
    addNote,
    updateNote,
    deleteNote,
    getNote,
  };

  return (
    <NotesContext.Provider value={value}>
      {children}
    </NotesContext.Provider>
  );
};