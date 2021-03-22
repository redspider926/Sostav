import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Space, Button, Input, Header} from 'components';
import * as sizes from 'utils/sizes';
import * as images from 'utils/images';

const Index = props => {
  const [phone, setPhone] = React.useState('');

  const getRealPhoneNumberString = phoneNumber => {
    let str = '+';
    for (let _index in phoneNumber) {
      if (phoneNumber[_index] >= '0' && phoneNumber[_index] <= '9') {
        str += phoneNumber[_index];
      }
    }
    console.log(str);
    return str;
  };

  return (
    <View style={styles.root}>
      <Header
        title="Add teammate"
        leftButtonSource={images.icons.left_arrow}
        onLeftButtonPress={() => props.navigation.goBack()}
      />
      <Space height={20} />
      <Input
        editable
        phoneMask
        title="Введите Телефон"
        placeholder="Введите..."
        onChangeText={text => setPhone(text)}
        value={phone}
      />
      <Space flex={1} />
      <Button
        caption="Add teammate"
        onPress={() => props.navigation.navigate('AddTeammateCodeScreen')}
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

  loading: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },

  toast: {
    zIndex: 10000,
  },
});

export default Index;
