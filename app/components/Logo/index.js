import React from 'react';
import {View, StyleSheet} from 'react-native';
import Image from '../Image';
import Text from '../Text';
import Space from '../Space';

import * as images from 'utils/images';
import * as sizes from 'utils/sizes';
import * as colors from 'utils/colors';

const Index = props => {
  return (
    <View style={styles.root}>
      <Image
        source={images.images.logo}
        width={sizes.dimension.logo.width}
        height={sizes.dimension.logo.height}
      />
      <Space width={20} />
      <Text fontSize={sizes.font.largest_b} fontColor={colors.darkBlue} bold>
        sostav
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Index;
