import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import Text from '../Text';
import Space from '../Space';
import Image from '../Image';

import * as sizes from 'utils/sizes';
import * as colors from 'utils/colors';
import * as images from 'utils/images';

const Index = props => {
  const [degress, setDegress] = React.useState(0);
  React.useEffect(() => {
    const timer = setInterval(() => {
      setDegress(degress + 1);
      console.log('degress', degress);
    }, 1);
    return function cleanup() {
      clearInterval(timer);
    };
  }, [degress]);

  return (
    <View style={styles.root}>
      <View style={{transform: [{rotateZ: degress + 'deg'}]}}>
        <Image source={images.images.logo} width={80} height={80} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF55',
  },
});

export default Index;
