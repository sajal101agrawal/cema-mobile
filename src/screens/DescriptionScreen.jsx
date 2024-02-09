import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useMemo } from "react";
import BaseLayout from "../components/Container/BaseLayout";
import { Colors, DEVICE_STYLES, Fonts, moderateScale } from "../utils/theme";
import RenderHtml from 'react-native-render-html';

const DescriptionScreen = ({ route }) => {

  const HTML_SOURCE = route.params.productDetails;

  return (
    <BaseLayout>
      {/* <View
        style={{
          flex: 0.6,
          justifyContent: "center",
          paddingHorizontal: moderateScale(18),
        }}
      >
        <Text
          style={{
            fontSize: moderateScale(20),
            fontFamily: Fonts.POPPINS_SEMI_BOLD,
            color: Colors.SECONDARY_COLOR,
            marginBottom: moderateScale(15),
          }}
        >
          Wooden Armchair Grey
        </Text>
        <Text
          style={{
            fontSize: moderateScale(16),
            fontFamily: Fonts.DM_SANS_REGULER,
            color: Colors.PRIMARY_TEXT_COLOR,
            marginBottom: moderateScale(20),
          }}
        >
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum. Duis aute irure dolor in reprehenderit in voluptate velit
          esse cillum dolore eu fugiat nulla pariatur.
        </Text>
        <Text
          style={{
            fontSize: moderateScale(16),
            fontFamily: Fonts.DM_SANS_REGULER,
            color: Colors.PRIMARY_TEXT_COLOR,
          }}
        >
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum.
        </Text>
      </View>
      <View style={{ flex: 0.4, paddingHorizontal: moderateScale(18) }}>
        <Text
          style={{
            fontSize: moderateScale(14),
            fontFamily: Fonts.POPPINS_SEMI_BOLD,
            color: Colors.SECONDARY_COLOR,
            marginBottom: moderateScale(15),
          }}
        >
          Measurements
        </Text>

        <View style={{ gap: moderateScale(15) }}>
          <View style={styles.MeasurmentStyle}>
            <Text>Width</Text>
            <Text>33.5”</Text>
          </View>
          <View style={styles.MeasurmentStyle1}>
            <Text>Depth</Text>
            <Text>36.125</Text>
          </View>
          <View style={styles.MeasurmentStyle2}>
            <Text>Height</Text>
            <Text>37.5”</Text>
          </View>
        </View>
      </View> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: '#fff',
          padding: moderateScale(15),
          paddingTop : moderateScale(5),
          flexGrow: 1
        }}
        bounces={false}
      >
        <RenderHtml
          contentWidth={DEVICE_STYLES.SCREEN_WIDTH}
          source={{
            html: HTML_SOURCE
          }}
        />
      </ScrollView>
    </BaseLayout>
  );
};

export default DescriptionScreen;

const styles = StyleSheet.create({
  MeasurmentStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 2.5,
    borderStyle: "dotted",
    borderColor: Colors.BORDER_COLOR,
    width: "100%",
    alignSelf: "center",
  },
  MeasurmentStyle1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 2.5,
    borderStyle: "dotted",
    borderColor: Colors.BORDER_COLOR,
    width: "100%",
    alignSelf: "center",
  },
  MeasurmentStyle2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 2.5,
    borderStyle: "dotted",
    borderColor: Colors.BORDER_COLOR,
    width: "100%",
    alignSelf: "center",
  },
});
