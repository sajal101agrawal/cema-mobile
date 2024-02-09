import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BaseLayout from "../../src/components/Container/BaseLayout";
import { HOME_BANNER, HomeBottomBanner } from "../../src/assets/images";
import { Colors, Fonts, moderateScale } from "../../src/utils/theme";
import { RightIcon } from "../../src/assets/icons";
import CategoryContainer from "../../src/components/Container/CategoryContainer";
import { fetchCategories } from "../../src/redux/actions/category/fetchCategories";
import HomeCategoryContainer from "../../src/components/Container/HomeCategoryContainer";
import BaseHomeScreenProduct from "../../src/components/Product/BaseHomeScreenProduct";
import SilderImageComponent from "../../src/components/Slider/SilderImageComponent";
import { fetchProducts } from "../../src/redux/actions/product/fetchProducts";
import { CommonActions, useIsFocused, useNavigation } from "@react-navigation/native";
import {
  BOTTOM_NAVIGATION_KEYS,
  STACK_NAVIGATION_KEYS,
} from "../../src/navigation/NavigationKeys";
import axios from "axios";
import { API_ENPOINTS } from "../../src/utils/api";
import { ActivityIndicator } from "react-native";
import { fetchWishlist } from "../../src/redux/actions/wishlist/fetchWishlist";

const FeaturedProductsContainer = memo(({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  const isFocused = useIsFocused()

  const FINAL_URL = `${API_ENPOINTS.GET_PRODUCTS}?per_page=10&page=1&featured=1`;

  useEffect(() => {
    fetchFeaturesProducts();
  }, [isFocused]);

  const fetchFeaturesProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(FINAL_URL);
      setData(response.data?.data.data)
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const handleCounter = useCallback(
    () => setCount((prev) => prev + 1),
    [count]
  );

  return (
    <View
      style={{
        paddingHorizontal: moderateScale(20),
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: moderateScale(8),
        }}
      >
        <Text
          style={{
            fontSize: moderateScale(20),
            color: Colors.BLACK,
            fontFamily: Fonts.DM_SANS_MEDIUM,
          }}
        >
          Featured Products
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate(STACK_NAVIGATION_KEYS.PRODUCT_SCREEN, {
              headerName: "Featured products",
              category: null
            })
          }
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: moderateScale(5),
          }}
        >
          <Text
            style={{
              fontSize: moderateScale(16),
              color: Colors.BLACK,
              fontFamily: Fonts.DM_SANS_REGULER,
            }}
          >
            view all
          </Text>
          <RightIcon />
        </TouchableOpacity>
      </View>
      <View>
        <View style={{ flex: 1 }}>
          <FlatList
            data={data}
            keyExtractor={(_, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            horizontal
            contentContainerStyle={{
              flexGrow: 1,
              paddingTop: moderateScale(5),
            }}
            ItemSeparatorComponent={() => (
              <View style={{ margin: moderateScale(5) }} />
            )}
            renderItem={({ item, index }) => {
              return (
                <BaseHomeScreenProduct
                  item={item}
                  index={index}
                  key={`${index}`}
                  count={count}
                  handleCounter={handleCounter}
                  data={data}
                  setData={setData}
                />
              );
            }}
            overScrollMode={'never'}
            accessibilityRole={"list"}
            accessible={true}
            alwaysBounceVertical={false}
            scrollEventThrottle={16}
          />
        </View>
      </View>
    </View>
  );
});

