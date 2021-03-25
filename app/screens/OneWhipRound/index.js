import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  Space,
  Header,
  Text,
  TeammateItem,
  Image,
  Input,
  Button,
} from 'components';
import RBSheet from 'react-native-raw-bottom-sheet';
import * as sizes from 'utils/sizes';
import * as images from 'utils/images';
import * as colors from 'utils/colors';

import {AuthActions} from 'actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import firestore from '@react-native-firebase/firestore';

const Index = props => {
  const [addedMoney, setAddedMoney] = React.useState('');
  const refRBSheet = React.useRef();
  const refRBSheet_1 = React.useRef();

  const userId = props.auth.user.id;
  const {teamId, whipRoundId} = props.route.params;
  const team = props.teams.find(_team => _team.id === teamId);
  const whipRound = props.whipRounds.find(
    _whipRound => _whipRound.id === whipRoundId,
  );

  const deleteWhipRound = () => {
    firestore()
      .collection('WhipRounds')
      .doc(whipRoundId)
      .delete()
      .then(() => {})
      .catch(() => {});
  };

  const completeWhipRound = () => {
    firestore()
      .collection('WhipRounds')
      .doc(whipRoundId)
      .update({...whipRound, completed: true})
      .then(() => {})
      .catch(() => {});
  };

  const repairWhipRound = () => {
    firestore()
      .collection('WhipRounds')
      .doc(whipRoundId)
      .update({...whipRound, completed: false})
      .then(() => {})
      .catch(() => {});
  };

  return (
    <View style={styles.root}>
      <Header
        title="Сбор"
        leftButtonSource={images.icons.left_arrow}
        rightButtonSource={team.users[userId].role < 4 && images.icons.more}
        onLeftButtonPress={() => props.navigation.goBack()}
        onRightButtonPress={() => {
          refRBSheet_1.current.open();
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Space height={20} />
        <View style={styles.completedState}>
          <Text>Архив</Text>
        </View>
        <Space height={20} />
        <Text fontSize={sizes.font.middle_b} bold>
          Цель
        </Text>
        <Space height={20} />
        <Text>{whipRound.purpose}</Text>

        <Space height={40} />
        <View style={styles.group1}>
          <Text fontSize={sizes.font.middle_b} bold>
            Цель
          </Text>
          <Text>{whipRound.currentAmount} руб.</Text>
          <View style={styles.progress}>
            <View
              style={[
                styles.progress,
                {
                  width:
                    (whipRound.currentAmount / whipRound.amount) * 100 + '%',
                  backgroundColor: colors.main,
                },
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
            <Text>{whipRound.amount} руб.</Text>
          </View>
          <View style={{flex: 1}}>
            <Text fontSize={sizes.font.middle_b} bold>
              Дедлайн
            </Text>
            <Text>{whipRound.whipRoundDate.toString()}</Text>
          </View>
        </View>
        <Space height={40} />
        <Text fontSize={sizes.font.large_a} bold>
          Список участников
        </Text>
        <Space height={20} />

        <FlatList
          horizontal={true}
          data={Object.values(team.users)}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => item.id}
          renderItem={({item}) => {
            return (
              <TeammateItem
                avatar={item.avatar}
                name={item.name}
                onPress={() => {}}
                selected={whipRound.users.some(user => item.id === user)}
              />
            );
          }}
        />
        <Space height={40} />
        <Text fontSize={sizes.font.large_a} bold>
          Описание
        </Text>
        <Space height={10} />
        <Text>{whipRound.description}</Text>
        <Space height={40} />
        {team.users[userId].role < 4 && (
          <View style={{alignSelf: 'flex-end'}}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                refRBSheet.current.open();
              }}>
              <Text bold>Внести</Text>
              <Space width={10} />
              <View style={styles.buttonPlusPart}>
                <Image
                  source={images.icons.plus}
                  icon
                  tintColor={colors.white}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}

        <Space height={70} />
      </ScrollView>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        customStyles={{
          container: {
            justifyContent: 'space-between',
            borderTopLeftRadius: sizes.dimension.bottomSheet.borderRadius,
            borderTopRightRadius: sizes.dimension.bottomSheet.borderRadius,
            padding: 20,
            height: 300,
          },
          wrapper: {
            backgroundColor: '#00000044',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <View style={styles.teamTitleInSheet}>
          <Image source={images.images.team} width={56} height={56} circle />
          <Space width={20} />
          <Text fontSize={sizes.font.middle_b} bold>
            Иван Пупкин
          </Text>
        </View>
        <Text>Введите сумму игрока</Text>
        <Input
          editable
          codeMask
          placeholder="Введите сумму"
          onChangeText={text => setAddedMoney(text)}
          value={addedMoney}
        />

        <Button
          caption="Добавить сумму"
          buttonColor={colors.main}
          textColor={colors.white}
        />
      </RBSheet>

      <RBSheet
        ref={refRBSheet_1}
        closeOnDragDown={true}
        customStyles={{
          container: {
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: sizes.dimension.bottomSheet.borderRadius,
            borderTopRightRadius: sizes.dimension.bottomSheet.borderRadius,
          },
          wrapper: {
            backgroundColor: '#00000044',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <Space flex={1} />
        <TouchableOpacity
          onPress={() => {
            refRBSheet_1.current.close();
            props.navigation.navigate('EditWhipRoundScreen', {
              teamId: teamId,
              whipRoundId: whipRoundId,
            });
          }}>
          <Space height={15} />
          <Text fontSize={sizes.font.large_a} fontColor={colors.main}>
            Изменить
          </Text>
          <Space height={15} />
        </TouchableOpacity>
        <View style={styles.sheetSplitLine} />
        <TouchableOpacity
          onPress={() => {
            refRBSheet_1.current.close();
            if (whipRound.completed) {
              repairWhipRound();
            } else {
              completeWhipRound();
            }
          }}>
          <Space height={15} />
          <Text fontSize={sizes.font.large_a} fontColor={colors.main}>
            {/* Завершить */}
            {whipRound.completed ? 'Repair' : 'Завершить'}
          </Text>
          <Space height={15} />
        </TouchableOpacity>
        <View style={styles.sheetSplitLine} />
        <TouchableOpacity
          onPress={async () => {
            refRBSheet_1.current.close();
            await props.navigation.goBack();
            deleteWhipRound();
          }}>
          <Space height={15} />
          <Text fontSize={sizes.font.large_a} fontColor={colors.warning}>
            Удалить
          </Text>
          <Space height={15} />
        </TouchableOpacity>
        <Space flex={1} />
      </RBSheet>
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

  button: {
    width: 130,
    height: 56,
    borderRadius: 56,
    backgroundColor: colors.white,
    elevation: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  buttonPlusPart: {
    width: 56,
    height: 56,
    borderRadius: 56,
    backgroundColor: colors.main,
    alignItems: 'center',
    justifyContent: 'center',
  },

  teamTitleInSheet: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  sheetSplitLine: {
    height: 1,
    width: '100%',
    backgroundColor: colors.grey,
  },

  completedState: {
    height: 40,
    width: 100,
    backgroundColor: colors.grey,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => {
  return {auth: state.auth, teams: state.teams, whipRounds: state.whipRounds};
};

const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(AuthActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
