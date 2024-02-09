import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  CommonActions,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import BaseBackIconHeader from "../components/Header/BaseBackIconHeader";
import BaseLayout from "../components/Container/BaseLayout";
import { Colors, DEVICE_STYLES, Fonts, moderateScale } from "../utils/theme";
import ProductDetailSwiper from "../components/Product/ProductDetailSwiper";
import BaseIconButton from "../components/Buttons/BaseIconButton";
import BaseButton from "../components/Buttons/BaseButton";
import BaseOutlineButton from "../components/Buttons/BaseOutlineButton";
import {
  HeartFillIcon,
  HeartOutlineIcon,
  CheckIcon,
  StarFilIcon,
  IncrementIcon,
  DecrementIcon,
} from "../assets/icons";
import { STACK_NAVIGATION_KEYS } from "../navigation/NavigationKeys";
import { addRemoveWishlist } from "../redux/actions/wishlist/addRemoveWishlist";
import { addToCart } from "../redux/actions/cart/addToCart";
import { removeFromCart } from "../redux/actions/cart/removeFromCart";
import { useDispatch, useSelector } from "react-redux";
import { displayAbsoluteAmount, triggerToastMessage } from "../services";
import axios from "axios";

const productColorsArr = [
  "#F8E7CD",
  "#FFA462",
  "#67A0A4",
  "#6B6D7B",
  "#DCD8CC",
];

// FOR SIMPLE PRODUCT : URL = '/api/products/21/simple_product'
// FOR VARIENT PRODUCT : URL = '/api/products/34/variant?variant_id=46&currency=INR'

const MAX_STOCK = 10;

