import { View, SafeAreaView } from 'react-native';
import React, { memo } from 'react';
import { Colors } from '../../utils/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BaseLayout = ({ children, backgroundColor }) => {

    const safeAreaInsets = useSafeAreaInsets();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor ? backgroundColor : Colors.DEFAULT_BACKGROUND_COLOR, paddingTop : safeAreaInsets.top }}>
            <View style={{ flex: 1 }}>
                {children}
            </View>
        </SafeAreaView>
    )
}

export default memo(BaseLayout);