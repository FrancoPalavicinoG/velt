import React, { useState } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator} from 'react-native';
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
            {loading
              ? <ActivityIndicator size="large" style={{ marginBottom: 12 }} />
              : <Button title="Login" onPress={handleLogin} />
            }

            <Button
                title='New to VELT? Signup'
                onPress={() => navigation.navigate('Register')}
            />

            {error && <Text style={{ color: 'red' }}>{error}</Text>}
        </View>
    );
}