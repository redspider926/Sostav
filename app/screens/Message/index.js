import React, {useState, useCallback} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {StyleSheet, View} from 'react-native';
import {Header} from 'components';
import * as sizes from 'utils/sizes';
import * as images from 'utils/images';
import * as colors from 'utils/colors';

const Index = props => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');

  const onSend = useCallback((_messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, _messages),
    );
  }, []);

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
        messages={messages}
        onSend={_messages => onSend(_messages)}
        user={{
          _id: 1,
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

export default Index;
