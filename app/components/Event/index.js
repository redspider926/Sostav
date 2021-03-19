import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

import Text from '../Text';
import Button from '../Button';

import * as sizes from 'utils/sizes';
import * as colors from 'utils/colors';

const Index = props => {
  const {
    eventName,
    eventOpponent,
    description,
    date,
    startAndEndTime,
    type,
    onPress,
  } = props;
  return (
    <TouchableOpacity onPress={onPress} style={styles.root} activeOpacity={1}>
      <Text bold fontSize={sizes.font.large_a}>
        {eventName}
      </Text>
      <Text fontSize={sizes.font.middle_a} fontColor={colors.darkGray}>
        {eventOpponent}
      </Text>
      <Text fontSize={sizes.font.middle_a}>{description}</Text>
      <View style={styles.dateTimeViewGroup}>
        <View style={styles.dateTimeView}>
          <Text>{date}</Text>
        </View>
        <View style={styles.dateTimeView}>
          <Text>{startAndEndTime}</Text>
        </View>
      </View>
      {type === 1 ? (
        <Button
          borderColor={colors.main}
          buttonColor={colors.white}
          textColor={colors.main}
          caption="Проложить маршрут"
        />
      ) : type === 2 ? (
        <Button
          borderColor="#00DB4B22"
          buttonColor={colors.white}
          textColor="#00DB4B22"
          caption="Проложить маршрут"
        />
      ) : (
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.buttonGroupButton}>
            <Text bold fontSize={sizes.font.large_a} fontColor={colors.warning}>
              Отклонить
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonGroupButton}>
            <Text bold fontSize={sizes.font.large_a} fontColor={colors.main}>
              Принять
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {type === 3 && (
        <View style={styles.buttonLineGroup}>
          <View
            style={[styles.buttonLine, {backgroundColor: colors.warning}]}
          />

          <View style={[styles.buttonLine, {backgroundColor: colors.main}]} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: sizes.dimension.event.height,
    padding: sizes.dimension.screen.padding,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    elevation: 5,
  },

  dateTimeView: {
    backgroundColor: colors.grey,
    height: 30,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginRight: 10,
  },

  dateTimeViewGroup: {
    display: 'flex',
    flexDirection: 'row',
  },

  buttonGroup: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  buttonGroupButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonLineGroup: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
  },

  buttonLine: {
    flex: 1,
    height: 3,
  },
});

export default Index;
