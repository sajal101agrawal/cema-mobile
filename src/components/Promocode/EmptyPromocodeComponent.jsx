import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { moderateScale, Colors, Fonts } from "../../utils/theme";
import { PromogiftIcon } from "../../assets/icons";
import BaseOutlineButton from "../Buttons/BaseOutlineButton";
import BaseTextinputComponent from "../Textinput/BaseTextinputComponent";
import BaseButton from "../Buttons/BaseButton";

const EmptyPromocodeComponent = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", backgroundColor:'#fff' }}>
      <View style={{ flex: 0.75, justifyContent: "center" }}>
        <View>
          <PromogiftIcon />
        </View>
        <View style={{ marginTop: moderateScale(15) }}>
          <Text
            style={{
              fontFamily: Fonts.POPPINS_BOLD,
              fontSize: moderateScale(22),
              color: Colors.SECONDARY_COLOR,
            }}
          >
            {`You Don’t Have \n Promocodes Yet!`}
          </Text>
        </View>
        <View style={{}}>
          <Text
            style={{
              fontFamily: Fonts.DM_SANS_REGULER,
              fontSize: moderateScale(16),
              color: Colors.PRIMARY_TEXT_COLOR,
              maxWidth: "65%",
            }}
          >
            Qui ex aute ipsum duis. Incididunt adipisicing voluptate laborum.
          </Text>
        </View>
      </View>
      <View
        style={{ flex: 0.25, marginVertical:moderateScale(10)}}
      >
        <BaseTextinputComponent
        label={"ENTER YOUR VOUCHER"}
        placeholder={'Enter your code'}
        />
        <BaseButton label={'ADD PROMOCODE'}/>
      </View>
    </View>
  );
};

export default memo(EmptyPromocodeComponent);

const styles = StyleSheet.create({
  // iconContainer: {
  // 	width: moderateScale(70),
  // 	height: moderateScale(70),
  // 	alignItems: 'center',
  // 	justifyContent: 'center',
  // 	borderRadius: moderateScale(35),
  // 	borderColor: Colors.SECONDARY_COLOR,
  // 	borderWidth: moderateScale(2)
  // }
});
