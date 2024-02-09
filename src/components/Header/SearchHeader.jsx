import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { memo, useMemo } from "react";
import { Colors, DEVICE_STYLES, Fonts, moderateScale } from "../../utils/theme";
import { CartIcon, MenuIcon, SearchIcon } from "../../assets/icons";
import BaseIconButton from "../Buttons/BaseIconButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DrawerActions } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { BOTTOM_NAVIGATION_KEYS } from "../../navigation/NavigationKeys";

const SearchHeader = ({ label }) => {

  const cartSliceData = useSelector((state) => state.cart)
  const safeAreaInsets = useSafeAreaInsets();
  const navigation = useNavigation()

  const CART_ARR_LENGTH = useMemo(() => {
    console.log(cartSliceData?.cart?.data,'...')
    return cartSliceData?.cart?.data?.length || null;
  },[cartSliceData]);

  return (
    <View style={[styles.headerContaier, { top: safeAreaInsets.top }]}>
      <View style={{flex: 0.4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap:moderateScale(20)}}>
        <BaseIconButton onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
          <MenuIcon />
        </BaseIconButton>
        <View  style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
         <SearchIcon/> 
        <Text style={styles.label}>{label}</Text>
        </View>
       
      </View>
      {/* <View style={{ flex: 0.58, alignItems: 'center', justifyContent: 'center' }}>
      </View> */}
      <View style={{ flex: 0.28, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap : moderateScale(8) }}>
        <View style={styles.walletContainer}>
          <Text style={{ fontFamily: Fonts.DM_SANS_BOLD, fontSize: moderateScale(10), color: Colors.WHITE, textAlign: 'center' }}>KWD 90</Text>
        </View>
        <BaseIconButton
          onPress={() => navigation.navigate(BOTTOM_NAVIGATION_KEYS.CART)}
        >
          <CartIcon />

          {cartSliceData?.cart?.data?.length == 0 ? null : (
            <View style={CART_ARR_LENGTH ? styles.badgeContainer : styles.badgeContainer1}>
              <Text style={styles.badgeContainerText}>{CART_ARR_LENGTH}</Text>
            </View>
          )}
        </BaseIconButton>
      </View>
    </View>
  );
};
export default memo(SearchHeader);

const styles = StyleSheet.create({
  headerContaier: {
    height: moderateScale(52),
    backgroundColor: Colors.WHITE,
    borderTopWidth: 0.8,
    borderBottomWidth: 0.8,
    borderColor: "#DBE9F5",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
  },
  label: {
    color: Colors.SECONDARY_COLOR,
    fontSize: moderateScale(16),
    fontFamily : Fonts.DM_SANS_REGULER,
    textAlign : 'center',
    left : moderateScale(6)
  },
  walletContainer: {
    backgroundColor: Colors.SECONDARY_COLOR,
    paddingHorizontal: moderateScale(9),
    paddingVertical: moderateScale(6),
    borderRadius: moderateScale(30),
    overflow: 'hidden'
  },
  badgeContainer : {
    height : moderateScale(15),
    width : moderateScale(15),
    borderRadius : moderateScale(7.5),
    alignItems : 'center',
    justifyContent : 'center',
    overflow : 'hidden',
    position : 'absolute',
    backgroundColor : Colors.SECONDARY_COLOR,
    bottom : 0
  },
  badgeContainer1 : {
    height : moderateScale(15),
    width : moderateScale(15),
    borderRadius : moderateScale(7.5),
    alignItems : 'center',
    justifyContent : 'center',
    overflow : 'hidden',
    position : 'absolute',
    bottom : 0
  },
  badgeContainerText : {
    fontFamily : Fonts.POPPINS_REGULAR,
    fontSize : moderateScale(8),
    color : Colors.WHITE,
    textAlign : 'center'
  }
});
