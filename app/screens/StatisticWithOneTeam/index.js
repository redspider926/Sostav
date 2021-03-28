import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import Modal from 'react-native-modal';
import {
  Space,
  TeamListItem,
  Header,
  Button,
  Text,
  Title,
  Statistic,
} from 'components';
import themeStyle from 'utils/style';
import * as sizes from 'utils/sizes';
import * as images from 'utils/images';
import * as colors from 'utils/colors';

const Index = props => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const data = [
    {
      id: '1',
      name: 'Игра за 1/2 полуфинала',
      description:
        'С другой стороны консультация с широким активом позволяет оценить значение....',
      resultValue: '1:2',
      resultType: 1,
    },
    {
      id: '2',
      name: 'Игра за 1/2 полуфинала',
      description:
        'С другой стороны консультация с широким активом позволяет оценить значение....',
      resultValue: '1:1',
      resultType: 2,
    },
    {
      id: '3',
      name: 'Игра за 1/2 полуфинала',
      description:
        'С другой стороны консультация с широким активом позволяет оценить значение....',
      resultValue: '5:3',
      resultType: 3,
    },
  ];
  return (
    <View style={styles.root}>
      <Header title="Statistics" leftButtonSource={images.icons.left_arrow} />
      <Space height={20} />
      <Title title="Ваш соперник" />
      <TeamListItem avatar={images.images.team} name="Elena" />
      <Space height={40} />
      <SwipeListView
        showsVerticalScrollIndicator={false}
        disableRightSwipe
        data={data}
        renderItem={(item, rowMap) => (
          <Statistic
            onPress={() => props.navigation.navigate('OneStatisticScreen')}
            name={item.item.name}
            description={item.item.description}
            resultValue={item.item.resultValue}
            resultType={item.item.resultType}
          />
        )}
        renderHiddenItem={(item, rowMap) => {
          return (
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

  teamNumberInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  progressA: {
    height: 10,
    borderRadius: 10,
    width: '100%',
    backgroundColor: colors.warning,
    display: 'flex',
    flexDirection: 'row',
  },
  progressB: {
    height: 10,
    borderRadius: 10,
    width: '90%',
    backgroundColor: colors.yellow,
    display: 'flex',
    flexDirection: 'row',
  },
  progressC: {
    height: 10,
    borderRadius: 10,
    width: '80%',
    backgroundColor: colors.main,
    display: 'flex',
    flexDirection: 'row',
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
});

export default Index;
