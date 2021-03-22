import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Header, Input, Space} from 'components';
import * as sizes from 'utils/sizes';
import * as images from 'utils/images';

const Index = props => {
  const [teamName, setTeamName] = React.useState('');
  return (
    <View style={styles.root}>
      <Header
        title="Создать соперника"
        leftButtonSource={images.icons.left_arrow}
        onLeftButtonPress={() => props.navigation.goBack()}
      />
      <Space height={20} />
      <Input
        editable
        title="Название команды"
        placeholder="Название соперника"
        onChangeText={text => setTeamName(text)}
        value={teamName}
      />
      <Space flex={1} />
      <Button
        onPress={() => props.navigation.navigate('AfterCreateOpponentScreen')}
      />
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
