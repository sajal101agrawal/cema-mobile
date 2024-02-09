import React, {
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { moderateScale, Colors, Fonts } from "../../utils/theme";
import BaseTextinputComponent from "../Textinput/BaseTextinputComponent";
import BaseButton from "../Buttons/BaseButton";
import BaseDevider from "../Atoms/BaseDevider";
import BaseOutlineButton from "../Buttons/BaseOutlineButton";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { STACK_NAVIGATION_KEYS } from "../../navigation/NavigationKeys";
import { fetchpromoCodes } from "../../redux/actions/promocodes";
import { useDispatch, useSelector } from "react-redux";
import { displayAbsoluteAmount } from "../../services";

const CartListBottomContainer = () => {
  const cartSliceData = useSelector((state) => state.cart);

  const navigation = useNavigation();
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const [couponCode, setCouponCode] = useState({
    code: "",
    currency: "INR",
  });

  const handleApplyCoupon = useCallback(() => {
    dispatch(
      fetchpromoCodes({
        couponCodeValue: couponCode.code,
        currencyType: couponCode.currency,
        dispatch: dispatch
      })
    );
  }, [couponCode]);

  const handleVoucherChange = useCallback(
    (key, value) => {
      couponCode[key] = value;
      setCouponCode((prev) => ({
        ...prev,
        ...couponCode,
      }));
    },
    [couponCode]
  );

  const cartDetails = useMemo(() => cartSliceData.cart, [cartSliceData])

  return (
    <Pressable
      style={styles.listBottomContainer}
      onPress={() => inputRef.current?.blur()}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "stretch",
          justifyContent: "space-between",
          marginTop: moderateScale(10),
        }}
      >
        <View style={{ flex: 0.7, alignItems: "stretch" }}>
          <BaseTextinputComponent
            inputRef={inputRef}
            label={"ENTER THE VOUCHER"}
            value={couponCode.code}
            onChange={(e) => handleVoucherChange("code", e)}
            placeholder={"Enter your promocode"}
            autoCapitalize={"characters"}
          />
        </View>
        <View style={{ flex: 0.28, alignItems: "stretch" }}>
          <BaseButton
            externalStyle={{
              height: moderateScale(50),
            }}
            label={"APPLY"}
            onPress={handleApplyCoupon}
          />
        </View>
      </View>
      <View
        style={{
          ...styles.innerContainer,
          height:
            cartDetails?.discount_amount != 0
              ? moderateScale(170)
              : moderateScale(150),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: moderateScale(5.5),
          }}
        >
          <View style={{ flex: 1, alignItems: "flex-start" }}>
            <Text
              style={{
                fontFamily: Fonts.POPPINS_SEMI_BOLD,
                fontSize: moderateScale(14),
                color: Colors.SECONDARY_COLOR,
                textAlign: "left",
              }}
            >
              Sub Total
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Text
              style={{
                fontFamily: Fonts.DM_SANS_REGULER,
                fontSize: moderateScale(14),
                color: Colors.SECONDARY_COLOR,
                textAlign: "right",
              }}
            >
              KD {displayAbsoluteAmount(cartDetails?.total)}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: moderateScale(5.5),
          }}
        >
          <View style={{ flex: 1, alignItems: "flex-start" }}>
            <Text
              style={{
                fontFamily: Fonts.DM_SANS_REGULER,
                fontSize: moderateScale(14),
                color: Colors.SECONDARY_COLOR,
                textAlign: "left",
              }}
            >
              Delivery
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Text
              style={{
                fontFamily: Fonts.DM_SANS_REGULER,
                fontSize: moderateScale(14),
                color: Colors.SECONDARY_COLOR,
                textAlign: "right",
              }}
            >
              KD {displayAbsoluteAmount(cartDetails?.shipping_charge)}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: moderateScale(5.5),
          }}
        >
          {cartDetails?.discount_amount != 0 && (
            <View style={{ flex: 1, alignItems: "flex-start" }}>
              <Text
                style={{
                  fontFamily: Fonts.DM_SANS_REGULER,
                  fontSize: moderateScale(14),
                  color: Colors.SECONDARY_COLOR,
                  textAlign: "left",
                }}
              >
                Discount (GET{`${cartDetails?.discount_amount}`})
              </Text>
            </View>
          )}
          {cartDetails?.discount_amount != 0 && (
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <Text
                style={{
                  fontFamily: Fonts.DM_SANS_REGULER,
                  fontSize: moderateScale(14),
                  color: Colors.SECONDARY_COLOR,
                  textAlign: "right",
                }}
              >
                KD {displayAbsoluteAmount(cartDetails?.discount_amount)}
              </Text>
            </View>
          )}
        </View>
        <BaseDevider marginVertical={10} />
        <View style={{ flexGrow: 1, justifyContent: "center" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flex: 1, alignItems: "flex-start" }}>
              <Text
                style={{
                  fontFamily: Fonts.POPPINS_MEDIUM,
                  fontSize: moderateScale(18),
                  color: Colors.SECONDARY_COLOR,
                  textAlign: "left",
                }}
              >
                Total
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <Text
                style={{
                  fontFamily: Fonts.POPPINS_MEDIUM,
                  fontSize: moderateScale(18),
                  color: Colors.SECONDARY_COLOR,
                  textAlign: "right",
                }}
              >
                KD {displayAbsoluteAmount(cartDetails?.grand_total)}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <BaseOutlineButton
        label={"PROCEED TO CHECKOUT"}
        externalStyle={{
          marginTop: moderateScale(20),
        }}
        onPress={() =>
          navigation.dispatch(
            CommonActions.navigate(STACK_NAVIGATION_KEYS.CHECKOUT_SCREEN, {
              grand_total: cartDetails?.grand_total,
            })
          )
        }
      />
    </Pressable>
  );
};

export default memo(CartListBottomContainer);

const styles = StyleSheet.create({
  listBottomContainer: {
    paddingRight: moderateScale(10),
    paddingLeft: moderateScale(13),
    marginTop: moderateScale(20),
  },
  innerContainer: {
    height: moderateScale(170),
    backgroundColor: Colors.SECONDARY_DEFAULT_BACKGROUND_COLOR,
    borderWidth: 1,
    borderColor: Colors.BORDER_COLOR,
    borderRadius: moderateScale(5),
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(13),
    marginTop: moderateScale(50),
  },
});
