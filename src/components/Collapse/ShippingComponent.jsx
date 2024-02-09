import { StyleSheet, Text, View } from "react-native";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { moderateScale, Colors, Fonts } from "../../utils/theme";
import BaseLineComponent from "../Product/BaseLineComponent";
import BaseButton from "../Buttons/BaseButton";
import { fetchOrderDetails } from '../../services/others';
import { EMPTY_ARR } from '../../utils/constant';
import { displayAbsoluteAmount } from '../../services'
import { CommonActions, useNavigation } from '@react-navigation/native';
import { STACK_NAVIGATION_KEYS } from "../../navigation/NavigationKeys";
import { ActivityIndicator } from "react-native";
import FastImage from "react-native-fast-image";

let timer;

const ShippingComponent = ({ orderID, orderDate ,readyToFetch = false }) => {

  const navigation = useNavigation();

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (readyToFetch && details == null && orderID) {
      clearTimeout(timer);
      timer = setTimeout(() => getOrderDetails(), 1200);
    }
  }, [orderID, readyToFetch]);

  const getOrderDetails = async () => {
    setLoading(true);
    const orderDetails = await fetchOrderDetails(orderID);
    setDetails(orderDetails.order);
    setLoading(false);
  }

 

  const handleNavigate = useCallback(() => {
    if(details){
      navigation.navigate(STACK_NAVIGATION_KEYS.ORDER_TRACKING_SCREEN , {details : details })
    }
  }, [details]);

  const ORDERED_PRODUCTS_DATA = useMemo(() => {
    return details ? details.orderitems : EMPTY_ARR;
  }, [details]);

  

  const ORDERED_PRODUCTS = useMemo(() => {

    return (
      ORDERED_PRODUCTS_DATA?.map((ele, index) => {
        console.log("ele", ele);
        return (
          <View key={`${index}`} style={styles.container}>
            <FastImage
              resizeMode="contain"
              style={{
                height: undefined,
                width: "20%",
                aspectRatio: 1.3,
                right: moderateScale(12),
              }}
              source={{ uri: ele?.product_image }}
            />
            <View style={{ flex: 0.5, alignItems: "flex-start" }}>
              <Text
                numberOfLines={1}
                style={[
                  styles.labelStyle,
                  {
                    textAlign: "left",
                    textTransform: "capitalize",
                    right: moderateScale(20),
                  },
                ]}
              >
                {ele?.product_name?.en}
              </Text>
            </View>
            <View style={{ flex: 0.5, alignItems: "flex-start" }}>
              <Text
                numberOfLines={1}
                style={[
                  styles.labelStyle,
                  {
                    textAlign: "left",
                    // textTransform: "capitalize",
                    right: moderateScale(23),
                  },
                ]}
              >
                {ele?.qty} X
                KD&nbsp;
                {displayAbsoluteAmount(ele?.price)}
              </Text>
            </View>
            <View style={{ flex: 0.4, alignItems: "flex-end" }}>
              <Text
                style={[
                  styles.labelStyle,
                  {
                    textAlign: "right",
                    color: ele?.status == "Delivered" ? "#00824B" : "#FFA462",
                  },
                ]}
              >
                {ele?.status}
              </Text>
            </View>
          </View>
        );
      })
    )
  }, [ORDERED_PRODUCTS_DATA]);

  if(loading || !details){
    return(
      <View style={{height : moderateScale(120),width : '100%',alignItems : 'center', justifyContent : 'center'}}>
        <ActivityIndicator hidesWhenStopped size={'large'} color={Colors.PRIMARY_TEXT_COLOR} />
      </View>
    )
  }

  return (
    <>
      <View style={[styles.productBox]}>
        {ORDERED_PRODUCTS}
        <BaseLineComponent
          style1={{
            alignSelf: "center",
            width: "96%",
            height: 1.3,
            marginVertical: moderateScale(5),
          }}
        />
        <View style={styles.container}>
          <View style={{ flex: 0.6, alignItems: "flex-start" }}>
            <Text style={[styles.labelStyle, { textAlign: "left" }]}>
              Delivery
            </Text>
          </View>
          <View style={{ flex: 0.4, alignItems: "flex-end" }}>
            <Text style={[styles.labelStyle, { textAlign: "right" }]}>
              {details?.currency}&nbsp;
              {displayAbsoluteAmount(details?.shipping)}
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <View style={{ flex: 0.6, alignItems: "flex-start" }}>
            <Text style={[styles.labelStyle, { textAlign: "left" }]}>Tax</Text>
          </View>
          <View style={{ flex: 0.4, alignItems: "flex-end" }}>
            <Text style={[styles.labelStyle, { textAlign: "right" }]}>
              {details?.currency}&nbsp;{displayAbsoluteAmount(details?.tax)}
            </Text>
          </View>
        </View>

        <View style={styles.container}>
          <View style={{ flex: 0.6, alignItems: "flex-start" }}>
            <Text
              style={[
                styles.labelStyle,
                { textAlign: "left", color: Colors.SECONDARY_COLOR },
              ]}
            >
              Total
            </Text>
          </View>
          <View style={{ flex: 0.4, alignItems: "flex-end" }}>
            <Text
              style={[
                styles.labelStyle,
                { textAlign: "right", color: Colors.SECONDARY_COLOR },
              ]}
            >
              {details?.currency}&nbsp;
              {displayAbsoluteAmount(details?.grand_total)}
            </Text>
          </View>
        </View>
      </View>
      <BaseButton
        onPress={handleNavigate}
        externalStyle={{ marginVertical: moderateScale(12) }}
        label={"TRACK ORDER"}
      />
    </>
  );
};

export default memo(ShippingComponent);

const styles = StyleSheet.create({
  productBox: {
    width: "90%",
    height: undefined,
    backgroundColor: "rgba(219, 233, 245, 0.15)",
    borderRadius: moderateScale(5),
    borderWidth: 0.7,
    borderColor: Colors.BORDER_COLOR,
    alignSelf: "center",
    marginTop: moderateScale(5),
    paddingVertical: moderateScale(8)
  },
  labelStyle: {
    fontFamily: Fonts.DM_SANS_MEDIUM,
    fontSize: moderateScale(14),
    color: Colors.PRIMARY_TEXT_COLOR,
    flexWrap: 'wrap'
  },
  container: {
    marginVertical: moderateScale(5),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10)
  }
});
