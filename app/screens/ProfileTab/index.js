import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
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
import * as sizes from 'utils/sizes';
import * as images from 'utils/images';
import * as colors from 'utils/colors';

import {AuthActions} from 'actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const Index = props => {
  const user = props.auth.user;
  return (
    <View style={styles.root}>
      <Header title="Мой профиль" />
      <Space height={20} />
      <TouchableOpacity
        style={styles.profile}
        onPress={() => {
          props.navigation.navigate('ViewMyProfileScreen', {user: user});
        }}>
        <Image circle source={{uri: user.avatar}} width={50} height={50} />
        <Space width={10} />
        <View>
          <Text bold fontSize={sizes.font.large_a}>
            {user.name}
          </Text>
        </View>
      </TouchableOpacity>
      <Space height={40} />
      <IconText
        imageSource={images.icons.plus}
        title="Настройки уведомлений"
        onPress={() => props.navigation.navigate('NotificationSettingsScreen')}
      />
      <IconText imageSource={images.icons.plus} title="Поддержка" />
      <IconText imageSource={images.icons.plus} title="Частые вопросы" />
      <IconText imageSource={images.icons.plus} title="Оценить нас" />
      <IconText imageSource={images.icons.plus} title="Документы" />
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

  profile: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
