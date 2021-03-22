import React from 'react';
import {StyleSheet, View, Text as RNText, Keyboard} from 'react-native';
import {Text, Space, Button, Loading} from 'components';
import * as sizes from 'utils/sizes';
import * as colors from 'utils/colors';

import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';

import {AuthActions} from 'actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const Index = props => {
  const confirmation = props.auth.confirmation;

  const [code, setCode] = React.useState('');
  const [loadingState, setLoadingState] = React.useState(false);
  const CELL_COUNT = 6;
  React.useEffect(() => {
    if (code.length === 6) {
      Keyboard.dismiss();
      setLoadingState(true);
      confirmCode();
    }
  }, [code]);

  const ref = useBlurOnFulfill({code, cellCount: CELL_COUNT});
  const [_props, getCellOnLayoutHandler] = useClearByFocusCell({
    code,
    setCode,
  });

  async function confirmCode() {
    try {
      await confirmation.confirm(code);
      setLoadingState(false);
      if (auth().currentUser.displayName !== null) {
        props.navigation.navigate('TabNav');
      } else {
        props.navigation.navigate('RegisterScreen');
      }
    } catch (error) {
      setLoadingState(false);
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: JSON.stringify(error),
        visibilityTime: 1000,
      });
    }
  }

  return (
    <View style={styles.root}>
      <Toast style={styles.toast} ref={ref => Toast.setRef(ref)} />
      <Text fontSize={sizes.font.largest_a} fontColor={colors.darkBlue} bold>
        Введите sms-код
      </Text>
      <Space height={20} />
      <Text fontSize={sizes.font.middle_b} fontColor={colors.darkBlue}>
        Мы отправим sms с кодом подтверждения на ваш телефонный номер{' '}
      </Text>
      <Space height={20} />
      <CodeField
        ref={ref}
        {..._props}
        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => {
          return (
            <View key={index} onLayout={getCellOnLayoutHandler(index)}>
              {symbol ? (
                <RNText style={styles.cell}>{symbol}</RNText>
              ) : isFocused ? (
                <View style={styles.cell}>
                  <View style={styles.focusCell} />
                </View>
              ) : (
                <View style={styles.cell}>
                  <View style={styles.unFocusCell} />
                </View>
              )}
            </View>
          );
        }}
      />
      <Text fontSize={sizes.font.middle_a} fontColor={colors.warning}>
        Код неверный
      </Text>
      <Space height={20} />
      <Button caption="Отправить код повторно" />
      {loadingState && <Loading />}
    </View>
  );
};

const styles = StyleSheet.create({
  toast: {
    zIndex: 10000,
  },

  root: {
    padding: sizes.dimension.screen.padding,
    paddingTop: 50,
    paddingBottom: 50,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },

  codeFieldRoot: {justifyContent: 'center'},

  cell: {
    width: sizes.dimension.smsCodeCell.width,
    height: sizes.dimension.smsCodeCell.height,
    margin: sizes.dimension.smsCodeCell.margin,
    lineHeight: sizes.dimension.smsCodeCell.lineHeight,
    fontSize: sizes.font.largest_a,
    textAlign: 'center',
    borderBottomColor: colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
  },

  focusCell: {
    width: 20,
    height: 20,
    backgroundColor: colors.main,
    borderRadius: 20,
  },

  unFocusCell: {
    width: 20,
    height: 20,
    backgroundColor: colors.grey,
    borderRadius: 20,
  },

  loading: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
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
