import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, HelperText, ActivityIndicator, Text } from 'react-native-paper';
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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
            <Text variant='headlineMedium' style={{ marginBottom: 12}} > VELT </Text>
            <TextInput
                placeholder='Email'
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
                autoCapitalize='none'
                mode="outlined"
                style={{ marginBottom: 12, width: '85%' }}
            />
            <TextInput
                placeholder='Password'
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                mode="outlined"
                style={{ marginBottom: 12, width: '85%' }}
            />
            <TextInput
                placeholder='Username'
                value={username}
                onChangeText={setUsername}
                autoCapitalize='none'
                mode="outlined"
                style={{ marginBottom: 4, width: '85%' }}
            />
            <HelperText type="error" visible={!!error} style={{ width: '85%' }}>
                {error}
            </HelperText>
            {loading ? (
                <ActivityIndicator animating size="large" style={{ marginBottom: 12 }} />
            ) : (
                <Button
                    mode="contained"
                    onPress={handleSignup}
                    style={{ width: '85%', marginTop: 12 }}
                >
                    Sign up
                </Button>
            )}
            <Button
                mode="text"
                onPress={() => navigation.navigate('Login')}
                style={{ marginTop: 8 }}
            >
                Have an account? Login
            </Button>
        </View>
    );
}