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
} from 'components';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as sizes from 'utils/sizes';
import * as images from 'utils/images';
import * as colors from 'utils/colors';

const Index = props => {
  const {team} = props.route.params;

  const [purpose, setPurpose] = React.useState('');
  const [whipRoundDate, setWhipRoundDate] = React.useState(new Date());
  const [amount, setAmount] = React.useState(0);
  const [description, setDescription] = React.useState('');
  const [showDatePicker, setShowDatePicker] = React.useState(false);

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
    <View style={styles.root}>
      <Header
        title="Создать сбор"
        leftButtonSource={images.icons.left_arrow}
        onLeftButtonPress={() => props.navigation.goBack()}
      />
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
