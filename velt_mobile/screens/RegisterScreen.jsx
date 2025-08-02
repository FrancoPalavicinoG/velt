import React, { useState } from 'react';
import { View, TextInput, Text, Button, ActivityIndicator } from 'react-native';
import { useAuth } from '@/app/auth/AuthProvider';

export default function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();

    const handleSignup = async () => {
        setError(null);
        setLoading(true);

        if (!email || !password || !username) {
            setError('Introduce email, password and username.');
            setLoading(false);
            return;
        }

        try {
            await signup({ email, password, username });
        } catch (err) {
            if (err.code === 'EMAIL_EXISTS') {
                setError('Email already registered.');
            } else if (err.code === 'PASSWORD_WEAK') {
                setError('Passwword too weak.');
            } else {
                setError(err.message ?? 'Unspected error, try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
                placeholder='email'
                value={email}
                onChangeText={setEmail}
                autoCapitalize='none'
                keyboardType='email-address'
                style={{ borderWidth:1, marginBottom:10, padding:8 }}
            />
            <TextInput
                placeholder='password'
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{ borderWidth:1, marginBottom:20, padding:8 }}
            />
            <TextInput
                placeholder='username'
                value={username}
                onChangeText={setUsername}
                autoCapitalize='none'
                style={{ borderWidth:1, marginBottom:10, padding:8 }}
            />

            {loading
              ? <ActivityIndicator size="large" style={{ marginBottom: 12 }} />
              : <Button title="Signup" onPress={handleSignup} />
            }

            <Button
                title='Have an account? Login'
                onPress={() => navigation.navigate('Login')}
            />

            {error && <Text style={{ color: 'red' }}>{error}</Text>}
        </View>
    );
}