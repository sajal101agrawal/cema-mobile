import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { Colors, Fonts, moderateScale } from '../../utils/theme';

const BaseButton = ({ label, onPress, externalStyle, labelColor = Colors.WHITE, disabled = false }) => {


  return (
    <TouchableOpacity
      style={[styles.buttonContainer, externalStyle]}
      activeOpacity={0.7}
      accessibilityRole={'button'}
      disabled={disabled}
      onPress={() => onPress && onPress()}
    >

      <Text style={[styles.buttonContainerLabel, { color: labelColor }]}>{label}</Text>
    </TouchableOpacity>
  )
}

export default memo(BaseButton);

const styles = StyleSheet.create({
  buttonContainer: {
    width: '92%',
    height: moderateScale(52),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: moderateScale(5),
    backgroundColor: Colors.PRIMARY_COLOR
  },
  buttonContainerLabel: {
    fontSize: moderateScale(14),
    textAlign: 'center',
    color: Colors.WHITE,
    fontFamily: Fonts.DM_SANS_BOLD
  }
})