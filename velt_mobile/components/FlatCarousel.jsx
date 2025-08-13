import React, { memo, useMemo } from 'react';
import { ScrollView, View, Dimensions } from 'react-native';

/**
 * FlatCarousel
 * API parecida a FlatList (subset útil):
 *  - data: any[]
 *  - renderItem: ({ item, index, width }) => ReactNode
 *  - keyExtractor?: (item, index) => string
 *  - itemWidth?: number              ← opcional (default: 85% pantalla, máx 340)
 *  - gap?: number                    ← separación entre tarjetas (default: 12)
 *  - contentContainerStyle?, style?  ← estilos opcionales
 *
 * Implementación con ScrollView horizontal + snapToInterval.
 */

function FlatCarousel({
  data,
  renderItem,
  keyExtractor = (_item, i) => String(i),
  itemWidth,
  gap = 30,
  contentContainerStyle,
  style,
  ...rest
}) {
  const { width: W } = Dimensions.get('window');

  // Cálculos de layout (memoizados)
  const { CARD_WIDTH, SIDE_PADDING, SNAP } = useMemo(() => {
    const cw = itemWidth ?? Math.min(W * 0.85, 340);
    const sp = ((W - cw) / 2 ) - 15;         
    const snap = cw + gap;             
    return { CARD_WIDTH: cw, SIDE_PADDING: sp, SNAP: snap };
  }, [W, itemWidth, gap]);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={SNAP}
      decelerationRate="fast"
      snapToAlignment="start"
      contentContainerStyle={[
        { paddingHorizontal: SIDE_PADDING },
        contentContainerStyle,
      ]}
      style={style}
      {...rest}
    >
      {data?.map((item, index) => (
        <View
          key={keyExtractor(item, index)}
          style={{
            width: CARD_WIDTH,
            marginRight: index === data.length - 1 ? 0 : gap,
          }}
        >
          {/* Pasamos width por si el caller quiere usarlo dentro */}
          {renderItem({ item, index, width: CARD_WIDTH })}
        </View>
      ))}
    </ScrollView>
  );
}

export default memo(FlatCarousel);