import { Stack } from 'expo-router';
import { NotesProvider } from '../src/context/NotesContext';

export default function RootLayout() {
  return (
    <NotesProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Field Notes' }} />
        <Stack.Screen name="note-detail" options={{ title: 'Note Details' }} />
        <Stack.Screen name="add-edit-note" options={{ title: 'Add Note' }} />
        <Stack.Screen name="settings" options={{ title: 'Settings' }} />
      </Stack>
    </NotesProvider>
  );
}