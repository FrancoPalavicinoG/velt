import React from "react";
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, ActivityIndicator, FAB } from 'react-native-paper';
import useDevice from "@/hooks/useDevice";

export default function DeviceDetailScreen({ route, navigation }) {
    const { id } = route.params;
    const { device, loading, error, saving, patchDevice } = useDevice(id);

    /** Manejara a futuro los start/stop de sessions.
    Ahora cambiara los estados de un device: active u offline
    */
    const toggleSession = async () => {
        if (!device) {
            return;
        }
        const newStatus = device.status === 'active' ? 'offline' : 'active';
        try {
            await patchDevice({ alias: device.alias, status: newStatus });
            // optionally trigger start/stop session endpoint here.
        } catch (err) {
            console.warn('[toggleSession] error →', err);
        }
    };

    if (loading || !device) {
        return <ActivityIndicator style={{ marginTop: 32 }} animating size="large" />;
    }

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Card>
                <Card.Content>
                <Title>{device.alias}</Title>
                <Paragraph>Status: {device.status}</Paragraph>
                <Paragraph>Battery: {device.battery_level ?? '—'}%</Paragraph>
                <Paragraph>HW-ID: {device.hardware_id}</Paragraph>
                </Card.Content>
            </Card>
            <FAB
                icon={device.status === 'online' ? 'pause' : 'play'}
                label={device.status === 'online' ? 'Stop session' : 'Start session'}
                loading={saving}
                onPress={toggleSession}
                style={{
                    position: 'absolute',
                    right: 16,
                    bottom: 16,
                  }}
            />
        </View>
    );
}