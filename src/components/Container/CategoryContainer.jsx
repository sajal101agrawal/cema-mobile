import React, { memo, useMemo } from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { moderateScale, Colors, Fonts, DEVICE_STYLES } from '../../utils/theme';;
import FastImage from 'react-native-fast-image';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useGenerateImageUrl } from '../../hooks/useGenerateImageUrl';
import { STACK_NAVIGATION_KEYS } from '../../navigation/NavigationKeys';
;

const CategoryContainer = ({ item }) => {

    const navigation = useNavigation();

    const imageUrl = useGenerateImageUrl({ imaePath: item.image_path, imageName: item.image, }, [item]);
    return (
        <View style={styles.listContainerStyle}>
            <TouchableOpacity
                onPress={() => {
                    navigation.dispatch(
                        CommonActions.navigate(STACK_NAVIGATION_KEYS.PRODUCT_SCREEN, {
                            headerName: 'Product',
                            category: item.id, 
                        })
                    );
                }}
                style={styles.listInnerContainerStyle}
                activeOpacity={0.85}
                accessibilityRole={'tab'}
                accessible={true}
            >
                <FastImage
                    source={{
                        uri: imageUrl,
                        priority: FastImage.priority.high,
                        cache: FastImage.cacheControl.cacheOnly
                    }}
                    fallback={true}
                    resizeMode={'cover'}
                    style={{
                        height: '100%',
                        width: '100%',
                        overflow: 'hidden',
                        borderRadius: moderateScale(5)
                    }}
                />

                <View style={styles.labelContainer}>
                    <Text style={styles.labelContainerText}>{item?.title?.en}</Text>
                </View>

                <View style={styles.countContainer}>
                    <Text style={styles.countContainerText}>{item?.product_count}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default memo(CategoryContainer);

const styles = StyleSheet.create({
    listContainerStyle: {
        width: DEVICE_STYLES.SCREEN_WIDTH * 0.49,
        height: undefined,
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    listInnerContainerStyle: {
        width: '90%',
        height: '90%',
        overflow: 'hidden',
        borderRadius: moderateScale(5),
        borderWidth: moderateScale(0.5),
        borderColor: Colors.BORDER_COLOR
    },
    labelContainer: {
        position: 'absolute',
        width: '100%',
        height: moderateScale(38),
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.SECONDARY_TRANSPARENT
    },
    labelContainerText: {
        fontFamily: Fonts.DM_SANS_BOLD,
        fontSize: moderateScale(16),
        color: Colors.BLACK,
        textAlign: 'center',
        textTransform: 'capitalize'
    },
    countContainer: {
        position: 'absolute',
        top: moderateScale(8),
        left: moderateScale(8),
        paddingHorizontal: moderateScale(8),
        paddingVertical: moderateScale(3),
        borderRadius: moderateScale(3),
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        backgroundColor: Colors.WHITE,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        shadowColor: Colors.BLACK
    },
    countContainerText: {
        fontFamily: Fonts.DM_SANS_REGULER,
        fontSize: moderateScale(14),
        color: Colors.SECONDARY_COLOR,
        textAlign: 'center'
    }
});