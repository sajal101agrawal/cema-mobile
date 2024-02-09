import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { Colors, moderateScale } from '../../utils/theme'

const RadioButton = ({ isSelected = false }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.innerContainer, { display : isSelected ? 'flex' : 'none' }]} />
    </View>
  )
}

export default memo(RadioButton)

const styles = StyleSheet.create({
    container : {
        width : moderateScale(16),
        height : moderateScale(16),
        alignItems : 'center',
        justifyContent : 'center',
        borderWidth : moderateScale(1),
        borderColor : Colors.SECONDARY_COLOR,
        backgroundColor : Colors.WHITE,
        borderRadius : moderateScale(8)
    },
    innerContainer : {
        width : moderateScale(10),
        height : moderateScale(10),
        borderRadius : moderateScale(5),
        backgroundColor : Colors.SECONDARY_COLOR
    }
})