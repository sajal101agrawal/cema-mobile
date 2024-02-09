import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import eyeCloseImage from "../../assets/Icon/eye-close.png";
import eyeOpenImage from "../../assets/Icon/eye-open.png";
import { useDispatch } from "react-redux";
import BackHeader from "../../src/components/Header/BackHeader";
import BaseLayout from "../../src/components/Container/BaseLayout";
import { Colors, Fonts, moderateScale } from "../../src/utils/theme";
import BaseTextinput from "../../src/components/Textinput/BaseTextinput";
import BaseButton from "../../src/components/Buttons/BaseButton";
import { fetchresetPassword } from "../../src/redux/actions/auth/resetPassword";
import { triggerToastMessage } from "../../src/services";
import ScreenLoaderModal from "../../src/components/Modal/ScreenLoaderModal";


const ResetPassword = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {token} = route.params
  

  const handleResetChange = () => {
    navigation.navigate("PasswordChangeDone");
  };

  const [details, setDetails] = useState({
    old_password: "",
    password: "",
    password_confirmation: "",
  });
  const [loading, setLoading] = useState(false)

  const handleChangePassword = () => {
    if (details.old_password.length < 8) {
      triggerToastMessage({
        message: "Please enter atleast 8 digit password",
        type: "info",
      });
      return;
    }

    if (details.password.length < 8) {
      triggerToastMessage({
        message: "Please enter atleast 8 digit new password",
        type: "info",
      });
      return;
    }

    if (
      details.password_confirmation.length < 8 
    ) {
      triggerToastMessage({
        message: "Please enter atleast 8 digit confirm password",
        type: "info",
      });
      return;
    }
    if (
      
      details.password_confirmation !== details.password
    ) {
      triggerToastMessage({
        message: "Both password does not match",
        type: "info",
      });
      return;
    }
    
    dispatch(fetchresetPassword({details,token, setLoading, navigation}));
  };

  const [isPasswordVisible, setPasswordVisibility] = useState(true);
  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };
  return (
    <BaseLayout>
      <BackHeader
        label={"Reset password"}
        externalStyle={{ backgroundColor: Colors.BASE_SCREEN_COLOR }}
      />
      <ScreenLoaderModal visiable={loading} />
      <View style={styles.container}>
        <View style={{ marginVertical: moderateScale(25) }}>
          <Text
            style={{
              fontSize: moderateScale(16),
              color: Colors.PRIMARY_TEXT_COLOR,
              fontFamily: Fonts.DM_SANS_REGULER,
            }}
          >
            Enter new password and confirm.
          </Text>
        </View>
        <View style={{ gap: moderateScale(8) }}>
          <BaseTextinput
            placeholder={"Enter your old password"}
            label={"OLD PASSWORD"}
            externelStyle={{ width: "100%" }}
            onChange={(e) => setDetails(prev => ({...prev, old_password: e}))}
          />
          <BaseTextinput
            placeholder={"Enter your new password"}
            label={"NEW PASSWORD"}
            externelStyle={{ width: "100%" }}
            onChange={(e) => setDetails(prev => ({ ...prev, password: e }))}
          />
          <BaseTextinput
            placeholder={"Confirm your password"}
            label={"CONFIRM PASSWORD"}
            externelStyle={{ width: "100%" }}
            onChange={(e) => setDetails(prev => ({ ...prev, password_confirmation: e }))}
          />
        </View>
        <View style={{ marginTop: moderateScale(10) }}>
          <BaseButton
            label={"CHANGE PASSWORD"}
            externalStyle={{ width: "100%" }}
            // onPress={() => navigation.push('PasswordChangeDone')}
            onPress={handleChangePassword}
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
export default ResetPassword;
