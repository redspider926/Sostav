import React from 'react';
import {StyleSheet, TouchableOpacity, View, FlatList} from 'react-native';
import {Text, Image, Header, Input, Space, ImageTextPlus} from 'components';
import * as sizes from 'utils/sizes';
import * as images from 'utils/images';
import * as colors from 'utils/colors';

const Index = props => {
  const data = [
    {
      id: '1',
      name: 'Канадский стафф',
      role: 'admin',
      avatar: images.images.team,
    },
    {id: '2', name: 'Арсенал', role: 'admin', avatar: images.images.team},
    {id: '3', name: 'Суприм', role: 'admin', avatar: images.images.team},
    {id: '4', name: 'Зенит', role: 'admin', avatar: images.images.team},
  ];
  return (
    <View style={styles.root}>
      <Header
        title="Выбор соперника"
        leftButtonSource={images.icons.left_arrow}
        onLeftButtonPress={() => props.navigation.goBack()}
      />
      <Space height={20} />

      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id}
        renderItem={item => (
          <ImageTextPlus
            onImagePress={() =>
              props.navigation.navigate('MyTeammateProfileScreen')
            }
            name={item.item.name}
            role={item.item.role}
            onPress={() => props.navigation.navigate('SelectRoleScreen')}
          />
        )}
      />
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
});

export default Index;
