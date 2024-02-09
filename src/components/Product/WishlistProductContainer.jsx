import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useCallback, useMemo } from 'react'
import { moderateScale, Colors, Fonts } from '../../utils/theme';
import FastImage from 'react-native-fast-image';
import { WATCH_IMAGE } from '../../assets/images';
import { HeartFillIcon, PlusIcon, StarFilIcon } from '../../assets/icons';
import BaseIconButton from '../Buttons/BaseIconButton'
import { generateImageUrl } from '../../services';
import { useDispatch } from 'react-redux';
import { addRemoveWishlist } from '../../redux/actions/wishlist/addRemoveWishlist';
import { addToCart } from '../../redux/actions/cart/addToCart';
import { useGenerateImageUrl } from '../../hooks/useGenerateImageUrl';

const WishlistProductContainer = ({ item, index }) => {

    const dispatch = useDispatch();

    const productDetails = useMemo(() => {
        return item.variant ? item.variant : item?.simple_product;
    },[item]);

    const ImagePath = item.simple_product == null ? productDetails?.products?.image_path : productDetails?.thumbnail_path
 
    const ImageName = item.simple_product === null ? productDetails?.variantimages?.main_image  : productDetails?.thumbnail;    

    const imageUrl = useGenerateImageUrl({ imaePath : ImagePath, imageName : ImageName },[ImagePath , ImageName]);

    const PRICE = item.simple_product === null ? productDetails?.price  : productDetails?.price;

    PRODUCT_TYPE = productDetails?.type  == undefined ? 'variant' : productDetails?.type

    PRODUCT_ID = productDetails?.category_id == undefined ? productDetails?.products?.category_id : productDetails?.category_id
    
    const handleRemoveProduct = useCallback(() => dispatch(addRemoveWishlist({ product_id : productDetails?.id, type : productDetails?.type })),[]);
    
    // console.log("id>>>>>>>>", productDetails?.id)
    // console.log("id>>>>>>>>", PRODUCT_ID)
    const handleAddToCart = useCallback(() => dispatch(addToCart({ product_id : productDetails?.id, type : PRODUCT_TYPE, variant_id : PRODUCT_ID, quantity: 1 })),[productDetails , PRODUCT_TYPE , PRODUCT_ID]);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.innerContainer}
                activeOpacity={0.9}
                accessibilityRole={'tab'}
                accessible={true}
            >
                <View style={styles.imageContainer}>
                    <FastImage
                        source={{
                            uri : imageUrl,
                            priority : FastImage.priority.high,
                            cache : FastImage.cacheControl.cacheOnly
                        }}
                        fallback={true}
                        resizeMode={'cover'}
                        style={{
                            height : '100%',
                            width : '100%'
                        }}
                    />
                </View>
                <View style={{flex : 0.72,flexDirection : 'row', alignItems : 'stretch'}}>
                    <View style={{flex : 0.84, justifyContent : 'space-between', paddingVertical : moderateScale(10), paddingLeft : moderateScale(10)}}>
                        <View>
                            <Text numberOfLines={2} style={{fontSize : moderateScale(14), color : Colors.PRIMARY_TEXT_COLOR, fontFamily : Fonts.DM_SANS_REGULER}}>{productDetails?.product_name?.en || productDetails?.products?.product_name?.en}</Text>
                            <Text style={{fontSize : moderateScale(14), color : Colors.SECONDARY_COLOR, fontFamily : Fonts.DM_SANS_MEDIUM,marginVertical : moderateScale(5)}}>KD {PRICE}</Text>
                        </View>
                        <View style={{flexDirection : 'row',alignItems:'center',justifyContent:'flex-start'}}>
                            <StarFilIcon width={moderateScale(12)} height={moderateScale(12)} />
                            <Text style={{marginLeft : moderateScale(5), fontSize : moderateScale(12), color : Colors.PRIMARY_TEXT_COLOR, fontFamily : Fonts.DM_SANS_REGULER}}>{productDetails?.product_rating == undefined ? Number(productDetails?.products?.product_rating).toFixed(1) : Number(productDetails?.product_rating).toFixed(1)}</Text>
                        </View>
                    </View>
                    <View style={{flex : 0.16}}>
                        <View style={{flex : 1,alignItems : 'center', paddingVertical : moderateScale(10), justifyContent : 'flex-start'}}>
                            <BaseIconButton onPress={handleRemoveProduct}>
                                <HeartFillIcon width={moderateScale(16)} height={moderateScale(16)} />
                            </BaseIconButton>
                        </View>
                        <View style={{flex : 1,alignItems : 'center', paddingVertical : moderateScale(10), justifyContent : 'flex-end'}}>
                            <BaseIconButton onPress={handleAddToCart}>
                                <PlusIcon width={moderateScale(18)} height={moderateScale(18)} />
                            </BaseIconButton>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default memo(WishlistProductContainer);

const styles = StyleSheet.create({
    container: {
        height: moderateScale(100),
        width: '100%',
        alignItems: 'flex-end'
    },
    innerContainer: {
        width: '95%',
        height: '100%',
        borderWidth: moderateScale(1),
        borderColor: Colors.BORDER_COLOR,
        borderTopLeftRadius: moderateScale(5),
        borderBottomLeftRadius: moderateScale(5),
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'stretch'
    },
    imageContainer: {
        flex: 0.28,
        alignItems: 'stretch',
        aspectRatio: 1,
        overflow: 'hidden'
    }
})