import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Space, Header, Text} from 'components';
import * as sizes from 'utils/sizes';
import * as images from 'utils/images';
import * as colors from 'utils/colors';

const Index = props => {
  return (
    <View style={styles.root}>
      <Header
        title="Сбор"
        leftButtonSource={images.icons.left_arrow}
        onLeftButtonPress={() => props.navigation.goBack()}
      />
      <Space height={20} />
      <Text fontSize={sizes.font.middle_b} bold>
        Цель
      </Text>
      <Space height={20} />
      <Text>
        С другой стороны консультация с широким активом позволяет оценить
        значение соответствующий условий активизации.
      </Text>

      <Space height={20} />
      <View style={styles.group1}>
        <Text fontSize={sizes.font.middle_b} bold>
          Цель
        </Text>
        <Text>16 000 руб.</Text>
        <View style={styles.progress}>
          <View
            style={[
              styles.progress,
              {width: '70%', backgroundColor: colors.main},
            ]}
          />
        </View>
      </View>
      <Space height={20} />
      <View style={styles.group2}>
        <View style={{flex: 1}}>
          <Text fontSize={sizes.font.middle_b} bold>
            Сумма
          </Text>
          <Text>32 000 руб.</Text>
        </View>
        <View style={{flex: 1}}>
          <Text fontSize={sizes.font.middle_b} bold>
            Дедлайн
          </Text>
          <Text>22.06.20</Text>
        </View>
      </View>
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

  progress: {
    height: 10,
    borderRadius: 10,
    width: '100%',
    backgroundColor: colors.grey,
  },

  group1: {
    height: 100,
    width: '100%',
    backgroundColor: colors.gray,
    padding: sizes.dimension.screen.padding,
    justifyContent: 'space-between',
    borderRadius: 5,
  },

  group2: {
    height: 100,
    width: '100%',
    backgroundColor: colors.gray,
    padding: sizes.dimension.screen.padding,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Index;
