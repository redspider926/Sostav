import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Text from '../Text';
import Image from '../Image';
import * as sizes from 'utils/sizes';
import * as colors from 'utils/colors';
import * as images from 'utils/images';

const Index = props => {
  const {value = 'ppp', title = 'ppp', onPress = () => {}} = props;

  return (
    <TouchableOpacity onPress={onPress} style={styles.root}>
      <View>
        <Text fontSize={sizes.font.middle_b} bold>
          {title}
        </Text>
        <Text>{value}</Text>
      </View>
      <Image source={images.icons.right_arrow} tintColor={colors.main} icon />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: sizes.dimension.input.height,
    borderRadius: sizes.dimension.input.borderRadius,
    backgroundColor: colors.white,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 5,
  },
});

export default Index;
