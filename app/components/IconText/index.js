import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Text from '../Text';
import Image from '../Image';
import Space from '../Space';
import * as sizes from 'utils/sizes';
import * as colors from 'utils/colors';

const Index = props => {
  const {imageSource, title, option, selected, onPress = () => {}} = props;
  return (
    <TouchableOpacity style={styles.root} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} icon tintColor={colors.white} />
      </View>
      <Space width={sizes.dimension.iconText.imageContainer.marginRight} />
      <Text fontSize={sizes.font.middle_b}>{title}</Text>
      <Space flex={1} />
      {option && (
        <View style={[styles.option, selected && {borderColor: colors.main}]}>
          {selected && <View style={styles.selected} />}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: sizes.dimension.iconText.marginTop,
    marginBottom: sizes.dimension.iconText.marginTop,
  },

  imageContainer: {
    height: sizes.dimension.iconText.imageContainer.size,
    width: sizes.dimension.iconText.imageContainer.size,
    borderRadius: sizes.dimension.iconText.imageContainer.size,
    backgroundColor: colors.darkBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },

  option: {
    height: sizes.dimension.iconText.imageContainer.size,
    width: sizes.dimension.iconText.imageContainer.size,
    borderRadius: sizes.dimension.iconText.imageContainer.size,
    borderColor: colors.darkBlue,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  selected: {
    height: sizes.dimension.iconText.imageContainer.size - 10,
    width: sizes.dimension.iconText.imageContainer.size - 10,
    borderRadius: sizes.dimension.iconText.imageContainer.size,
    backgroundColor: colors.main,
  },
});

export default Index;
