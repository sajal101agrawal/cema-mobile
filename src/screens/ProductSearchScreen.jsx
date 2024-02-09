import {
  StyleSheet,
  View,
  Image,
  FlatList,
} from "react-native";
import React, { useCallback, useLayoutEffect, useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { Colors, DEVICE_STYLES, Fonts, moderateScale } from "../utils/theme";

import axios from "axios";
import { BASE_URL } from "../utils/api";
import BaseProductContainer from "../components/Product/BaseProductContainer";
import BaseLayout from "../components/Container/BaseLayout";
import { debounce } from "lodash";
import BaseBackIconHeader from "../components/Header/BaseBackIconHeader";

const ProductSearchScreen = () => {
  const navigation = useNavigation();

  const [productName, setProductName] = useState("");
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const [count, setCount] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const [moreLoading, setMoreLoading] = useState(true);

  

  const searchProductHandler = async (product_name, page) => {
    
    setLoading(true);

    await axios
      .get(`${BASE_URL}products?per_page=20&page=${1}&search=${product_name}`)
      .then((Res) => {
        if (Res.status == 200) {
          console.log(Res.data.data.data);
          if (Res.data?.data?.data?.length < 10) {
            setMoreLoading(false);
          }
          if (page > 1) {
            setProductList([...productList, ...Res.data.data.data]);
          } else {
            setProductList(Res.data.data.data);
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const debounced = useCallback(debounce(searchProductHandler, 1000), []);


  const onEndReached = useCallback(() => {
    if (!loading && moreLoading && productList.length > 0) {
      searchProductHandler(productName, pageNo + 1);
      setPageNo(pageNo + 1);
    }
  }, [pageNo, moreLoading]);

  const handleCounter = useCallback(
    () => setCount((prev) => prev + 1),
    [count]
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <BaseBackIconHeader productSearch={true} autoFocus={true} onChangeText={(e) => { debounced(e, 500), setProductName(e)}} value={productName} />,
    });
  }, [navigation, productName]);

  return (
    <BaseLayout>
      
      <View style={{ flex: 1, flexGrow: 1 }}>
        <FlatList
          data={productList}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          
          contentContainerStyle={{
            flexGrow: 1,
            paddingVertical: moderateScale(5),
          }}
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
          ListEmptyComponent={() => {
            return (
              <View style={{height: DEVICE_STYLES.SCREEN_HEIGHT * .8, alignItems:'center', justifyContent:'center'}}>
                <Image
                  source={require("../../assets/Images/search.png")}
                  style={{ height: undefined, width: "30%", aspectRatio: 1 }}
                />
              </View>
            );
          }}
          accessibilityRole={"list"}
          accessible={true}
          alwaysBounceVertical={false}
          scrollEventThrottle={16}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.1}
          refreshing={loading}
          onRefresh={() => debounced(productName, 1000)}
        />
      </View>
    </BaseLayout>
  );
};

export default ProductSearchScreen;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignSelf: "center",
    width: "95%",
    alignItems: "center",
    marginTop: moderateScale(10),
  },
  textInputStyle: {
    height: DEVICE_STYLES.SCREEN_HEIGHT * 0.075,
    width: "95%",
    alignSelf: "center",
    color: Colors.BLACK,
    fontFamily: Fonts.DM_SANS_REGULER,
    fontSize: moderateScale(14),
    paddingHorizontal: moderateScale(10),
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: "#ddd",
  },
  textInputContainer: {
    flexDirection: "row",
    height: "100%",
    width: "91%",
    backgroundColor: "#F2F2F3",
    borderRadius: moderateScale(20),
    alignItems: "center",
    paddingLeft: moderateScale(10),
    marginLeft: moderateScale(5),
  },
  renderContainer: {
    flexDirection: "row",
    padding: moderateScale(7),
    borderRadius: moderateScale(10),
    backgroundColor: "#F2F2F3",
  },
  imgStyle: {
    height: undefined,
    width: "100%",
    aspectRatio: 1.5,
    borderRadius: moderateScale(10),
  },
  textStyle: {
    color: Colors.BLACK,
    fontFamily: Fonts.DM_SANS_MEDIUM,
    fontSize: moderateScale(14),
  },
  amtStyle: {
    fontFamily: Fonts.DM_SANS_BOLD,
    fontSize: moderateScale(13),
    color: "#1D1D1D",
    top: moderateScale(10),
  },
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
