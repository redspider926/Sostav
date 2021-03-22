import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Header, Text, Space, TeamCode} from 'components';
import * as sizes from 'utils/sizes';
import * as images from 'utils/images';

const Index = props => {
  return (
    <View style={styles.root}>
      <Header
        title="Создать соперника"
        leftButtonSource={images.icons.left_arrow}
        onLeftButtonPress={() => props.navigation.goBack()}
      />
      <Space height={20} />
      <Text fontSize={sizes.font.largest_a} bold>
        Соперник создан!
      </Text>
      <Space height={20} />
      <TeamCode />
      <Space flex={1} />
      <Button />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: sizes.dimension.screen.padding,
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
});

export default Index;
