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
} from 'components';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as sizes from 'utils/sizes';
import * as images from 'utils/images';
import * as colors from 'utils/colors';

const Index = props => {
  const [name, setName] = React.useState('');
  const [eventDate, setEventDate] = React.useState(new Date());
  const [eventStartTime, setEventStartTime] = React.useState(new Date());
  const [eventEndTime, setEventEndTime] = React.useState(new Date());
  const [description, setDescription] = React.useState('');
  const [place, setPlace] = React.useState('');
  const [users, setUsers] = React.useState([]);

  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = React.useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = React.useState(false);

  //loading
  const [loadingState, setLoadingState] = React.useState(false);

  const data = [
    {id: '1', name: 'Пётр Отбивалкин', avatar: images.images.team},
    {id: '2', name: 'Пётр Отбивалкин', avatar: images.images.team},
    {id: '3', name: 'Пётр Отбивалкин', avatar: images.images.team},
    {id: '4', name: 'Пётр Отбивалкин', avatar: images.images.team},
    {id: '5', name: 'Пётр Отбивалкин', avatar: images.images.team},
  ];

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

  return (
    <ScrollView style={styles.root}>
      <Header
        title="Создать событие"
        leftButtonSource={images.icons.left_arrow}
        onLeftButtonPress={() => props.navigation.goBack()}
      />
      <Space height={20} />
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
          <View style={{width: 50, height: 10, backgroundColor: colors.grey}} />
          <Space height={5} />
          <View
            style={{width: 150, height: 10, backgroundColor: colors.grey}}
          />
        </View>
        <Space flex={1} />
        <Image source={images.icons.right_arrow} icon tintColor={colors.main} />
      </TouchableOpacity>
      <Space height={20} />
      <Text fontSize={sizes.font.large_a} fontColor={colors.darkBlue} bold>
        Выберите участников: 1
      </Text>
      <Space height={20} />

      <FlatList
        horizontal={true}
        data={data}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => item.id}
        renderItem={item => {
          return (
            <TeammateItem
              avatar={item.item.avatar}
              name={item.item.name}
              onPress={() => {}}
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
      <Button caption="Создать событие" />
      <Space height={40} />

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
    </ScrollView>
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
});

export default Index;
