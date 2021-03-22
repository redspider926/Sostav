import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Space, Button, Input, Avatar, Header, Loading, Image} from 'components';
import * as sizes from 'utils/sizes';
import * as images from 'utils/images';
import * as colors from 'utils/colors';
import themeStyle from 'utils/style';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

const Index = props => {
  const [uri, setUri] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [birthday, setBirthday] = React.useState(new Date());
  //date
  const [show, setShow] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const id = auth().currentUser.uid;
  const phoneNumber = auth().currentUser.phoneNumber;
  //loading
  const [loadingState, setLoadingState] = React.useState(false);

  const registerUser = async () => {
    let errorMessage = '';

    if (!birthday) {
      errorMessage = 'You should input birthday';
    }

    if (!lastName) {
      errorMessage = 'You should input lastname';
    }

    if (!firstName) {
      errorMessage = 'You should input firstName';
    }

    if (!firstName || !lastName || !birthday) {
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
    const avatar = await registerAvatar();
    console.log('avatar', avatar);
    const user = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      birthday: birthday,
      avatar: avatar,
      phoneNumber: phoneNumber,
    };

    await firestore()
      .collection('Users')
      .add(user)
      .then(() => {
        console.log('User was successfully registered!');
        props.navigation.navigate('TabNav');
      })
      .catch(() => {
        console.log('User register operation was failed!');
      });

    setLoadingState(false);
  };

  async function registerAvatar() {
    var imageRef = storage().ref('/Users').child(id);
    let avatar =
      'https://firebasestorage.googleapis.com/v0/b/sostav-64ab4.appspot.com/o/Default%2Fuser.jpg?alt=media&token=2da72447-2393-4ee7-9040-8f1c3fb0fe78';
    if (uri) {
      await imageRef
        .putFile(uri)
        .then(snapshot => {
          avatar = imageRef.getDownloadURL();
        })
        .catch(error => {});
    }

    return avatar;
  }

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
        setIsModalVisible(false);
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
        setIsModalVisible(false);
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
      <Toast style={styles.toast} ref={ref => Toast.setRef(ref)} />
      <ScrollView>
        <Space height={40} />
        <Avatar
          source={uri ? {uri: uri} : undefined}
          onPress={() => setIsModalVisible(true)}
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
      <Button caption="Сохранить" onPress={registerUser} />
      <Modal
        useNativeDriverForBackdrop
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}>
        <View style={themeStyle.modalRootContainer}>
          <View style={themeStyle.avatarModalContainer}>
            <TouchableOpacity
              style={themeStyle.avatarModalButton}
              onPress={onCameraButton}>
              <Image
                source={images.icons.camera}
                width={30}
                height={30}
                tintColor={colors.main}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={themeStyle.avatarModalButton}
              onPress={onImageButton}>
              <Image
                source={images.icons.image}
                width={30}
                height={30}
                tintColor={colors.main}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {loadingState && <Loading />}
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

  toast: {
    zIndex: 10000,
  },
});

export default Index;
