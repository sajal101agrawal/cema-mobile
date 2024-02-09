import { TouchableOpacity } from 'react-native'
import React from 'react'

const BaseIconButton = ({children, styles, onPress, disabled = false}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.65}
            accessibilityRole={'button'}
            accessible={true}
            style={styles}
            disabled={disabled}
            onPress={() => onPress && onPress()}
        >
           {children}
        </TouchableOpacity>
    )
}

export default BaseIconButton;