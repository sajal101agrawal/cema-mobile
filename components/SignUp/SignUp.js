import React, {
  createRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import styles from "./StylesSignup";
import { TextInput } from "react-native-paper";
import eyeCloseImage from "../../assets/Icon/eye-close.png";
import eyeOpenImage from "../../assets/Icon/eye-open.png";
import { useNavigation } from "@react-navigation/native";
import MinimalBackHeader from "../../src/components/Header/MinimalBackHeader";
import ScreenLoaderModal from "../../src/components/Modal/ScreenLoaderModal";
import { triggerToastMessage } from "../../src/services";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../src/redux/actions/auth/register";
import {
  BackIcon,
  Facebook,
  FacebookCharIcon,
  Google,
  GoogleCharIcon,
  TwitterCharIcon,
} from "../../src/assets/icons";

import {
  Colors,
  DEVICE_STYLES,
  Fonts,
  moderateScale,
} from "../../src/utils/theme";
import BaseTextinput from "../../src/components/Textinput/BaseTextinput";
import BaseButton from "../../src/components/Buttons/BaseButton";
import { STACK_NAVIGATION_KEYS } from "../../src/navigation/NavigationKeys";
import { EMAIL_REGEXP, NAME_REGEXP } from "../../src/utils/constant";

const SignUp = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const authDetails = useSelector((state) => state.auth);

  const inputRefList = new Array(4).fill("-").map((ele) => createRef());
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    name: "",
    email: "",
    mobileNo : "",
    password: "",
    confirmPassword: "",
  });
  const [isRightForName, setIsRightForName] = useState(false)
  const [isRightForContactNo, setIsRightForContactNo] = useState(false)
  const [isRightForEmail, setIsRightForEmail] = useState(false)

  // console.log(authDetails,"authDetails");

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <MinimalBackHeader navigation={navigation} />,
    });
  }, [navigation]);

  useEffect(() => {
    const FINAL_NAME = details.name.replace(/\s/g, "").trim();
    const FINAL_EMAIL = details.email.replace(/\s/g, "").trim();
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if(FINAL_NAME.length != 0){
      setIsRightForName(true)
    } else {
      setIsRightForName(false)
    }
    if(emailRegex.test(details.email)){
      setIsRightForEmail(true)
    } else {
      setIsRightForEmail(false)
    }

    if(details.mobileNo.length == 10){
      setIsRightForContactNo(true)
    } else {
      setIsRightForContactNo(false)
    }
  }, [details.name, details.email, details.mobileNo])

  const onClickSingUp = () => {
    const FINAL_NAME = details.name.replace(/\s/g, "").trim();
    const FINAL_EMAIL = details.email.replace(/\s/g, "").trim();
    const FINAL_PASSWORD = details.password.replace(/\s/g, "").trim();
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const FINAL_CONFIRM_PASSWORD = details.confirmPassword
      .replace(/\s/g, "")
      .trim();

    if (FINAL_NAME.length === 0) {
      triggerToastMessage({
        message: "Please enter your name",
        type: "info",
      });
      return;
    }

    if (!NAME_REGEXP.test(FINAL_NAME)) {
      triggerToastMessage({
        message: "Please enter valid name",
        type: "info",
      });
      return;
    }
    
    if (details.mobileNo.length != 10) {
      triggerToastMessage({
        message: "Please enter valid contact number",
        type: "info",
      });
      return;
    }

    if (!emailRegex.test(details.email)) {
      triggerToastMessage({
        message: "Please enter your email",
        type: "info",
      });
      return;
    }

    if (!EMAIL_REGEXP.test(FINAL_EMAIL)) {
      triggerToastMessage({
        message: "Please enter valid email address",
        type: "info",
      });
      return;
    }

    if (FINAL_PASSWORD.length === 0) {
      triggerToastMessage({
        message: "Please enter your password",
        type: "info",
      });
      return;
    }

    if (FINAL_PASSWORD !== FINAL_CONFIRM_PASSWORD) {
      triggerToastMessage({
        message: "Both password does not match",
        type: "info",
      });
      return;
    }

    dispatch(registerUser({details, navigation}));
    
  };

  const handleTextChange = useCallback(
    (key, value) => {
      details[key] = value;
      setDetails({ ...details });
    },
    [details]
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.BASE_SCREEN_COLOR,
        paddingHorizontal: moderateScale(25),
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        keyboardShouldPersistTaps={'handled'}
      >
        <ScreenLoaderModal visiable={authDetails?.registrationLoading} />

        <View
          style={{ marginVertical: moderateScale(30), gap: moderateScale(10) }}
        >
          <Text
            style={{
              fontSize: moderateScale(32),
              color: Colors.SECONDARY_COLOR,
              fontFamily: Fonts.DM_SANS_BOLD,
            }}
          >
            Sign Up
          </Text>
        </View>
        <View style={{ gap: moderateScale(10) }}>
          <BaseTextinput
            value={details.name}
            placeholder={"Enter your name"}
            label={"NAME"}
            isRight={isRightForName}
            onChange={(e) => handleTextChange("name", e)}
            onSubmit={() => inputRefList[0].current.focus()}
          />
          <BaseTextinput
            inputRef={inputRefList[0]}
            value={details.mobileNo}
            isRight={isRightForContactNo}
            placeholder={"Enter your contact number"}
            label={"Contact Number"}
            maxLength={10}
            keyboard="numeric"
            onChange={(e) => {
              let newText = ''
              let numbers = '0123456789'
              for(var i=0;i<e.length;i++){
                if(numbers.indexOf(e[i]) > -1){
                  newText = newText + e[i]
                }
              }
              handleTextChange("mobileNo", newText)}}
            onSubmit={() => inputRefList[1].current.focus()}
          />
          <BaseTextinput
            inputRef={inputRefList[1]}
            value={details.email}
            isRight={isRightForEmail}
            placeholder={"Enter your email"}
            keyboardType="email-address"
            label={"EMAIL"}
            isSecured={false}
            onChange={(e) => handleTextChange("email", e)}
            onSubmit={() => inputRefList[2].current.focus()}
          />
          <BaseTextinput
            inputRef={inputRefList[2]}
            value={details.password}
            placeholder={"Enter your password"}
            label={"PASSWORD"}
            isSecured={true}
            onChange={(e) => handleTextChange("password", e)}
            onSubmit={() => inputRefList[3].current.focus()}
          />
          <BaseTextinput
            inputRef={inputRefList[3]}
            value={details.confirmPassword}
            placeholder={"Confirm your password"}
            label={"CONFIRM PASSWORD"}
            isSecured={true}
            onChange={(e) => handleTextChange("confirmPassword", e)}
          />
        </View>
        <View style={{ marginTop: moderateScale(10) }}>
          <BaseButton
            onPress={() => onClickSingUp()}
            label={"SIGN UP"}
            externalStyle={{ width: "100%" }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "flex-start",
            marginVertical: moderateScale(25),
            gap: moderateScale(3),
          }}
        >
          <Text
            style={{
              fontSize: moderateScale(16),
              color: Colors.PRIMARY_TEXT_COLOR,
              fontFamily: Fonts.DM_SANS_REGULER,
            }}
          >
            Already have an account?
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Signin")}
            activeOpacity={0.7}
          >
            <Text
              style={{
                fontSize: moderateScale(16),
                color: Colors.SECONDARY_COLOR,
                fontFamily: Fonts.DM_SANS_REGULER,
              }}
            >
              Sign in.
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <View style={{ marginTop: moderateScale(15) }}>
            <Text
              style={{
                fontSize: moderateScale(16),
                color: Colors.PRIMARY_TEXT_COLOR,
                fontFamily: Fonts.DM_SANS_REGULER,
              }}
            >
              Sign up with social networks:
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: moderateScale(20),
            }}
          >
            <TouchableOpacity
              style={{
                flex: 0.3,
                backgroundColor: Colors.WHITE,
                height: moderateScale(40),
                alignItems: "center",
                justifyContent: "center",
                borderRadius: moderateScale(3),
              }}
            >
              <FacebookCharIcon />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 0.3,
                backgroundColor: Colors.WHITE,
                height: moderateScale(40),
                alignItems: "center",
                justifyContent: "center",
                borderRadius: moderateScale(3),
              }}
            >
              <TwitterCharIcon />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 0.3,
                backgroundColor: Colors.WHITE,
                height: moderateScale(40),
                alignItems: "center",
                justifyContent: "center",
                borderRadius: moderateScale(3),
              }}
            >
              <GoogleCharIcon />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default SignUp;
