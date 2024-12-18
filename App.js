import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet } from 'react-native';
import ListScreen from './screens/listScreen';
import ProfileScreen from './screens/profileScreen';
import HistoryScreen from './screens/historyScreen';
import FavoriteScreen from './screens/favoriteScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="List"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let labelText;

            if (route.name === 'List') {
              labelText = '📋 List';
            } else if (route.name === 'Profil') {
              labelText = '👤 Profil';
            } else if (route.name === 'Riwayat') {
              labelText = '🗑️ Riwayat';
            } else if (route.name === 'Favorit') {
              labelText = '⭐ Favorit';
            }

            return (
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: size, color: color }}>{labelText}</Text>
                {focused && <View style={styles.activeIndicator} />}
              </View>
            );
          },
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: 12,
                color: focused ? '#007bff' : 'gray',
                fontWeight: focused ? 'bold' : 'normal',
              }}
            >
              {route.name}
            </Text>
          ),
          tabBarActiveTintColor: '#007bff',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: '#f8f9fa',
            borderTopWidth: 1,
            borderTopColor: '#ddd',
            height: 60,
          },
        })}
      >
        <Tab.Screen
          name="List"
          component={ListScreen}
          options={{ title: 'Daftar Data' }}
        />
        <Tab.Screen name="Profil" component={ProfileScreen} />
        <Tab.Screen name="Riwayat" component={HistoryScreen} />
        <Tab.Screen name="Favorit" component={FavoriteScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  activeIndicator: {
    height: 4,
    width: '50%',
    backgroundColor: '#007bff',
    marginTop: 4,
    borderRadius: 2,
  },
});

export default App;
