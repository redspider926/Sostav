import React, {useState, useCallback} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {StyleSheet, View} from 'react-native';
import {Header} from 'components';
import * as sizes from 'utils/sizes';
import * as images from 'utils/images';
import * as colors from 'utils/colors';

import {AuthActions} from 'actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import firestore from '@react-native-firebase/firestore';

import uuid from 'react-native-uuid';

const Index = props => {
  const {teamId} = props.route.params;
  const team = props.teams.find(_team => _team.id === teamId);
  const user = props.auth.user;
  const messages =
    team.messages === undefined || team.messages === null
      ? []
      : Object.values(team.messages);

  const [messageText, setMessageText] = useState('');

  // const onSend = _messages => {
  //   const message = _messages[0];
  //   const messageId = message._id;

  //   firestore()
  //     .collection('Teams')
  //     .doc(teamId)
  //     .update({messages: {[messageId]: message, ...team.messages}})
  //     .then(() => console.log('Message', props.teams))
  //     .catch(() => console.log('Message send failed'));
  // };

  const onSend = () => {
    const messageId = uuid.v1();
    const message = {
      _id: messageId,
      createdAt: Date.now(),
      text: messageText,
      user: {
        _id: user.id,
        name: user.firstName + ' ' + user.lastName,
        avatar: user.avatar,
      },
      deleted: false,
    };
    firestore()
      .collection('Teams')
      .doc(teamId)
      .update({messages: {[messageId]: message, ...team.messages}})
      .then(() => console.log('Message', props.teams))
      .catch(() => console.log('Message send failed'));
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Header
          title="Чат"
          leftButtonSource={images.icons.left_arrow}
          onLeftButtonPress={() => {
            props.navigation.goBack();
          }}
        />
      </View>
      <GiftedChat
        text={messageText}
        onInputTextChanged={text => setMessageText(text)}
        placeholder="Ваше сообщение..."
        messages={messages
          .filter(message => message.deleted === false)
          .sort((a, b) => {
            return a.createdAt < b.createdAt;
          })}
        onSend={() => {
          onSend();
        }}
        user={{
          _id: user.id,
          avatar: user.avatar,
          name: user.firstName + ' ' + user.lastName,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },

  header: {
    padding: sizes.dimension.screen.padding,
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
