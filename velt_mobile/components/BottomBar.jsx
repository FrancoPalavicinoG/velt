import React, { memo } from 'react';
import { View, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default memo(function BottomBar() {
  const nav = useNavigation();

  return (
    <View
      style={{
        position: 'absolute',
        left: 0, right: 0, bottom: 0,
        height: 80,
        backgroundColor: '#fff',
        borderTopWidth: 1, borderTopColor: '#eee',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 8,
      }}
    >
      <Pressable onPress={() => nav.navigate('Home')}>
        <MaterialCommunityIcons name="home-outline" size={24} />
      </Pressable>

      <Pressable onPress={() => nav.navigate('Sessions')}>
        <MaterialCommunityIcons name="history" size={24} />
      </Pressable>

      <Pressable onPress={() => nav.navigate('Profile')}>
        <MaterialCommunityIcons name="account-circle-outline" size={24} />
      </Pressable>
    </View>
  );
});