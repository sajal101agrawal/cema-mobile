import { StyleSheet, Text, View , BackHandler } from "react-native";
import React, { useCallback, useEffect } from "react";
import BaseLayout from "../components/Container/BaseLayout";
import { Colors, Fonts, moderateScale } from "../utils/theme";
import { CircleCheckIcon } from "../assets/icons";
import BaseButton from "../components/Buttons/BaseButton";
import BaseOutlineButton from "../components/Buttons/BaseOutlineButton";
import { CommonActions, StackActions, useNavigation } from "@react-navigation/core";

const OrderSuccessScreen = () => {

  const navigation = useNavigation();

  const handleOutlineNavigation = useCallback(() => {
    navigation.dispatch(CommonActions.reset({
      index: 1,
      routes: [
        {
          name: 'DrawerNavigator',
          state: {
            index: 0,
            routes: [
              {
                name: 'BottomNavigator',
                state: {
                  index: 0,
                  routes: [
                    { name: 'HomeScreen' }
                  ]
                }
              }
            ]
          }
        },
        {
          name : 'ProductScreen',
          params : {
            headerName : 'Products'
          }
        }
      ]
    }))
  }, [])

  const handleFillNavigation = useCallback(() => {
    navigation.dispatch(CommonActions.reset({
      index: 1,
      routes: [
        {
          name: 'DrawerNavigator',
          state: {
            index: 0,
            routes: [
              {
                name: 'BottomNavigator',
                state: {
                  index: 0,
                  routes: [
                    { name: 'ProfileScreen' }
                  ]
                }
              }
            ]
          }
        },
        {
          name : 'OrderDetailsScreen'
        }
      ]
    }))
  }, [])


  useEffect(() => {
    const disableBackButton = () => {
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", disableBackButton);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", disableBackButton);
    };
  }, []);

  return (
    <BaseLayout>
      <View
        style={{
          flex: 0.8,
          alignItems: "flex-start",
          justifyContent: "center",
          paddingHorizontal: moderateScale(20),
        }}
      >
        <CircleCheckIcon />
        <Text
          style={{
            fontFamily: Fonts.POPPINS_BOLD,
            fontSize: moderateScale(22),
            color: Colors.SECONDARY_COLOR,
            marginVertical: moderateScale(15),
          }}
        >
          {`Thank You For\nYour Order!`}
        </Text>
        <Text
          style={{
            fontFamily: Fonts.DM_SANS_REGULER,
            fontSize: moderateScale(16),
            color: Colors.PRIMARY_TEXT_COLOR,
            maxWidth: "80%",
          }}
        >
          Your order will be delivered on time. Thank you!
        </Text>
      </View>
      <View
        style={{
          flex: 0.2,
          alignItems: "center",
          justifyContent: "center",
          gap: moderateScale(15),
        }}
      >
        <View style={{ paddingHorizontal: moderateScale(5), width: "100%" }}>
          <BaseButton onPress={handleFillNavigation} label={"VIEW ORDERS"} />
        </View>
        <View style={{ paddingHorizontal: moderateScale(20), width: "100%" }}>
          <BaseOutlineButton onPress={handleOutlineNavigation} label={"CONTINUE SHOPPING"} />
        </View>
      </View>
    </BaseLayout>
  );
};

export default OrderSuccessScreen;

const styles = StyleSheet.create({});
