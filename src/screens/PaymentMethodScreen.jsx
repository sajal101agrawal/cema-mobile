import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import BaseLayout from "../components/Container/BaseLayout";
import BackHeader from "../components/Header/BackHeader";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { ModalPaymentData, PaymentMethodData } from "../mock";
import { moderateScale, Colors, Fonts } from "../utils/theme";
import { EditIcon } from "../assets/icons";
import BaseButton from "../components/Buttons/BaseButton";
import { STACK_NAVIGATION_KEYS } from "../navigation/NavigationKeys";

const PaymentMethodScreen = () => {
  const navigation = useNavigation();

  const renderContain = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={`${index}`}
        activeOpacity={0.6}
        accessibilityRole={"tab"}
        accessible={true}
        style={styles.ModalContainer}
      >
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: moderateScale(10),
            }}
          >
            <View
              style={{
                width: item.name == null ? moderateScale(81) : moderateScale(41),
                height: moderateScale(13),
                backgroundColor: Colors.DARK_GRAY_COLOR,
              }}
            />
            <Text
              style={{
                fontSize: moderateScale(14),
                color: Colors.PRIMARY_TEXT_COLOR,
                fontFamily: Fonts.DM_SANS_REGULER,
              }}
            >
              {item.name}
            </Text>
          </View>
        </View>
        <Text>{item.icon}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <BaseLayout>
      <View style={{flex:0.85}}>
        <FlatList
          data={PaymentMethodData}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          accessibilityRole={"list"}
          ItemSeparatorComponent={() => (
            <View
              style={{
                marginVertical: moderateScale(10),
              }}
            />
          )}
          renderItem={renderContain}
        />
      </View>
      <View style={{flex:0.15,paddingHorizontal:moderateScale(5), alignItems:'center', justifyContent:'center'}}> 
        <BaseButton label={'+ ADD NEW CARD '} onPress={() =>navigation.dispatch(CommonActions.navigate(STACK_NAVIGATION_KEYS.ADD_NEW_CARD_SCREEN))}/>
      </View>
    </BaseLayout>
  );
};

export default PaymentMethodScreen;

const styles = StyleSheet.create({
  ModalContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(15),
  },
});
