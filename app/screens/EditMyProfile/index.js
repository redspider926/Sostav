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
import {Space, Input, Avatar, Header, Image, Loading} from 'components';
import Modal from 'react-native-modal';
import themeStyle from 'utils/style';
import * as sizes from 'utils/sizes';
import * as images from 'utils/images';
import * as colors from 'utils/colors';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import Toast from 'react-native-toast-message';

import {AuthActions} from 'actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const Index = props => {
  const user = props.auth.user;
  const [uri, setUri] = React.useState(user.avatar);
  const [lastName, setLastName] = React.useState(user.lastName);
  const [firstName, setFirstName] = React.useState(user.firstName);
  const [birthday, setBirthday] = React.useState(user.birthday);
  const [phoneNumber, setPhoneNumber] = React.useState(user.phoneNumber);
  const [email, setEmail] = React.useState(user.email);
  //date
  const [show, setShow] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const [loadingState, setLoadingState] = React.useState(false);

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

  const updateUser = async () => {
    let errorMessage = '';

    if (!phoneNumber) {
      errorMessage = 'You should input phone number';
    }

    if (!birthday) {
      errorMessage = 'You should input birthday';
    }

    if (!lastName) {
      errorMessage = 'You should input lastname';
    }

    if (!firstName) {
      errorMessage = 'You should input firstName';
    }

    if (!firstName || !lastName || !birthday || !phoneNumber) {
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
    const updatedUser = {
      id: user.id,
      firstName: firstName,
      lastName: lastName,
      birthday: birthday,
      avatar: avatar,
      phoneNumber: phoneNumber,
      email: email,
    };

    await firestore()
      .collection('Users')
      .where('id', '==', user.id)
      .update(updatedUser)
      .then(async () => {
        console.log('User was successfully updated!');
        await props.authActions.update(updatedUser);
        props.navigation.navigate('TabNav');
      })
      .catch(() => {
        console.log('User update operation was failed!');
      });

    setLoadingState(false);
  };

  async function registerAvatar() {
    var imageRef = storage().ref('/Users').child(user.id);
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

  return (
    <View style={styles.root}>
      <Header
        title="Редактировать профиль"
        leftButtonSource={images.icons.left_arrow}
        rightButtonSource={images.icons.check}
        onLeftButtonPress={() => props.navigation.goBack()}
        onRightButtonPress={updateUser}
      />
      <Toast style={styles.toast} ref={ref => Toast.setRef(ref)} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Space height={40} />
        <Avatar source={{uri: uri}} onPress={() => setIsModalVisible(true)} />
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
          value={changeToMaskedDate(new Date(birthday))}
          onPress={() => {
            setShow(true);
          }}
        />
        <Space height={20} />
        <Input
          editable
          phoneMask
          title="Телефон"
          placeholder="+7 999 888 11 22"
          onChangeText={text => setPhoneNumber(text)}
          value={phoneNumber}
        />
        <Space height={20} />
        <Input
          editable
          title="E-Mail"
          placeholder="mail@mail.ru"
          onChangeText={text => setEmail(text)}
          value={email}
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

const mapStateToProps = state => {
  return {auth: state.auth};
};

const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(AuthActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
