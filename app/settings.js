import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function SettingsScreen() {
  const appVersion = '1.0.0';
  const buildNumber = '1';

  const handleContactSupport = () => {
    Linking.openURL('mailto:support@fieldnotes.com');
  };

  const handlePrivacyPolicy = () => {
    Alert.alert('Privacy Policy', 'Your privacy is important to us. We only collect data necessary for the app functionality and do not share it with third parties.');
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>App Version</Text>
          <Text style={styles.infoValue}>{appVersion} ({buildNumber})</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Description</Text>
          <Text style={styles.infoValue}>
            Field Notes helps you capture and organize your field observations with photos and location data.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Native Features Used</Text>
        <View style={styles.featureItem}>
          <Text style={styles.featureEmoji}>📸</Text>
          <View style={styles.featureText}>
            <Text style={styles.featureTitle}>Camera</Text>
            <Text style={styles.featureDescription}>
              Take photos directly within the app to attach to your notes
            </Text>
          </View>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureEmoji}>📍</Text>
          <View style={styles.featureText}>
            <Text style={styles.featureTitle}>GPS Location</Text>
            <Text style={styles.featureDescription}>
              Capture and save your current location with each note
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Accessibility</Text>
        <Text style={styles.accessibilityText}>
          This app includes:
        </Text>
        <Text style={styles.accessibilityItem}>• Proper touch targets (min 44px)</Text>
        <Text style={styles.accessibilityItem}>• Accessibility labels for screen readers</Text>
        <Text style={styles.accessibilityItem}>• Clear visual hierarchy</Text>
        <Text style={styles.accessibilityItem}>• Sufficient color contrast</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <TouchableOpacity
          style={styles.linkItem}
          onPress={handleContactSupport}
          accessibilityLabel="Contact support"
          accessibilityRole="button"
        >
          <Text style={styles.linkText}>📧 Contact Support</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.linkItem}
          onPress={handlePrivacyPolicy}
          accessibilityLabel="View privacy policy"
          accessibilityRole="button"
        >
          <Text style={styles.linkText}>🔒 Privacy Policy</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Made with ❤️ for field research
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: 'white',
    marginBottom: 12,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  infoItem: {
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    lineHeight: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  featureEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  accessibilityText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  accessibilityItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    marginLeft: 8,
  },
  linkItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  linkText: {
    fontSize: 16,
    color: '#007AFF',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
});