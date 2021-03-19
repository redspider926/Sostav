import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Space, Header, Text} from 'components';
import * as sizes from 'utils/sizes';
import * as images from 'utils/images';
import * as colors from 'utils/colors';

const Index = props => {
  return (
    <View style={styles.root}>
      <Header
        title="Настройки уведомлений"
        leftButtonSource={images.icons.left_arrow}
        onLeftButtonPress={() => props.navigation.goBack()}
      />
      <Space height={20} />
      <Text fontSize={sizes.font.middle_b}>Уведомления</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: sizes.dimension.screen.padding,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
});

export default Index;
