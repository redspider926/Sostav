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
  Button,
  Input,
  TeammateItem,
  Header,
  Image,
  Text,
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
  const team = props.teams.find(_team => _team.id === teamId);

  const [name, setName] = React.useState('');
  const [eventDate, setEventDate] = React.useState(new Date());
  const [eventStartTime, setEventStartTime] = React.useState(new Date());
  const [eventEndTime, setEventEndTime] = React.useState(new Date());
  const [description, setDescription] = React.useState('');
  const [place, setPlace] = React.useState('');
  const opponentId = '6767676';
  const [users, setUsers] = React.useState([]);

  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = React.useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = React.useState(false);

  //loading
  const [loadingState, setLoadingState] = React.useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || eventDate;
    setShowDatePicker(Platform.OS === 'ios');
    setEventDate(currentDate);
  };

  const onChangeStartTime = (event, selectedTime) => {
    const startTime = selectedTime || eventStartTime;
    setShowStartTimePicker(Platform.OS === 'ios');
    setEventStartTime(startTime);
  };

  const onChangeEndTime = (event, selectedTime) => {
    const endTime = selectedTime || eventEndTime;
    setShowEndTimePicker(Platform.OS === 'ios');
    setEventEndTime(endTime);
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

  const changeToMaskedTime = date => {
    var hh = date.getHours().toString();
    var mm = date.getMinutes().toString();
    var hhChars = hh.split('');
    var mmChars = mm.split('');
    return (
      (hhChars[1] ? hh : '0' + hhChars[0]) +
      ' : ' +
      (mmChars[1] ? mm : '0' + mmChars[0])
    );
  };

  const createEvent = async () => {
    let errorMessage = '';

    if (users.length === 0) {
      errorMessage = 'You should choose at least one user for whipRound';
    }

    if (!opponentId) {
      errorMessage = 'You should choose opponent';
    }

    if (!place) {
      errorMessage = 'You should input place';
    }

    if (!description) {
      errorMessage = 'You should input description';
    }

    if (!eventEndTime) {
      errorMessage = 'You should input event endtime';
    }

    if (!eventStartTime) {
      errorMessage = 'You should input event starttime';
    }

    if (!eventDate) {
      errorMessage = 'You should input event date';
    }

    if (!name) {
      errorMessage = 'You should input purpose';
    }

    if (
      !name ||
      !eventDate ||
      !eventStartTime ||
      !eventEndTime ||
      !description ||
      !place ||
      !opponentId ||
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

    const eventId = uuid.v1();

    const usersForEvent = {};
    users.forEach(user => {
      usersForEvent[user] = 1;
      if (user === props.auth.user.id) {
        usersForEvent[user] = 2;
      }
    });

    const event = {
      id: eventId,
      name: name,
      eventDate: eventDate,
      eventStartTime: eventStartTime,
      eventEndTime: eventEndTime,
      description: description,
      teams: [teamId, opponentId],
      users: {
        [teamId]: usersForEvent,
        [opponentId]: {},
      },
      accepted: {
        [teamId]: true,
        [opponentId]: false,
      },
      result: {
        [teamId]: 0,
        [opponentId]: 0,
      },
      completed: false,
    };

    await firestore()
      .collection('Events')
      .doc(eventId)
      .set(event)
      .then(
        () => {
          console.log('Event was successfully created!');
          props.navigation.goBack();
        },
        error => {
          props.navigation.navigate('ErrorScreen', {error: 'NETWORK_ERROR'});
        },
      );

    setLoadingState(false);
  };

  return (
    <View style={styles.root}>
      <Header
        title="Создать событие"
        leftButtonSource={images.icons.left_arrow}
        onLeftButtonPress={() => props.navigation.goBack()}
      />
      <Toast style={styles.toast} ref={ref => Toast.setRef(ref)} />
      <Space height={20} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Input
          editable
          title="Название"
          placeholder="Название события"
          onChangeText={text => setName(text)}
          value={name}
        />
        <Space height={20} />
        <Input
          dateMask
          title="Дата события"
          placeholder="10.03.2019"
          value={changeToMaskedDate(eventDate)}
          onPress={() => {
            setShowDatePicker(true);
          }}
        />
        <Space height={20} />
        <Input
          dateMask
          title="Время начала события"
          placeholder="00 : 00"
          onChangeText={text => setName(text)}
          value={changeToMaskedTime(eventStartTime)}
          onPress={() => {
            setShowStartTimePicker(true);
          }}
        />
        <Space height={20} />
        <Input
          dateMask
          title="Время завершения события"
          placeholder="00 : 00"
          onChangeText={text => setName(text)}
          value={changeToMaskedTime(eventEndTime)}
          onPress={() => {
            setShowEndTimePicker(true);
          }}
        />
        <Space height={20} />
        <Input
          editable
          title="Комментарий"
          placeholder="Описание события"
          onChangeText={text => setDescription(text)}
          value={description}
        />
        <Space height={40} />
        <Text fontSize={sizes.font.large_a} fontColor={colors.darkBlue} bold>
          Выберите место
        </Text>

        <Space height={20} />
        <Input
          editable
          title="Введите адрес места"
          placeholder="Введите адрес места"
          onChangeText={text => setPlace(text)}
          value={place}
        />
        <Space height={40} />
        <Text fontSize={sizes.font.large_a} fontColor={colors.darkBlue} bold>
          Выберите соперника
        </Text>
        <Space height={20} />
        <TouchableOpacity
          style={{
            height: sizes.dimension.teamListItem.height1,
            backgroundColor: colors.gray,
            borderRadius: sizes.dimension.teamListItem.borderRadius,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 10,
            paddingRight: 10,
          }}
          onPress={() => props.navigation.navigate('SelectOpponentScreen')}>
          <View
            style={{
              backgroundColor: colors.grey,
              width: sizes.dimension.teamListItem.image.width,
              height: sizes.dimension.teamListItem.image.height,
            }}
          />
          <Space width={10} />
          <View>
            <View
              style={{width: 50, height: 10, backgroundColor: colors.grey}}
            />
            <Space height={5} />
            <View
              style={{width: 150, height: 10, backgroundColor: colors.grey}}
            />
          </View>
          <Space flex={1} />
          <Image
            source={images.icons.right_arrow}
            icon
            tintColor={colors.main}
          />
        </TouchableOpacity>
        <Space height={20} />
        <Text fontSize={sizes.font.large_a} fontColor={colors.darkBlue} bold>
          Выберите участников: 1
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
        <Button caption="Создать событие" onPress={createEvent} />
        <Space height={40} />
      </ScrollView>

      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker1"
          value={eventDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
        />
      )}

      {showStartTimePicker && (
        <DateTimePicker
          testID="dateTimePicker2"
          value={eventStartTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChangeStartTime}
        />
      )}

      {showEndTimePicker && (
        <DateTimePicker
          testID="dateTimePicker3"
          value={eventEndTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChangeEndTime}
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
  return {auth: state.auth, teams: state.teams};
};

const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(AuthActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