const ProductDetailScreen = ({ route }) => {
  const PRODUCT_ID = route.params.product_id;
  const PRODUCT_VARIANT_ID = route.params.product_variant_id;
  const PRODUCT_TYPE = route.params.type;

  console.log(route.params);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [productDetails, setProductDetails] = useState(null);
  const [isWishlistAdded, setIsWishListAdded] = useState(0);
  const [loading, setLoading] = useState(false);
  const [quantityCount, setQuantityCount] = useState(1);
  const [currentSelectedProductColor, setCurrentSelectedProductColor] =
    useState("#FFA462");

  const isFocused = useIsFocused();

  useEffect(() => {
    fetchProductDetails();
  }, [isFocused]);

  useEffect(() => {
    if (productDetails != null) {
      setIsWishListAdded(productDetails?.is_in_wishlist);
    }
  }, [productDetails]);

  console.log("productDetails", productDetails);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <BaseBackIconHeader />,
    });
  }, [navigation]);

  const fetchProductDetails = async () => {
    

    let FINAL_FETCH_URL = `/products/${PRODUCT_ID}/variant?variant_id=${PRODUCT_VARIANT_ID}&currency=INR`;

    console.log("FINAL_FETCH_URL", FINAL_FETCH_URL);

    if (PRODUCT_TYPE === "simple_product" || PRODUCT_VARIANT_ID === -1) {
      FINAL_FETCH_URL = `/products/${PRODUCT_ID}/simple_product`;
    }

    try {
      setLoading(true);

      const response = (await axios.get(FINAL_FETCH_URL)).data;

      if (PRODUCT_TYPE === "simple_product" || PRODUCT_VARIANT_ID === -1) {
        setProductDetails(response?.data);
      } else {
        setProductDetails(response?.data?.original?.product);
      }

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  const wishlistSliceDetails = useSelector((state) => state.wishlist);
  const cartSliceDetails = useSelector((state) => state.cart);

  const WISHLIST_ARR = useMemo(
    () => wishlistSliceDetails?.wishlist,
    [wishlistSliceDetails]
  );
  const CART_ARR = useMemo(
    () => cartSliceDetails?.cart?.data,
    [cartSliceDetails]
  );

  const CHECK_WISHLIST_AVAILABILTY = useMemo(() => {
    const isAvailable = WISHLIST_ARR.find(
      (ele, index) => ele?.pro_id == PRODUCT_ID
    );

    return isAvailable == undefined ? false : true;
  }, [WISHLIST_ARR, PRODUCT_ID]);

  const CHECK_CART_AVAILABILTY = useMemo(() => {
    const isAvailable = CART_ARR?.find(
      (ele, index) =>
        ele?.pro_id == PRODUCT_ID || ele?.simple_pro_id == PRODUCT_ID
    );

    return isAvailable == undefined ? false : true;
  }, [CART_ARR, PRODUCT_ID]);

  const handleIncrement = useCallback(() => {
    if (productDetails?.combinations[0]?.stock == 0) {
      return;
    }

    if (quantityCount < productDetails?.combinations[0]?.stock) {
      setQuantityCount((prev) => prev + 1);
    } else {
      triggerToastMessage({
        message: "Product Maximum Quantity Reached",
        type: "warning",
      });
    }
  }, [quantityCount, productDetails]);

  const handleDecrement = useCallback(() => {
    if (productDetails?.combinations[0]?.stock == 0) {
      return;
    }
    setQuantityCount((prev) => (prev > 1 ? prev - 1 : 1));
  }, [quantityCount, productDetails]);

  const handleAddToWishlist = useCallback(() => {
    if (isWishlistAdded == 1) {
      setIsWishListAdded(0);
    }
    if (isWishlistAdded == 0) {
      setIsWishListAdded(1);
    }
    dispatch(
      addRemoveWishlist({
        product_id: productDetails?.combinations
          ? productDetails?.combinations[0].id
          : productDetails?.product_id,
        type: PRODUCT_TYPE,
      })
    );
  }, [productDetails, isWishlistAdded]);

  const handleAddToCart = useCallback(() => {
    if (productDetails?.combinations[0]?.stock == 0) {
      return;
    }
    const quantity = quantityCount === 0 ? 1 : quantityCount;

    dispatch(
      addToCart({
        product_id: PRODUCT_ID,
        type: PRODUCT_TYPE,
        variant_id: PRODUCT_VARIANT_ID,
        quantity: quantity,
      })
    );
  }, [
    quantityCount,
    PRODUCT_TYPE,
    productDetails,
    PRODUCT_ID,
    PRODUCT_VARIANT_ID,
  ]);

  const IMAGES_ARR = useMemo(() => {
    let productImagesArr = [];

    if (PRODUCT_TYPE === "simple_product" || PRODUCT_VARIANT_ID === -1) {
      productImagesArr.push(
        String(productDetails?.thumbnail_path).concat(
          `/${productDetails?.thumbnail}`
        )
      );
      productImagesArr.push(
        String(productDetails?.thumbnail_path).concat(
          `/${productDetails?.hover_thumbnail}`
        )
      );

      productDetails?.combinations &&
        productDetails?.combinations.length > 0 &&
        productDetails?.combinations[0].images?.forEach((ele) => {
          productImagesArr.push(
            String(productDetails?.images_path).concat(`/${ele?.image}`)
          );
        });
    } else {
      productDetails?.combinations &&
        productDetails?.combinations.length > 0 &&
        productDetails?.combinations[0].images?.forEach((ele) => {
          productImagesArr.push(
            String(productDetails?.images_path).concat(`/${ele?.image}`)
          );
        });
    }

    return productImagesArr;
  }, [productDetails, PRODUCT_TYPE, PRODUCT_VARIANT_ID]);

  console.log("dfsff", productDetails);

  const PRODUCT_OFFER_PRICE = useMemo(() => {
    let price = 0;
    price =
      productDetails?.combinations &&
      productDetails?.combinations.length > 0 &&
      productDetails?.combinations[0].offerprice;
    return price == null
      ? Array.isArray(productDetails?.combinations) &&
          productDetails?.combinations[0]?.mainprice
      : productDetails?.combinations[0]?.offerprice;
  }, [productDetails]);

  const colorArray = useMemo(() => {
    let colors = [];
    colors =
      Array.isArray(productDetails?.combinations) &&
      Array.isArray(productDetails?.combinations[0]?.variants)
        ? productDetails?.combinations[0]?.variants
        : []; 

    return colors
  }, [productDetails])

  





  if (loading || productDetails === null) {
    return (
      <BaseLayout>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator color={Colors.PRIMARY_COLOR} size={"large"} />
        </View>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sliderContainer}>
          <ProductDetailSwiper imageArr={IMAGES_ARR} imagePath={null} />

          <BaseIconButton
            styles={{
              position: "absolute",
              top: moderateScale(15),
              right: moderateScale(15),
            }}
            onPress={handleAddToWishlist}
          >
            {isWishlistAdded == 1 ? (
              <HeartFillIcon
                width={moderateScale(22)}
                height={moderateScale(22)}
              />
            ) : (
              <HeartOutlineIcon
                width={moderateScale(22)}
                height={moderateScale(22)}
              />
            )}
          </BaseIconButton>

          {productDetails?.sale_tag && (
            <View style={styles.miniContainer}>
              <Text
                style={{
                  fontFamily: Fonts.DM_SANS_BOLD,
                  fontSize: moderateScale(12),
                  color: Colors.SECONDARY_COLOR,
                }}
              >
                SALE
              </Text>
            </View>
          )}

          <View style={styles.productColorContainer}>
            {colorArray.map((ele, index) => {
              return (
                <TouchableOpacity
                  key={`${index}`}
                  style={[
                    styles.colorContainer,
                    { backgroundColor: ele?.var_name?.toLowerCase() },
                  ]}
                  activeOpacity={0.8}
                  accessibilityRole={"tab"}
                  accessible={true}
                  onPress={() => setCurrentSelectedProductColor(ele)}
                >
                  {currentSelectedProductColor == ele && <CheckIcon />}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.tabContainer}>
          <TouchableHighlight
            style={[styles.tabChildContainer, { flex: 0.3 }]}
            activeOpacity={0.8}
            accessibilityRole={"tab"}
            accessible={true}
            underlayColor={Colors.PRIMARY_GREY}
            onPress={() => console.log("erererr")}
          >
            <>
              <Text style={styles.tabChildContainerText}>PRICE</Text>
              <View style={[styles.tabIndicator]} />
            </>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.tabChildContainer, { flex: 0.4 }]}
            activeOpacity={0.8}
            accessibilityRole={"tab"}
            accessible={true}
            underlayColor={Colors.PRIMARY_GREY}
            onPress={() =>
              navigation.dispatch(
                CommonActions.navigate(
                  STACK_NAVIGATION_KEYS.DESCRIPTION_SCREEN,
                  { productDetails: productDetails?.description?.en }
                )
              )
            }
          >
            <Text style={styles.tabChildContainerText}>DESCRIPTION</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.tabChildContainer, { flex: 0.3 }]}
            activeOpacity={0.8}
            accessibilityRole={"tab"}
            accessible={true}
            underlayColor={Colors.PRIMARY_GREY}
            onPress={() =>
              navigation.dispatch(
                CommonActions.navigate(STACK_NAVIGATION_KEYS.REVIEW_SCREEN)
              )
            }
          >
            <Text style={styles.tabChildContainerText}>REVIEWS</Text>
          </TouchableHighlight>
        </View>
        <View style={{ flexGrow: 1 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "stretch",
              justifyContent: "space-between",
              marginVertical: moderateScale(12),
              paddingHorizontal: moderateScale(15),
            }}
          >
            <View style={{ flex: 0.8, alignSelf: "stretch" }}>
              <Text
                style={{
                  fontFamily: Fonts.POPPINS_MEDIUM,
                  fontSize: moderateScale(20),
                  color: Colors.SECONDARY_COLOR,
                  textTransform: "capitalize",
                }}
              >
                {productDetails?.product_name?.en}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                flex: 0.2,
              }}
            >
              <StarFilIcon />
              <Text
                style={{
                  fontFamily: Fonts.DM_SANS_REGULER,
                  fontSize: moderateScale(12),
                  color: Colors.PRIMARY_TEXT_COLOR,
                  marginLeft: moderateScale(4),
                }}
              >
                {Number(productDetails?.rating).toFixed(1)}
              </Text>
            </View>
          </View>

          <View style={{ marginLeft: moderateScale(15) }}>
            <View style={styles.productInnerContainer}>
              <View style={{ flex: 0.63 }}>
                {productDetails?.combinations[0]?.stock == 0 ? (
                  <Text
                    style={{
                      fontFamily: Fonts.DM_SANS_BOLD,
                      fontSize: moderateScale(20),
                      color: Colors.SECONDARY_COLOR,
                      textAlign: "left",
                      left: moderateScale(18),
                    }}
                  >
                    Out of stock
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontFamily: Fonts.DM_SANS_BOLD,
                      fontSize: moderateScale(20),
                      color: Colors.SECONDARY_COLOR,
                      textAlign: "left",
                      left: moderateScale(18),
                    }}
                  >
                    KD {displayAbsoluteAmount(PRODUCT_OFFER_PRICE)}
                  </Text>
                )}
              </View>
              <View
                style={{
                  flex: 0.37,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: moderateScale(20),
                }}
              >
                <BaseIconButton onPress={handleDecrement}>
                  <DecrementIcon
                    height={moderateScale(15)}
                    width={moderateScale(15)}
                  />
                </BaseIconButton>
                <Text
                  style={{
                    fontFamily: Fonts.DM_SANS_BOLD,
                    fontSize: moderateScale(14),
                    color: Colors.PRIMARY_TEXT_COLOR,
                    textAlign: "center",
                  }}
                >
                  {quantityCount}
                </Text>
                <BaseIconButton onPress={handleIncrement}>
                  <IncrementIcon
                    height={moderateScale(15)}
                    width={moderateScale(15)}
                  />
                </BaseIconButton>
              </View>
            </View>
          </View>

          <View
            style={{
              marginVertical: moderateScale(18),
              paddingHorizontal: moderateScale(15),
            }}
          >
            <BaseButton
              disabled={
                CHECK_CART_AVAILABILTY ||
                productDetails?.combinations[0]?.stock == 0
              }
              externalStyle={{
                opacity:
                  CHECK_CART_AVAILABILTY ||
                  productDetails?.combinations[0]?.stock == 0
                    ? 0.7
                    : 1,
                width: "100%",
              }}
              onPress={handleAddToCart}
              label={
                CHECK_CART_AVAILABILTY ? "ALREADY IN CART" : "+ ADD TO CART"
              }
            />
          </View>
        </View>
      </ScrollView>
    </BaseLayout>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  sliderContainer: {
    width: DEVICE_STYLES.SCREEN_WIDTH,
    height: moderateScale(412),
    overflow: "hidden",
  },
  miniContainer: {
    width: moderateScale(58),
    height: moderateScale(32),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: moderateScale(3),
    borderColor: Colors.BORDER_COLOR,
    borderWidth: moderateScale(0.9),
    backgroundColor: Colors.WHITE,
    position: "absolute",
    left: moderateScale(15),
    bottom: moderateScale(15),
    overflow: "hidden",
  },
  productColorContainer: {
    position: "absolute",
    right: moderateScale(15),
    bottom: moderateScale(15),
    gap: moderateScale(8),
  },
  colorContainer: {
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(5),
    alignItems: "center",
    justifyContent: "center",
  },
  tabContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    height: moderateScale(56),
    width: "100%",
    backgroundColor: "white",
    borderWidth: moderateScale(1),
    borderColor: Colors.BORDER_COLOR,
  },
  tabChildContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabChildContainerText: {
    fontFamily: Fonts.DM_SANS_BOLD,
    fontSize: moderateScale(12),
    color: Colors.SECONDARY_COLOR,
    textAlign: "center",
    textTransform: "uppercase",
  },
  tabIndicator: {
    position: "absolute",
    height: moderateScale(5),
    backgroundColor: Colors.SECONDARY_COLOR,
    width: "60%",
    borderRadius: moderateScale(10),
    bottom: moderateScale(-3),
    alignSelf: "center",
  },
  productInnerContainer: {
    width: "100%",
    height: moderateScale(60),
    flexDirection: "row",
    alignItems: "center",
    borderWidth: moderateScale(1),
    borderColor: Colors.BORDER_COLOR,
    alignSelf: "flex-end",
    borderTopLeftRadius: moderateScale(5),
    borderBottomLeftRadius: moderateScale(5),
  },
});
