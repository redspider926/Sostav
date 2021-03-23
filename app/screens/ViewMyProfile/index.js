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
  const user = props.route.params.user;

  const changeToMaskedDate = date => {
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth() + 1).toString();
    var dd = date.getDate().toString();
    var mmChars = mm.split('');
    var ddChars = dd.split('');

    return (
      (mmChars[1] ? mm : '0' + mmChars[0]) +
      '.' +
      (ddChars[1] ? dd : '0' + ddChars[0]) +
      '.' +
      yyyy
    );
  };

  return (
    <View style={styles.root}>
      <Header
        title="Личные данные"
        leftButtonSource={images.icons.left_arrow}
        rightButtonSource={images.icons.edit}
        onLeftButtonPress={() => props.navigation.goBack()}
        onRightButtonPress={() =>
          props.navigation.navigate('EditMyProfileScreen', {user: user})
        }
      />
      <Space height={20} />
      <View style={styles.profile}>
        <Image circle source={images.images.team} width={100} height={100} />
        <Space width={20} />
        <View>
          <Text bold fontSize={sizes.font.large_a}>
            {user.firstName + ' ' + user.lastName}
          </Text>
        </View>
      </View>
      <Space height={40} />
      <Text fontSize={sizes.font.middle_a} fontColor={colors.darkBlue} bold>
        E-Mail
      </Text>
      <Text>{user.email}</Text>
      <Space height={20} />
      <Text fontSize={sizes.font.middle_a} fontColor={colors.darkBlue} bold>
        Телефон
      </Text>
      <Text>{user.phoneNumber}</Text>
      <Space height={20} />
      <Text fontSize={sizes.font.middle_a} fontColor={colors.darkBlue} bold>
        День рождения
      </Text>
      <Text>{changeToMaskedDate(user.birthday)}</Text>
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
