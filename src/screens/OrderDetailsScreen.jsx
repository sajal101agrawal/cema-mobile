import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BaseLayout from "../components/Container/BaseLayout";
import OrderListContainerComponent from "../components/Atoms/OrderListContainerComponent";
import { EMPTY_ARR } from "../utils/constant";
import { fetchMyOrders } from '../redux/actions/cart/fetchMyOrders'
import { Colors, moderateScale } from "../utils/theme";
import { updatePageNo,initialMoreLoading } from "../redux/slices/cart";
import EmptyCartComponent from "../components/Cart/EmptyCartComponent";
import EmptyOrderComponent from "../components/EmptyOrderComponent";

const OrderDetailsScreen = () => {
  const cartSliceData = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    dispatch(fetchMyOrders(1));

  }, []);

  const onEndReached = () => {
    if(!cartSliceData.ordersFetching && cartSliceData.moreLoading) {
      dispatch(fetchMyOrders(cartSliceData.pageNo + 1))
      dispatch(updatePageNo(cartSliceData.pageNo + 1))
    }
  }

  const onRefresh = () => {
    dispatch(fetchMyOrders(1))
    dispatch(updatePageNo(1))
    dispatch(initialMoreLoading())
  }

  const listFooterComponent = () => {
    return (!cartSliceData.ordersFetching && cartSliceData.moreLoading && (cartSliceData.pageNo > 1)) ? 
      <ActivityIndicator size={'large'} color={Colors.PRIMARY_TEXT_COLOR} style={{marginVertical: moderateScale(7)}} /> : null
  }


  const orders = useMemo(() => cartSliceData.myOrders || EMPTY_ARR, [cartSliceData.myOrders]);

  return (
    <BaseLayout>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        {cartSliceData.ordersFetching ? (
          <ActivityIndicator style={styles.loader} size="large" color={Colors.PRIMARY_TEXT_COLOR} />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={orders}
            refreshing={cartSliceData.ordersFetching}
            onRefresh={onRefresh}
            contentContainerStyle={{ flexGrow: 1 }}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <OrderListContainerComponent key={`${index}`} index={index} item={item} />
            )}
            ListEmptyComponent={() => <EmptyOrderComponent />}
            onEndReachedThreshold={.5}
            onEndReached={onEndReached}
            ListFooterComponent={listFooterComponent}
          />
        )}
      </View>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OrderDetailsScreen;
