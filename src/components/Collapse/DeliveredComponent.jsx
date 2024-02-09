import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { memo } from "react";
import { moderateScale, Colors, Fonts } from "../../utils/theme";
import BaseLineComponent from "../Product/BaseLineComponent";
import BaseButton from "../Buttons/BaseButton";
import { RepeatOrderIcon, RightIcon } from "../../assets/icons";
import { useNavigation } from "@react-navigation/native";
import { STACK_NAVIGATION_KEYS } from "../../navigation/NavigationKeys";

const DeliveredComponent = () => {
  
  const navigation = useNavigation()

  return (
    <>
      <View style={[styles.productBox]}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "stretch",
          }}
        >
          <View
            style={{
              justifyContent: "space-evenly",
              flex: 0.5,
              alignItems: "flex-start",
              marginTop: moderateScale(20),
              marginHorizontal: moderateScale(15),
              marginVertical: moderateScale(12),
              gap: moderateScale(12),
            }}
          >
            <Text
              style={{
                fontSize: moderateScale(14),
                fontFamily: Fonts.DM_SANS_REGULER,
                color: Colors.PRIMARY_TEXT_COLOR,
              }}
            >
              Dining chair, white
            </Text>
            <Text
              style={{
                fontSize: moderateScale(14),
                fontFamily: Fonts.DM_SANS_REGULER,
                color: Colors.PRIMARY_TEXT_COLOR,
              }}
            >
              Delivery
            </Text>
          </View>

          <View
            style={{
              justifyContent: "space-evenly",
              flex: 0.5,
              alignItems: "flex-end",
              marginTop: moderateScale(20),
              marginHorizontal: moderateScale(15),
              marginVertical: moderateScale(12),
              gap: moderateScale(12),
            }}
          >
            <Text
              style={{
                fontSize: moderateScale(14),
                fontFamily: Fonts.DM_SANS_REGULER,
                color: Colors.PRIMARY_TEXT_COLOR,
              }}
            >
              1 x KD 150.000
            </Text>
            <Text
              style={{
                fontSize: moderateScale(14),
                fontFamily: Fonts.DM_SANS_REGULER,
                color: Colors.PRIMARY_TEXT_COLOR,
              }}
            >
              KD 15.000
            </Text>
          </View>
        </View>
        <BaseLineComponent
          style1={{ alignSelf: "center", width: "92%", height: 1.3 }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: moderateScale(15),
            marginVertical: moderateScale(12),
          }}
        >
          <Text
            style={{
              fontSize: moderateScale(14),
              fontFamily: Fonts.DM_SANS_REGULER,
              color: "#142535",
            }}
          >
            Total
          </Text>
          <Text
            style={{
              fontSize: moderateScale(14),
              fontFamily: Fonts.DM_SANS_REGULER,
              color: Colors.PRIMARY_TEXT_COLOR,
            }}
          >
            KD 300.000
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: moderateScale(18),
          marginVertical: moderateScale(8),
        }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            marginHorizontal: moderateScale(5),
          }}
        >
          <RepeatOrderIcon />
          <Text
            style={{
              fontSize: moderateScale(16),
              fontFamily: Fonts.DM_SANS_REGULER,
              color: Colors.SECONDARY_COLOR,
            }}
          >
            repeat order
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate(STACK_NAVIGATION_KEYS.RATING_SCREEN)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
          }}
        >
          <Text
            style={{
              fontSize: moderateScale(16),
              fontFamily: Fonts.DM_SANS_REGULER,
              color: Colors.SECONDARY_COLOR,
            }}
          >
            leave a review
          </Text>
          <RightIcon />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default memo(DeliveredComponent);

const styles = StyleSheet.create({
  productBox: {
    width: "90%",
    height: undefined,
    backgroundColor: "rgba(219, 233, 245, 0.15)",
    borderRadius: moderateScale(5),
    borderWidth: 0.7,
    borderColor: Colors.BORDER_COLOR,
    alignSelf: "center",
    marginVertical: moderateScale(10),
  },
});


