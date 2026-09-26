import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

const API_URL = 'http://localhost:3001/api';

export default function App() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/anime`)
      .then((response) => response.json())
      .then((data) => { setItems(data); setSelected(data[0] || null); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <SafeAreaView style={styles.center}><ActivityIndicator size="large" /></SafeAreaView>;

  const source = selected?.sources?.[0];
  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.header}>Anime Legal</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => setSelected(item)}>
            <Image source={{ uri: item.cover }} style={styles.cover} />
            <View style={styles.info}><Text style={styles.title}>{item.title}</Text><Text style={styles.description}>{item.description}</Text></View>
          </TouchableOpacity>
        )}
      />
      {source && <View style={styles.player}><Text style={styles.now}>{selected.title} · {source.label}</Text><Video source={{ uri: source.url }} style={styles.video} useNativeControls resizeMode={ResizeMode.CONTAIN} /></View>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0B1220' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0B1220' },
  header: { color: '#F8FAFC', fontSize: 30, fontWeight: '800', padding: 16 },
  list: { padding: 16 },
  card: { flexDirection: 'row', backgroundColor: '#101A2B', borderRadius: 14, marginBottom: 12, overflow: 'hidden' },
  cover: { width: 100, height: 100 },
  info: { flex: 1, padding: 12, justifyContent: 'center' },
  title: { color: '#F8FAFC', fontSize: 17, fontWeight: '700' },
  description: { color: '#94A3B8', marginTop: 6 },
  player: { padding: 16 },
  now: { color: '#F8FAFC', fontWeight: '700', marginBottom: 8 },
  video: { width: '100%', height: 220, backgroundColor: '#000', borderRadius: 12 }
});
