import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Space, Header, IconText} from 'components';
import * as sizes from 'utils/sizes';
import * as images from 'utils/images';

const Index = props => {
  const [teamType, setTeamType] = React.useState(
    props.route.params.teamTypeNumber === null
      ? 0
      : props.route.params.roleNumber,
  );

  const selectTeamType = _teamType => {
    setTeamType(_teamType);
    props.navigation.navigate('CreateTeamScreen', {
      teamTypeNumber: _teamType,
    });
  };

  return (
    <View style={styles.root}>
      <Header
        title="Вид спорта"
        leftButtonSource={images.icons.left_arrow}
        onLeftButtonPress={() => props.navigation.goBack()}
      />
      <Space height={40} />
      <IconText
        imageSource={images.icons.plus}
        title="Футбол"
        option
        selected={teamType === 0}
        onPress={() => selectTeamType(0)}
      />
      <IconText
        imageSource={images.icons.plus}
        title="Воллейбол"
        option
        selected={teamType === 1}
        onPress={() => selectTeamType(1)}
      />
      <IconText
        imageSource={images.icons.plus}
        title="Баскетбол"
        option
        selected={teamType === 2}
        onPress={() => selectTeamType(2)}
      />
      <IconText
        imageSource={images.icons.plus}
        title="Хоккей"
        option
        selected={teamType === 3}
        onPress={() => selectTeamType(3)}
      />
      <IconText
        imageSource={images.icons.plus}
        title="Единоборства"
        option
        selected={teamType === 4}
        onPress={() => selectTeamType(4)}
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

  profile: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Index;
