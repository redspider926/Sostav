import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {
  Space,
  Button,
  Input,
  Avatar,
  Header,
  Image,
  Text,
  IconText,
} from 'components';
import * as sizes from 'utils/sizes';
import * as images from 'utils/images';
import * as colors from 'utils/colors';

const Index = props => {
  return (
    <View style={styles.root}>
      <Header
        title="Роль в команде"
        leftButtonSource={images.icons.left_arrow}
      />
      <Space height={40} />
      <IconText
        imageSource={images.icons.plus}
        title="Администратор"
        option
        selected
      />
      <IconText imageSource={images.icons.plus} title="Тренер" />
      <IconText imageSource={images.icons.plus} title="Капитан" />
      <IconText imageSource={images.icons.plus} title="Кассир" />
      <IconText imageSource={images.icons.plus} title="Игрок" />
      <IconText imageSource={images.icons.plus} title="Гость" />
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
