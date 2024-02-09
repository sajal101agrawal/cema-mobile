import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, {
  createRef,
  useCallback,
  useLayoutEffect,
  useState,
  useEffect,
} from "react";
import BaseLayout from "../components/Container/BaseLayout";
import { useNavigation } from "@react-navigation/native";
import BackHeader from "../components/Header/BackHeader";
import BaseButton from "../components/Buttons/BaseButton";
import BaseTextinputComponent from "../components/Textinput/BaseTextinputComponent";
import { UserImage } from "../assets/images";
import { CameraIcon } from "../assets/icons";
import { Colors, Fonts, moderateScale } from "../utils/theme";
import FastImage from "react-native-fast-image";
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_ENPOINTS } from "../utils/api";
import { useDispatch } from "react-redux";
import { updateProfileDetails } from "../redux/actions/profile/updateProfileDetails";
import BaseDropDown from "../components/Dropdown/BaseDropDown";
import { fetchCounty } from "../redux/actions/address/country";
import { useMemo } from "react";
import { fetchState } from "../redux/actions/address/state";
import { fetchCity } from "../redux/actions/address/city";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { fetchProfileDetails } from "../redux/actions/profile/fetchProfileDetails";
import { AsyncStorageGetItem } from "../utils/storage";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/constant";
import { triggerToastMessage } from "../services";

const data1 = [
  { label: "India", value: "india" },
  { label: "America", value: "america" },
  { label: "England", value: "england" },
];

const data2 = [
  { label: "Maharashrta", value: "maharashrta" },
  { label: "Delhi", value: "delhi" },
  { label: "Gujarat", value: "gujarat" },
];

