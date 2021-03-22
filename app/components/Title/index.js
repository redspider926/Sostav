import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import Text from '../Text';
import Image from '../Image';
import Space from '../Space';

import * as images from 'utils/images';
import * as colors from 'utils/colors';
import * as sizes from 'utils/sizes';

const Index = props => {
  const {title = 'title', leftButton, leftButtonText, onPress} = props;
  return (
    <TouchableOpacity
      style={styles.root}
      disabled={!leftButton}
      onPress={onPress}>
      <Text fontSize={sizes.font.middle_b} bold>
        {title}
      </Text>
      <Space flex={1} />
      {leftButtonText && <Text fontColor={colors.main}>{leftButtonText}</Text>}
      <Space width={10} />
      {leftButton && (
        <Image icon source={images.icons.right_arrow} tintColor={colors.main} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default Index;
