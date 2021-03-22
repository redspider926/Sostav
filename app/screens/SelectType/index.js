import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Space, Header, IconText} from 'components';
import * as sizes from 'utils/sizes';
import * as images from 'utils/images';

const Index = props => {
  return (
    <View style={styles.root}>
      <Header
        title="Вид спорта"
        leftButtonSource={images.icons.left_arrow}
        onLeftButtonPress={() => props.navigation.goBack()}
      />
      <Space height={40} />
      <IconText
        imageSource={images.icons.plus}
        title="Футбол"
        option
        selected
      />
      <IconText imageSource={images.icons.plus} title="Воллейбол" />
      <IconText imageSource={images.icons.plus} title="Баскетбол" />
      <IconText imageSource={images.icons.plus} title="Хоккей" />
      <IconText imageSource={images.icons.plus} title="Единоборства" />
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

  profile: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Index;
