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
  Avatar,
  Header,
  Image,
  Text,
  IconText,
} from 'components';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as sizes from 'utils/sizes';
import * as images from 'utils/images';
import * as colors from 'utils/colors';

const Index = props => {
  const [purpose, setPurpose] = React.useState('');
  const [whipRoundDate, setWhipRoundDate] = React.useState(new Date());
  const [amount, setAmount] = React.useState(0);
  const [description, setDescription] = React.useState('');
  const [showDatePicker, setShowDatePicker] = React.useState(false);

  const data = [
    {id: '1', name: 'Пётр Отбивалкин', avatar: images.images.team},
    {id: '2', name: 'Пётр Отбивалкин', avatar: images.images.team},
    {id: '3', name: 'Пётр Отбивалкин', avatar: images.images.team},
    {id: '4', name: 'Пётр Отбивалкин', avatar: images.images.team},
    {id: '5', name: 'Пётр Отбивалкин', avatar: images.images.team},
  ];

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

  return (
    <ScrollView style={styles.root}>
      <Header
        title="Создать сбор"
        leftButtonSource={images.icons.left_arrow}
        onLeftButtonPress={() => props.navigation.goBack()}
      />
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
        onChangeText={text => setAmount(text)}
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
            <TouchableOpacity style={styles.teammate}>
              <RNImage
                source={item.item.avatar}
                style={styles.teammateAvatar}
              />
              <Text center fontSize={sizes.font.small_a}>
                {item.item.name}
              </Text>
            </TouchableOpacity>
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
          testID="dateTimePicker"
          value={whipRoundDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
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
