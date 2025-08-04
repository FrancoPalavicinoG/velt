import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, HelperText, ActivityIndicator, Text } from 'react-native-paper';
import { useAuth } from '@/app/auth/AuthProvider';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleLogin = async () => {
        setError(null);
        setLoading(true);

        if (!email || !password) {
            setError('Introduce email and password.');
            setLoading(false);
            return;
        }

        try {
            await login({ email, password });
        } catch (err) {
            if (err.code === 'INVALID_CREDENTIALS') {
                setError('Invalid credentials.');
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
                label="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                mode="outlined"
                style={{ marginBottom: 12, width: '85%' }}
            />
            <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
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
                    icon="login"
                    onPress={handleLogin}
                    style={{ width: '85%', marginTop: 12 }}
                >
                    Login
                </Button>
            )}
            <Button
                mode="text"
                onPress={() => navigation.navigate('Register')}
                style={{ marginTop: 8 }}
            >
                New to VELT? Sign up
            </Button>
        </View>
    );
}