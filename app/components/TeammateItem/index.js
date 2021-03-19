import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text, Image} from 'components';
import * as sizes from 'utils/sizes';
import * as images from 'utils/images';
import * as colors from 'utils/colors';

const Index = props => {
  const {avatarSource, name, onPress = () => {}, selected} = props;
  return (
    <TouchableOpacity style={styles.root} onPress={onPress}>
      <Image
        source={avatarSource}
        circle
        width={sizes.dimension.teammateItem.avatarSize}
        height={sizes.dimension.teammateItem.avatarSize}
      />
      <Text fontColor={selected ? colors.main : colors.black} center>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {},
});

export default Index;
