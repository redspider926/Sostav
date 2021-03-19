import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {Space, Header, TeamListItem, Text, Event} from 'components';
import * as sizes from 'utils/sizes';
import * as images from 'utils/images';
import * as colors from 'utils/colors';

const Index = props => {
  const data = [
    {
      id: '1',
      avatar: images.images.team,
      name: 'ЦСКА Москва',
      accepted: true,
    },
    {
      id: '2',
      avatar: images.images.team,
      name: 'ЦСКА Москва',
      accepted: true,
    },
    {
      id: '3',
      avatar: images.images.team,
      name: 'ЦСКА Москва',
      accepted: true,
    },
  ];

  return (
    <View style={styles.root}>
      <Header
        title="Список сборов"
        leftButtonSource={images.icons.left_arrow}
      />
      <Space height={20} />
      <Text fontSize={sizes.font.middle_b}>Создайте событие</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id}
        renderItem={item => (
          <TeamListItem
            onPress={() => props.navigation.navigate('TeamWhipRoundsScreen')}
            avatar={item.item.avatar}
            name={item.item.name}
            accepted={item.item.accepted}
          />
        )}
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
