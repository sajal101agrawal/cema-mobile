import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { memo, useMemo } from "react";
import { Colors, DEVICE_STYLES, Fonts, moderateScale } from "../../utils/theme";
import BaseIconButton from "../Buttons/BaseIconButton";
import { BackIcon, CartIcon, SearchIcon } from "../../assets/icons";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import {
  BOTTOM_NAVIGATION_KEYS,
  STACK_NAVIGATION_KEYS,
} from "../../navigation/NavigationKeys";
import { Pressable } from "react-native";

const BaseBackIconHeader = ({ label, showSearch = false, productSearch = false, autoFocus=false, onChangeText, value }) => {
  const navigation = useNavigation();
  const SafeAreaInsets = useSafeAreaInsets();

  const cartSliceData = useSelector((state) => state.cart);
  const safeAreaInsets = useSafeAreaInsets();

  const CART_ARR_LENGTH = useMemo(() => {
    return cartSliceData?.cart?.data?.length;
  }, [cartSliceData]);

  return (
    <View style={[styles.container, { top: SafeAreaInsets.top }]}>
      <View style={{ flex: 0.12 }}>
        <BaseIconButton
          styles={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          onPress={() => navigation.goBack()}
        >
          <BackIcon />
        </BaseIconButton>
      </View>
      <View style={{ flex: 0.6, justifyContent: "center" }}>
        {showSearch && (
          <Pressable
            style={{ flexDirection: "row", gap: moderateScale(5) }}
            onPress={() =>
              navigation.navigate(STACK_NAVIGATION_KEYS.PRODUCT_SEARCH_SCREEN)
            }
          >
            <SearchIcon />

            <View

            // value={searchText}
            // onChangeText={(text) => setSearchText(text)}
            // onSubmitEditing={handleSearch}
            >
              <Text
                style={{
                  fontFamily: Fonts.DM_SANS_MEDIUM,
                  fontSize: moderateScale(14),
                  color: "#4A5F73",
                  textAlign: "left",
                }}
              >
                Search...
              </Text>
            </View>
          </Pressable>
        )}
        {productSearch && (
          <View style={{ flexDirection: "row", gap: moderateScale(5) }}>
            <View
              style={{
                height: "86%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SearchIcon />
            </View>

            <View>
              <TextInput
                onChangeText={onChangeText}
                value={value}
                keyboardType="web-search"
                autoFocus={autoFocus}
                placeholder="Search..."
                placeholderTextColor={"#4A5F73"}
                cursorColor={"#000"}
                style={{
                  fontFamily: Fonts.DM_SANS_MEDIUM,
                  fontSize: moderateScale(14),
                  color: "#4A5F73",
                  textAlign: "left",
                  width: DEVICE_STYLES.SCREEN_WIDTH * 0.53,
                }}
              />
            </View>
          </View>
        )}
      </View>
      <View
        style={{
          flex: 0.28,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={styles.walletContainer}>
          <Text
            style={{
              fontFamily: Fonts.DM_SANS_BOLD,
              fontSize: moderateScale(10),
              color: Colors.WHITE,
              textAlign: "center",
            }}
          >
            KWD 90
          </Text>
        </View>
        <BaseIconButton
          onPress={() => navigation.navigate(BOTTOM_NAVIGATION_KEYS.CART)}
        >
          <CartIcon />

          {cartSliceData?.cart?.data?.length == 0 ? null : (
            <View
              style={
                CART_ARR_LENGTH ? styles.badgeContainer : styles.badgeContainer1
              }
            >
              <Text style={styles.badgeContainerText}>{CART_ARR_LENGTH}</Text>
            </View>
          )}
        </BaseIconButton>
      </View>
    </View>
  );
};

export default memo(BaseBackIconHeader);

const styles = StyleSheet.create({
  container: {
    height: moderateScale(52),
    alignItems: "stretch",
    flexDirection: "row",
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.BORDER_COLOR,
  },
  headerLabelStyle: {
    fontFamily: Fonts.DM_SANS_REGULER,
    fontSize: moderateScale(16),
    color: Colors.SECONDARY_COLOR,
    right: moderateScale(-10),
  },
  walletContainer: {
    backgroundColor: Colors.SECONDARY_COLOR,
    paddingHorizontal: moderateScale(9),
    paddingVertical: moderateScale(6),
    borderRadius: moderateScale(30),
    marginRight: moderateScale(8),
    overflow: "hidden",
  },
  badgeContainer: {
    height: moderateScale(15),
    width: moderateScale(15),
    borderRadius: moderateScale(7.5),
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    position: "absolute",
    backgroundColor: Colors.SECONDARY_COLOR,
    bottom: 0,
  },
  badgeContainer1: {
    height: moderateScale(15),
    width: moderateScale(15),
    borderRadius: moderateScale(7.5),
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
  },
  badgeContainerText: {
    fontFamily: Fonts.POPPINS_REGULAR,
    fontSize: moderateScale(8),
    color: Colors.WHITE,
    textAlign: "center",
  },
});
