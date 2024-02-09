import React, { useMemo, useState } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import BaseLayout from "../../src/components/Container/BaseLayout";
import BaseHeader from "../../src/components/Header/BaseHeader";
import { UserImage } from "../../src/assets/images";
import {
  Colors,
  DEVICE_STYLES,
  Fonts,
  moderateScale,
} from "../../src/utils/theme";
import { EditIcon, MyOrderIcon } from "../../src/assets/icons";
import { ProfileData } from "../../src/mock";
import LogOutModal from "../../src/components/Modal/LogOutModal";
import BaseButton from "../../src/components/Buttons/BaseButton";
import { CommonActions, useNavigation } from "@react-navigation/native";
import BaseIconButton from "../../src/components/Buttons/BaseIconButton";
import { STACK_NAVIGATION_KEYS } from "../../src/navigation/NavigationKeys";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  clearUserDetails,
  storeUserDetails,
} from "../../src/redux/slices/auth";
import { AsyncStorageRemoveItem } from "../../src/utils/storage";
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  TOKEN_TYPE,
} from "../../src/utils/constant";
import FastImage from "react-native-fast-image";

const ProfileScreen = () => {
  const authSliceDetails = useSelector((state) => state.auth);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const screenNavigation = (itemName) => {
    console.log(itemName);
    switch (itemName) {
      case "Sign out":
        return setIsModalVisible(true);
      case "Shipping Address":
        return navigation.navigate(STACK_NAVIGATION_KEYS.MY_ADDRESS_SCREEN);
      case "Billing Address":
        return navigation.navigate(STACK_NAVIGATION_KEYS.BILLING_ADDRESS_SCREEN);
      case "My orders":
        return navigation.navigate(STACK_NAVIGATION_KEYS.ORDER_DETAILS_SCREEN);
      case "Payment method":
        return navigation.navigate(STACK_NAVIGATION_KEYS.PAYMENT_METHOD);
      default:
        return null;
    }
  };

  const handleLogout = async () => {
    await AsyncStorageRemoveItem(ACCESS_TOKEN);
    await AsyncStorageRemoveItem(REFRESH_TOKEN);
    await AsyncStorageRemoveItem(TOKEN_TYPE);

    dispatch(clearUserDetails());


    setIsModalVisible(false);
    navigation.reset({
      index: 0,
      routes: [
        {
          name: "Signin",
        },
      ],
    });
  };
  

  const renderContain = ({ item }) => {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => screenNavigation(item.name)}
          style={styles.Details}
        >
          <View
            activeOpacity={0.6}
            style={{
              flexDirection: "row",
              marginHorizontal: moderateScale(15),
              alignItems: "center",
            }}
          >
            <View>{item.icon}</View>
            <Text
              style={{
                fontSize: moderateScale(16),
                marginHorizontal: moderateScale(10),
                color: Colors.BLACK,
                fontFamily: Fonts.DM_SANS_REGULER,
              }}
            >
              {item.name}
            </Text>
          </View>
          <View
            activeOpacity={0.6}
            style={{ marginHorizontal: moderateScale(15) }}
          >
            {item.icon2}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const userDetails = useMemo(
    () => authSliceDetails.userDetails,
    [authSliceDetails]
  );


  return (
    <BaseLayout>
      <View
        style={{
          height: DEVICE_STYLES.SCREEN_HEIGHT * 0.15,
          flexDirection: "row",
          //   backgroundColor: "yellow",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: moderateScale(8),
            marginHorizontal: moderateScale(15),
          }}
        >
          <FastImage
            source={{
              uri:
                !userDetails?.profile_picture.includes(".jpg") &&
                  !userDetails?.profile_picture.includes(".png") &&
                  !userDetails?.profile_picture.includes(".jpeg")
                  ? `${userDetails?.profile_picture}.png`
                  : userDetails?.profile_picture,
              priority: FastImage.priority.normal
            }}
            resizeMode={FastImage.resizeMode.cover}
            style={{
              width: moderateScale(60),
              height: moderateScale(60),
              borderRadius: moderateScale(30),
            }}
          />
          <View>
            <Text
              style={{
                fontSize: moderateScale(14),
                color: Colors.BLACK,
                fontFamily: Fonts.DM_SANS_BOLD,
              }}
            >
              {userDetails?.name}
            </Text>
            <Text
              style={{
                fontSize: moderateScale(14),
                color: Colors.PRIMARY_TEXT_COLOR,
                fontFamily: Fonts.DM_SANS_REGULER,
              }}
            >
              {userDetails?.email}
            </Text>
          </View>
        </View>
        <View style={{ marginHorizontal: moderateScale(15) }}>
          <BaseIconButton
            onPress={() =>
              navigation.dispatch(
                CommonActions.navigate(STACK_NAVIGATION_KEYS.EDIT_PROFILE)
              )
            }
          >
            <EditIcon />
          </BaseIconButton>
        </View>
      </View>
      <View>
        <FlatList
          data={ProfileData}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderContain}
        />
      </View>
      <LogOutModal
        key={"log-out-modal"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onClick={() => handleLogout()}
      />
    </BaseLayout>
  );
};
export default ProfileScreen;

const styles = StyleSheet.create({
  Details: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "95%",
    height: moderateScale(60),
    alignSelf: "flex-end",
    backgroundColor: Colors.WHITE,
    marginVertical: moderateScale(10),
    borderWidth: 0.8,
    borderColor: Colors.BORDER_COLOR,
    borderTopLeftRadius: moderateScale(5),
    borderBottomLeftRadius: moderateScale(5),
    elevation: 0.5,
  },
});
