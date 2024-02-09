import { StyleSheet, Text, TouchableOpacity, View, TouchableHighlight } from 'react-native'
import React, { memo, useCallback, useMemo } from 'react'
import { Colors, Fonts, moderateScale } from '../../utils/theme';

const BaseOutlineButton = ({ label, onPress, externalStyle, labelColor = Colors.WHITE, icon = null }) => {
    return (
        <TouchableHighlight
            style={[styles.buttonContainer, externalStyle]}
            underlayColor={Colors.PRIMARY_GREY}
            activeOpacity={0.7}
            accessibilityRole={'button'}
            onPress={() => onPress && onPress()}
        >
            <Text style={[styles.buttonContainerLabel]}>{label}</Text>
        </TouchableHighlight>
    )
}

export default memo(BaseOutlineButton);

const styles = StyleSheet.create({
    buttonContainer: {
        width: '100%',
        height: moderateScale(50),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: moderateScale(5),
        backgroundColor: Colors.SECONDARY_DEFAULT_BACKGROUND_COLOR,
        borderWidth : moderateScale(1),
        borderColor : Colors.SECONDARY_COLOR
    },
    buttonContainerLabel: {
        fontFamily: Fonts.DM_SANS_BOLD,
        fontSize: moderateScale(14),
        textAlign: 'center',
        color: Colors.SECONDARY_COLOR,
        textTransform : 'uppercase'
    }
})