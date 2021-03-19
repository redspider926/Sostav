import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {Logo, Text, Space, Button, Input} from 'components';
import * as sizes from 'utils/sizes';
import * as images from 'utils/images';
import * as colors from 'utils/colors';
import Toast from 'react-native-toast-message';

import auth from '@react-native-firebase/auth';

import {AuthActions} from 'actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const Index = props => {
  const [phone, setPhone] = React.useState('');
  const [code, setCode] = React.useState('');
  const [loadingState, setLoadingState] = React.useState(false);

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

  const onAuthButton = () => {
    signInWithPhoneNumber();
  };

  async function signInWithPhoneNumber() {
    setLoadingState(true);
    let confirmation;
    auth()
      .signInWithPhoneNumber(getRealPhoneNumberString(phone))
      .then(async result => {
        confirmation = result;
        setLoadingState(false);
        await props.authActions.setConfirmation(confirmation);
        props.navigation.navigate('VerificationScreen', {
          phone: getRealPhoneNumberString(phone),
        });
      })
      .catch(error => {
        console.log(error);
        setLoadingState(false);
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: JSON.stringify(error),
          visibilityTime: 1000,
        });
      });
  }

  return (
    <View style={styles.root}>
      <Toast style={styles.toast} ref={ref => Toast.setRef(ref)} />
      <Logo />
      <Space height={20} />
      <Text center fontSize={sizes.font.middle_b}>
        Добро пожаловать в приложение для управления вашей спортивной командой
      </Text>
      <Space height={20} />
      <Input
        editable
        phoneMask
        placeholder="Телефон"
        onChangeText={text => setPhone(text)}
        value={phone}
      />
      <Space height={20} />
      <Text fontSize={sizes.font.middle_b} fontColor={colors.darkBlue}>
        Введите код команды
      </Text>
      <Space height={10} />
      <Input
        editable
        codeMask
        placeholder="Введите реферальный код"
        onChangeText={text => setCode(text)}
        value={code}
      />
      <Text fontSize={sizes.font.middle_a} fontColor={colors.warning}>
        Реферальный код не существует. Проверьте, пожалуйста, написание
      </Text>
      <Space flex={1} />
      <Button onPress={onAuthButton} />
      {loadingState && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.main} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: sizes.dimension.screen.padding,
    paddingTop: 50,
    paddingBottom: 50,
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

const mapStateToProps = state => {
  return {auth: state.auth};
};

const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(AuthActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
