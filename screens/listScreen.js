import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, Modal, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import Card from '../components/card';

const ListScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemBody, setNewItemBody] = useState('');

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => setData(response.data.slice(0, 10)))
      .catch((error) => console.error(error));
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Daftar Data',
    });
  }, [navigation]);

  const handlePress = (item) => {
    setSelectedItem(item);
    setEditTitle(item.title);
    setEditBody(item.body);
    setIsEditing(true);
    setModalVisible(true);
  };

  const handleSaveEdit = () => {
    const updatedData = data.map((item) =>
      item.id === selectedItem.id ? { ...item, title: editTitle, body: editBody } : item
    );
    setData(updatedData);
    setModalVisible(false);
    Alert.alert('Berhasil', 'Item berhasil disimpan!');
  };

  const handleAddNewItem = () => {
    const newItem = {
      id: data.length + 1,
      title: newItemTitle,
      body: newItemBody,
    };
    setData([newItem, ...data]);
    setModalVisible(false);
    Alert.alert('Berhasil', 'Item baru berhasil ditambahkan!');
  };

  const handleDeleteItem = () => {
    Alert.alert(
      'Konfirmasi Hapus',
      'Apakah Anda yakin ingin menghapus item ini?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          onPress: () => {
            const filteredData = data.filter((item) => item.id !== selectedItem.id);
            setData(filteredData);
            setHistory([selectedItem, ...history]);
            navigation.navigate('Riwayat', { history: [selectedItem, ...history] }); // Navigasi ke HistoryScreen
            setModalVisible(false);
            Alert.alert('Berhasil', 'Item berhasil dihapus dan dipindahkan ke Riwayat!');
          },
        },
      ]
    );
  };

  const handleFavoriteItem = () => {
    setFavorites([selectedItem, ...favorites]);
    navigation.navigate('Favorit', { favorites: [selectedItem, ...favorites] }); // Navigasi ke FavoriteScreen
    setModalVisible(false);
    Alert.alert('Berhasil', 'Item berhasil ditambahkan ke Favorit!');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)}>
            <Card title={item.title} body={item.body} />
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setIsEditing(false);
          setNewItemTitle('');
          setNewItemBody('');
          setModalVisible(true);
        }}
      >
        <Text style={styles.addButtonText}>+ Tambah Item</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{isEditing ? 'Edit Item' : 'Tambah Item'}</Text>
            <TextInput
              style={styles.input}
              value={isEditing ? editTitle : newItemTitle}
              onChangeText={isEditing ? setEditTitle : setNewItemTitle}
              placeholder="Judul"
            />
            <TextInput
              style={styles.input}
              value={isEditing ? editBody : newItemBody}
              onChangeText={isEditing ? setEditBody : setNewItemBody}
              placeholder="Konten"
              multiline
            />
            <View style={styles.buttonsContainer}>
              {isEditing ? (
                <>
                  <Button title="Simpan" onPress={handleSaveEdit} color="#28a745" />
                  <Button title="Hapus" onPress={handleDeleteItem} color="#dc3545" />
                  <Button title="Favorit" onPress={handleFavoriteItem} color="#ffcc00" />
                </>
              ) : (
                <Button title="Simpan" onPress={handleAddNewItem} color="#28a745" />
              )}
              <Button title="Batal" onPress={() => setModalVisible(false)} color="#6c757d" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4', padding: 16 },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  addButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ListScreen;
