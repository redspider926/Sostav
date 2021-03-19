import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Text from '../Text';
import * as sizes from 'utils/sizes';
import * as colors from 'utils/colors';

const Index = props => {
  const {
    borderColor = colors.main,
    buttonColor = colors.main,
    textColor = colors.white,
    caption = 'Войти/Зарегистрироваться',
    onPress = () => {
      console.log('Button was clicked!');
    },
  } = props;
  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: buttonColor,
          borderColor: borderColor && borderColor,
          borderWidth: borderColor && 2,
        },
        styles.root,
      ]}
      onPress={onPress}>
      <Text fontColor={textColor} fontSize={sizes.font.middle_b}>
        {caption}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: sizes.dimension.button.height,
    borderRadius: sizes.dimension.button.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Index;
