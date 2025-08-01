import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useAuth } from '@/app/auth/AuthProvider';

export default function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [passsword, setPassword] = useState('');
    const { signup } = useAuth();

    const handleSignup = async () => {
        try {
            await signup({ email, password });
        } catch (err) {
            Alert.alert('Error', err?.response?.data?.msg || 'Signup error');
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
                placeholder='email'
                value={email}
                onChange={setEmail}
                autoCapitalize='none'
                keyboardType='email-address'
                style={{ borderWidth:1, marginBottom:10, padding:8 }}
            />
            <TextInput
                placeholder='password'
                value={passsword}
                onChange={setPassword}
                secureTextEntry
                style={{ borderWidth:1, marginBottom:20, padding:8 }}
            />
            <Button title="Signup" onPress={handleSignup} />

            <Button
                title='Have an account? Login'
                onPress={() => navigation.navigate('Login')}/>
        </View>
    );
}