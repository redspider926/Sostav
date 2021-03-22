import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import Text from '../Text';
import Space from '../Space';

import * as sizes from 'utils/sizes';
import * as colors from 'utils/colors';

const Index = props => {
  const {text = 'Loading...'} = props;
  return (
    <View style={styles.root}>
      <Text fontSize={sizes.font.small_a} fontColor={colors.white}>
        {text}
      </Text>
      <Space height={20} />
      <ActivityIndicator size="large" color={colors.warning} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000044',
  },
});

export default Index;
