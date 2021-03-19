import React from 'react';
import {StyleSheet, Text} from 'react-native';
import * as colors from 'utils/colors';

const Index = props => {
  const {fontColor = colors.darkBlue, fontSize, bold, children, center} = props;
  return (
    <Text
      style={[
        {color: fontColor, fontSize: fontSize},
        bold && styles.bold,
        center && styles.center,
      ]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  root: {},

  bold: {
    fontWeight: 'bold',
  },

  center: {
    textAlign: 'center',
  },
});

export default Index;
