import Switch from 'react-native-switch-pro';

import React from 'react';
import * as sizes from 'utils/sizes';
import * as colors from 'utils/colors';

const Index = props => {
  const {state = false} = props;
  return (
    <Switch
      width={sizes.dimension.switch.width}
      height={sizes.dimension.switch.height}
      backgroundActive={colors.main}
      backgroundInactive={colors.grey}
      circleStyle={{
        width: sizes.dimension.switch.circleSize,
        height: sizes.dimension.switch.circleSize,
        elevation: sizes.dimension.switch.circleShadow,
      }}
      value={state}
    />
  );
};

export default Index;
