import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Logo,
  Text,
  Space,
  Button,
  Input,
  Avatar,
  IconText,
  TeamListItem,
} from 'components';
import * as sizes from 'utils/sizes';
import * as images from 'utils/images';
import * as colors from 'utils/colors';

const Index = props => {
  const [phone, setPhone] = React.useState('');
  const [name, setName] = React.useState('');
  return (
    <ScrollView style={styles.root}>
      <Logo />
      <Space height={20} />
      <Text center fontSize={sizes.font.middle_b} fontColor={colors.darkBlue}>
        Добро пожаловать в приложение для управления вашей спортивной командой
      </Text>
      <Space height={20} />
      <Text fontSize={sizes.font.middle_b} fontColor={colors.darkBlue}>
        Введите код команды
      </Text>
      <Space height={20} />
      <Button />
      <Space height={20} />
      <Input value="fifa" placeholder="" />
      <Space height={20} />
      <Input
        editable
        phoneMask
        placeholder="Телефон"
        onChangeText={text => setPhone(text)}
        value={phone}
      />
      <Space height={20} />
      <Input
        editable
        codeMask
        placeholder="Введите реферальный код"
        onChangeText={text => setPhone(text)}
        value={phone}
      />
      <Space height={20} />
      <Input
        editable
        title="Имя"
        placeholder="Введите имя"
        onChangeText={text => setName(text)}
        value={name}
      />
      <Text fontSize={sizes.font.largest_a} fontColor={colors.darkBlue} bold>
        Введите sms-код
      </Text>
      <Space height={20} />
      <Avatar source={images.images.team} />
      <Space height={40} />
      <Avatar />
      <Space height={40} />
      <Avatar rectangle />
      <Space height={40} />
      <Avatar rectangle source={images.images.team} />
      <Space height={40} />
      <IconText imageSource={images.icons.plus} title="Настройки уведомлений" />
      <IconText
        imageSource={images.icons.plus}
        title="Настройки уведомлений"
        option
      />
      <IconText
        imageSource={images.icons.plus}
        title="Настройки уведомлений"
        option
        selected
      />
      <TeamListItem imageSource={images.images.team} title="ЦСКА Москва" />

      <Space height={40} />
      <TeamListItem
        imageSource={images.images.team}
        title="ЦСКА Москва"
        accepted={false}
      />
      <Space height={40} />
      <TeamListItem
        imageSource={images.images.team}
        title="Название команды"
        accepted={false}
      />
      <Space height={120} />
    </ScrollView>
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
