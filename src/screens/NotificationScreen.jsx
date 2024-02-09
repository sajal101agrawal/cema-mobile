import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import BaseLayout from "../components/Container/BaseLayout";
import { Colors, Fonts, moderateScale } from "../utils/theme";
import { API_ENPOINTS } from "../utils/api";
import { CautionIcon, GreenCheckIcon, PinkGiftIcon } from "../assets/icons";
import BaseDevider from "../components/Atoms/BaseDevider";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { FlatList } from "react-native";
import { displayDateWithFormat } from "../services";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotification } from "../redux/actions/notification/notification";

const NotificationScreen = () => {
  const cartSliceData = useSelector((state) => state.notification);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotification());
  }, []);

  const renderContain = ({ item }) => {
    return (
      <View style={styles.SupportBoxStyle}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: moderateScale(20),
            gap: moderateScale(10),
          }}
        >
          <GreenCheckIcon />
          <Text
            style={{
              fontSize: moderateScale(16),
              color: Colors.SECONDARY_COLOR,
              fontFamily: Fonts.DM_SANS_REGULER,
            }}
          >
            {item.data.data}
          </Text>
        </View>
        <BaseDevider marginVertical={18} />
        <Text
          style={{
            fontSize: moderateScale(12),
            color: Colors.PRIMARY_TEXT_COLOR,
            fontFamily: Fonts.DM_SANS_REGULER,
            marginBottom: moderateScale(20),
          }}
        >
          {displayDateWithFormat(item.created_at)}
        </Text>
      </View>
    );
  };

  return (
    <BaseLayout>
      {/* <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      > */}
      {/* <View style={styles.ConfirmEmailBoxStyle}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: moderateScale(20),
              gap: moderateScale(10),
            }}
          >
            <CautionIcon />
            <Text
              style={{
                fontSize: moderateScale(16),
                color: Colors.SECONDARY_COLOR,
                fontFamily: Fonts.DM_SANS_REGULER,
              }}
            >
              Please confirm your email.
            </Text>
          </View>
          <Text
            style={{
              fontSize: moderateScale(14),
              color: Colors.PRIMARY_TEXT_COLOR,
              fontFamily: Fonts.DM_SANS_REGULER,
            }}
          >
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.
          </Text>
          <BaseDevider marginVertical={18} />
          <Text
            style={{
              fontSize: moderateScale(12),
              color: Colors.PRIMARY_TEXT_COLOR,
              fontFamily: Fonts.DM_SANS_REGULER,
              marginBottom: moderateScale(20),
            }}
          >
            Feb 29, 2023 at 12:36 PM
          </Text>
        </View>
        <View style={styles.SupportBoxStyle}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: moderateScale(20),
              gap: moderateScale(10),
            }}
          >
            <GreenCheckIcon />
            <Text
              style={{
                fontSize: moderateScale(16),
                color: Colors.SECONDARY_COLOR,
                fontFamily: Fonts.DM_SANS_REGULER,
              }}
            >
              Your support ticket №78912365
            </Text>
          </View>
          <BaseDevider marginVertical={18} />
          <Text
            style={{
              fontSize: moderateScale(12),
              color: Colors.PRIMARY_TEXT_COLOR,
              fontFamily: Fonts.DM_SANS_REGULER,
              marginBottom: moderateScale(20),
            }}
          >
            Feb 29, 2023 at 12:36 PM
          </Text>
        </View>
        <View style={styles.SaleBoxStyle}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: moderateScale(20),
              gap: moderateScale(10),
            }}
          >
            <PinkGiftIcon />
            <Text
              style={{
                fontSize: moderateScale(16),
                color: Colors.SECONDARY_COLOR,
                fontFamily: Fonts.DM_SANS_REGULER,
              }}
            >
              Black Friday Sales!
            </Text>
          </View>
          <View style={styles.InneboxStyle}></View>
          <Text
            style={{
              fontSize: moderateScale(14),
              color: Colors.PRIMARY_TEXT_COLOR,
              fontFamily: Fonts.DM_SANS_REGULER,
            }}
          >
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.
          </Text>
          <BaseDevider marginVertical={18} />
          <Text
            style={{
              fontSize: moderateScale(12),
              color: Colors.PRIMARY_TEXT_COLOR,
              fontFamily: Fonts.DM_SANS_REGULER,
              marginBottom: moderateScale(20),
            }}
          >
            Feb 29, 2023 at 12:36 PM
          </Text>
        </View> */}
      <FlatList
        data={cartSliceData.mynotification}
        showsVerticalScrollIndicator={false}
        accessibilityRole="list"
        accessible={true}
        keyExtractor={(_, index) => index.toString()}
        ItemSeparatorComponent={() => (
          <View style={{ margin: moderateScale(8) }} />
        )}
        renderItem={renderContain}
        keyboardDismissMode={"interactive"}
        keyboardShouldPersistTaps={"never"}
        alwaysBounceVertical={false}
        scrollEventThrottle={16}
      />
      {/* </ScrollView> */}
    </BaseLayout>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  ConfirmEmailBoxStyle: {
    width: "90%",
    height: undefined,
    alignSelf: "center",
    backgroundColor: Colors.BOX_BACKGROUND_COLOR,
    borderRadius: moderateScale(5),
    borderWidth: 0.9,
    borderColor: Colors.BORDER_COLOR,
    paddingHorizontal: moderateScale(18),
    marginVertical: moderateScale(15),
  },
  SupportBoxStyle: {
    width: "90%",
    height: undefined,
    alignSelf: "center",
    backgroundColor: Colors.BOX_BACKGROUND_COLOR,
    borderRadius: moderateScale(5),
    borderWidth: 0.9,
    borderColor: Colors.BORDER_COLOR,
    paddingHorizontal: moderateScale(18),
    // marginBottom: moderateScale(15),
  },
  SaleBoxStyle: {
    width: "90%",
    height: undefined,
    alignSelf: "center",
    backgroundColor: Colors.BOX_BACKGROUND_COLOR,
    borderRadius: moderateScale(5),
    borderWidth: 0.9,
    borderColor: Colors.BORDER_COLOR,
    paddingHorizontal: moderateScale(18),
    marginBottom: moderateScale(15),
  },
  InneboxStyle: {
    width: "100%",
    height: moderateScale(130),
    backgroundColor: "#ECF3FA",
    alignSelf: "center",
    borderRadius: moderateScale(5),
    marginVertical: moderateScale(15),
  },
});
