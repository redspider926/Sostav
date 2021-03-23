import React from 'react';
import {StyleSheet, TouchableOpacity, Image as RNImage} from 'react-native';
import {Text} from 'components';
import * as sizes from 'utils/sizes';
import * as images from 'utils/images';

const Index = props => {
  const {
    avatar = images.images.team,
    name = 'Elena',
    onPress = () => {},
  } = props;
  return (
    <TouchableOpacity style={styles.root} onPress={onPress}>
      <RNImage source={avatar} style={styles.teammateAvatar} />
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
});

export default Index;
