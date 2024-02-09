import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { CommonActions, useNavigation, useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import ScreenLoaderModal from "../../src/components/Modal/ScreenLoaderModal";
import { loginUser } from "../../src/redux/actions/auth/login";
import { fetchProfileDetails } from "../../src/redux/actions/profile/fetchProfileDetails";
import {
  AsyncStorageGetItem,
  AsyncStorageSetItem,
} from "../../src/utils/storage";
import {
  ACCESS_TOKEN,
  LOGIN_DETAILS,
  REFRESH_TOKEN,
  TOKEN_TYPE,
} from "../../src/utils/constant";
import axios from "axios";
import { triggerToastMessage } from "../../src/services";
import {
  BackIcon,
  Facebook,
  Google,
  CheckBoxIcon,
} from "../../src/assets/icons";
import {
  Colors,
  DEVICE_STYLES,
  Fonts,
  moderateScale,
} from "../../src/utils/theme";
import BaseTextinput from "../../src/components/Textinput/BaseTextinput";
import BaseButton from "../../src/components/Buttons/BaseButton";

const Signin = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const authSliceDetails = useSelector((state) => state.auth);

  const passwordRef = useRef(null);

  const [isRememberCheck, setIsRememberCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setPasswordVisibility] = useState(true);
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const [isRight, setIsRight] = useState(false)

  // email  = 'solankiamit.amit33@gmail.com'
  // password =  "12345678",

  useEffect(() => {
    isFocused && checkLoginDetails();
  }, [isFocused]);

  useEffect(() => {
    if (authSliceDetails.isUserLoggedIn) {
      setLoading(true);

      axios.defaults.headers.Authorization = `Bearer ${authSliceDetails?.token}`;
      axios.defaults.timeout = 3000;

      AsyncStorageSetItem(ACCESS_TOKEN, authSliceDetails?.token);
      AsyncStorageSetItem(REFRESH_TOKEN, authSliceDetails?.refreshToken);
      dispatch(
        fetchProfileDetails({
          refresh_token: authSliceDetails?.refreshToken,
          access_token: authSliceDetails?.token,
        })
      );
      setLoading(false);

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "DrawerNavigator" }],
        })
      );
    }
  }, [authSliceDetails.isUserLoggedIn]);

  const handleSignin = useCallback(() => {
    const FINAL_EMAIL = details.email.replace(/\s/g, "").trim();
    const FINAL_PASSWORD = details.password.replace(/\s/g, "").trim();
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(details.email)) {
      triggerToastMessage({
        message: "Please Enter Email Address",
        type: "info",
      });
      return;
    }

    if (FINAL_PASSWORD.length === 0) {
      triggerToastMessage({
        message: "Please Enter Password",
        type: "info",
      });
      return;
    }

    dispatch(loginUser({...details, isRememberCheck}));
  }, [details, isRememberCheck]);

  const checkLoginDetails = async () => {
    const result = await AsyncStorageGetItem(LOGIN_DETAILS);

    if (result !== null) {
      setDetails((prev) => ({
        ...prev,
        email: result.email,
        password: result.password,
      }));
      setIsRememberCheck(true);
    }
  };

  const handleForgotPassword = useCallback(
    () => navigation.navigate("ForgotPassword"),
    []
  );
  const handleSignUp = useCallback(() => navigation.navigate("SignUp"), []);
  const togglePasswordVisibility = useCallback(
    () => setPasswordVisibility(!isPasswordVisible),
    [isPasswordVisible]
  );

  const handleTextChange = useCallback(
    (key, value) => {
      console.log(key, value);
      details[key] = value;
      setDetails((prev) => ({
        ...prev,
        ...details,
      }));
    },
    [details]
  );

  useEffect(() => {
    const FINAL_EMAIL = details.email.replace(/\s/g, "").trim();
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if(emailRegex.test(details.email)){
      setIsRight(true)
    } else {
      setIsRight(false)
    }
    
  }, [details.email, isRight])

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.BASE_SCREEN_COLOR,
        paddingHorizontal: moderateScale(25),
      }}
    >
      {/* <View
        style={{
          height: DEVICE_STYLES.SCREEN_HEIGHT * 0.08,
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "flex-start",
        }}
      >
        <BackIcon />
      </View> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        keyboardShouldPersistTaps={"handled"}
      >
        <ScreenLoaderModal
          visiable={authSliceDetails?.loginLoading || loading}
        />

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
            Welcome Back!
          </Text>
          <Text
            style={{
              fontSize: moderateScale(16),
              color: Colors.PRIMARY_TEXT_COLOR,
              fontFamily: Fonts.DM_SANS_REGULER,
            }}
          >
            Sign in to continue
          </Text>
        </View>
        <View style={{ gap: moderateScale(10) }}>
          <BaseTextinput
            value={details.email}
            placeholder={"Enter your email"}
            keyboardType="email-address"
            label={"EMAIL"}
            isRight={isRight}
            onChange={(e) => handleTextChange("email", e)}
            onSubmit={() => passwordRef.current.focus()}
          />
          <BaseTextinput
            inputRef={passwordRef}
            value={details.password}
            placeholder={"Enter your password"}
            label={"PASSWORD"}
            isSecured={true}
            onChange={(e) => handleTextChange("password", e)}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: moderateScale(10),
            marginBottom: moderateScale(25),
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: moderateScale(10),
            }}
            activeOpacity={0.7}
            accessibilityRole={"checkbox"}
            role={"checkbox"}
            onPress={() => setIsRememberCheck(!isRememberCheck)}
          >
            <View
              style={{
                width: moderateScale(18),
                height: moderateScale(18),
                borderColor: "#61707D",
                borderRadius: moderateScale(5),
                borderWidth: 1,
              }}
            >
              {isRememberCheck && <CheckBoxIcon />}
            </View>
            <Text
              style={{
                fontSize: moderateScale(14),
                color: Colors.PRIMARY_TEXT_COLOR,
                fontFamily: Fonts.DM_SANS_REGULER,
              }}
            >
              Remember me
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text
              style={{
                fontSize: moderateScale(16),
                color: Colors.SECONDARY_COLOR,
                fontFamily: Fonts.DM_SANS_REGULER,
              }}
            >
              Forgot password?
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <BaseButton
            onPress={handleSignin}
            label={"SIGN IN"}
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
          }}
        >
          <Text
            style={{
              fontSize: moderateScale(16),
              color: Colors.PRIMARY_TEXT_COLOR,
              fontFamily: Fonts.DM_SANS_REGULER,
            }}
          >
            Don’t have an account?{" "}
          </Text>
          <TouchableOpacity onPress={handleSignUp} activeOpacity={0.7}>
            <Text
              style={{
                fontSize: moderateScale(16),
                color: Colors.SECONDARY_COLOR,
                fontFamily: Fonts.DM_SANS_REGULER,
              }}
            >
              Sign up.
            </Text>
          </TouchableOpacity>
        </View>
        {/* <View
          style={{ marginVertical: moderateScale(10), gap: moderateScale(15) }}
        >
          <TouchableOpacity
            style={{
              width: "100%",
              height: moderateScale(56),
              backgroundColor: "#F1F6FB",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flex: 0.12,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: moderateScale(10),
              }}
            >
              <Google heigh={32} width={32} />
            </View>
            <View
              style={{
                flex: 0.85,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#2E3E5C",
                  fontSize: moderateScale(14),
                  fontFamily: Fonts.DM_SANS_REGULER,
                }}
              >
                Login with Google
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "100%",
              height: moderateScale(56),
              backgroundColor: "#F1F6FB",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flex: 0.12,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: moderateScale(10),
              }}
            >
              <Facebook heigh={32} width={32} />
            </View>
            <View
              style={{
                flex: 0.85,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#2E3E5C",
                  fontSize: moderateScale(14),
                  fontFamily: Fonts.DM_SANS_REGULER,
                }}
              >
                Login with Google
              </Text>
            </View>
          </TouchableOpacity>
        </View> */}
      </ScrollView>
    </View>
  );
};
export default Signin;
