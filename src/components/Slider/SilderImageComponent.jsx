import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useCallback, useState, useRef, memo } from 'react';
import { LIGHT_BLUB_PRODUCT, BLUB_PRODUCT, WATCH_IMAGE, HOME_BANNER } from '../../assets/images'
import FastImage from 'react-native-fast-image';
import { Colors, DEVICE_STYLES, moderateScale } from '../../utils/theme';

const CONSTANT_ARRAY = [
    LIGHT_BLUB_PRODUCT.uri, BLUB_PRODUCT.uri, WATCH_IMAGE.uri, LIGHT_BLUB_PRODUCT.uri, BLUB_PRODUCT.uri, WATCH_IMAGE.uri
];

const SilderImageComponent = ({ sliderData = []}) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    const onViewCallBack = useCallback((viewableItems) => {
        setCurrentIndex(viewableItems?.viewableItems[0]?.index)
    }, [])

    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const ListContainer = useCallback(({ item }) => {
        return (
            <View style={styles.container}>
                <FastImage
                    source={{
                        uri: item?.image,
                        priority: FastImage.priority.high,
                        cache: FastImage.cacheControl.cacheOnly
                    }}
                    fallback={true}
                    resizeMode={'cover'}
                    style={{ width: '100%', height: '100%' }}
                />
            </View>
        )
    },[]);

    const ListPagination = useCallback(() => {
        return(
            <View style={styles.paginationContainer}>
                {
                    sliderData.map((_, index) => <View key={`${index}`} style={[styles.paginationDotStyle,{ backgroundColor : index === currentIndex ? Colors.SECONDARY_COLOR : Colors.WHITE, borderWidth : index === currentIndex ? 0 : 1 }]} />)
                }
            </View>
        )
    }, [currentIndex]);

    return (
        <>
            <FlatList
                data={sliderData}
                horizontal
                bounces={false}
                bouncesZoom={false}
                keyExtractor={(_, index) => index.toString()}
                onViewableItemsChanged={onViewCallBack}
                viewabilityConfig={viewConfigRef.current}
                showsHorizontalScrollIndicator={false}
                decelerationRate={'fast'}
                snapToInterval={DEVICE_STYLES.SCREEN_WIDTH}
                contentContainerStyle={{ flexGrow: 1 }}
                renderItem={({ item, index }) => <ListContainer item={item} key={`${index}`} />}
            />

            <ListPagination />
        </>
    )
}

export default memo(SilderImageComponent);

const styles = StyleSheet.create({
    container: {
        width: DEVICE_STYLES.SCREEN_WIDTH,
        height: moderateScale(412),
        overflow: 'hidden'
    },
    paginationContainer : {
        alignItems : 'center',
        justifyContent : 'center',
        alignSelf : 'center',
        position : 'absolute',
        bottom : moderateScale(20),
        flexDirection : 'row'
    },
    paginationDotStyle : {
        width : moderateScale(8),
        height : moderateScale(8),
        borderRadius : moderateScale(5),
        borderColor : Colors.BORDER_COLOR,
        overflow : 'hidden',
        marginHorizontal : moderateScale(2.5)
    }
})