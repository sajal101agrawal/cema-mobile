import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useCallback, memo, useState, useEffect, useMemo } from "react";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { HeartFillIcon, HeartOutlineIcon, PlusIcon } from "../../assets/icons";
import { Colors, DEVICE_STYLES, Fonts, moderateScale } from "../../utils/theme";
import { useGenerateImageUrl } from "../../hooks/useGenerateImageUrl";
import FastImage from "react-native-fast-image";
import BaseIconButton from "../Buttons/BaseIconButton";
import { displayAbsoluteAmount, generateImageUrl } from "../../services";
import { addToCart } from "../../redux/actions/cart/addToCart";
import { addRemoveWishlist } from "../../redux/actions/wishlist/addRemoveWishlist";
import { useDispatch, useSelector } from "react-redux";
import * as FileSystem from "expo-file-system";
import product, {
  productData,
  updateProductFetchData,
} from "../../redux/slices/product";
import { fetchProducts } from "../../redux/actions/product/fetchProducts";

const BaseProductContainer = ({ item }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [isWishlistAdded, setIsWishListAdded] = useState(item?.is_in_wishlist);

  const ImagePath =
    item?.type === undefined ? item?.thumbnail : item?.thumbnail_path;

  const ImageName1 =
    item?.type === undefined
      ? item?.subvariants && item?.subvariants?.length > 0
        ? item?.subvariants?.map(
            (subvariant) => subvariant?.variantimages?.main_image
          )
        : null
      : [item?.thumbnail];

  const imageUrl = useGenerateImageUrl(
    { imaePath: item?.thumbnail_path, imageName: item?.thumbnail },
    [ImagePath, ImageName1]
  );

  const wishlistSliceDetails = useSelector((state) => state.wishlist);
  const cartSliceDetails = useSelector((state) => state.cart);
  const productSliceData = useSelector((state) => state.product);

  const WISHLIST_ARR = useMemo(
    () => wishlistSliceDetails?.wishlist,
    [wishlistSliceDetails]
  );
  const CART_ARR = useMemo(
    () => cartSliceDetails.cart?.data,
    [cartSliceDetails]
  );

  const CHECK_WISHLIST_AVAILABILTY = useMemo(() => {
    const isAvailable = WISHLIST_ARR.find(
      (ele, index) => ele?.pro_id == item?.id
    );

    return isAvailable == undefined ? false : true;
  }, [WISHLIST_ARR]);

  const CHECK_CART_AVAILABILTY = useMemo(() => {
    const isAvailable = CART_ARR?.find(
      (ele, index) => ele?.pro_id == item?.id || ele?.simple_pro_id == item?.id
    );

    return isAvailable == undefined ? false : true;
  }, [CART_ARR]);

  useEffect(() => {
    setIsWishListAdded(item?.is_in_wishlist)
  }, [item])

  const handleAddToCart = useCallback(() => {
    if (item?.subvariants[0]?.stock == 0){
      return;
    }
      dispatch(
        addToCart({
          product_id: item?.id,
          type: item?.type || "variant",
          variant_id: item?.type ? item?.category_id : item?.subvariants[0]?.id,
          quantity: 1,
        })
      );
  }, [item, productSliceData]);



  const handleAddToWishlist = () => {
    setIsWishListAdded(!isWishlistAdded)
    dispatch(
      addRemoveWishlist({
        product_id: "subvariants" in item ? item?.subvariants[0]?.id : item?.id,
        type: item?.type || "variant",
        dispatch: dispatch,
        currentPage: productSliceData?.currentPage,
      })
    );
  };



  const FINAL_IMAGE_PATH = () => {
    if (
      !item?.type &&
      item?.subvariants &&
      item?.subvariants[0]?.variantimages?.main_image !== undefined
    ) {
      return String(item?.image_path).concat(
        `/${item.subvariants[0]?.variantimages?.main_image}`
      );
    }

    return `${item?.type}`.includes("simple")
      ? `${item?.thumbnail_path}/${item?.hover_thumbnail}`
      : imageUrl;
  };

  console.log("=====", item?.subvariants[0]);

  const OFFERING_PRICE = useMemo(() => {
    if (
      !item?.type &&
      item?.subvariants &&
      item?.subvariants.length > 0 &&
      item?.subvariants[0]?.offer !== undefined &&
      item?.subvariants[0]?.offer !== null
    ) {
      return item?.subvariants[0]?.offer;
    }

    return `${item?.type}`.includes("simple") ? item?.offer_price : item?.price;
  }, [item]);

  const handleOnPress = () => {
    let variant_id = -1;

    if (!item?.type) {
      variant_id =
        !item?.type &&
        item?.subvariants &&
        item?.subvariants.length >= 1 &&
        item?.subvariants[0]?.id;
    }

    navigation.dispatch(
      CommonActions.navigate("ProductDetailScreen", {
        product_id: item?.id,
        type: item?.type || "variant",
        product_variant_id: variant_id,
      })
    );
  };

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
              uri:
                FINAL_IMAGE_PATH(),
              priority: FastImage.priority.normal,
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
            {isWishlistAdded ? (
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
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "flex-start",
            gap: moderateScale(5),
          }}
        >
          <Text numberOfLines={1} style={styles.productLabelStyle}>
            {item?.product_name?.en}
          </Text>
          <View style={{ flexDirection: "row", gap: 5 }}>
            {/* <Text numberOfLines={1} style={styles.productPriceStyle}>
                KD {displayAbsoluteAmount(item?.price)}
              </Text> */}
            {item?.subvariants[0]?.stock != 0 && <Text numberOfLines={1} style={styles.productOfferPriceStyle}>
              KD {displayAbsoluteAmount(OFFERING_PRICE)}
            </Text>}
            {item?.subvariants[0]?.stock == 0 && <Text numberOfLines={1} style={styles.productOfferPriceStyle}>
              Out of stock
            </Text>}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default memo(BaseProductContainer);

const styles = StyleSheet.create({
  listContainerStyle: {
    width: DEVICE_STYLES.SCREEN_WIDTH * 0.5,
    height: moderateScale(259),
    alignItems: "center",
    justifyContent: "center",
  },
  productImageContainer: {
    width: "100%",
    height: moderateScale(200),
    overflow: "hidden",
    borderRadius: moderateScale(5),
    borderWidth: moderateScale(0.5),
    borderColor: Colors.BORDER_COLOR,
  },
  productLabelStyle: {
    fontFamily: Fonts.DM_SANS_REGULER,
    fontSize: moderateScale(14),
    color: Colors.PRIMARY_TEXT_COLOR,
    textAlign: "left",
    textTransform: "capitalize",
  },
  productPriceStyle: {
    fontFamily: Fonts.DM_SANS_MEDIUM,
    fontSize: moderateScale(12),
    color: Colors.SECONDARY_COLOR,
    textAlign: "left",
    top: 1,
    textDecorationLine: "line-through",
  },
  productOfferPriceStyle: {
    fontFamily: Fonts.DM_SANS_BOLD,
    fontSize: moderateScale(14),
    color: Colors.SECONDARY_COLOR,
    textAlign: "left",
    alignSelf: "center",
  },
  countStyle: {
    fontFamily: Fonts.DM_SANS_BOLD,
    fontSize: moderateScale(8),
    color: Colors.WHITE,
  },
  countContainerStyle: {
    backgroundColor: Colors.SECONDARY_COLOR,
    height: moderateScale(16),
    width: moderateScale(16),
    borderRadius: moderateScale(16),
    alignItems: "center",
    justifyContent: "center",
  },
});
