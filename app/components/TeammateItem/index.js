import React from 'react';
import {StyleSheet, TouchableOpacity, Image as RNImage} from 'react-native';
import {Text} from 'components';
import * as sizes from 'utils/sizes';
import * as images from 'utils/images';
import * as colors from 'utils/colors';

const Index = props => {
  const {
    avatar = images.images.team,
    name = 'Elena',
    onPress = () => {},
    selected = false,
  } = props;
  return (
    <TouchableOpacity style={styles.root} onPress={onPress}>
      <RNImage
        source={avatar}
        style={[styles.teammateAvatar, selected && styles.selected]}
      />
      <Text center fontSize={sizes.font.small_a}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: sizes.dimension.teammateItem.avatarSize,
    marginRight: 20,
  },

  teammateAvatar: {
    width: sizes.dimension.teammateItem.avatarSize,
    height: sizes.dimension.teammateItem.avatarSize,
    borderRadius: sizes.dimension.teammateItem.avatarBorderRadius,
  },

  selected: {
    borderWidth: 2,
    borderColor: colors.main,
  },
});

export default Index;
