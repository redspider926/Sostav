import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  Space,
  Header,
  Text,
  TeammateItem,
  Image,
  Input,
  Button,
  TeamListItem,
} from 'components';
import RBSheet from 'react-native-raw-bottom-sheet';
import * as sizes from 'utils/sizes';
import * as images from 'utils/images';
import * as colors from 'utils/colors';

const Index = props => {
  const data = [
    {id: '1', name: 'Пётр Отбивалкин', avatar: images.images.team},
    {id: '2', name: 'Пётр Отбивалкин', avatar: images.images.team},
    {id: '3', name: 'Пётр Отбивалкин', avatar: images.images.team},
    {id: '4', name: 'Пётр Отбивалкин', avatar: images.images.team},
    {id: '5', name: 'Пётр Отбивалкин', avatar: images.images.team},
  ];
  const refRBSheet = React.useRef();
  return (
    <View style={styles.root}>
      <Header
        title="Событие"
        leftButtonSource={images.icons.left_arrow}
        rightButtonSource={images.icons.more}
        onLeftButtonPress={() => props.navigation.goBack()}
        onRightButtonPress={() => {
          refRBSheet.current.open();
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Space height={20} />
        <Text fontSize={sizes.font.middle_b} bold>
          Название
        </Text>
        <Space height={10} />
        <Text>Сбор на новые ворота</Text>
        <Space height={20} />
        <Text fontSize={sizes.font.middle_b} bold>
          Место
        </Text>
        <Space height={10} />
        <Text>г. Москва, ул. Тверская, д.1, стр1</Text>

        <Space height={20} />

        {/* insert map here */}
        <View style={{height: 180, backgroundColor: colors.gray}}></View>

        <Space height={20} />
        <Button caption="Проложить маршрут" />
        <Space height={20} />
        <View style={styles.group2}>
          <View style={{flex: 1}}>
            <Text fontSize={sizes.font.middle_b} bold>
              Дата
            </Text>
            <Text>22.06.20</Text>
          </View>
          <View style={{flex: 1}}>
            <Text fontSize={sizes.font.middle_b} bold>
              Время
            </Text>
            <Text>12:33</Text>
          </View>
        </View>
        <Space height={40} />
        <Text fontSize={sizes.font.large_a} bold>
          Ваш соперник
        </Text>
        <TeamListItem name="ЦСКА Москва" avatar={images.images.team} />
        <Space height={40} />
        <Text fontSize={sizes.font.large_a} bold>
          Список участников
        </Text>
        <Space height={20} />

        <FlatList
          horizontal={true}
          data={data}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => item.id}
          renderItem={item => {
            return (
              <TeammateItem
                avatar={item.item.avatar}
                name={item.item.name}
                onPress={() => {}}
              />
            );
          }}
        />
        <Space height={40} />
        <Text fontSize={sizes.font.large_a} bold>
          Название / описание
        </Text>
        <Space height={10} />
        <Text>
          Значимость этих проблем настолько очевидна, что начало повседневной
          работы по формированию позиции влечет за собой процесс внедрения и
          модернизации системы обучения кадров, соответствует насущным
          потребностям.
        </Text>
        <Space height={40} />
      </ScrollView>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        customStyles={{
          container: {
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: sizes.dimension.bottomSheet.borderRadius,
            borderTopRightRadius: sizes.dimension.bottomSheet.borderRadius,
          },
          wrapper: {
            backgroundColor: '#00000044',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <Space flex={1} />
        <TouchableOpacity
          onPress={() => {
            refRBSheet.current.close();
            props.navigation.navigate('EditWhipRoundScreen');
          }}>
          <Space height={15} />
          <Text fontSize={sizes.font.large_a} fontColor={colors.main}>
            Добавить в календарь
          </Text>
          <Space height={15} />
        </TouchableOpacity>
        <View style={styles.sheetSplitLine} />
        <TouchableOpacity>
          <Space height={15} />
          <Text fontSize={sizes.font.large_a} fontColor={colors.main}>
            Редактировать
          </Text>
          <Space height={15} />
        </TouchableOpacity>
        <View style={styles.sheetSplitLine} />
        <TouchableOpacity>
          <Space height={15} />
          <Text fontSize={sizes.font.large_a} fontColor={colors.warning}>
            Отказаться от участия
          </Text>
          <Space height={15} />
        </TouchableOpacity>
        <Space flex={1} />
      </RBSheet>
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

  progress: {
    height: 10,
    borderRadius: 10,
    width: '100%',
    backgroundColor: colors.grey,
  },

  group1: {
    height: 100,
    width: '100%',
    backgroundColor: colors.gray,
    padding: sizes.dimension.screen.padding,
    justifyContent: 'space-between',
    borderRadius: 5,
  },

  group2: {
    height: 100,
    width: '100%',
    backgroundColor: colors.gray,
    padding: sizes.dimension.screen.padding,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  button: {
    width: 130,
    height: 56,
    borderRadius: 56,
    backgroundColor: colors.white,
    elevation: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  buttonPlusPart: {
    width: 56,
    height: 56,
    borderRadius: 56,
    backgroundColor: colors.main,
    alignItems: 'center',
    justifyContent: 'center',
  },

  teamTitleInSheet: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  sheetSplitLine: {
    height: 1,
    width: '100%',
    backgroundColor: colors.grey,
  },
});

export default Index;
