import React from 'react';
import { View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomBar from '@/components/BottomBar';

export const BOTTOM_BAR_HEIGHT = 64;

export default function Screen({
    children,
    withBottomBar = false,   // si quieres mostrar la BottomBar
    contentPadding = 16,      // padding lateral/arriba
  }) {
    const insets = useSafeAreaInsets();
  
    // Deja espacio extra abajo si hay BottomBar, + safe area bottom + padding
    const paddingBottom =
      contentPadding + insets.bottom + (withBottomBar ? BOTTOM_BAR_HEIGHT : 0);
  
    return (
      <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: contentPadding, paddingBottom }}>
          {children}
        </View>
  
        {withBottomBar && <BottomBar />}
      </SafeAreaView>
    );
  }