import {StyleSheet, View} from 'react-native';
import React, {memo} from 'react';
import { Colors } from '../../utils/theme';

const BaseLineComponent = ({style1}) => {
  return (
    <View
      style={[
        {
          height: StyleSheet.hairlineWidth * 1.9,
          width: '94%',
          alignSelf: 'flex-end',
          backgroundColor: Colors.BORDER_COLOR,
        },
        style1,
      ]}
    />
  );
};

export default memo(BaseLineComponent);
