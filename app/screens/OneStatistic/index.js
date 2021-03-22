import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {
  Space,
  TeamListItem,
  Header,
  Input,
  Text,
  Title,
  Button,
} from 'components';
import RBSheet from 'react-native-raw-bottom-sheet';
import themeStyle from 'utils/style';
import * as sizes from 'utils/sizes';
import * as images from 'utils/images';
import * as colors from 'utils/colors';

const Index = props => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [myScore, setMyScore] = React.useState('');
  const [opponentScore, setOpponentScore] = React.useState('');
  const [editState, setEditState] = React.useState(false);

  const refRBSheet = React.useRef();

  return (
    <View style={styles.root}>
      <Header
        title="Statistic"
        leftButtonSource={images.icons.left_arrow}
        rightButtonSource={images.icons.more}
        onLeftButtonPress={() => props.navigation.goBack()}
        onRightButtonPress={() => {
          refRBSheet.current.open();
        }}
      />
      <Space height={20} />
      <Title title="Ваш соперник" />
      <TeamListItem avatar={images.images.team} name="Elena" />
      <Space height={40} />

      <View style={styles.optionItem}>
        <Text fontSize={sizes.font.middle_b}>Alphabet</Text>
        <View style={styles.optionContainer}>
          <View style={styles.option} />
        </View>
      </View>
      <Space height={20} />
      <View style={styles.optionItem}>
        <Text fontSize={sizes.font.middle_b}>Alphabet</Text>
        <View style={styles.optionContainer}>
          {false && <View style={styles.option} />}
        </View>
      </View>
      <Space height={20} />
      <View style={styles.optionItem}>
        <Text fontSize={sizes.font.middle_b}>Alphabet</Text>
        <View style={styles.optionContainer}>
          {false && <View style={styles.option} />}
        </View>
      </View>
      <Space height={40} />
      <Input
        editable
        title="Введите Телефон"
        placeholder="Введите..."
        onChangeText={text => setMyScore(text)}
        value={myScore}
      />
      <Space height={20} />
      <Input
        editable
        title="Введите Телефон"
        placeholder="Введите..."
        onChangeText={text => setOpponentScore(text)}
        value={opponentScore}
      />
      <Space height={20} />
      {editState && <Button />}

      <Modal
        useNativeDriverForBackdrop
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}>
        <View style={themeStyle.modalRootContainer}>
          <View style={themeStyle.modalContainer}>
            <Text
              fontSize={sizes.font.large_a}
              fontColor={colors.darkBlue}
              bold>
              Выберите место
            </Text>
            <Text fontSize={sizes.font.middle_b} fontColor={colors.darkGray}>
              Примите приглашение в событие от соперника
            </Text>
            <Space flex={1} />
            <View style={themeStyle.modalButtonGroup}>
              <TouchableOpacity
                style={[
                  themeStyle.modalButton,
                  {borderColor: colors.main, borderWidth: 1},
                ]}>
                <Text fontColor={colors.main}>Создать событие</Text>
              </TouchableOpacity>
              <Space width={sizes.dimension.screen.padding} />
              <TouchableOpacity
                style={[
                  themeStyle.modalButton,
                  {backgroundColor: colors.main},
                ]}>
                <Text fontColor={colors.white}>Создать событие</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
            setEditState(true);
          }}>
          <Space height={15} />
          <Text fontSize={sizes.font.large_a} fontColor={colors.main}>
            Добавить в календарь
          </Text>
          <Space height={15} />
        </TouchableOpacity>
        <View style={styles.sheetSplitLine} />
        <TouchableOpacity
          onPress={() => {
            refRBSheet.current.close();
            setIsModalVisible(true);
          }}>
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

  optionItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  optionContainer: {
    height: sizes.dimension.iconText.imageContainer.size,
    width: sizes.dimension.iconText.imageContainer.size,
    borderRadius: sizes.dimension.iconText.imageContainer.size,
    borderColor: colors.main,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  option: {
    height: sizes.dimension.iconText.imageContainer.size - 10,
    width: sizes.dimension.iconText.imageContainer.size - 10,
    borderRadius: sizes.dimension.iconText.imageContainer.size,
    backgroundColor: colors.main,
  },

  sheetSplitLine: {
    height: 1,
    width: '100%',
    backgroundColor: colors.grey,
  },
});

export default Index;