const data3 = [
  { label: "Mumbai", value: "mumbai" },
  { label: "Noida", value: "noida" },
  { label: "Surat", value: "surat" },
];

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const authDetails = useSelector((state) => state.auth);
  const getCountry = useSelector((state) => state?.address?.county);
  const getState = useSelector((state) => state?.address?.stateValue);
  const getCity = useSelector((state) => state?.address?.city);

  const [countryValue, setCountryValue] = useState(null);
  const [stateValue, setStateValue] = useState(null);
  const [cityValue, setCityValue] = useState(null);

  

  const [details, setDetails] = useState({
    name: authDetails?.userDetails?.name,
    email: authDetails?.userDetails?.email,
    phoneNumber:
      authDetails?.userDetails?.phone == "null"
        ? ""
        : authDetails?.userDetails?.phone,
    profile: authDetails?.userDetails?.profile_picture,
    location: null,
  });

  const [newUploadedImage, setNewUploadedImage] = useState(null);

  const reflist = new Array(2).fill("_").map((_) => createRef());


  // console.log("country >>>>>>>>>>", getCountry);
  // console.log("state >>>>>>>>>>", getState);
  // console.log("cityValue >>>>>>>>>", getCity);

  const COUNTRIES = useMemo(() => {
    if (getCountry == null || countryValue == null) return [];

    return getCountry?.map((item) => ({
      label: item?.name,
      value: item?.id.toString(),
    }));
  }, [getCountry, countryValue]);

  const STATES = useMemo(() => {
    if (getState == null || stateValue == null) return [];
    return getState?.map((item) => ({
      label: item?.name,
      value: item?.id.toString(),
    }));
  }, [getState, stateValue]);

  const CITIES = useMemo(() => {
    if (getCity == null || cityValue == null) return [];
    return getCity?.map((item) => ({
      label: item?.name,
      value: item?.id.toString(),
    }));
  }, [getCity, cityValue]);

  useEffect(() => {
    dispatch(fetchCounty());
  }, []);

  useEffect(() => {
    if(authDetails?.userDetails?.country_id != null){
      setCountryValue(authDetails?.userDetails?.country_id.toString());
    }
    if (authDetails?.userDetails?.state_id != null){
      setStateValue(authDetails?.userDetails?.state_id.toString());
    }
    if(authDetails?.userDetails?.city_id != null){
      setCityValue(authDetails?.userDetails?.city_id.toString());
    }
  }, [authDetails?.userDetails]);

  useEffect(() => {
    if (countryValue) {
      dispatch(fetchState({ country_id: countryValue }));
    }
  }, [countryValue]);

  useEffect(() => {
    console.log("state id >>>", stateValue);
    if (stateValue) {
      dispatch(fetchCity({ state_id: stateValue }));
    }
  }, [stateValue]);

  const handleProfileUpdate = async () => {
    try {
      setLoading(true);

      const FORM_DATA = new FormData();
      FORM_DATA.append("name", details.name);
      FORM_DATA.append("phone", details.phoneNumber);
      FORM_DATA.append("country_id", countryValue);
      FORM_DATA.append("state_id", stateValue);
      FORM_DATA.append("city_id", cityValue);

      if (newUploadedImage != null) {
        FORM_DATA.append("image", newUploadedImage);
      }

      const res = await axios.post(
        API_ENPOINTS.UPDATE_PROFILE_DETAILS,
        FORM_DATA
      );
      refetchDetails();
      navigation.goBack();
    } catch (err) {
      console.log("red", err);
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <BackHeader label={"Edit Profile"} />,
    });
  }, [navigation]);

  const refetchDetails = async () => {
    const ASYNC_ACCESS_TOKEN = await AsyncStorageGetItem(ACCESS_TOKEN);
    const ASYNC_REFRESH_TOKEN = await AsyncStorageGetItem(REFRESH_TOKEN);

    dispatch(
      fetchProfileDetails({
        refresh_token: JSON.stringify(ASYNC_REFRESH_TOKEN),
        access_token: JSON.stringify(ASYNC_ACCESS_TOKEN),
      })
    );

    triggerToastMessage({
      type: "success",
      message: "Profile updated successfully....!",
    });
  };

  console.log(authDetails);

  const handleInputValueChange = useCallback(
    (key, value) => {
      details[key] = value;
      setDetails({ ...details });
    },
    [details]
  );

  const handleImageUpload = useCallback(async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*",
      });

      if (!result.canceled) {
        const finalRes = result.assets[0];
        const FileNameArr = finalRes.uri.split("/");

        setNewUploadedImage({
          type: finalRes.mimeType,
          name: FileNameArr[FileNameArr.length - 1],
          uri: finalRes.uri,
        }); 
        setDetails((prev) => ({
          ...prev,
          profile: finalRes.uri,
        }));
      }
    } catch (err) {
      console.log("error", err);
    }
  }, []);

  return (
    <BaseLayout>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: moderateScale(45),
          paddingHorizontal: moderateScale(18),
          paddingBottom: moderateScale(10),
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileContainer}>
          <View
            style={{
              flex: 0.22,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={styles.imageContainer}>
              <FastImage
                source={{
                  uri:
                    (!details?.profile.includes(".png") &&
                    !details?.profile.includes(".jpg") &&
                    !details?.profile.includes(".jpeg"))
                      ? `${details?.profile}.png`
                      : details?.profile,
                  priority: FastImage.priority.high,
                  cache: FastImage.cacheControl.cacheOnly,
                }}
                fallback={true}
                accessibilityRole={"image"}
                resizeMode={"cover"}
                style={{ width: "100%", height: "100%" }}
              />
            </View>
          </View>
          <View style={{ flex: 0.78, justifyContent: "center" }}>
            <TouchableOpacity
              activeOpacity={0.8}
              accessibilityRole={"button"}
              accessible={true}
              onPress={handleImageUpload}
              style={{
                alignItems: "center",
                justifyContent: "flex-start",
                flexDirection: "row",
                left: moderateScale(15),
                gap: moderateScale(10),
              }}
            >
              <CameraIcon />
              <Text
                style={{
                  fontFamily: Fonts.DM_SANS_REGULER,
                  fontSize: moderateScale(14),
                  color: Colors.PRIMARY_TEXT_COLOR,
                }}
              >
                Upload new photo
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginTop: moderateScale(25), gap: moderateScale(15) }}>
          <View style={{ width: "100%" }}>
            <BaseTextinputComponent
              label={"NAME"}
              value={details?.name}
              placeholder={"Enter your name"}
              onChange={(e) => handleInputValueChange("name", e)}
              onSubmit={() => reflist[0]?.current?.focus()}
              externelStyle={{
                borderWidth: 0,
                borderTopWidth: 1,
                borderBottomWidth: 1,
              }}
            />
          </View>
          <View style={{ width: "100%" }}>
            <BaseTextinputComponent
              inputRef={reflist[0]}
              label={"EMAIL"}
              value={details?.email}
              keyboard={"email-address"}
              placeholder={"Enter your email"}
              onChange={(e) => handleInputValueChange("email", e)}
              onSubmit={() => reflist[1]?.current?.focus()}
              externelStyle={{
                borderWidth: 0,
                borderTopWidth: 1,
                borderBottomWidth: 1,
              }}
            />
          </View>
          <View style={{ width: "100%" }}>
            <BaseTextinputComponent
              inputRef={reflist[1]}
              label={"PHONE NUMBER"}
              keyboard={"number-pad"}
              maxLength={10}
              value={details?.phoneNumber}
              placeholder={"Enter your phone number"}
              onChange={(e) => handleInputValueChange("phoneNumber", e)}
              externelStyle={{
                borderWidth: 0,
                borderTopWidth: 1,
                borderBottomWidth: 1,
              }}
            />
          </View>
        </View>
        <View
          style={{
            marginVertical: moderateScale(8),
            gap: moderateScale(18),
          }}
        >
          <BaseDropDown
            placeholder={"Select Country"}
            data={COUNTRIES}
            value={countryValue}
            onChange={(item) => setCountryValue(item.value)}
          />
          <BaseDropDown
            placeholder={"Select State"}
            data={STATES}
            value={stateValue}
            onChange={(item) => setStateValue(item.value)}
          />
          <BaseDropDown
            placeholder={"Select City"}
            data={CITIES}
            value={cityValue}
            onChange={(item) => setCityValue(item.value)}
          />
        </View>

        {/* <View style={{ width: '100%', height: moderateScale(55), marginTop: moderateScale(5), paddingHorizontal: moderateScale(15) }}>
                    <Text style={{ fontFamily: Fonts.DM_SANS_MEDIUM, fontSize: moderateScale(12), color: Colors.PRIMARY_TEXT_COLOR }}>LOCATION</Text>
                    <Text style={{ fontFamily: Fonts.DM_SANS_REGULER, fontSize: moderateScale(16), color: Colors.SECONDARY_COLOR, marginVertical: moderateScale(8) }}>Kuwait</Text>
                </View> */}

        <View style={{ marginVertical: moderateScale(18) }}>
          {loading && (
            <View style={{ marginTop: moderateScale(10) }}>
              <ActivityIndicator
                size="small"
                color={Colors.PRIMARY_TEXT_COLOR}
              />
            </View>
          )}
          <BaseButton
            externalStyle={{ width: "99%" }}
            label={"SAVE CHANGES"}
            onPress={() => handleProfileUpdate()}
          />
        </View>
      </ScrollView>
    </BaseLayout>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  profileContainer: {
    height: moderateScale(60),
    backgroundColor: Colors.WHITE,
    flexDirection: "row",
    alignItems: "stretch",
    overflow: "hidden",
  },
  imageContainer: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
    overflow: "hidden",
  },
});
