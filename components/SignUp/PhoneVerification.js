import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import BackHeader from "../../src/components/Header/BackHeader";
import BaseLayout from "../../src/components/Container/BaseLayout";
import { Colors, Fonts, moderateScale } from "../../src/utils/theme";
import BaseTextinput from "../../src/components/Textinput/BaseTextinput";
import BaseButton from "../../src/components/Buttons/BaseButton";
import { useState } from "react";
import { PHONE_NUMBER_REGEXP } from "../../src/utils/constant";

const PhoneVerification = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
 
  return (
    <BaseLayout backgroundColor={Colors.BASE_SCREEN_COLOR}>
      <BackHeader
        label={"Verify your phone number"}
        externalStyle={{ backgroundColor: Colors.BASE_SCREEN_COLOR }}
      />
      <View style={styles.container}>
        <View style={{ marginVertical: moderateScale(20) }}>
          <Text
            style={{
              fontSize: moderateScale(16),
              color: Colors.PRIMARY_TEXT_COLOR,
              fontFamily: Fonts.DM_SANS_REGULER,
            }}
          >
            Please enter your phone number. We will sent you verification code to your phone number.
          </Text>
        </View>
        <View>
          <BaseTextinput
            value={phoneNumber}
            placeholder={"Enter your phone number"}
            label={"PHONE NUMBER"}
            keyboardType="numeric"
            externelStyle={{ width: "100%" }}
            onChange={(e) => {
              if(PHONE_NUMBER_REGEXP.test(e)){
                setPhoneNumber(e);
              }
            }}
          />
        </View>
        <View style={{ marginTop: moderateScale(15) }}>
          <BaseButton
            label={"SEND"}
            externalStyle={{ width: "100%" }}
            onPress={() => navigation.navigate("VerificationCode")}
          />
        </View>
      </View>
    </BaseLayout>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BASE_SCREEN_COLOR,
    paddingHorizontal: moderateScale(20),
  },
});
export default PhoneVerification;
