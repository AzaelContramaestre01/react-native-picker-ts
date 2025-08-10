import { StyleSheet } from 'react-native';

const ITEM_HEIGHT = 50;

const wheelPickerStyles = StyleSheet.create({
  root: {
    flex: 1,
  },
  infoDate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 16,
    paddingVertical: 13,
    justifyContent: 'space-between',
    marginBottom: 16,
    borderRadius: 4,
    backgroundColor: 'white',
  },
  date: {
    color: '#262626',
    lineHeight: 24,
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContent: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 20,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  wheelContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: ITEM_HEIGHT * 5,
    paddingHorizontal: 40,
  },
  wheelColumn: {
    flex: 1,
    position: 'relative',
  },
  selectionOverlay: {
    position: 'absolute',
    top: ITEM_HEIGHT * 2,
    left: 0,
    right: 0,
    height: ITEM_HEIGHT,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
  centeredSelectionBackground: {
    position: 'absolute',
    top: ITEM_HEIGHT * 2,
    left: '35%',
    right: '35%',
    height: ITEM_HEIGHT,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    zIndex: -1,
  },
  leftSelectionBackground: {
    top: ITEM_HEIGHT * 2,
    left: '8%',
    right: '75%',
  },
  middleSelectionBackground: {
    top: ITEM_HEIGHT * 2,
    left: '38%',
    right: '38%',
  },
  rightSelectionBackground: {
    top: ITEM_HEIGHT * 2,
    left: '72%',
    right: '8%',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 40,
    marginVertical: 10,
  },
  dualActionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 60,
    marginVertical: 10,
  },
  actionText: {
    fontSize: 18,
    color: '#007aff',
    fontWeight: '600',
  },
  disabledContainer: {
    backgroundColor: '#f0f0f0',
    borderColor: '#ccc',
  },
  disabledText: {
    color: '#a0a0a0',
  },
  disabledIcon: {
    opacity: 0.5,
  },
  wheelRow: {
    flex: 1,
  },
  wheelRowLeft: {
    flex: 1,
    marginRight: 5,
  },
  wheelRowRight: {
    flex: 1,
    marginLeft: 5,
  },
});

export default wheelPickerStyles;


