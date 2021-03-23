import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Text from '../Text';
import Image from '../Image';
import Space from '../Space';
import * as sizes from 'utils/sizes';
import * as colors from 'utils/colors';
import * as images from 'utils/images';

const Index = props => {
  const {code} = props;
  return (
    <View style={styles.root}>
      <Text fontSize={sizes.font.middle_b}>Скопируйте код приглашения</Text>
      <Space height={20} />
      <View style={styles.code}>
        <Text fontSize={sizes.font.largest_a} fontColor={colors.main}>
          {code}
        </Text>
        <TouchableOpacity>
          <Image
            width={25}
            height={25}
            tintColor={colors.main}
            source={images.icons.paste}
          />
        </TouchableOpacity>
      </View>
      <Space height={20} />
      <Text fontSize={sizes.font.middle_b}>
        Скопируйте и отправьте ссылку для скачивания
      </Text>
      <Space height={20} />
      <View style={styles.code}>
        <View style={styles.linkView}>
          <Text>
            https://translate.google.com/#view=home&op=translate&sl=en&tl=ru
          </Text>
        </View>
        <TouchableOpacity>
          <Image
            width={25}
            height={25}
            tintColor={colors.main}
            source={images.icons.paste}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.gray,
    borderRadius: 5,
    padding: sizes.dimension.screen.padding,
  },

  code: {
    height: sizes.dimension.button.height,
    backgroundColor: colors.white,
    borderRadius: sizes.dimension.button.borderRadius,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
  },

  linkView: {
    width: '85%',
  },
});

export default Index;
