import React from 'react';
import { View } from 'react-native';
import { Appbar, Card, Title, Paragraph, Button, ActivityIndicator } from 'react-native-paper';
import useSession from '@/hooks/useSession';

export default function SessionDetail({ route, navigation }) {
    const { id } = route.params;
    const { session, loading, error, saving, refetch, stopSession } = useSession(id);

    const handleStop = async () => {
        try { await stopSession(id); } catch {}
    };

    if (loading || !session) {
        return <ActivityIndicator style={{ marginTop: 32 }} />;
    }

    const isActive = !session.end_time;

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Appbar.Header mode="small">
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title={`Session #${id}`} />
                <Appbar.Action icon="refresh" onPress={refetch} />
            </Appbar.Header>
        
            <Card style={{ marginTop: 12 }}>
                <Card.Content>
                <Title>Status: {isActive ? 'Active' : 'Closed'}</Title>
                <Paragraph>Start: {session.start_time}</Paragraph>
                <Paragraph>End:   {session.end_time ? session.end_time : '—'}</Paragraph>
                </Card.Content>
            </Card>
        
            {isActive && (
                <Button mode="contained" onPress={handleStop} loading={saving} style={{ marginTop: 16 }}>
                Stop session
                </Button>
            )}
        
            {error && <Paragraph style={{ color: 'red', marginTop: 8 }}>Error loading or stopping session.</Paragraph>}
        </View>
    );
}