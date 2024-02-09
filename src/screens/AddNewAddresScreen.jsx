import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import BaseLayout from "../components/Container/BaseLayout";
import { MAP_IMAGE } from "../assets/images";
import BaseTextinputComponent from "../components/Textinput/BaseTextinputComponent";
import { Colors, Fonts, moderateScale } from "../utils/theme";
import BaseButton from "../components/Buttons/BaseButton";
import { useDispatch, useSelector } from "react-redux";
import BaseDropDown from "../components/Dropdown/BaseDropDown";
import { fetchCounty } from "../redux/actions/address/country";
import { fetchState } from "../redux/actions/address/state";
import { fetchCity } from "../redux/actions/address/city";
import { shippingAddressAdd } from "../redux/actions/address/shippingAddressAdd";
import axios from "axios";
import { API_ENPOINTS } from "../utils/api";
import { triggerToastMessage } from "../services";
import { useNavigation } from "@react-navigation/native";

const AddNewAddresScreen = ({route}) => {
  const reflist = new Array(6).fill("_").map((_) => createRef());

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const GET_EDIT_ADDRESS = route?.params?.data

  const [countryValue, setCountryValue] = useState();
  const [stateValue, setStateValue] = useState();
  const [cityValue, setCityValue] = useState(null);
  const authDetails = useSelector((state) => state.auth);

  const getCountry = useSelector((state) => state?.address?.county);
  const getState = useSelector((state) => state?.address?.stateValue);
  const getCity = useSelector((state) => state?.address?.city);

  const COUNTRIES = useMemo(() => {
    if (getCountry == null) return [];

    return getCountry?.map((item) => ({
      label: item?.name,
      value: item?.id.toString(),
    }));
  }, [getCountry]);

  const STATES = useMemo(() => {
    if (getState == null) return [];
    return getState?.map((item) => ({
      label: item?.name,
      value: item?.id.toString(),
    }));
  }, [getState]);

  const CITIES = useMemo(() => {
    if (getCity == null) return [];
    return getCity?.map((item) => ({
      label: item?.name,
      value: item?.id.toString(),
    }));
  }, [getCity]);

  useEffect(() => {
    if (GET_EDIT_ADDRESS) {
      setAddress({
        title: GET_EDIT_ADDRESS.type, 
        address: GET_EDIT_ADDRESS.address,
        name: GET_EDIT_ADDRESS.name,
        email: GET_EDIT_ADDRESS.email,
        phoneNumber: String(GET_EDIT_ADDRESS.phone),
        pincode: String(GET_EDIT_ADDRESS.pin_code),
      });

      setCountryValue(GET_EDIT_ADDRESS?.country?.id?.toString());
      setStateValue(GET_EDIT_ADDRESS?.state?.id?.toString());
      setCityValue(GET_EDIT_ADDRESS?.city?.id?.toString());
    }
  }, [GET_EDIT_ADDRESS]);


  useEffect(() => {
    dispatch(fetchCounty());
  }, []);

  useEffect(() => {
    if (countryValue) {
      dispatch(fetchState({ country_id: countryValue }));
    }
  }, [countryValue]);

  useEffect(() => {
    if (stateValue) {
      dispatch(fetchCity({ state_id: stateValue }));
    }
  }, [stateValue]);

  const [address, setAddress] = useState({
    title: "",
    address: "",
    name: "",
    email: "",
    phoneNumber: "",
    pincode: "",
  });
  
  console.log("=====",GET_EDIT_ADDRESS);

  const hanldeAddAddress = async () => {
    const errors = [];
  
    if (!address?.name) {
      errors.push("Please enter your name");
    }
  
    if (!address?.email) {
      errors.push("Please enter your email");
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(address.email)) {
        errors.push("Please enter a valid email");
      }
    }
  
    if (!address?.phoneNumber) {
      errors.push("Please enter your phone number");
    } else {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(address.phoneNumber)) {
        errors.push("Please enter a valid phone number");
      }
    }
  
    if (!address?.address) {
      errors.push("Please enter your address");
    }
  
    if (!address?.title) {
      errors.push("Please enter your title");
    }
  
    if (!address?.pincode) {
      errors.push("Please enter your pincode");
    }
  
    if (!countryValue) {
      errors.push("Please select your country");
    }
  
    if (!stateValue) {
      errors.push("Please select your state");
    }
  
    if (!cityValue) {
      errors.push("Please select your city");
    }
  
    if (errors.length > 0) {
      errors.forEach((error) =>
        triggerToastMessage({
          type: "warning",
          message: error,
        })
      );
      return;
    }
  
    try {
      
      if (GET_EDIT_ADDRESS) {
        const res = await axios.post(
          `${API_ENPOINTS.UPDATE_SHIPPING_ADDRESS}/${GET_EDIT_ADDRESS.id}`,
          {
            name: address?.name,
            email: address?.email,
            phone: address?.phoneNumber,
            address: address?.address,
            type: address?.title,
            pincode: address?.pincode,
            country_id: countryValue,
            state_id: stateValue,
            city_id: cityValue,
            defaddress: GET_EDIT_ADDRESS.defaddress,
          }
        );
  
        triggerToastMessage({
          type: "success",
          message: res?.data?.message,
        });
      } else {

        if(route.params?.id == 0){
          console.log("SHIPPING");
          const FORM_DATA_FOR_SHIPPING = new FormData();
          FORM_DATA_FOR_SHIPPING.append("name", address?.name);
          FORM_DATA_FOR_SHIPPING.append("address", address?.address);
          FORM_DATA_FOR_SHIPPING.append("email", address?.email);
          FORM_DATA_FOR_SHIPPING.append("phone", address?.phoneNumber);
          FORM_DATA_FOR_SHIPPING.append("type", address?.title);
          FORM_DATA_FOR_SHIPPING.append("pincode", address?.pincode);
          FORM_DATA_FOR_SHIPPING.append("country_id", countryValue);
          FORM_DATA_FOR_SHIPPING.append("state_id", stateValue);
          FORM_DATA_FOR_SHIPPING.append("city_id", cityValue);
          FORM_DATA_FOR_SHIPPING.append("defaddress", 1);

          const res = await axios.post(
            API_ENPOINTS.CREATE_SHIPPING_ADDRESS,
            FORM_DATA_FOR_SHIPPING
          );
          triggerToastMessage({
            type: "success",
            message: res?.data?.message,
          });
        } else {

          console.log("BILLING");
          let contactNo = Number(address.phoneNumber);

          const FORM_DATA = new FormData();
          FORM_DATA.append("name", address?.name);
          FORM_DATA.append("address", address?.address);
          FORM_DATA.append("email", address?.email);
          FORM_DATA.append("phone", contactNo);
          FORM_DATA.append("pincode", address?.pincode);
          FORM_DATA.append("country_id", countryValue);
          FORM_DATA.append("state_id", stateValue);
          FORM_DATA.append("city_id", cityValue);
          FORM_DATA.append("defaddress", 1);

          await axios
            .post(API_ENPOINTS.CREATE_BILLING_ADDRESS, FORM_DATA)
            .then((Res) => {
              triggerToastMessage({
                type: "success",
                message: Res?.data?.message,
              });
            })
            .catch((err) => {
              console.log("Errr======>");
            });
        }
       
      }
  
      navigation.goBack();
    } catch (err) {
      console.error("Error:", err);
    }
  };
  

  const handleInputValueChange = useCallback(
    (key, value) => {
      address[key] = value;
      setAddress({ ...address });
    },
    [address]
  );

  return (
    <BaseLayout>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Image
            source={{ uri: MAP_IMAGE.uri }}
            resizeMode="cover"
            style={{ width: "100%", height: moderateScale(390) }}
          />
        </View>
        <View
          style={{
            marginTop: moderateScale(25),
            width: "92%",
            alignSelf: "center",
            gap: moderateScale(8),
          }}
        >
          <View style={{ width: "100%" }}>
            <BaseTextinputComponent
              label={"NAME"}
              value={address?.name}
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
          <View>
            <BaseTextinputComponent
              inputRef={reflist[0]}
              label={"EMAIL"}
              value={address?.email}
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
              maxLength={15}
              value={address?.phoneNumber}
              placeholder={"Enter your phone number"}
              onChange={(e) => handleInputValueChange("phoneNumber", e)}
              onSubmit={() => reflist[2]?.current?.focus()}
              externelStyle={{
                borderWidth: 0,
                borderTopWidth: 1,
                borderBottomWidth: 1,
              }}
            />
          </View>
          <View style={{ width: "100%" }}>
            <BaseTextinputComponent
              inputRef={reflist[2]}
              label={"PINCODE"}
              keyboard={"number-pad"}
              maxLength={15}
              value={address?.pincode}
              placeholder={"Enter your pincode"}
              onChange={(e) => handleInputValueChange("pincode", e)}
              onSubmit={() => reflist[3]?.current?.focus()}
              externelStyle={{
                borderWidth: 0,
                borderTopWidth: 1,
                borderBottomWidth: 1,
              }}
            />
          </View>
          <View style={{ width: "100%" }}>
            <BaseTextinputComponent
              inputRef={reflist[3]}
              label={"TITLE"}
              value={address?.title}
              placeholder={"Enter your address title"}
              onChange={(e) => handleInputValueChange("title", e)}
              onSubmit={() => reflist[4]?.current?.focus()}
              externelStyle={{
                borderWidth: 0,
                borderTopWidth: 1,
                borderBottomWidth: 1,
              }}
            />
          </View>
          <View style={{ width: "100%" }}>
            <BaseTextinputComponent
              inputRef={reflist[4]}
              label={"NEW ADDRESS"}
              value={address?.address}
              placeholder={"Enter your new address"}
              onChange={(e) => handleInputValueChange("address", e)}
              externelStyle={{
                borderWidth: 0,
                borderTopWidth: 1,
                borderBottomWidth: 1,
              }}
            />
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
        </View>
        {/* <View
          style={{
            flexDirection: "row",
            gap: moderateScale(10),
            width: "92%",
            alignSelf: "center",
            marginVertical: moderateScale(15),
          }}
        >
          <TouchableOpacity style={styles.CheckBoxStyle} />
          <Text
            style={{
              fontSize: moderateScale(14),
              fontFamily: Fonts.DM_SANS_REGULER,
              color: Colors.SECONDARY_COLOR,
            }} 
          >
            Use current location
          </Text>
        </View> */}
        <View style={{ marginVertical: moderateScale(20) }}>
          <BaseButton
            label={"SAVE ADDRESS"}
            onPress={() => hanldeAddAddress()}
          />
        </View>
      </ScrollView>
    </BaseLayout>
  );
};

export default AddNewAddresScreen;

const styles = StyleSheet.create({
  CheckBoxStyle: {
    width: moderateScale(18),
    height: moderateScale(18),
    borderWidth: 0.9,
    borderRadius: moderateScale(4),
    borderColor: Colors.BORDER_COLOR,
    backgroundColor: Colors.BOX_BACKGROUND_COLOR,
  },
});
