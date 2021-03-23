import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import {
  Image,
  Text,
  TeamCode,
  Header,
  Space,
  TeamItem,
  TeammateItem,
  Title,
} from 'components';

import * as images from 'utils/images';
import * as colors from 'utils/colors';
import * as sizes from 'utils/sizes';

import {AuthActions} from 'actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const Index = props => {
  const team = props.route.params.team;

  const data = [
    {id: '1', name: 'Пётр Отбивалкин', avatar: images.images.team},
    {id: '2', name: 'Пётр Отбивалкин', avatar: images.images.team},
    {id: '3', name: 'Пётр Отбивалкин', avatar: images.images.team},
    {id: '4', name: 'Пётр Отбивалкин', avatar: images.images.team},
    {id: '5', name: 'Пётр Отбивалкин', avatar: images.images.team},
  ];
  return (
    <View style={styles.root}>
      <Header
        title="Команда"
        leftButtonSource={images.icons.left_arrow}
        rightButtonSource={images.icons.more}
        onLeftButtonPress={() => props.navigation.goBack()}
        onRightButtonPress={() => {}}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Space height={20} />
        <View style={styles.team}>
          <Image
            source={{uri: team.avatar}}
            width={sizes.dimension.teamListItem.image.width}
            height={sizes.dimension.teamListItem.image.height}
          />
          <Space width={10} />
          <Text fontSize={sizes.font.large_a} bold>
            {team.name}
          </Text>
        </View>

        <Space height={20} />
        <TeamCode code={team.code} />
        <Space height={20} />
        <TouchableOpacity
          onPress={() => props.navigation.navigate('StatisticsScreen')}>
          <View style={styles.teamNumberInfo}>
            <View>
              <Text fontSize={sizes.font.middle_b} bold>
                Выиграли
              </Text>
              <Text fontSize={sizes.font.small_b}>120 раз.</Text>
            </View>
            <View>
              <Text fontSize={sizes.font.middle_b} bold>
                Ничья
              </Text>
              <Text fontSize={sizes.font.small_b}>21 раз.</Text>
            </View>
            <View>
              <Text fontSize={sizes.font.middle_b} bold>
                Проиграли
              </Text>
              <Text fontSize={sizes.font.small_b}>16 раз..</Text>
            </View>
          </View>
          <Space height={10} />
          <View style={styles.progressA}>
            <View style={styles.progressB}>
              <View style={styles.progressC} />
            </View>
          </View>
        </TouchableOpacity>

        <Space height={40} />
        <Title title="Проиграли" leftButton leftButtonText="all" />
        <Space height={20} />
        <TeamItem />
        <Space height={20} />
        <TeamItem />
        <Space height={20} />
        <TeamItem />
        <Space height={40} />

        <Title title="Проиграли" leftButton leftButtonText="all" />
        <Space height={20} />
        <TeamItem />
        <Space height={20} />
        <TeamItem />
        <Space height={20} />
        <TeamItem />
        <Space height={40} />

        <Title
          title="Список участников"
          leftButton
          onPress={() => props.navigation.navigate('MyTeammatesScreen')}
        />
        <Space height={20} />

        <FlatList
          horizontal={true}
          data={data}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => item.id}
          renderItem={item => {
            return item.index < data.length - 1 ? (
              <TeammateItem
                avatar={item.item.avatar}
                name={item.item.name}
                onPress={() => {}}
              />
            ) : (
              <TouchableOpacity
                onPress={() => props.navigation.navigate('AddTeammateScreen')}
                style={{width: 56}}>
                <View
                  style={{
                    size: 56,
                    height: 56,
                    borderRadius: 56,
                    backgroundColor: colors.main,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={images.icons.plus}
                    icon
                    tintColor={colors.white}
                  />
                </View>
                <Text
                  center
                  fontColor={colors.main}
                  fontSize={sizes.font.small_a}>
                  Add player
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
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

  team: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  teamNumberInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  progressA: {
    height: 10,
    borderRadius: 10,
    width: '100%',
    backgroundColor: colors.warning,
    display: 'flex',
    flexDirection: 'row',
  },
  progressB: {
    height: 10,
    borderRadius: 10,
    width: '90%',
    backgroundColor: colors.yellow,
    display: 'flex',
    flexDirection: 'row',
  },
  progressC: {
    height: 10,
    borderRadius: 10,
    width: '80%',
    backgroundColor: colors.main,
    display: 'flex',
    flexDirection: 'row',
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
