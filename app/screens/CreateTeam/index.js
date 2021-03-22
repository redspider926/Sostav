import React from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import {Space, Button, Input, Avatar, Header, Image, Loading} from 'components';
import * as sizes from 'utils/sizes';
import * as images from 'utils/images';
import * as colors from 'utils/colors';
import themeStyle from 'utils/style';
import Toast from 'react-native-toast-message';
import Modal from 'react-native-modal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

import uuid from 'react-native-uuid';

const Index = props => {
  const [uri, setUri] = React.useState('');
  const [teamName, setTeamName] = React.useState('');
  const myRole = null;
  const teamType = null;

  const [isModalVisible, setIsModalVisible] = React.useState(false);
  //loading
  const [loadingState, setLoadingState] = React.useState(false);

  const registerTeam = async () => {
    let errorMessage = '';

    if (teamType === null) {
      errorMessage = 'You should choose team type';
    }

    if (myRole === null) {
      errorMessage = 'You should choose your rold in new team';
    }

    if (!teamName) {
      errorMessage = 'You should input firstName';
    }

    if (!teamName || myRole === null || !teamType === null) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: errorMessage,
        visibilityTime: 1000,
      });

      return false;
    }

    const teamId = uuid.v1();

    setLoadingState(true);
    const avatar = await registerAvatar(teamId);
    console.log('avatar', avatar);
    const team = {
      id: teamId,
      name: teamName,
      avatar: avatar,
      type: teamType,
    };

    await firestore()
      .collection('Teams')
      .add(team)
      .then(() => {
        console.log('Team was successfully registered!');
        props.navigation.navigate('TabNav');
      })
      .catch(() => {
        console.log('User register operation was failed!');
      });

    setLoadingState(false);
  };

  async function registerAvatar(teamId) {
    var imageRef = storage().ref('/Users').child(teamId);
    let avatar =
      'https://firebasestorage.googleapis.com/v0/b/sostav-64ab4.appspot.com/o/avatar.jpg?alt=media&token=b65b4f4e-2ce8-491c-a6dc-8d642bd7487c';
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

  const onCameraButton = () => {
    launchCamera(
      {
        mediaType: 'photo',
        maxHeight: 256,
        maxWidth: 256,
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
      <Header
        leftButtonSource={images.icons.left_arrow}
        title="Создание команды"
      />
      <Toast style={styles.toast} ref={ref => Toast.setRef(ref)} />
      <ScrollView>
        <Space height={40} />
        <Avatar
          rectangle
          source={uri ? {uri: uri} : undefined}
          onPress={() => setIsModalVisible(true)}
        />
        <Space height={40} />
        <Input
          editable
          title="Название"
          placeholder="Название команды"
          onChangeText={text => setTeamName(text)}
          value={teamName}
        />
        <Space height={20} />
        <Input
          title="Моя роль в команде"
          placeholder="Администратор, тренер или капитан"
          value=""
          onPress={() => {
            props.navigation.navigate('SelectRoleScreen');
          }}
        />
        <Space height={20} />
        <Input
          title="Вид спорта"
          placeholder="Выберите вид вашего спорта"
          value=""
          onPress={() => {
            props.navigation.navigate('SelectTypeScreen');
          }}
        />
      </ScrollView>

      <Space flex={1} />
      <Button caption="Создать команду" onPress={registerTeam} />
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
