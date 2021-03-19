import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text, Image, Header, Input, Space} from 'components';
import * as sizes from 'utils/sizes';
import * as images from 'utils/images';
import * as colors from 'utils/colors';

const Index = props => {
  const [opponentTeamName, setOpponentTeamName] = React.useState('');
  return (
    <View style={styles.root}>
      <Header
        title="Выбор соперника"
        leftButtonSource={images.icons.left_arrow}
        onLeftButtonPress={() => props.navigation.goBack()}
      />
      <Space height={20} />
      <Input
        editable
        placeholder="Введите имя"
        onChangeText={text => setOpponentTeamName(text)}
        value={opponentTeamName}
      />
      <Space height={20} />
      <Text fontSize={sizes.font.middle_b} fontColor={colors.darkBlue}>
        Добро пожаловать в приложение для управления вашей спортивной командой
      </Text>
      <Space height={20} />
      <TouchableOpacity
        style={{
          height: sizes.dimension.teamListItem.height1,
          borderRadius: sizes.dimension.teamListItem.borderRadius,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={() => props.navigation.navigate('SelectOpponentScreen')}>
        <View
          style={{
            backgroundColor: colors.gray,
            width: sizes.dimension.teamListItem.image.width,
            height: sizes.dimension.teamListItem.image.height,
          }}
        />
        <Space width={10} />
        <View>
          <View style={{width: 50, height: 10, backgroundColor: colors.gray}} />
          <Space height={5} />
          <View
            style={{width: 150, height: 10, backgroundColor: colors.gray}}
          />
        </View>
        <Space flex={1} />
        <View
          style={{
            backgroundColor: colors.main,
            width: 25,
            height: 25,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image source={images.icons.plus} icon tintColor={colors.white} />
        </View>
      </TouchableOpacity>
      <Space height={20} />
      <Text fontSize={sizes.font.large_a} fontColor={colors.darkBlue} bold>
        Последние соперники
      </Text>
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
