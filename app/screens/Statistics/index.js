import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import Modal from 'react-native-modal';
import {Space, TeamListItem, Header, Image, Text} from 'components';
import themeStyle from 'utils/style';
import * as sizes from 'utils/sizes';
import * as images from 'utils/images';
import * as colors from 'utils/colors';

const Index = props => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const data = [
    {
      id: '1',
      avatar: images.images.team,
      name: 'ЦСКА Москва',
      accepted: true,
    },
    {
      id: '2',
      avatar: images.images.team,
      name: 'ЦСКА Москва',
      accepted: true,
    },
    {
      id: '3',
      avatar: images.images.team,
      name: 'ЦСКА Москва',
      accepted: true,
    },
  ];
  return (
    <View style={styles.root}>
      <Header title="Statistics" leftButtonSource={images.icons.left_arrow} />
      <Space height={20} />
      <View style={styles.teamNumberInfo}>
        <View>
          <Text fontSize={sizes.font.middle_b} bold>
            Выиграли
          </Text>
          <Text fontSize={sizes.font.small_b}>120 раз.</Text>
        </View>
        <View>
          <Text fontSize={sizes.font.middle_b} bold>
            Ничья
          </Text>
          <Text fontSize={sizes.font.small_b}>21 раз.</Text>
        </View>
        <View>
          <Text fontSize={sizes.font.middle_b} bold>
            Проиграли
          </Text>
          <Text fontSize={sizes.font.small_b}>16 раз..</Text>
        </View>
      </View>
      <Space height={10} />
      <View style={styles.progressA}>
        <View style={styles.progressB}>
          <View style={styles.progressC} />
        </View>
      </View>
      <Space height={40} />
      <SwipeListView
        disableRightSwipe
        data={data}
        renderItem={(item, rowMap) => (
          <TeamListItem
            onPress={() =>
              props.navigation.navigate('StatisticWithOneTeamScreen')
            }
            avatar={item.item.avatar}
            name={item.item.name}
            accepted={item.item.accepted}
          />
        )}
        renderHiddenItem={(item, rowMap) => {
          return (
            item.item.accepted && (
              <View style={styles.hiddenItem}>
                <TouchableOpacity
                  style={styles.hiddenButton}
                  onPress={() => setIsModalVisible(true)}>
                  <Text fontColor={colors.white}>Удалить</Text>
                </TouchableOpacity>
              </View>
            )
          );
        }}
        rightOpenValue={-100}
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

  hiddenItem: {
    backgroundColor: colors.warning,
    height: 56,
    marginBottom: 10,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  hiddenButton: {
    height: '100%',
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
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
});

export default Index;
