import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useAuth } from '@/app/auth/AuthProvider';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleLogin = async () => {
        try {
            await login({ email, password });
        } catch (err) {
            Alert.alert('Error', err?.response?.data?.msg || 'Login error');
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
                placeholder='Email'
                value={email}
                onChangeText={setEmail}
                autoCapitalize='none'
                keyboardType='email-address'
                style={{ borderWidth:1, marginBottom:10, padding:8 }}
            />
            <TextInput
                placeholder='Password'
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{ borderWidth:1, marginBottom:20, padding:8 }}
            />
            <Button title="Login" onPress={handleLogin} />

            <Button
                title='New to VELT? Signup'
                onPress={() => navigation.navigate('Register')}/>
        </View>
    );
}