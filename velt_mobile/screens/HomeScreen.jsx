import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '@/app/auth/AuthProvider';


export default function HomeScreen({ navigation }) {
    const { logout } = useAuth();

    return (
        <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
            <Text> Welcome</Text>
            <Button title="Logout" onPress={logout} />
        </View>
    );
}