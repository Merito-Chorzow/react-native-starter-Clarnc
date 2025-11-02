import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useNotes } from '../src/context/NotesContext';
import { StatusBar } from 'expo-status-bar';

export default function NoteDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { getNote, deleteNote } = useNotes();
  
  const note = getNote(id);

  if (!note) {
    return (
      <View style={styles.container}>
        <Text>Note not found</Text>
      </View>
    );
  }

  const handleEdit = () => {
    router.push(`/add-edit-note?id=${note.id}`);
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Note',
      `Are you sure you want to delete "${note.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            deleteNote(note.id);
            router.back();
          }
        },
      ]
    );
  };

  const openLocationInMaps = () => {
    if (note.location) {
      const { latitude, longitude } = note.location;
      const url = `https://maps.google.com/?q=${latitude},${longitude}`;
      Linking.openURL(url).catch(err => 
        Alert.alert('Error', 'Could not open maps')
      );
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.date}>
          Created: {formatDate(note.createdAt)}
        </Text>
        {note.updatedAt && (
          <Text style={styles.date}>
            Updated: {formatDate(note.updatedAt)}
          </Text>
        )}
      </View>

      {note.image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: note.image }} style={styles.image} />
        </View>
      )}

      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{note.description}</Text>
      </View>

      {note.location && (
        <TouchableOpacity 
          style={styles.locationContainer}
          onPress={openLocationInMaps}
          accessibilityLabel="Open location in maps"
          accessibilityRole="button"
        >
          <Text style={styles.locationTitle}>📍 Location</Text>
          <Text style={styles.locationText}>
            Latitude: {note.location.latitude.toFixed(6)}
          </Text>
          <Text style={styles.locationText}>
            Longitude: {note.location.longitude.toFixed(6)}
          </Text>
          <Text style={styles.locationHint}>Tap to open in maps</Text>
        </TouchableOpacity>
      )}

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={handleEdit}
          accessibilityLabel="Edit note"
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>Edit Note</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={handleDelete}
          accessibilityLabel="Delete note"
          accessibilityRole="button"
        >
          <Text style={[styles.buttonText, styles.deleteButtonText]}>Delete Note</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  imageContainer: {
    backgroundColor: 'white',
    padding: 12,
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8,
  },
  descriptionContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  locationContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  locationHint: {
    fontSize: 12,
    color: '#007AFF',
    fontStyle: 'italic',
    marginTop: 8,
  },
  actions: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  editButton: {
    backgroundColor: '#007AFF',
  },
  deleteButton: {
    backgroundColor: '#ff4444',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButtonText: {
    color: 'white',
  },
});