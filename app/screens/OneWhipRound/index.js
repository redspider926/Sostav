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
  const [addedMoney, setAddedMoney] = React.useState('');
  const refRBSheet = React.useRef();
  const refRBSheet_1 = React.useRef();

  const {team} = props.route.params;

  return (
    <View style={styles.root}>
      <Header
        title="Сбор"
        leftButtonSource={images.icons.left_arrow}
        rightButtonSource={images.icons.more}
        onLeftButtonPress={() => props.navigation.goBack()}
        onRightButtonPress={() => {
          refRBSheet_1.current.open();
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Space height={20} />
        <Text fontSize={sizes.font.middle_b} bold>
          Цель
        </Text>
        <Space height={20} />
        <Text>
          С другой стороны консультация с широким активом позволяет оценить
          значение соответствующий условий активизации.
        </Text>

        <Space height={40} />
        <View style={styles.group1}>
          <Text fontSize={sizes.font.middle_b} bold>
            Цель
          </Text>
          <Text>16 000 руб.</Text>
          <View style={styles.progress}>
            <View
              style={[
                styles.progress,
                {width: '70%', backgroundColor: colors.main},
              ]}
            />
          </View>
        </View>
        <Space height={20} />
        <View style={styles.group2}>
          <View style={{flex: 1}}>
            <Text fontSize={sizes.font.middle_b} bold>
              Сумма
            </Text>
            <Text>32 000 руб.</Text>
          </View>
          <View style={{flex: 1}}>
            <Text fontSize={sizes.font.middle_b} bold>
              Дедлайн
            </Text>
            <Text>22.06.20</Text>
          </View>
        </View>
        <Space height={40} />
        <Text fontSize={sizes.font.large_a} bold>
          Список участников
        </Text>
        <Space height={20} />

        <FlatList
          horizontal={true}
          data={team.users}
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
          Описание
        </Text>
        <Space height={10} />
        <Text>
          Значимость этих проблем настолько очевидна, что начало повседневной
          работы по формированию позиции влечет за собой процесс внедрения и
          модернизации системы обучения кадров, соответствует насущным
          потребностям.
        </Text>
        <Space height={40} />
        <View style={{alignSelf: 'flex-end'}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              refRBSheet.current.open();
            }}>
            <Text bold>Внести</Text>
            <Space width={10} />
            <View style={styles.buttonPlusPart}>
              <Image source={images.icons.plus} icon tintColor={colors.white} />
            </View>
          </TouchableOpacity>
        </View>

        <Space height={70} />
      </ScrollView>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        customStyles={{
          container: {
            justifyContent: 'space-between',
            borderTopLeftRadius: sizes.dimension.bottomSheet.borderRadius,
            borderTopRightRadius: sizes.dimension.bottomSheet.borderRadius,
            padding: 20,
            height: 300,
          },
          wrapper: {
            backgroundColor: '#00000044',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <View style={styles.teamTitleInSheet}>
          <Image source={images.images.team} width={56} height={56} circle />
          <Space width={20} />
          <Text fontSize={sizes.font.middle_b} bold>
            Иван Пупкин
          </Text>
        </View>
        <Text>Введите сумму игрока</Text>
        <Input
          editable
          codeMask
          placeholder="Введите сумму"
          onChangeText={text => setAddedMoney(text)}
          value={addedMoney}
        />

        <Button
          caption="Добавить сумму"
          buttonColor={colors.main}
          textColor={colors.white}
        />
      </RBSheet>

      <RBSheet
        ref={refRBSheet_1}
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
            refRBSheet_1.current.close();
            props.navigation.navigate('EditWhipRoundScreen');
          }}>
          <Space height={15} />
          <Text fontSize={sizes.font.large_a} fontColor={colors.main}>
            Изменить
          </Text>
          <Space height={15} />
        </TouchableOpacity>
        <View style={styles.sheetSplitLine} />
        <TouchableOpacity>
          <Space height={15} />
          <Text fontSize={sizes.font.large_a} fontColor={colors.main}>
            Завершить
          </Text>
          <Space height={15} />
        </TouchableOpacity>
        <View style={styles.sheetSplitLine} />
        <TouchableOpacity>
          <Space height={15} />
          <Text fontSize={sizes.font.large_a} fontColor={colors.warning}>
            Удалить
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
