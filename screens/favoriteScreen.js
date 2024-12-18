// FavoriteScreen.js
import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import Card from '../components/card';

const FavoriteScreen = ({ route }) => {
  const { favorites } = route.params || [];
  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Card title={item.title} body={item.body} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4', padding: 16 },
});

export default FavoriteScreen;
