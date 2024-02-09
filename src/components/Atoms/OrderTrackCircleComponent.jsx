import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { Colors, moderateScale } from '../../utils/theme';
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';

const OrderTrackCircleComponent = ({ isCompleted = false, index = 1 }) => {
  return (
    <View style={[styles.container, { borderColor : isCompleted ? Colors.SECONDARY_COLOR : Colors.BORDER_COLOR }]}>
      { isCompleted && <Animated.View entering={ZoomIn} exiting={ZoomOut} style={styles.innerContainer} />}
    </View>
  )
}

export default memo(OrderTrackCircleComponent);

const styles = StyleSheet.create({
    container : {
        width : moderateScale(30),
        height : moderateScale(30),
        borderWidth : moderateScale(1.2),
        borderRadius : moderateScale(16),
        borderCurve : 'circular',
        alignItems : 'center',
        justifyContent : 'center'
    },
    innerContainer : {
        backgroundColor : Colors.BORDER_COLOR,
        borderWidth : moderateScale(1.2),
        borderColor : Colors.SECONDARY_COLOR,
        width : moderateScale(16),
        height : moderateScale(16),
        borderRadius : moderateScale(9),
        borderCurve : 'circular'
    }
})