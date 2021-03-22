import {StyleSheet} from 'react-native';
import * as colors from 'utils/colors';
import * as sizes from 'utils/sizes';

export default StyleSheet.create({
  modalContainer: {
    width: '100%',
    height: 240,
    backgroundColor: colors.white,
    borderRadius: 10,
    justifyContent: 'space-around',
    padding: sizes.dimension.screen.padding,
  },

  modalRootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalButtonGroup: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },

  modalButton: {
    flex: 1,
    height: sizes.dimension.button.height,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  //avatar modal
  avatarModalContainer: {
    width: '100%',
    height: 100,
    backgroundColor: colors.main,
    borderRadius: 10,
    justifyContent: 'space-around',
    padding: sizes.dimension.screen.padding,
    display: 'flex',
    flexDirection: 'row',
  },

  avatarModalButton: {
    width: sizes.dimension.button.height,
    height: sizes.dimension.button.height,
    borderRadius: 5,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
