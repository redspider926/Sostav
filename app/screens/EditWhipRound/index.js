import React from 'react';
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image as RNImage,
  View,
  Platform,
} from 'react-native';
import {
  Space,
  Input,
  Header,
  Image,
  Text,
  TeammateItem,
  Loading,
} from 'components';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as sizes from 'utils/sizes';
import * as images from 'utils/images';
import * as colors from 'utils/colors';

import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';

import {AuthActions} from 'actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const Index = props => {
  const {teamId, whipRoundId} = props.route.params;
  const team = props.teams.find(_team => _team.id === teamId);
  const whipRound = props.whipRounds.find(
    _whipRound => _whipRound.id === whipRoundId,
  );

  const [purpose, setPurpose] = React.useState(whipRound.purpose);
  const [whipRoundDate, setWhipRoundDate] = React.useState(new Date());
  const [amount, setAmount] = React.useState(whipRound.amount);
  const [description, setDescription] = React.useState(whipRound.description);
  const [users, setUsers] = React.useState(whipRound.users);

  const [showDatePicker, setShowDatePicker] = React.useState(false);
  //loading
  const [loadingState, setLoadingState] = React.useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || whipRoundDate;
    setShowDatePicker(Platform.OS === 'ios');
    setWhipRoundDate(currentDate);
  };

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

  const updateWhipRound = async () => {
    let errorMessage = '';

    if (!description) {
      errorMessage = 'You should input description';
    }

    if (!amount) {
      errorMessage = 'You should input amount';
    }

    if (!whipRoundDate) {
      errorMessage = 'you should input whipRound Date';
    }

    if (!purpose) {
      errorMessage = 'You should input purpose';
    }

    if (users.length === 0) {
      errorMessage = 'You should choose at least one user for whipRound';
    }

    if (
      !purpose ||
      !whipRoundDate ||
      !amount ||
      !description ||
      users.length === 0
    ) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: errorMessage,
        visibilityTime: 1000,
      });

      return false;
    }

    setLoadingState(true);

    const updatedWhipRound = {
      id: whipRoundId,
      purpose: purpose,
      whipRoundDate: whipRoundDate,
      amount: amount * 1,
      currentAmount: whipRound.currentAmount,
      description: description,
      users: users,
      team: team.id,
      completed: whipRound.completed,
    };

    await firestore()
      .collection('WhipRounds')
      .doc(whipRoundId)
      .update(updatedWhipRound)
      .then(() => {
        console.log('WhipRound was successfully created!');
        props.navigation.goBack();
      })
      .catch(() => {
        console.log('WhipRound create operation was failed!');
      });

    setLoadingState(false);
  };

  return (
    <View style={styles.root}>
      <Header
        title="Создать сбор"
        leftButtonSource={images.icons.left_arrow}
        rightButtonSource={images.icons.check}
        onLeftButtonPress={() => props.navigation.goBack()}
        onRightButtonPress={updateWhipRound}
      />
      <Toast style={styles.toast} ref={ref => Toast.setRef(ref)} />
      <ScrollView>
        <Space height={20} />
        <Input
          editable
          title="Цель"
          placeholder="Ввведите цель сбора"
          onChangeText={text => setPurpose(text)}
          value={purpose}
        />
        <Space height={20} />
        <Input
          dateMask
          title="Дата дедлайна"
          placeholder="10.03.2019"
          value={changeToMaskedDate(whipRoundDate)}
          onPress={() => {
            setShowDatePicker(true);
          }}
        />
        <Space height={20} />
        <Input
          editable
          title="Сумма"
          placeholder="0 ₽"
          onChangeText={text => setAmount(text * 1)}
          value={amount.toString()}
        />
        <Space height={20} />
        <Input
          editable
          title="Описание"
          placeholder="Описание"
          onChangeText={text => setDescription(text)}
          value={description}
        />
        <Space height={40} />
        <Text fontSize={sizes.font.large_a} fontColor={colors.darkBlue} bold>
          Выберите участников
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
                selected={users.some(user => user === item.id)}
                onPress={() => {
                  if (users.some(user => user === item.id)) {
                    setUsers(users.filter(user => user !== item.id));
                  } else {
                    setUsers([...users, item.id]);
                  }
                }}
              />
            );
          }}
        />

        <Space height={20} />
        <TouchableOpacity style={styles.selecteAllButton}>
          <Image source={images.icons.team} icon tintColor={colors.main} />
          <Space width={10} />
          <Text fontSize={sizes.font.middle_b} fontColor={colors.main}>
            Выбрать всех
          </Text>
        </TouchableOpacity>
        <Space height={20} />
      </ScrollView>

      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={whipRoundDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
        />
      )}
      {loadingState && <Loading />}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: sizes.dimension.screen.padding,
    flexGrow: 1,
    width: '100%',
    backgroundColor: 'white',
  },

  selecteAllButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  teammate: {
    width: sizes.dimension.teammateItem.avatarSize,
    marginRight: 20,
  },

  teammateAvatar: {
    width: sizes.dimension.teammateItem.avatarSize,
    height: sizes.dimension.teammateItem.avatarSize,
    borderRadius: sizes.dimension.teammateItem.avatarBorderRadius,
  },

  toast: {
    zIndex: 10000,
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
