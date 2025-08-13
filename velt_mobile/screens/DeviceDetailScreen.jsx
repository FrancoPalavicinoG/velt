import React from 'react';
import { View } from 'react-native';
import { Appbar, Card, Title, Paragraph, Button, ActivityIndicator, Text } from 'react-native-paper';
import useDevice from '@/hooks/useDevice';
import useStartSession from '@/hooks/useStartSession';
import Screen from '@/components/Screen';

export default function DeviceDetailScreen({ route, navigation }) {
    const { id } = route.params;

    // Load device + allow PATCH
    const { device, loading, error, saving, patchDevice, refetch } = useDevice(id);

    // Start-session hook
    const { startSession, starting, startError} = useStartSession();

    /** Manejara a futuro los start/stop de sessions.
    Ahora cambiara los estados de un device: active u offline
    */
    // Start then go to SessionDetail
    const handleStart = async () => {
        if (!device) return;

        try {
        // If your backend needs device_id, pass it: await startSession(device.id)
        const session = await startSession();

        // optional: reflect device state in UI right away
        await patchDevice({ alias: device.alias, status: 'active' });

        // navigate to session detail with the new session id
        if (session?.id) {
            navigation.navigate('SessionDetail', { id: session.id });
        }
        } catch (e) {
        console.warn('[handleStart] error →', e);
        }
    };

    if (loading || !device) {
        return <ActivityIndicator style={{ marginTop: 32 }} animating size="large" />;
    }

    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header mode="small">
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title={`Device #${device.id}`} />
                <Appbar.Action icon="refresh" onPress={refetch} />
            </Appbar.Header>

        <Screen withBottomBar>
            <Card>
                <Card.Content>
                    <Title>{device.alias}</Title>
                    <Paragraph>Status: {device.status}</Paragraph>
                    <Paragraph>Battery: {device.battery_level ?? '—'}%</Paragraph>
                    <Paragraph>HW-ID: {device.hardware_id}</Paragraph>
                </Card.Content>
            </Card>

            <Button
                mode="contained"
                icon="play"
                onPress={handleStart}
                loading={starting || saving}
                disabled={starting || saving}
                style={{ marginTop: 16 }}
            >
                Start session
            </Button>

            {error && <Text style={{ color: 'red', marginTop: 12 }}>Failed to load device.</Text>}
            {startError && <Text style={{ color: 'red', marginTop: 4 }}>Could not start session.</Text>}
        </Screen>
        </View>
    );
}