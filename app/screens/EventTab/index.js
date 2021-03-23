import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {Space, Header, TeamListItem, Text, Event} from 'components';
import * as sizes from 'utils/sizes';
import * as images from 'utils/images';
import * as colors from 'utils/colors';

import {AuthActions} from 'actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const Index = props => {
  const userId = props.auth.user.id;

  return (
    <View style={styles.root}>
      <Header title="События" leftButtonSource={images.icons.left_arrow} />
      <Space height={20} />
      <Text fontSize={sizes.font.middle_b}>Создайте событие</Text>
      <FlatList
        data={props.teams.filter(team => team.users[userId].accepted === true)}
        keyExtractor={(item, index) => item.id}
        renderItem={({item}) => (
          <TeamListItem
            onPress={() =>
              props.navigation.navigate('TeamEventsScreen', {team: item})
            }
            avatar={{uri: item.avatar}}
            name={item.name}
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

const mapStateToProps = state => {
  return {auth: state.auth, teams: state.teams};
};

const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(AuthActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
