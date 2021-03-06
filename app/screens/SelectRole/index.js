import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Space, Header, IconText} from 'components';
import * as sizes from 'utils/sizes';
import * as images from 'utils/images';

const Index = props => {
  const [role, setRole] = React.useState(
    props.route.params.roleNumber === null ? 0 : props.route.params.roleNumber,
  );
  const selectRole = _role => {
    setRole(_role);
    props.navigation.navigate('CreateTeamScreen', {
      roleNumber: _role,
    });
  };

  return (
    <View style={styles.root}>
      <Header
        title="Роль в команде"
        leftButtonSource={images.icons.left_arrow}
        onLeftButtonPress={() => props.navigation.goBack()}
      />
      <Space height={40} />
      <IconText
        imageSource={images.icons.plus}
        title="Администратор"
        option
        selected={role === 0}
        onPress={() => selectRole(0)}
      />
      <IconText
        imageSource={images.icons.plus}
        title="Тренер"
        option
        selected={role === 1}
        onPress={() => selectRole(1)}
      />
      <IconText
        imageSource={images.icons.plus}
        title="Капитан"
        option
        selected={role === 2}
        onPress={() => selectRole(2)}
      />
      <IconText
        imageSource={images.icons.plus}
        title="Кассир"
        option
        selected={role === 3}
        onPress={() => selectRole(3)}
      />
      <IconText
        imageSource={images.icons.plus}
        title="Игрок"
        option
        selected={role === 4}
        onPress={() => selectRole(4)}
      />
      <IconText
        imageSource={images.icons.plus}
        title="Гость"
        option
        selected={role === 5}
        onPress={() => selectRole(5)}
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
