import React, { memo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Colors, moderateScale } from '../../utils/theme';


const BaseDropDown = ({placeholder ,data = [], value , onChange}) => {


  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </View>
  );
};

export default memo(BaseDropDown);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
  },
  dropdown: {
    height: moderateScale(51),
    borderColor: Colors.BORDER_COLOR,
    borderWidth: 1.5,
    paddingHorizontal: moderateScale(8),
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: moderateScale(22),
    top: moderateScale(8),
    zIndex: 999,
    paddingHorizontal: moderateScale(8),
    fontSize: moderateScale(14),
  },
  placeholderStyle: {
    fontSize: moderateScale(16),
    marginLeft : moderateScale(6)
  },
  selectedTextStyle: {
    fontSize: moderateScale(16),
  },
  inputSearchStyle: {
    height: moderateScale(40),
    fontSize: moderateScale(16),
  },
});