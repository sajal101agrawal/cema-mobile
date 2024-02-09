import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Colors, Fonts, moderateScale } from "../../src/utils/theme";
import { PasswordResetDone } from "../../src/assets/icons";
import { useNavigation } from "@react-navigation/native";
import BaseButton from "../../src/components/Buttons/BaseButton";


const PasswordChangeDone = () => {
   
    const navigation = useNavigation()

  return (
   <>
    <View
      style={{
        flex: 0.88,
        backgroundColor: Colors.BASE_SCREEN_COLOR,
        justifyContent: "center",
        paddingHorizontal: moderateScale(20),
      }}
    >
      <View style={{marginVertical : moderateScale(15)}}>
        <PasswordResetDone />
      </View>
      <View style={{marginVertical : moderateScale(15)}}>
        <Text
          style={{
            fontSize: moderateScale(22),
            color: Colors.SECONDARY_COLOR,
            fontFamily: Fonts.DM_SANS_BOLD,
          }}
        >{`Your Password Has\nBeen Reset!`}</Text>
      </View>
      <View style={{marginVertical : moderateScale(5)}}>
        <Text
          style={{
            fontSize: moderateScale(16),
            color: Colors.PRIMARY_TEXT_COLOR,
            fontFamily: Fonts.DM_SANS_REGULER,
          }}
        >
          Qui ex aute ipsum duis. Incididunt adipisicing voluptate laborum
        </Text>
      </View>
    </View>
    <View style={{flex:0.12, paddingHorizontal:moderateScale(20), backgroundColor:Colors.BASE_SCREEN_COLOR}}>
    <BaseButton
            label={"SEND"}
            externalStyle={{ width: "100%" }}
          onPress={() => navigation.reset({
            index: 0,
            routes: [
              {
                name: "Signin",
              },
            ],
          })}
          />
    </View>
   </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "rgb(227,224,219)",
  },
  keyContainer: {
    paddingTop: "60%",
  },
  keyImage: {
    marginBottom: 30,
  },
  textOne: {
    fontSize: 22,
    fontWeight: "bold",
    width: 208,
  },
  textTwo: {
    fontSize: 16,
    width: 290,
    marginTop: 20,
  },
  doneContainer: {
    top: "30%",
  },
  doneButtonContainer: {
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: "rgb(145,104,82)",
  },
  doneButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default PasswordChangeDone;
