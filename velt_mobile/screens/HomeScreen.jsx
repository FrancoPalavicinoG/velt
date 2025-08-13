import React from 'react';
import { View, FlatList } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, Card, ActivityIndicator, Button } from 'react-native-paper';
import { useAuth } from '@/app/auth/AuthProvider';
import useDevices from '@/hooks/useDevices';
import Screen from '@/components/Screen';


export default function HomeScreen({ navigation }) {

    /* Logout: lo provee AuthProvider. */
    const { logout } = useAuth();

    /* Devices hook. */
    const { devices, loading, error, refetch } = useDevices();

    /* Render helpers. */
    const renderItem = ({ item }) => (
        <Card 
            style={{ marginBottom: 8 }}
            onPress={() => 
                navigation.navigate('DeviceDetail', { id: item.id })
            }
        >
            <Card.Title
                title={item.alias}
                subtitle={`Status: ${item.status}`}
            />
        </Card>
    );

    /* UI */
    return (
        <Screen withBottomBar>
            <Text variant="headlineMedium" style={{ marginBottom: 12 }}>
                Welcome back!
            </Text>
        
            {loading && (
                <ActivityIndicator animating size="large" style={{ marginTop: 32 }} />
            )}
        
            {error && (
                <>
                <Text style={{ color: 'red', marginBottom: 8 }}>
                    Something went wrong while loading your devices
                </Text>
                <Button mode="contained-tonal" onPress={refetch}>
                    Retry
                </Button>
                </>
            )}
        
            {!loading && !error && (
                <>
                <Text variant="titleMedium" style={{ marginBottom: 8 }}>
                    You have {devices.length} paired device(s)
                </Text>
        
                <FlatList
                    data={devices}
                    keyExtractor={d => `${d.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 24 }}
                />
                </>
            )}
        
            <Button mode="contained" onPress={() => navigation.navigate('PairDevice')}>
                Add new device
            </Button>
        
            <Button mode="outlined" style={{ marginTop: 'auto' }} onPress={logout}>
                Log out
            </Button>
        </Screen>
    );
}