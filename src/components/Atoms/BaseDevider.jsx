import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { Colors, moderateScale } from '../../utils/theme'

const BaseDevider = ({marginVertical = 3}) => {
  return (
    <View style={{ width : '100%', height : StyleSheet.hairlineWidth + 1, backgroundColor : Colors.BORDER_COLOR, marginVertical : moderateScale(marginVertical) }} />
  )
}

export default memo(BaseDevider);