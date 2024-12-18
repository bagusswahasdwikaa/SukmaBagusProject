import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SidebarMenu = ({ onMenuPress }) => {
  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity style={styles.menuItem} onPress={() => onMenuPress('Profil Saya')}>
        <Text style={styles.menuText}>👤 Profil Saya</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => onMenuPress('Pesan')}>
        <Text style={styles.menuText}>✉️ Pesan</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => onMenuPress('Favorit')}>
        <Text style={styles.menuText}>❤️ Favorit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => onMenuPress('Lokasi')}>
        <Text style={styles.menuText}>📍 Lokasi</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => onMenuPress('Pengaturan')}>
        <Text style={styles.menuText}>⚙️ Pengaturan</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
});

export default SidebarMenu;
