import React, { useState } from "react";
import { View } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import usePairDevice from "@/hooks/usePairDevice";

export default function PairDeviceScreen({ navigation }) {
    const [alias, setAlias] = useState('');
    const [hardwareId, setHardwareId] = useState('');

    /* PairDevice hook. */
    const { pair, loading, error } = usePairDevice();

    /** Si el dispositvo es creado correctamente (pair => true)
    vuelve a la pantalla anterior.
    */
    const handleSave = async () => {
        /* Llamada al hook. */
        if (await pair(alias, hardwareId)) {
            navigation.goBack();
        }
    };

    /* UI */
    return (
        <View style={{ padding: 16 }}>
            <TextInput
                label="Helmet alias"
                value={alias}
                onChangeText={setAlias}
                mode="outlined"
                style={{ marginBottom: 12 }}
            />
            <TextInput
                label="Hardware ID"
                value={hardwareId}
                onChangeText={setHardwareId}
                mode="outlined"
                style={{ marginBottom: 12 }}
            />
            <HelperText type="error" visible={!!error} style={{ width: '85%' }}>
                {error}
            </HelperText>
            <Button
                mode="contained"
                loading={loading}
                onPress={handleSave}
                disabled={!alias.trim()}
            >
                Pair sensor
            </Button>
        </View>
    );
}
