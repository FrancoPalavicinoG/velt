import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useAuth } from '@/app/auth/AuthProvider';


export default function HomeScreen({ navigation }) {
    const { logout } = useAuth();

    return (
        <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
            <Text> Welcome</Text>
            <Button
                mode="text"
                onPress={logout}
                style={{ marginTop: 8 }}
            >
                Logout
            </Button>
        </View>
    );
}