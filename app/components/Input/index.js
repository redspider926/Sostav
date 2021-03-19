import React from 'react';
import {View, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import Text from '../Text';
import Image from '../Image';
import * as sizes from 'utils/sizes';
import * as colors from 'utils/colors';
import * as images from 'utils/images';

const Index = props => {
  const {
    editable = false,
    value,
    onChangeText,
    title,
    phoneMask,
    codeMask,
    placeholder,
    onPress,
    dateMask,
  } = props;
  const [focus, setFocus] = React.useState(false);

  return editable === false ? (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.root,
        {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
      ]}>
      <View>
        <Text fontSize={sizes.font.middle_b} fontColor={colors.darkBlue} bold>
          {title}
        </Text>
        {!value ? (
          <Text fontColor={'#888888'}>{placeholder}</Text>
        ) : (
          <Text>{value}</Text>
        )}
      </View>
      {!dateMask && (
        <Image source={images.icons.right_arrow} tintColor={colors.main} icon />
      )}
    </TouchableOpacity>
  ) : (
    <View style={[styles.root, {justifyContent: 'center'}]}>
      {title && (
        <Text fontSize={sizes.font.middle_b} fontColor={colors.darkBlue} bold>
          {title}
        </Text>
      )}
      {phoneMask || codeMask ? (
        <TextInputMask
          style={[styles.input, focus ? styles.onFocus : styles.onBlur]}
          type={phoneMask ? 'cel-phone' : 'only-numbers'}
          placeholderTextColor="#888888"
          value={value}
          placeholder={placeholder}
          onChangeText={onChangeText}
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
          options={
            phoneMask && {
              withDDD: true,
              dddMask: '+9 (999) 999-99-99',
            }
          }
        />
      ) : (
        <TextInput
          style={[styles.input, focus ? styles.onFocus : styles.onBlur]}
          placeholderTextColor="#888888"
          value={value}
          placeholder={placeholder}
          onChangeText={onChangeText}
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: sizes.dimension.input.height,
    borderRadius: sizes.dimension.input.borderRadius,
    backgroundColor: colors.gray,
    padding: 10,
  },

  input: {
    height: 20,
    padding: 0,
    color: colors.black,
  },

  onFocus: {},

  onBlur: {},
});

export default Index;
