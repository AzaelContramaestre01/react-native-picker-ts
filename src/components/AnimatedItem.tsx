import React from 'react';

import Animated, {
  interpolate,
  useAnimatedStyle,
  Extrapolation,
  SharedValue,
} from 'react-native-reanimated';
import styles from './AnimatedItem.styles';
import { useMemo } from 'react';

const ITEM_HEIGHT = 50;

export interface AnimatedItemProps {
  item: string;
  index: number;
  scrollY: SharedValue<number>;
}

const AnimatedItem: React.FC<AnimatedItemProps> = ({ index, scrollY, item }) => {
  const fontSizeStyle = useMemo(() => {
    const length = item?.length ?? 0;
    let fontSize = 22;
    if (length > 18) fontSize = 14;
    else if (length > 14) fontSize = 16;
    else if (length > 10) fontSize = 18;
    return { fontSize } as const;
  }, [item]);

  const animatedStyle = useAnimatedStyle(() => {
    const position = index * ITEM_HEIGHT;

    const scale = interpolate(
      scrollY.value,
      [
        position - ITEM_HEIGHT * 2,
        position - ITEM_HEIGHT,
        position,
        position + ITEM_HEIGHT,
        position + ITEM_HEIGHT * 2,
      ],
      [0.8, 0.98, 1.2, 0.98, 0.8],
      Extrapolation.CLAMP,
    );

    const opacity = interpolate(
      scrollY.value,
      [position - ITEM_HEIGHT, position, position + ITEM_HEIGHT],
      [0.4, 1, 0.4],
      Extrapolation.CLAMP,
    );

    return { transform: [{ scale }], opacity };
  });

  return (
    <Animated.View style={[styles.itemContainer, animatedStyle]}>
      <Animated.Text style={[styles.itemText, fontSizeStyle, animatedStyle]} numberOfLines={1}>
        {item}
      </Animated.Text>
    </Animated.View>
  );
};

export default React.memo(AnimatedItem);


