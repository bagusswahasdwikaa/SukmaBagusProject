import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const ProfileScreen = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState('Sukma Bagus Wahasdwika');
  const [email, setEmail] = useState('sukmabaguswahasdwika10@gmail.com');
  const [tempat, setTempatTinggal] = useState('Lumajang, Jawa Timur');
  const [portfolio, setPortfolio] = useState('https://github.com/bagusswahasdwikaa');
  const [phoneNumber, setPhoneNumber] = useState('082132164561');
  const [transport, setTransport] = useState('🚲');
  const [university, setUniversity] = useState('Politeknik Negeri Malang');

  // Fungsi untuk memilih gambar profil
  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        Alert.alert('Pemberitahuan', 'Pilih gambar dibatalkan.');
      } else if (response.errorMessage) {
        Alert.alert('Error', response.errorMessage);
      } else {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  // Fungsi untuk menyimpan data
  const saveProfile = () => {
    Alert.alert('Sukses', 'Data profil berhasil disimpan!');
    console.log({
      name,
      email,
      tempat,
      portfolio,
      phoneNumber,
      transport,
      profileImage,
      university,
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={selectImage} style={styles.imageContainer}>
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : require('../assets/default-profile.png')
            }
            style={styles.profileImage}
          />
          {/* Simbol edit foto profil */}
          <View style={styles.editIconContainer}>
            <Text style={styles.editIcon}>✏️</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.activeText}>{name}</Text>
      </View>

      {/* Body */}
      <View style={styles.body}>
        <Text style={styles.label}>NAMA</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />

        <Text style={styles.label}>PERGURUAN TINGGI</Text>
        <TextInput
          style={styles.input}
          value={university}
          onChangeText={setUniversity}
        />

        <Text style={styles.label}>EMAIL</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={styles.label}>TEMPAT TINGGAL</Text>
        <TextInput
          style={styles.input}
          value={tempat}
          onChangeText={setTempatTinggal}
        />

        <Text style={styles.label}>PORTOFOLIO</Text>
        <TextInput
          style={styles.input}
          value={portfolio}
          onChangeText={setPortfolio}
        />

        <Text style={styles.label}>NOMOR TELEPON</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>TRANSPORTASI</Text>
        <View style={styles.transportContainer}>
          {['🚲', '🚗', '🚍'].map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.transportButton,
                transport === item && styles.selectedTransport,
              ]}
              onPress={() => setTransport(item)}
            >
              <Text style={styles.transportIcon}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
        <Text style={styles.saveButtonText}>Simpan</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#2C3539',
    alignItems: 'center',
    paddingVertical: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  imageContainer: {
    position: 'relative',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    padding: 5,
  },
  editIcon: {
    fontSize: 18,
    color: '#333',
  },
  activeText: {
    marginTop: 10,
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  label: {
    color: '#7a7a7a',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#e6e6e6',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  transportContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  transportButton: {
    backgroundColor: '#e6e6e6',
    borderRadius: 10,
    padding: 10,
    width: 50,
    alignItems: 'center',
  },
  selectedTransport: {
    backgroundColor: '#a9a9a9',
  },
  transportIcon: {
    fontSize: 24,
  },
  saveButton: {
    backgroundColor: '#1e90ff',
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProfileScreen;
