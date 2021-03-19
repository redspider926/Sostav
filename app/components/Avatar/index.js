import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Text from '../Text';
import Image from '../Image';
import * as sizes from 'utils/sizes';
import * as colors from 'utils/colors';
import * as images from 'utils/images';

const Index = props => {
  const {source, onPress = () => {}, rectangle} = props;
  return (
    <TouchableOpacity style={styles.root} onPress={onPress}>
      {source === undefined ? (
        <View
          style={[
            styles.noAvatar,
            rectangle ? {borderRadius: 5} : {borderRadius: 70},
          ]}>
          <Text
            center
            fontColor={colors.darkGray}
            fontSize={sizes.font.middle_b}>
            Фото вашего профиля
          </Text>
        </View>
      ) : (
        <View
          style={[
            styles.root,
            rectangle ? {borderRadius: 5} : {borderRadius: 70},
          ]}>
          <Image
            source={source}
            width={sizes.dimension.avatar.width}
            height={sizes.dimension.avatar.height}
            circle={!rectangle}
          />
          <View style={styles.plusButton}>
            <Image source={images.icons.plus} icon tintColor={colors.white} />
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: sizes.dimension.avatar.width,
    height: sizes.dimension.avatar.height,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  noAvatar: {
    width: sizes.dimension.avatar.width,
    height: sizes.dimension.avatar.height,
    borderRadius: sizes.dimension.avatar.borderRadius,
    borderWidth: 3,
    borderColor: colors.darkGray,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
  },

  plusButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.main,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: -20,
  },
});

export default Index;
