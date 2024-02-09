import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo, useMemo } from "react";
import BaseLayout from "../Container/BaseLayout";
import { Colors, Fonts, moderateScale } from "../../utils/theme";
import { EditIcon, HomeFocusedIcon } from "../../assets/icons";
import { useNavigation } from "@react-navigation/native";
import { STACK_NAVIGATION_KEYS } from "../../navigation/NavigationKeys";


const BaseAddress = ({ Address_list}) => {
  // const DisplayIcon = useMemo(() => icon, [icon]);
  const navigation = useNavigation()

  const renderContain = ({item}) => {
    return (
      <View style={[styles.mainContainer]}>
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
           <HomeFocusedIcon height={18} width={18} />
            <Text
              style={{
                fontSize: moderateScale(14),
                color: Colors.BLACK,
                fontFamily: Fonts.POPPINS_BOLD,
                marginTop: moderateScale(3),
              }}
            >
              {item.type}
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
            {item.address}
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate(STACK_NAVIGATION_KEYS.ADD_NEW_ADDRESS , {data : item})}>
          <EditIcon />
        </TouchableOpacity>
      </View>
    </View>
    )
  }

  return (
    <View>
      <FlatList
      data={Address_list}
      renderItem={renderContain}
      />
    </View>
  );
};

export default memo(BaseAddress);

const styles = StyleSheet.create({
  mainContainer: {
    width: "94%",
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
