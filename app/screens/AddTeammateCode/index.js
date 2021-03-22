import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Space, Button, Header, TeamCode, Image} from 'components';
import * as sizes from 'utils/sizes';
import * as images from 'utils/images';
import * as colors from 'utils/colors';

const Index = props => {
  return (
    <View style={styles.root}>
      <Header
        title="Add teammate"
        leftButtonSource={images.icons.left_arrow}
        onLeftButtonPress={() => props.navigation.goBack()}
      />
      <Space height={20} />
      <TeamCode />
      <Space height={20} />
      <View style={styles.shareButtonGroup}>
        <TouchableOpacity style={styles.shareButton}>
          <Image
            source={images.icons.phone}
            width={20}
            height={20}
            tintColor={colors.white}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.shareButton}>
          <Image
            source={images.icons.email}
            width={20}
            height={20}
            tintColor={colors.white}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.shareButton}>
          <Image
            source={images.icons.contact}
            width={20}
            height={20}
            tintColor={colors.white}
          />
        </TouchableOpacity>
      </View>
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

  loading: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },

  toast: {
    zIndex: 10000,
  },

  shareButton: {
    width: 56,
    height: 56,
    backgroundColor: colors.main,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },

  shareButtonGroup: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default Index;
