import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, memo, useState, useEffect, useMemo } from 'react';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { HeartFillIcon, HeartOutlineIcon, PlusIcon } from '../../assets/icons';
import { Colors, DEVICE_STYLES, Fonts, moderateScale } from '../../utils/theme';
import { useGenerateImageUrl } from '../../hooks/useGenerateImageUrl';
import FastImage from 'react-native-fast-image';
import BaseIconButton from '../Buttons/BaseIconButton';
import { displayAbsoluteAmount } from '../../services';
import { addToCart } from '../../redux/actions/cart/addToCart';
import { addRemoveWishlist } from '../../redux/actions/wishlist/addRemoveWishlist';
import { useDispatch, useSelector } from 'react-redux';


const BaseHomeScreenProduct = ({ item, data, setData }) => {

    const [isWishlist, setIsWishlist] = useState(false)

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const wishlistSliceDetails = useSelector((state) => state.wishlist);
    const cartSliceDetails = useSelector((state) => state.cart);

    const imageUrl = useGenerateImageUrl({ imaePath: item.thumbnail_path, imageName: item?.thumbnail }, [item]);

    const WISHLIST_ARR = useMemo(() => wishlistSliceDetails?.wishlist,[wishlistSliceDetails]);
    const CART_ARR = useMemo(() => cartSliceDetails.cart?.data,[cartSliceDetails]);    

    const CHECK_WISHLIST_AVAILABILTY = useMemo(() => {

        const isAvailable = WISHLIST_ARR.find((ele, index) => ele.pro_id == item?.id);

        return isAvailable == undefined ? false : true;
    },[WISHLIST_ARR]);

    const CHECK_CART_AVAILABILTY = useMemo(() => {

        const isAvailable = CART_ARR?.find((ele, index) => ele.pro_id == item?.id || ele.simple_pro_id == item?.id);

        return isAvailable == undefined ? false : true;
    },[CART_ARR]);


    useEffect(() => {
      if(item?.is_in_wishlist){
        setIsWishlist(true)
      } 
    }, [])

    const handleAddToCart = useCallback(
      () =>{
        if(item?.subvariants[0]?.stock == 0){
          return;
        }
        dispatch(
          addToCart({
            product_id: item?.id,
            type: item?.type || "variant",
            variant_id: item?.type
              ? item?.category_id
              : item?.subvariants[0]?.id,
            quantity: 1,
          })
        )},
      [item]
    );
    const handleAddToWishlist = 
      () =>
        {
            item.is_in_wishlist = !item.is_in_wishlist
            setData([...data])
            dispatch(
              addRemoveWishlist({
                product_id: item?.subvariants
                  ? item?.subvariants[0]?.id
                  : item?.id,
                type: item?.type || "variant",
                dispatch: dispatch,
              })
            )
            
          }

    //featured products
    // image base url path = "image_path" =   "https://www.demo609.amrithaa.com/backend-cema/public/variantimages",
    // subvariants[0].variantimages.main_image

    const FINAL_IMAGE_PATH = useMemo(() => {

        if(item.subvariants[0]?.variantimages?.main_image !== undefined){
            return String(item?.image_path).concat(`/${item.subvariants[0]?.variantimages?.main_image}`);
        }

        return '';
    },[item])

    const OFFERING_PRICE = useMemo(() => {

        if(item?.subvariants[0]?.stock == 0){
          return "Out of stock"
        }

        if(item.subvariants[0]?.offer !== undefined && item.subvariants[0]?.offer !== null){
            return item.subvariants[0]?.offer;
        }

        return `${item?.price}`;
    },[])

    const handleOnPress = () => {

        let variant_id = -1;

        if(!item?.type){
            variant_id = !item.type && item?.subvariants.length >= 1 && item?.subvariants[0]?.id
        }

        navigation.dispatch(CommonActions.navigate('ProductDetailScreen',{ product_id : item.id, type : item?.type || 'variant', product_variant_id : variant_id }))
    }

    return (
      <View style={styles.listContainerStyle}>
        <TouchableOpacity
          style={{ width: "90%", height: "100%" }}
          activeOpacity={0.8}
          accessibilityRole={"tab"}
          accessible={true}
          onPress={() => handleOnPress()}
        >
          <View style={styles.productImageContainer}>
            <FastImage
              source={{
                uri: FINAL_IMAGE_PATH,
                priority: FastImage.priority.high,
                cache: FastImage.cacheControl.cacheOnly,
              }}
              fallback={true}
              style={{
                width: "100%",
                height: "100%",
              }}
              resizeMode={"cover"}
            />
            <BaseIconButton
              onPress={handleAddToWishlist}
              styles={{
                position: "absolute",
                top: moderateScale(10),
                right: moderateScale(10),
              }}
            >
              {item.is_in_wishlist ? (
                <HeartFillIcon
                  height={moderateScale(20)}
                  width={moderateScale(20)}
                />
              ) : (
                <HeartOutlineIcon
                  height={moderateScale(20)}
                  width={moderateScale(20)}
                />
              )}
            </BaseIconButton>
            <BaseIconButton
              onPress={handleAddToCart}
              styles={{
                position: "absolute",
                bottom: moderateScale(10),
                right: moderateScale(10),
              }}
            >
              {CHECK_CART_AVAILABILTY ? (
                <View style={styles.countContainerStyle}>
                  <Text style={styles.countStyle}>1</Text>
                </View>
              ) : (
                <BaseIconButton onPress={handleAddToCart}>
                  <PlusIcon
                    height={moderateScale(20)}
                    width={moderateScale(20)}
                  />
                </BaseIconButton>
              )}
            </BaseIconButton>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
              gap: moderateScale(5),
              marginVertical: moderateScale(10),
            }}
          >
            <Text numberOfLines={1} style={styles.productLabelStyle}>
              {item?.product_name?.en}
            </Text>
            <Text numberOfLines={1} style={styles.productPriceStyle}>
              {item?.subvariants[0]?.stock != 0 ?  'KD ' : null}
              {displayAbsoluteAmount(OFFERING_PRICE)}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
}

export default memo(BaseHomeScreenProduct);


const styles = StyleSheet.create({
    listContainerStyle: {
        width: DEVICE_STYLES.SCREEN_WIDTH * 0.38,
        height: moderateScale(259),
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    productImageContainer: {
        width: moderateScale(138),
        height: moderateScale(170),
        overflow: 'hidden',
        borderRadius: moderateScale(5),
        borderWidth: moderateScale(0.5),
        borderColor: Colors.BORDER_COLOR
    },
    productLabelStyle: {
        fontFamily: Fonts.DM_SANS_REGULER,
        fontSize: moderateScale(14),
        color: Colors.PRIMARY_TEXT_COLOR,
        textAlign: 'left',
        textTransform: 'capitalize'
    },
    productPriceStyle: {
        fontFamily: Fonts.DM_SANS_MEDIUM,
        fontSize: moderateScale(14),
        color: Colors.SECONDARY_COLOR,
        textAlign: 'left'
    },
    countStyle: {
        fontFamily: Fonts.DM_SANS_BOLD,
        fontSize: moderateScale(8),
        color: Colors.WHITE
    },
    countContainerStyle: {
        backgroundColor: Colors.SECONDARY_COLOR,
        height: moderateScale(16),
        width: moderateScale(16),
        borderRadius: moderateScale(16),
        alignItems: 'center',
        justifyContent: 'center',
    }
})