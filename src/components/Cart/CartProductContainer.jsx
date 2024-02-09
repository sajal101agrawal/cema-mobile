import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, {
  memo,
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";
import axios from 'axios';
import { moderateScale, Colors, Fonts } from "../../utils/theme";
import FastImage from "react-native-fast-image";
import { IncrementIcon, DecrementIcon, DeleteIcon } from "../../assets/icons";
import BaseIconButton from "../Buttons/BaseIconButton";
import { displayAbsoluteAmount, triggerToastMessage } from "../../services";
import { useGenerateImageUrl } from "../../hooks/useGenerateImageUrl";
import { updateCartQuantity } from "../../redux/actions/cart/updateCartQuantity";
import { useDispatch, useSelector } from "react-redux";
import Swipeable from "react-native-swipe-gestures";
import { removeFromCart } from "../../redux/actions/cart/removeFromCart";
import { useIsFocused } from "@react-navigation/native";
import { API_ENPOINTS } from "../../utils/api";
import { fetchCart } from "../../redux/actions/cart/fetchCart";

let timer;

const CartProductContainer = ({ item, index }) => {
  const [quantity, setQuantity] = useState(0);
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  console.log(item?.product_price);

  useEffect(() => {
    if (!isFocused) {
      setShowDeleteButton(false);
    }
  }, [isFocused]);

  const ChangeQuantityHandler = useCallback(async (qty) => {
 
    const formData = new FormData();

    formData.append("quantity", qty);
    formData.append("id", item?.id);
    if(item?.variant_id != null){
      formData.append("variant_id", item?.variant_id);
    }
    console.log("formData",formData);

    await axios
      .post(API_ENPOINTS.UPDATE_CART_QUANTITY, formData)
      .then((Res) => {
        
        dispatch(fetchCart())

      }).catch(err => {
        triggerToastMessage({
          message: "Failed...! ",
          description: response.data.msg,
        });
      })
  }, [quantity]);


  const productDetails = useMemo(() => {
    return item.variant ? item.variant : item?.simple_product;
  }, [item]);

  const ImagePath = item.simple_product == null ? item?.product?.image_path : productDetails?.thumbnail_path
 
  const ImageName = item.simple_product === null ? productDetails?.variantimages?.main_image  : productDetails?.thumbnail;

  const PRICE =
    item.simple_product === null ? item?.product_price : item?.product_price;



  const handleRemoveProduct = useCallback(() => {
    dispatch(removeFromCart({ product_id: item?.id }));
    setShowDeleteButton(false);
  }, [item]);

  const imageUrl = useGenerateImageUrl(
    {
      imaePath: ImagePath,
      imageName: ImageName,
    },
    [ImagePath , ImageName]
  );

  // console.log("qerttt", item?.qty);

  console.log(item);

  const handleIncrementQuantity = useCallback(() => {
    if (item?.simple_product?.stock < 1) {
      triggerToastMessage({
        message: "Product is out of stock",
        type:'warning'
      });
      return;
    }
    console.log("item?.variant?.stock", item?.variant?.stock);
    if (item?.variant?.stock > (quantity)) {
      setQuantity((prev) => prev + 1);
      ChangeQuantityHandler(quantity + 1);
    } else {
      triggerToastMessage({
        message: "Product Maximum Quantity Reached",
        type: "warning",
      });
    }
    
     
  }, [quantity]);

  console.log("====",item?.variant?.stock);

  const handleDecrementQuantity = useCallback(() => {
    
    if(quantity == 1) {
      return;
    }
    // item.qty = item.qty - 1;
    setQuantity((prev) => prev - 1);
    ChangeQuantityHandler(quantity - 1);
  }, [quantity, item]);
  
  const SALE_LABEL_COTAINER = useMemo(() => {
    if (!productDetails?.sale_tag) return null;

    return (
      <View style={styles.saleContainer}>
        <Text
          style={{
            fontFamily: Fonts.DM_SANS_BOLD,
            fontSize: moderateScale(8),
            color: Colors.SECONDARY_COLOR,
          }}
        >
          SALE
        </Text>
      </View>
    );
  }, [productDetails]);

  useEffect(() => {
    clearTimeout(timer);
    timer = setTimeout(
      () =>
        dispatch(
          updateCartQuantity({
            cart_id: item.id,
            variant_id: productDetails?.category_id,
            quantity: quantity,
          })
        ),
      1200
    );
  }, [quantity]);

  useEffect(() => {
    // clearTimeout(timer);
    // timer = setTimeout(() => console.log(quantity), 2000);
    setQuantity(item.qty);
  }, []);


  const toggleDeleteButton = () => {
    setShowDeleteButton(!showDeleteButton);
  };

  const onSwipeLeft = () => {
    toggleDeleteButton();
  };

  const onSwipeRight = () => {
    setShowDeleteButton(false);
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  return (
    <Swipeable
      onSwipeLeft={onSwipeLeft}
      onSwipeRight={onSwipeRight}
      style={styles.container}
      config={config}
      children={
        <TouchableOpacity
          style={styles.innerContainer}
          activeOpacity={0.9}
          accessibilityRole={"tab"}
          accessible={true}
        >
          <View style={styles.imageContainer}>
            <FastImage
              source={{
                uri: imageUrl,
                priority: FastImage.priority.high,
                cache: FastImage.cacheControl.cacheOnly,
              }}
              fallback={true}
              resizeMode={"cover"}
              style={{
                height: "100%",
                width: "100%",
              }}
            />
          </View>
          <View
            style={{ flex: 0.72, flexDirection: "row", alignItems: "stretch" }}
          >
            <View
              style={{
                flex: 0.8,
                justifyContent: "space-around",
                paddingVertical: moderateScale(8),
                paddingLeft: moderateScale(10),
              }}
            >
              <Text
                numberOfLines={2}
                style={{
                  fontSize: moderateScale(14),
                  color: Colors.PRIMARY_TEXT_COLOR,
                  fontFamily: Fonts.DM_SANS_REGULER,
                  textTransform: "capitalize",
                }}
              >
                {productDetails?.product_name?.en || item?.product?.name?.en}
              </Text>
              <Text
                style={{
                  fontSize: moderateScale(14),
                  color: Colors.SECONDARY_COLOR,
                  fontFamily: Fonts.DM_SANS_BOLD,
                }}
              >
                KD {displayAbsoluteAmount(PRICE)}
              </Text>
              <Text
                style={{
                  fontSize: moderateScale(12),
                  color: Colors.PRIMARY_TEXT_COLOR,
                  fontFamily: Fonts.DM_SANS_REGULER,
                }}
              >
                Color: Single
              </Text>
            </View>
            <View style={{ flex: 0.19, paddingVertical: moderateScale(8) }}>
              <View
                style={{
                  flex: 1,
                  alignSelf: "stretch",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BaseIconButton onPress={handleIncrementQuantity}>
                  <IncrementIcon
                    width={moderateScale(13)}
                    height={moderateScale(13)}
                  />
                </BaseIconButton>
              </View>
              <View
                style={{
                  flex: 1,
                  alignSelf: "stretch",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: moderateScale(12),
                    color: Colors.PRIMARY_TEXT_COLOR,
                    fontFamily: Fonts.DM_SANS_REGULER,
                  }}
                >
                  {quantity}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignSelf: "stretch",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BaseIconButton onPress={handleDecrementQuantity}>
                  <DecrementIcon
                    width={moderateScale(13)}
                    height={moderateScale(13)}
                  />
                </BaseIconButton>
              </View>
            </View>
          </View>
          {SALE_LABEL_COTAINER}
          {showDeleteButton && (
              <TouchableOpacity onPress={() => handleRemoveProduct()} style={styles.deleteButtonContainer}>
                <DeleteIcon/>
              </TouchableOpacity>
          )}
        </TouchableOpacity>
      }
    />
  );
};

export default memo(CartProductContainer);

const styles = StyleSheet.create({
  container: {
    height: moderateScale(100),
    width: "100%",
    alignItems: "flex-end",
  },
  innerContainer: {
    width: "95%",
    height: "100%",
    borderWidth: moderateScale(1),
    borderColor: Colors.BORDER_COLOR,
    borderTopLeftRadius: moderateScale(5),
    borderBottomLeftRadius: moderateScale(5),
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "stretch",
    // elevation : 0.5

  },
  imageContainer: {
    flex: 0.28,
    alignItems: "stretch",
    aspectRatio: 1,
    overflow: "hidden",
    borderRightWidth: moderateScale(0.7),
    borderColor: Colors.BORDER_COLOR,
  },
  saleContainer: {
    width: moderateScale(32),
    height: moderateScale(16),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: moderateScale(3),
    borderColor: Colors.BORDER_COLOR,
    borderWidth: moderateScale(1),
    position: "absolute",
    left: moderateScale(5),
    bottom: moderateScale(5),
    backgroundColor: Colors.WHITE,
  },
  deleteButtonContainer: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: moderateScale(80),
  },
  deleteButtonText: {
    color: "white",
    fontSize: moderateScale(16),
  },
});
