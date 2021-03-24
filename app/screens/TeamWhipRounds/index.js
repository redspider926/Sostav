import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Space, Header, Image, Text, WhipRound} from 'components';
import * as sizes from 'utils/sizes';
import * as images from 'utils/images';
import * as colors from 'utils/colors';
import themeStyle from 'utils/style';
import Modal from 'react-native-modal';

import {SwipeListView} from 'react-native-swipe-list-view';

import {AuthActions} from 'actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const Index = props => {
  const {teamId} = props.route.params;
  const team = props.teams.find(_team => _team.id === teamId);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [filter, setFilter] = React.useState('uncomplete');

  const userId = props.auth.user.id;

  const completedWhipRounds = props.whipRounds.filter(
    whipRound =>
      whipRound.team === teamId &&
      whipRound.completed === true &&
      (team.users[userId].role < 4 || whipRound.users[userId]),
  );

  const uncompletedWhipRounds = props.whipRounds.filter(
    whipRound =>
      whipRound.team === teamId &&
      whipRound.completed === false &&
      (team.users[userId].role < 4 || whipRound.users[userId]),
  );

  const changeToMaskedDate = date => {
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth() + 1).toString();
    var dd = date.getDate().toString();
    var mmChars = mm.split('');
    var ddChars = dd.split('');

    return (
      (mmChars[1] ? mm : '0' + mmChars[0]) +
      '.' +
      (ddChars[1] ? dd : '0' + ddChars[0]) +
      '.' +
      yyyy
    );
  };

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
        <TouchableOpacity
          style={styles.info}
          onPress={() => setFilter('uncomplete')}>
          <Text>Текущие</Text>
          <Space width={15} />
          <View
            style={[
              styles.infoNumber,
              {
                backgroundColor:
                  filter === 'uncomplete' ? colors.main : colors.grey,
              },
            ]}>
            <Text fontColor={colors.white}>{uncompletedWhipRounds.length}</Text>
          </View>
        </TouchableOpacity>
        <Space width={40} />
        <TouchableOpacity
          style={styles.info}
          onPress={() => setFilter('complete')}>
          <Text>Архивные</Text>
          <Space width={15} />
          <View
            style={[
              styles.infoNumber,
              {
                backgroundColor:
                  filter === 'complete' ? colors.main : colors.grey,
              },
            ]}>
            <Text fontColor={colors.white}>{completedWhipRounds.length}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Space height={10} />
      <SwipeListView
        showsVerticalScrollIndicator={false}
        disableRightSwipe
        data={
          filter === 'uncomplete' ? uncompletedWhipRounds : completedWhipRounds
        }
        keyExtractor={(item, index) => item.id}
        renderItem={({item}) => (
          <WhipRound
            onPress={() =>
              props.navigation.navigate('OneWhipRoundScreen', {
                teamId: teamId,
                whipRoundId: item.id,
              })
            }
            purpose={item.purpose}
            description={item.description}
            date={changeToMaskedDate(new Date(item.whipRoundDate))}
            amount={item.amount}
          />
        )}
        renderHiddenItem={({item}) => {
          return (
            team.users[userId].role < 4 && (
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

      {team.users[userId].role < 4 && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            props.navigation.navigate('CreateWhipRoundScreen', {teamId: teamId})
          }>
          <Image source={images.icons.plus} icon tintColor={colors.white} />
        </TouchableOpacity>
      )}
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

const mapStateToProps = state => {
  return {auth: state.auth, whipRounds: state.whipRounds, teams: state.teams};
};

const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(AuthActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
