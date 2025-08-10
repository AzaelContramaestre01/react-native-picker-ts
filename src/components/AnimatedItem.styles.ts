import { StyleSheet } from 'react-native';

const ITEM_HEIGHT = 50;

const styles = StyleSheet.create({
  itemContainer: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 22,
    color: '#111',
    opacity: 0.6,
  },
});

export default styles;


