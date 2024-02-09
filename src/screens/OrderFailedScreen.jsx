import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BaseLayout from "../components/Container/BaseLayout";
import { Colors, Fonts, moderateScale } from "../utils/theme";
import { CircleCheckIcon, CircleCrossIcon } from "../assets/icons";
import BaseButton from "../components/Buttons/BaseButton";
import BaseOutlineButton from "../components/Buttons/BaseOutlineButton";

const OrderFailedScreen = () => {
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
        <CircleCrossIcon />
        <Text
          style={{
            fontFamily: Fonts.POPPINS_BOLD,
            fontSize: moderateScale(22),
            color: Colors.SECONDARY_COLOR,
            marginVertical: moderateScale(15),
          }}
        >
          {`Sorry! Your Order\nHas Failed!`}
        </Text>
        <Text
          style={{
            fontFamily: Fonts.DM_SANS_REGULER,
            fontSize: moderateScale(16),
            color: Colors.PRIMARY_TEXT_COLOR,
            maxWidth: "80%",
          }}
        >
          Something went wrong. Please try again to contimue your order.
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
          <BaseButton label={"TRY AGAIN"} />
        </View>
        <View style={{ paddingHorizontal: moderateScale(20), width: "100%" }}>
          <BaseOutlineButton label={"GO TO MY PROFILE"} />
        </View>
      </View>
    </BaseLayout>
  );
};

export default OrderFailedScreen;

const styles = StyleSheet.create({});
