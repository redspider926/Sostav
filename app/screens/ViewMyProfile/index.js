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
        title="Личные данные"
        leftButtonSource={images.icons.left_arrow}
        rightButtonSource={images.icons.edit}
        onLeftButtonPress={() => props.navigation.goBack()}
        onRightButtonPress={() =>
          props.navigation.navigate('EditMyProfileScreen')
        }
      />
      <Space height={20} />
      <View style={styles.profile}>
        <Image circle source={images.images.team} width={100} height={100} />
        <Space width={20} />
        <View>
          <Text bold fontSize={sizes.font.large_a}>
            Василий Забивакин
          </Text>
        </View>
      </View>
      <Space height={40} />
      <Text fontSize={sizes.font.middle_a} fontColor={colors.darkBlue} bold>
        E-Mail
      </Text>
      <Text>mail@gmail.com</Text>
      <Space height={20} />
      <Text fontSize={sizes.font.middle_a} fontColor={colors.darkBlue} bold>
        Телефон
      </Text>
      <Text>+7 (123) 123-12-12</Text>
      <Space height={20} />
      <Text fontSize={sizes.font.middle_a} fontColor={colors.darkBlue} bold>
        День рождения
      </Text>
      <Text>10.10.2019</Text>
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
