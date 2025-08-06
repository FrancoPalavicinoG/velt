import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '@/screens/HomeScreen';
import PairDeviceScreen from '@/screens/PairDeviceScreen';
import DeviceDetailScreen from '@/screens/DeviceDetailScreen';

const Stack = createNativeStackNavigator();
export default function AppStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="PairDevice" component={PairDeviceScreen} />
            <Stack.Screen name="DeviceDetail" component={DeviceDetailScreen} />
        </Stack.Navigator>
    );
}