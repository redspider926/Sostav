import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Image, Text, Space} from 'components';
import * as images from 'utils/images';
import * as colors from 'utils/colors';
import * as sizes from 'utils/sizes';

const Index = props => {
  const {
    avatar = images.images.team,
    name = 'name',
    role,
    onPress,
    onImagePress,
  } = props;
  return (
    <View style={styles.root}>
      <TouchableOpacity onPress={onImagePress}>
        <Image
          source={avatar}
          width={sizes.dimension.teamListItem.image.width}
          height={sizes.dimension.teamListItem.image.height}
        />
      </TouchableOpacity>

      <Space width={10} />
      <View>
        <Text fontSize={sizes.font.middle_b}>{name}</Text>
        {role && <Text fontColor={colors.darkGray}>{role}</Text>}
      </View>
      <Space flex={1} />
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Image icon source={images.icons.plus} tintColor={colors.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: sizes.dimension.teamListItem.height1,
    borderRadius: sizes.dimension.teamListItem.borderRadius,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: colors.main,
    width: 25,
    height: 25,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Index;
