import React from 'react';
import {StyleSheet, View, ScrollView, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Space, Button, Input, Avatar, Header} from 'components';
import * as sizes from 'utils/sizes';

const Index = props => {
  const [uri, setUri] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [birthday, setBirthday] = React.useState(new Date());
  //date
  const [show, setShow] = React.useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthday;
    setShow(Platform.OS === 'ios');
    setBirthday(currentDate);
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

  const onCameraButton = () => {
    launchCamera(
      {
        mediaType: 'photo',
        maxHeight: 200,
        maxWidth: 200,
      },
      response => {
        console.log('camera response', response);
        if (response.didCancel) {
        } else if (response.error) {
        } else if (response.customButton) {
        } else {
          setUri(response.uri);
        }
      },
    );
  };

  const onImageButton = () => {
    launchImageLibrary(
      {
        maxWidth: 256,
        maxHeight: 256,
        noData: true,
        mediaType: 'photo',
        storageOptions: {
          skipBackup: true,
        },
      },
      response => {
        if (response.didCancel) {
        } else if (response.error) {
        } else if (response.customButton) {
        } else {
          setUri(response.uri);
        }
      },
    );
  };

  return (
    <View style={styles.root}>
      <Header title="Заполните профиль" />
      <ScrollView>
        <Space height={40} />
        <Avatar
          source={uri ? {uri: uri} : undefined}
          onPress={onCameraButton}
        />
        <Space height={40} />
        <Input
          editable
          title="Имя"
          placeholder="Введите имя"
          onChangeText={text => setLastName(text)}
          value={lastName}
        />
        <Space height={20} />
        <Input
          editable
          title="Фамилия"
          placeholder="Введите фамилию"
          onChangeText={text => setFirstName(text)}
          value={firstName}
        />
        <Space height={20} />
        <Input
          dateMask
          title="День рождения"
          placeholder="00.00.0000"
          onChangeText={text => setBirthday(text)}
          value={changeToMaskedDate(birthday)}
          onPress={() => {
            setShow(true);
          }}
        />
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={birthday}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </ScrollView>

      <Space flex={1} />
      <Button
        caption="Сохранить"
        onPress={() => {
          props.navigation.navigate('TabNav');
        }}
      />
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
});

export default Index;
