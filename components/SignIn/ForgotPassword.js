import React, { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import { triggerToastMessage } from "../../src/services";
import { useState } from "react";
import { API_ENPOINTS, BASE_URL } from "../../src/utils/api";
import BackHeader from "../../src/components/Header/BackHeader";
import BaseLayout from "../../src/components/Container/BaseLayout";
import { Colors, Fonts, moderateScale } from "../../src/utils/theme";
import BaseTextinput from "../../src/components/Textinput/BaseTextinput";
import BaseButton from "../../src/components/Buttons/BaseButton";
import { useDispatch } from "react-redux";
import { fetchcreatePassword } from "../../src/redux/actions/auth/createPassword";
import ScreenLoaderModal from "../../src/components/Modal/ScreenLoaderModal";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  const navigation = useNavigation();
  const handleSendChange = useCallback(async () => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if(!emailRegex.test(email)){
      triggerToastMessage({
        type:'info',
        message:'Please enter valid email'
      })
      return;
    }
    handleForgetPassowrd()
    
  }, [email]);

  const handleForgetPassowrd = useCallback(async () => {
    setLoading(true)
    const FORM_DATA = new FormData()
    FORM_DATA.append('email', email)
    console.log(API_ENPOINTS.FORGET_PASSWORD, FORM_DATA);
    try {
      const response = await axios.post(API_ENPOINTS.FORGET_PASSWORD, FORM_DATA)
      if(response.status == 200){
        triggerToastMessage({
          type: 'success',
          message: response.data?.message
        })
        navigation.navigate("VerificationCode", {email: email});
      } 
      if(response.status == 404){
        triggerToastMessage({
          type: 'error',
          message: response.data?.message
        })  
      }
      
    } catch {
      triggerToastMessage({
        type: 'warning',
        message: "We can't find a user with that e-mail address."
      })
    } finally {
      setLoading(false)
    }
  }, [email]);

  return (
    <BaseLayout>
    <ScreenLoaderModal visiable={loading} />
      <BackHeader
        label={"Forget password"}
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
            Please enter your email address. You will receive a link to create a
            new password via email.
          </Text>
        </View>
        <View>
          <BaseTextinput
            value={email}
            placeholder={"Enter your email address"}
            label={"EMAIL"}
            keyboardType="email-address"
            externelStyle={{ width: "100%" }}
            onChange={(e) => setEmail(e)}
          />
        </View>
        <View style={{ marginTop: moderateScale(15) }}>
          <BaseButton
            label={"SEND"}
            externalStyle={{ width: "100%" }}
            onPress={() => handleSendChange()}
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
export default ForgotPassword;
