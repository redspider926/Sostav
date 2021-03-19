import React from 'react';
import {View, StyleSheet, TouchableOpacity, StatusBar} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Text from '../Text';
import Image from '../Image';
import * as sizes from 'utils/sizes';
import * as colors from 'utils/colors';

const Index = props => {
  const {
    title,
    leftButtonSource,
    rightButtonSource,
    onLeftButtonPress = () => {},
    onRightButtonPress = () => {},
  } = props;
  return (
    <>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <View style={{height: getStatusBarHeight(true)}} />
      <View style={styles.root}>
        {leftButtonSource && (
          <TouchableOpacity
            style={styles.leftButton}
            onPress={onLeftButtonPress}>
            <Image source={leftButtonSource} icon tintColor={colors.main} />
          </TouchableOpacity>
        )}
        <Text fontSize={sizes.font.middle_b} bold>
          {title}
        </Text>
        {rightButtonSource && (
          <TouchableOpacity
            style={styles.rightButton}
            onPress={onRightButtonPress}>
            <Image
              source={rightButtonSource}
              icon
              iconSize={16}
              tintColor={colors.main}
            />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
  },

  leftButton: {
    position: 'absolute',
    left: 0,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  rightButton: {
    position: 'absolute',
    right: 0,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Index;
