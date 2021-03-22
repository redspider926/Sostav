import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

import Text from '../Text';

import * as sizes from 'utils/sizes';
import * as colors from 'utils/colors';

const Index = props => {
  const {name, description, resultValue, resultType, onPress} = props;
  return (
    <TouchableOpacity onPress={onPress} style={styles.root} activeOpacity={1}>
      <Text bold fontSize={sizes.font.large_a}>
        {name}
      </Text>

      <Text fontSize={sizes.font.middle_a}>{description}</Text>
      <View style={styles.resultGroup}>
        <View style={styles.result}>
          <Text>{resultValue}</Text>
        </View>
        <View
          style={[
            styles.result,
            {
              backgroundColor:
                resultType === 1
                  ? colors.main
                  : resultType === 2
                  ? colors.yellow
                  : colors.warning,
            },
          ]}>
          <Text fontColor={colors.white}>
            {resultType === 1
              ? 'Выиграли'
              : resultType === 2
              ? 'Ничья'
              : 'Проиграли'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: sizes.dimension.whipRound.height,
    padding: sizes.dimension.screen.padding,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    elevation: 5,
  },

  result: {
    backgroundColor: colors.grey,
    height: 30,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginRight: 10,
  },

  resultGroup: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default Index;
