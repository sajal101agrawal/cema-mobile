import { View, ActivityIndicator } from 'react-native';
import React, { memo } from 'react';
import { Colors, moderateScale } from '../../utils/theme';

const BaseListEndIndicator = ({loading = false}) => {

    if (!loading) return null;

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', height: moderateScale(50) }}>
            <ActivityIndicator accessibilityRole={'progressbar'} size={'large'} color={Colors.SECONDARY_COLOR} />
        </View>
    )
}

export default memo(BaseListEndIndicator);