const HomeScreen = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const categorySliceData = useSelector((state) => state.category);
  const productSliceData = useSelector((state) => state.product);

  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [sliderData, setSliderData] = useState();

  useEffect(() => {
    getSliderImage();
  }, []);

  const getSliderImage = async () => {
    setIsLoading(true);
    await axios
      .get(API_ENPOINTS.SLIDER)
      .then((res) => {
        setSliderData(res?.data?.sliders);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(">>>>>>", err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    dispatch(fetchCategories({ page: 1 }));
    dispatch(fetchWishlist())
  }, []);

  const categories = useMemo(() => {
    return categorySliceData ? categorySliceData?.category?.data : [];
  }, [categorySliceData]);

  const handleCounter = useCallback(
    () => setCount((prev) => prev + 1),
    [count]
  );

  const handleShopNowPress = useCallback(() => {
    navigation.dispatch(
      CommonActions.navigate(STACK_NAVIGATION_KEYS.PRODUCT_SCREEN, {
        headerName: "Products",
        category: null
      })
    );
  }, []);

  return (
    <BaseLayout>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.BannerImage}>
          {isLoading ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator
                size={"large"}
                color={Colors.PRIMARY_TEXT_COLOR}
              />
            </View>
          ) : (
            <SilderImageComponent sliderData={sliderData} />
          )}
          {/* <Image
            source={{ uri: HOME_BANNER.uri }}
            resizeMode="cover"
            style={{
              height: "100%",
              width: "100%",
            }}
          /> */}
        </View>
        <View style={styles.bestDecorStyle}>
          <View
            style={{
              paddingHorizontal: moderateScale(20),
              gap: moderateScale(10),
            }}
          >
            <Text
              style={{
                fontSize: moderateScale(24),
                color: Colors.BLACK,
                fontFamily: Fonts.DM_SANS_BOLD,
              }}
            >
              Home Best Decor
            </Text>
            <Text
              style={{
                fontSize: moderateScale(14),
                color: "#000000",
                fontFamily: Fonts.DM_SANS_REGULER,
              }}
            >
              Best collections for your home
            </Text>
            <TouchableOpacity
              onPress={() => handleShopNowPress()}
              activeOpacity={0.7}
              style={styles.shopNowButton}
            >
              <Text
                style={{
                  fontSize: moderateScale(10),
                  color: "#fff",
                  fontFamily: Fonts.DM_SANS_MEDIUM,
                }}
              >
                SHOP NOW
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: moderateScale(20),
            marginVertical: moderateScale(20),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: moderateScale(20),
                color: Colors.BLACK,
                fontFamily: Fonts.DM_SANS_MEDIUM,
              }}
            >
              Top Categories
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate(BOTTOM_NAVIGATION_KEYS.SEARCH)}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: moderateScale(5),
              }}
            >
              <Text
                style={{
                  fontSize: moderateScale(16),
                  color: Colors.BLACK,
                  fontFamily: Fonts.DM_SANS_REGULER,
                }}
              >
                view all
              </Text>
              <RightIcon />
            </TouchableOpacity>
          </View>
          <FlatList
            data={categories}
            numColumns={3}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              justifyContent: "space-between",
              gap: moderateScale(10),
              paddingVertical: moderateScale(13),
            }}
            renderItem={({ item, index }) => (
              <HomeCategoryContainer
                item={item}
                index={index}
                key={`${index}`}
              />
            )}
            accessibilityRole={"list"}
            accessible={true}
            alwaysBounceVertical={false}
            scrollEventThrottle={16}
            onEndReached={() => {}}
            onEndReachedThreshold={0.1}
            refreshing={false}
          />
        </View>
        <FeaturedProductsContainer navigation={navigation} />
        <View
          style={{
            width: "93%",
            height: moderateScale(200),
            marginBottom: moderateScale(25),
          }}
        >
          <ImageBackground
            source={{ uri: HomeBottomBanner.uri }}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "flex-start",
                paddingHorizontal: moderateScale(20),
                gap: moderateScale(10),
              }}
            >
              <Text
                style={{
                  fontSize: moderateScale(22),
                  color: Colors.BLACK,
                  fontFamily: Fonts.DM_SANS_BOLD,
                }}
              >
                Spring Discounts
              </Text>
              <Text
                style={{
                  fontSize: moderateScale(22),
                  color: Colors.BLACK,
                  fontFamily: Fonts.DM_SANS_BOLD,
                }}
              >
                On Leather Chairs
              </Text>
              <TouchableOpacity
                onPress={() => handleShopNowPress()}
                activeOpacity={0.7}
                style={styles.shopNowButton}
              >
                <Text
                  style={{
                    fontSize: moderateScale(10),
                    color: "#fff",
                    fontFamily: Fonts.DM_SANS_MEDIUM,
                  }}
                >
                  SHOP NOW
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    </BaseLayout>
  );
};
const styles = StyleSheet.create({
  BannerImage: {
    width: "100%",
    height: moderateScale(359),
  },
  bestDecorStyle: {
    width: "100%",
    height: moderateScale(152),
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#e7efe7",
  },
  shopNowButton: {
    width: moderateScale(113),
    height: moderateScale(38),
    borderRadius: moderateScale(8),
    backgroundColor: "#070d12",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default HomeScreen;
