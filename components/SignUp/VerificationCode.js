import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import BaseLayout from "../../src/components/Container/BaseLayout";
import { Colors, DEVICE_STYLES, Fonts, moderateScale } from "../../src/utils/theme";
import BackHeader from "../../src/components/Header/BackHeader";
import BaseButton from "../../src/components/Buttons/BaseButton";
import { useNavigation } from "@react-navigation/native";
import OTPInputView from '@twotalltotems/react-native-otp-input'
import axios from "axios";
import { API_ENPOINTS } from "../../src/utils/api";
import { triggerToastMessage } from "../../src/services";
import ScreenLoaderModal from "../../src/components/Modal/ScreenLoaderModal";

const VerificationCode = ({route}) => {
  const {email} = route.params
  var textInput = useRef(null);
  const [internalval, setInternalVal] = useState("");
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const lengthInput = 4;
  const navigation = useNavigation();

  const verifyOTPHandler = useCallback(async () => {
    setLoading(true)
    const FORM_DATA = new FormData()
    FORM_DATA.append('email', email)
    FORM_DATA.append('two_factor_code', code)
    try {
      const response = await axios.post(API_ENPOINTS.VERIFY_REGISTRATION, FORM_DATA)
      
      if(response.status == 200){
        triggerToastMessage({
          type: 'success',
          message: response.data?.message
        })
        navigation.push('ResetPassword', { token: response.data?.accessToken })
      }

    } catch {
      triggerToastMessage({
        type: 'error',
        message: 'OTP does not match'
      })
    } finally {
      setLoading(false)
    }
  }, [code])

  return (
    <BaseLayout backgroundColor={Colors.BASE_SCREEN_COLOR}>
      <BackHeader
        label={"Verify your email address"}
        externalStyle={{ backgroundColor: Colors.BASE_SCREEN_COLOR }}
      />
      <ScreenLoaderModal visiable={loading} />
      <View style={{ flex: 1, paddingHorizontal: moderateScale(20) }}>
        <View style={{ marginVertical: moderateScale(20) }}>
          <Text>Enter your OTP code here.</Text>
        </View>
        {/* <View>
          <TextInput
            ref={(input) => (textInput = input)}
            onChangeText={onchangeText}
            style={{ width: 0, height: 0 }}
            value={internalval}
            maxLength={lengthInput}
            keyboardType="numeric"
          />
          <View style={styles.inputContainer}>
            {Array(lengthInput)
              .fill()
              .map((data, index) => (
                <View
                  key={index}
                  style={[
                    styles.cellView,
                    {
                      borderBottomColor:
                        index === internalval.length ? "black" : "black",
                    },
                  ]}
                >
                  <Text
                    style={styles.cellText}
                    onPress={() => {
                      textInput.focus();
                      console.log("Hello");
                    }}
                  >
                    {internalval && internalval.length > 0
                      ? internalval[index]
                      : ""}
                  </Text>
                </View>
              ))}
          </View>
        </View> */}
        <View style={[styles.otpContainer, { paddingVertical: moderateScale(18) }]}>
          <OTPInputView
            pinCount={6}
            code={code}
            autoFocusOnLoad={false}
            style={{ width: '100%', height: moderateScale(55), alignSelf: 'center' }}
            editable={true}
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={{ borderColor: Colors.BLACK}}
            onCodeChanged={(e) => setCode(e)}
          />
        </View>
        {/* <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "flex-start",
            marginVertical: moderateScale(25),
          }}
        >
          <Text style={{
              fontSize: moderateScale(16),
              color: Colors.PRIMARY_TEXT_COLOR,
              fontFamily: Fonts.DM_SANS_REGULER,
            }}>Didn’t receive the OTP? </Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={{
              fontSize: moderateScale(16),
              color: Colors.SECONDARY_COLOR,
              fontFamily: Fonts.DM_SANS_REGULER,
            }}>Resend.</Text>
          </TouchableOpacity>
        </View> */}
        <View>
          <BaseButton onPress={verifyOTPHandler} label={"VERIFY"} externalStyle={{ width: "100%" }} />
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

  inputContainer: {
    flexDirection: "row",
  },
  cellView: {
    width: moderateScale(30),
    margin: moderateScale(5),
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 4,
    borderRadius : moderateScale(1)
  },
  cellText: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.DM_SANS_REGULER
  },
  otpContainer: {
    borderRadius: moderateScale(3)
  },
  underlineStyleBase: {
    width: DEVICE_STYLES.SCREEN_WIDTH / 9,
    height: moderateScale(48),
    borderWidth: 0,
    borderBottomWidth: 3,
    borderRadius: 0,
    aspectRatio: 1,
    color: Colors.BLACK,
    fontFamily: 'Inter-SemiBold',
    fontSize: moderateScale(23),
    textAlignVertical: 'center',
    textAlign: 'center',
    borderColor: Colors.BLACK
  },
});
export default VerificationCode;
