import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

import Text from '../Text';
import Image from '../Image';
import Space from '../Space';
import * as sizes from 'utils/sizes';
import * as colors from 'utils/colors';
import * as images from 'utils/images';

const Index = props => {
  const {avatar, name, accepted = true, onPress} = props;
  return (
    <>
      {accepted ? (
        <TouchableOpacity
          onPress={onPress}
          style={styles.acceptedRoot}
          activeOpacity={0.7}>
          <View>
            <Image
              source={avatar}
              width={sizes.dimension.teamListItem.image.width}
              height={sizes.dimension.teamListItem.image.height}
            />
            <View style={{position: 'absolute', top: -5, right: -5}}>
              <Image source={images.icons.fifa} width={20} height={20} />
            </View>
          </View>
          <Space width={10} />
          <Text>{name}</Text>
          <Space flex={1} />
          <Image
            source={images.icons.right_arrow}
            tintColor={colors.main}
            icon
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.pendingRoot}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={avatar}
              width={sizes.dimension.teamListItem.image.width}
              height={sizes.dimension.teamListItem.image.height}
            />
            <Space width={10} />
            <Text>{name}</Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity>
              <Text fontColor={colors.warning}>Отклонить</Text>
            </TouchableOpacity>
            <Space width={50} />
            <TouchableOpacity>
              <Text fontColor={colors.main}>Вступить</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  acceptedRoot: {
    width: '100%',
    height: sizes.dimension.teamListItem.height1,
    borderRadius: sizes.dimension.teamListItem.borderRadius,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    elevation: 5,
  },

  pendingRoot: {
    width: '100%',
    height: sizes.dimension.teamListItem.height2,
    borderRadius: sizes.dimension.teamListItem.borderRadius,
    backgroundColor: colors.gray,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },

  input: {
    height: 20,
    padding: 0,
    color: colors.black,
  },
});

export default Index;
