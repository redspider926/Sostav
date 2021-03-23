import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Space, Header, Image, Text, WhipRound} from 'components';
import * as sizes from 'utils/sizes';
import * as images from 'utils/images';
import * as colors from 'utils/colors';
import themeStyle from 'utils/style';
import Modal from 'react-native-modal';

import {SwipeListView} from 'react-native-swipe-list-view';

const Index = props => {
  const {team} = props.route.params;
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const data = [
    {
      id: '1',
      purpose: 'Игра за 1/2 полуфинала',
      description:
        'С другой стороны консультация с широким активом позволяет оценить значение....',
      date: '22.06.2020',
      amount: 3000,
    },
    {
      id: '2',
      purpose: 'Игра за 1/2 полуфинала',
      description:
        'С другой стороны консультация с широким активом позволяет оценить значение....',
      date: '22.06.2020',
      amount: 2000,
    },
    {
      id: '3',
      purpose: 'Игра за 1/2 полуфинала',
      description:
        'С другой стороны консультация с широким активом позволяет оценить значение....',
      date: '22.06.2020',
      amount: 2500,
    },
  ];
  return (
    <View style={styles.root}>
      <Header
        title="Список сборов"
        leftButtonSource={images.icons.left_arrow}
        onLeftButtonPress={() => {
          props.navigation.goBack();
        }}
      />
      <Space height={20} />
      {/* <Text fontSize={sizes.font.middle_b}>
        Создайте свою спортивную команду!
      </Text> */}
      <View style={styles.infoGroup}>
        <View style={styles.info}>
          <Text>Текущие</Text>
          <Space width={15} />
          <View style={[styles.infoNumber, {backgroundColor: colors.main}]}>
            <Text fontColor={colors.white}>5</Text>
          </View>
        </View>
        <Space width={40} />
        <View style={styles.info}>
          <Text>Архивные</Text>
          <Space width={15} />
          <View style={[styles.infoNumber, {backgroundColor: colors.grey}]}>
            <Text fontColor={colors.white}>2</Text>
          </View>
        </View>
      </View>
      <Space height={10} />
      <SwipeListView
        showsVerticalScrollIndicator={false}
        disableRightSwipe
        data={data}
        renderItem={(item, rowMap) => (
          <WhipRound
            onPress={() => props.navigation.navigate('OneWhipRoundScreen')}
            purpose={item.item.purpose}
            description={item.item.description}
            date={item.item.date}
            amount={item.item.amount}
          />
        )}
        renderHiddenItem={(item, rowMap) => {
          return (
            item.item.type !== 3 && (
              <View style={styles.hiddenItem}>
                <TouchableOpacity
                  style={styles.button1}
                  onPress={() => setIsModalVisible(true)}>
                  <Text fontColor={colors.white}>Завершить</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button2}
                  onPress={() => setIsModalVisible(true)}>
                  <Text fontColor={colors.white}>Удалить</Text>
                </TouchableOpacity>
              </View>
            )
          );
        }}
        rightOpenValue={-200}
      />

      <Modal
        useNativeDriverForBackdrop
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}>
        <View style={themeStyle.modalRootContainer}>
          <View style={themeStyle.modalContainer}>
            <Text
              fontSize={sizes.font.large_a}
              fontColor={colors.darkBlue}
              bold>
              Выберите место
            </Text>
            <Text fontSize={sizes.font.middle_b} fontColor={colors.darkGray}>
              Примите приглашение в событие от соперника
            </Text>
            <Space flex={1} />
            <View style={themeStyle.modalButtonGroup}>
              <TouchableOpacity
                style={[
                  themeStyle.modalButton,
                  {borderColor: colors.main, borderWidth: 1},
                ]}>
                <Text fontColor={colors.main}>Создать событие</Text>
              </TouchableOpacity>
              <Space width={sizes.dimension.screen.padding} />
              <TouchableOpacity
                style={[
                  themeStyle.modalButton,
                  {backgroundColor: colors.main},
                ]}>
                <Text fontColor={colors.white}>Создать событие</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          props.navigation.navigate('CreateWhipRoundScreen', {team: team})
        }>
        <Image source={images.icons.plus} icon tintColor={colors.white} />
      </TouchableOpacity>
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

  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: sizes.dimension.button.height,
    height: sizes.dimension.button.height,
    borderRadius: sizes.dimension.button.height,
    backgroundColor: colors.main,
    alignItems: 'center',
    justifyContent: 'center',
  },

  hiddenItem: {
    backgroundColor: colors.main,
    height: sizes.dimension.whipRound.height,
    marginBottom: 10,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  button1: {
    height: '100%',
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },

  button2: {
    height: '100%',
    width: 100,
    backgroundColor: colors.warning,
    alignItems: 'center',
    justifyContent: 'center',
  },

  infoGroup: {
    display: 'flex',
    flexDirection: 'row',
  },

  info: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  infoNumber: {
    width: 30,
    height: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Index;
