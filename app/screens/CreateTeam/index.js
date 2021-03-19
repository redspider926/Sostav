import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Space, Button, Input, Avatar, Header} from 'components';
import * as sizes from 'utils/sizes';
import * as images from 'utils/images';

const Index = props => {
  const [teamName, setTeamName] = React.useState('');
  return (
    <View style={styles.root}>
      <Header
        leftButtonSource={images.icons.left_arrow}
        title="Создание команды"
      />
      <ScrollView>
        <Space height={40} />
        <Avatar rectangle />
        <Space height={40} />
        <Input
          editable
          title="Название"
          placeholder="Название команды"
          onChangeText={text => setTeamName(text)}
          value={teamName}
        />
        <Space height={20} />
        <Input
          title="Моя роль в команде"
          placeholder="Администратор, тренер или капитан"
          value=""
          onPress={() => {
            props.navigation.navigate('SelectRoleScreen');
          }}
        />
        <Space height={20} />
        <Input
          title="Вид спорта"
          placeholder="Выберите вид вашего спорта"
          value=""
          onPress={() => {
            props.navigation.navigate('SelectTypeScreen');
          }}
        />
      </ScrollView>

      <Space flex={1} />
      <Button
        caption="Создать команду"
        onPress={() => {
          props.navigation.navigate('TabNav');
        }}
      />
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
