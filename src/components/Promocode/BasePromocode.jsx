import { StyleSheet, Text, View } from "react-native";
import React, { memo, useMemo } from "react";
import BaseLayout from "../Container/BaseLayout";
import { Colors, Fonts, moderateScale } from "../../utils/theme";
import { CopyIcon, EditIcon, HomeFocusedIcon } from "../../assets/icons";
import { TouchableOpacity } from "react-native";

const BasePromocode = ({ label, expiryDate, labelDay, icon = null }) => {
  const DisplayIcon = useMemo(() => icon, [icon]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.contain}>
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              //   justifyContent : 'center',
              gap: moderateScale(10),
            }}
          >
            {icon && DisplayIcon}
            <Text
              style={{
                fontSize: moderateScale(20),
                color: Colors.BLACK,
                fontFamily: Fonts.DM_SANS_MEDIUM,
              }}
            >
              {label}
            </Text>
          </View>
          <Text
            style={{
              marginTop: moderateScale(8),
              fontSize: moderateScale(12),
              color: Colors.PRIMARY_TEXT_COLOR,
              fontFamily: Fonts.DM_SANS_REGULER,
            }}
          >
            {expiryDate}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{ alignItems: "flex-end" }}
          >
            <CopyIcon />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: moderateScale(12),
              fontFamily: Fonts.DM_SANS_REGULER,
              color: Colors.PRIMARY_TEXT_COLOR,
              marginTop: moderateScale(8),

            }}
          >
            {labelDay}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default memo(BasePromocode);

const styles = StyleSheet.create({
  mainContainer: {
    width: "95%",
    height: moderateScale(90),
    borderWidth: 0.9,
    borderColor: Colors.BORDER_COLOR,
    alignSelf: "flex-end",
    borderTopLeftRadius: moderateScale(5),
    borderBottomLeftRadius: moderateScale(5),
  },
  contain: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: moderateScale(16),
  },
});
