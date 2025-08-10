import React, { use } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { Appbar, Card, ActivityIndicator, Text } from 'react-native-paper';
import useSessions from '@/hooks/useSessions';

export default function SessionScreen({ navigation }){
    const { sessions, loading, error, refetch } = useSessions();

    const renderItem = ({ item }) => (
        <Card
            onPress={() => navigation.navigate('SessionDetail', { id: item.id })}
            style={{ marginBottom: 8 }}
        >
        <Card.Title
            title={`Session #${item.id}`}
            subtitle={`Start: ${item.start_time.toFormat('ff')}${item.end_time ? ` · End: ${item.end_time.toFormat('ff')}` : ' · (active)'}`}
        />
        </Card>
    );

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Appbar.Header mode="small"><Appbar.Content title="Sessions" /></Appbar.Header>

            {loading && <ActivityIndicator style={{ marginTop: 24 }} />}

            {error && <Text style={{ color: 'red', marginVertical: 12 }}>Failed to load sessions.</Text>}

            <FlatList
                data={sessions}
                keyExtractor={s => `${s.id}`}
                renderItem={renderItem}
                refreshControl={
                <RefreshControl refreshing={loading} onRefresh={refetch} />
                }
                contentContainerStyle={{ paddingTop: 12 }}
            />
        </View>
    );
}