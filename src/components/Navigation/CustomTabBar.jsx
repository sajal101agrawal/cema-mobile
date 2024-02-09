import { View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { memo } from 'react'
import { Colors, moderateScale } from '../../utils/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CustomTabBar = ({ state, descriptors, navigation }) => {

    const safeAreaInsets = useSafeAreaInsets();
    return (
        <View style={[styles.tabBarContainer, { height : moderateScale(68 + safeAreaInsets.bottom), paddingBottom : moderateScale(safeAreaInsets.bottom) }]}>
            {state.routes.map((route, index) => {

                const { options } = descriptors[route.key];

                const isFocused = state.index === index;
                const TabtabBarButton = options?.tabBarButton;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={`${index}`}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.tabButtonContainer}
                    >
                        <TabtabBarButton onPress={onPress} label={options.tabBarAccessibilityLabel} accessibilityState={isFocused ? { selected: true } : {}} />
                    </TouchableOpacity>
                );
            })}
        </View>
    )
}

export default memo(CustomTabBar);

const styles = StyleSheet.create({
    tabBarContainer : {
        flexDirection : 'row',
        alignItems : 'stretch',
        justifyContent : 'space-evenly',
        backgroundColor : Colors.PRIMARY_COLOR,
        borderTopLeftRadius : moderateScale(15),
        borderTopRightRadius : moderateScale(15),
        overflow : 'hidden'
    },
    tabButtonContainer : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center'
    }
})