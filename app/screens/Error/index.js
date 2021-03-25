import React from 'react';
import {ImageBackground, View, StyleSheet} from 'react-native';
import {Button, Text, Space, Image} from 'components';

import * as sizes from 'utils/sizes';
import * as images from 'utils/images';
import * as colors from 'utils/colors';

const Index = props => {
  const {error} = props.route.params;
  return (
    <ImageBackground style={styles.root}>
      <Text fontSize={sizes.font.largest_a} fontColor={colors.white}>
        Oops!
      </Text>

      {error === 'NETWORK_ERROR' && (
        <View style={styles.content}>
          <Image
            source={images.images.networkError}
            width={150}
            height={150}
            tintColor={colors.white}
          />

          <Space height={20} />
          <Text fontSize={sizes.font.middle_b} fontColor={colors.white}>
            Please check your network.
          </Text>
        </View>
      )}

      <Button
        borderColor={'transparent'}
        buttonColor={colors.white}
        textColor={colors.warning}
        caption="GoBack"
        onPress={() => props.navigation.goBack()}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.warning,
    padding: sizes.dimension.screen.padding,
    justifyContent: 'space-around',
  },

  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Index;
