import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import BaseLayout from "../components/Container/BaseLayout";
import BaseBackIconHeader from "../components/Header/BaseBackIconHeader";
import BaseProductContainer from "../components/Product/BaseProductContainer";
import BaseListEndIndicator from "../components/Atoms/BaseListEndIndicator";
import { CommonActions, useIsFocused, useNavigation } from "@react-navigation/native";
import { FilterIcon, BottomChevron } from "../assets/icons";
import { Colors, DEVICE_STYLES, Fonts, moderateScale } from "../utils/theme";
import FilterModal from "../components/Modal/FilterModal";
import { fetchProducts } from "../redux/actions/product/fetchProducts";
import { useSelector, useDispatch } from "react-redux";
import { checkProductType } from "../services";
import SortingModal from "../components/Modal/SortingModal";
import { fetchCart } from "../redux/actions/cart/fetchCart";
import { fetchWishlist } from "../redux/actions/wishlist/fetchWishlist";

const ProductScreen = ({ route }) => {
  const HEADER_NAME = route.params.headerName;
  const CATEGORY_ID = route.params.category || null;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused()

  const productSliceData = useSelector((state) => state.product);


  const [count, setCount] = useState(0);
  const [filterModalVisiable, setFilterModalVisiable] = useState(false);
  const [sortingModalVisiable, setSortingModalVisiable] = useState(false);
  const [productList,setProductList] = useState(null)

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <BaseBackIconHeader showSearch={true} />,
    });
  }, [navigation]);

  useEffect(() => {
    if(productSliceData) {
      setProductList(productSliceData.product)
    }
  }, [productSliceData])

  const fetchAllProducts = useCallback(
    (page) => {
      const PRODUCT_TYPE = checkProductType(HEADER_NAME);
      const POST_FIX = CATEGORY_ID ? `&category_id=${CATEGORY_ID}` : null;

      dispatch(
        fetchProducts({
          page: page || 1,
          type: PRODUCT_TYPE,
          postfix: POST_FIX,
        })
      );
    },
    [HEADER_NAME, CATEGORY_ID]
  );

  const filterallProducts = useCallback(
    (type) => {
      const PRODUCT_TYPE = checkProductType(HEADER_NAME);

      const Filter_type = `${PRODUCT_TYPE}&${type}=1`;
      dispatch(fetchProducts({ page: 1, type: Filter_type }));
      setFilterModalVisiable(false);
    },
    [HEADER_NAME]
  );

  useEffect(() => {
    fetchAllProducts(1);
    fetchCart();
  }, [isFocused]);

  const handleCounter = useCallback(
    () => setCount((prev) => prev + 1),
    [count]
  );
  const toggleFilerModal = useCallback(
    () => setFilterModalVisiable(!filterModalVisiable),
    [filterModalVisiable]
  );

  const toggleSortingModal = useCallback(
    () => setSortingModalVisiable(!sortingModalVisiable),
    [sortingModalVisiable]
  );

  const LIST_HEADER_COMPONENT = useMemo(() => {
    return (
      <View style={styles.listHeaderCompoenentStyle}>
        <View style={{ flex: 1, alignItems: "flex-start" }}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            activeOpacity={0.8}
            accessibilityRole={"tab"}
            accessible={true}
            onPress={toggleFilerModal}
          >
            <FilterIcon />
            <Text style={styles.headerLabelStyle}>Filters</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            activeOpacity={0.8}
            accessibilityRole={"tab"}
            accessible={true}
          >
            <Text style={styles.headerLabelStyle}>Sorting by</Text>
            <BottomChevron />
          </TouchableOpacity>
        </View>
      </View>
    );
  }, []);

  const productsDataArr = useMemo(
    () => productSliceData?.product || [],
    [productSliceData]
  );

  const onEndReached = useCallback(() => {
    if (
      productSliceData?.productMoreDataFetching &&
      !productSliceData?.productDataFetching &&
      productsDataArr.length > 0
    ) {
      fetchAllProducts(productSliceData.currentPage + 1);
    }
  }, [productSliceData]);

  const footerLoaderIndicator = useMemo(() => {
    if (
      productSliceData?.productMoreDataFetching &&
      productsDataArr.length > 0
    ) {
      return true;
    }
    return false;
  }, [productSliceData, productsDataArr]);

  return (
    <BaseLayout>
      {LIST_HEADER_COMPONENT}
      <View style={{ flex: 1 }}>
        <FlatList
          data={productsDataArr}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={{
            flexGrow: 1,
            paddingVertical: moderateScale(5),
          }}
          ItemSeparatorComponent={() => (
            <View style={{ margin: moderateScale(5) }} />
          )}
          ListFooterComponent={() => (
            <BaseListEndIndicator loading={footerLoaderIndicator} />
          )}
          renderItem={({ item, index }) => {
            return (
              <BaseProductContainer
                item={item}
                index={index}
                key={`${index}`}
                count={count}
                handleCounter={handleCounter}
              />
            );
          }}
          accessibilityRole={"list"}
          accessible={true}
          alwaysBounceVertical={false}
          scrollEventThrottle={16}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.1}
          refreshing={productSliceData?.productDataFetching}
          onRefresh={() => fetchAllProducts(1)}
        />
      </View>

      <FilterModal
        key={"filter-modal"}
        modalVisiblity={filterModalVisiable}
        handleModalVisibilty={toggleFilerModal}
        setSelectedOption={filterallProducts}
      />
      <SortingModal
        key={"sorting-modal"}
        modalVisiblity={sortingModalVisiable}
        handleModalVisibilty={toggleSortingModal}
      />
    </BaseLayout>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  listHeaderCompoenentStyle: {
    height: moderateScale(45),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.WHITE,
    paddingHorizontal: moderateScale(15),
  },
  headerLabelStyle: {
    marginHorizontal: moderateScale(8),
    fontFamily: Fonts.DM_SANS_REGULER,
    fontSize: moderateScale(14),
    color: Colors.PRIMARY_TEXT_COLOR,
  },
});
