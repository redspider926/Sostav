import React from 'react';
import {Image} from 'react-native';
import * as sizes from 'utils/sizes';

const Index = props => {
  const {
    source,
    width,
    height,
    tintColor,
    icon,
    iconSize = sizes.dimension.icon.size,
    circle,
  } = props;
  const zero = 0;
  return (
    <Image
      style={{
        width: icon ? iconSize : width,
        height: icon ? iconSize : height,
        tintColor: tintColor,
        borderRadius: circle ? width : zero,
      }}
      source={source}
    />
  );
};

export default Index;
