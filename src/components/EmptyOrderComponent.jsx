import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { memo, useCallback } from "react";
import { moderateScale, Colors, Fonts } from "../utils/theme";
import { MyOrderIcon, ShoppingBagIcon } from "../assets/icons";
import { STACK_NAVIGATION_KEYS } from "../navigation/NavigationKeys";
import BaseOutlineButton from "./Buttons/BaseOutlineButton";
import { CommonActions, useNavigation } from "@react-navigation/native";

const EmptyOrderComponent = ({ isLoading = false }) => {
  const navigation = useNavigation();

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"large"} color={Colors.SECONDARY_COLOR} />
      </View>
    );
  }

  const handleShopNowPress = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: "DrawerNavigator",
        },
      ],
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: moderateScale(15),
      }}
    >
      <View style={{ flex: 0.85, justifyContent: "center" }}>
        <View style={styles.iconContainer}>
          <MyOrderIcon />
        </View>
        <View style={{ marginTop: moderateScale(15) }}>
          <Text
            style={{
              fontFamily: Fonts.POPPINS_BOLD,
              fontSize: moderateScale(22),
              color: Colors.SECONDARY_COLOR,
            }}
          >
            Don't have any order
          </Text>
        </View>
        
      </View>
      <View
        style={{ flex: 0.15, alignItems: "center", justifyContent: "center" }}
      >
        <BaseOutlineButton onPress={handleShopNowPress} label={"GO TO HOME"} />
      </View>
    </View>
  );
};

export default memo(EmptyOrderComponent);

const styles = StyleSheet.create({
  iconContainer: {
    width: moderateScale(70),
    height: moderateScale(70),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: moderateScale(35),
    borderColor: Colors.SECONDARY_COLOR,
    borderWidth: moderateScale(2),
  },
});
