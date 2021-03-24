import React from 'react';
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  View,
  Platform,
} from 'react-native';
import {
  Space,
  Button,
  Input,
  TeammateItem,
  Header,
  Image,
  Text,
  Title,
  Loading,
} from 'components';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as sizes from 'utils/sizes';
import * as images from 'utils/images';
import * as colors from 'utils/colors';

import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid';

import firestore from '@react-native-firebase/firestore';

import {AuthActions} from 'actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const Index = props => {
  const {teamId} = props.route.params;
  const userId = props.auth.user.id;
  const team = props.teams.find(_team => _team.id === teamId);

  const [purpose, setPurpose] = React.useState('');
  const [whipRoundDate, setWhipRoundDate] = React.useState(new Date());
  const [amount, setAmount] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [users, setUsers] = React.useState([]);
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

  const createWhipRound = async () => {
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

    const whipRoundId = uuid.v1();

    const whipRound = {
      id: whipRoundId,
      purpose: purpose,
      whipRoundDate: whipRoundDate,
      amount: amount,
      description: description,
      users: users,
      team: team.id,
      completed: false,
    };

    await firestore()
      .collection('WhipRounds')
      .doc(whipRoundId)
      .set(whipRound)
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
        onLeftButtonPress={() => props.navigation.goBack()}
      />
      <Toast style={styles.toast} ref={ref => Toast.setRef(ref)} />
      <Space height={20} />
      <ScrollView>
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
          onChangeText={text => setAmount(text)}
          value={amount}
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
        <Title title="Выберите участников" />
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
                name={item.firstName + ' ' + item.lastName}
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
        <Button caption="Создать событие" onPress={createWhipRound} />
        <Space height={40} />
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
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },

  selecteAllButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  toast: {
    zIndex: 10000,
  },
});

const mapStateToProps = state => {
  return {auth: state.auth, teams: state.teams};
};

const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(AuthActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
