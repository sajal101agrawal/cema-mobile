import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { createRef, useCallback, useState } from "react";
import BaseLayout from "../components/Container/BaseLayout";
import BaseTextinputComponent from "../components/Textinput/BaseTextinputComponent";
import { moderateScale } from "../utils/theme";
import BaseButton from "../components/Buttons/BaseButton";
import BaseOutlineButton from "../components/Buttons/BaseOutlineButton";

const AddNewCardScreen = () => {
  const reflist = new Array(5).fill("_").map((_) => createRef());

  const [cardDetails, setCardDetails] = useState({
    name: "",
    cardNumber: "",
    cvvNumber: "",
    expiryDate: "",
    country: "",
    zipCode: "",
  });

  const handleInputValueChange = useCallback(
    (key, value) => {
      cardDetails[key] = value;
      setCardDetails({ ...cardDetails });
    },
    [cardDetails]
  );

  return (
    <BaseLayout>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            marginVertical: moderateScale(25),
            paddingHorizontal: moderateScale(15),
            gap: moderateScale(10),
          }}
        >
          <BaseTextinputComponent
            label={"NAME"}
            placeholder={"Enter your name"}
            onChange={(e) => handleInputValueChange("name", e)}
            onSubmit={() => reflist[0]?.current?.focus()}
            externelStyle={{
              borderWidth : 0,
              borderTopWidth : 1,
              borderBottomWidth : 1
            }}
          />
          <BaseTextinputComponent
            label={"CARD NUMBER"}
            inputRef={reflist[0]}
            placeholder={"Enter your card number"}
            keyboard={"number-pad"}
            maxLength={16}
            onChange={(e) => handleInputValueChange("cardNumber", e)}
            onSubmit={() => reflist[1]?.current?.focus()}
            externelStyle={{
              borderWidth : 0,
              borderTopWidth : 1,
              borderBottomWidth : 1
            }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "stretch",
              gap: moderateScale(5),
            }}
          >
            <View style={{ flex: 0.5, gap: moderateScale(10) }}>
              <BaseTextinputComponent
                inputRef={reflist[1]}
                label={"MM/YY"}
                placeholder={"enter"}
                onChange={(e) => handleInputValueChange("expiryDate", e)}
                onSubmit={() => reflist[2]?.current?.focus()}
                externelStyle={{
                  borderWidth : 0,
                  borderTopWidth : 1,
                  borderBottomWidth : 1
                }}
              />
              <BaseTextinputComponent
                inputRef={reflist[3]}
                label={"COUNTRY"}
                placeholder={"enter"}
                onChange={(e) => handleInputValueChange("country", e)}
                onSubmit={() => reflist[4]?.current?.focus()}
                externelStyle={{
                  borderWidth : 0,
                  borderTopWidth : 1,
                  borderBottomWidth : 1
                }}
              />
            </View>
            <View style={{ flex: 0.5, gap: moderateScale(10) }}>
              <BaseTextinputComponent
                inputRef={reflist[2]}
                label={"CVV"}
                placeholder={"enter"}
                onChange={(e) => handleInputValueChange("cvv", e)}
                onSubmit={() => reflist[3]?.current?.focus()}
                externelStyle={{
                  borderWidth : 0,
                  borderTopWidth : 1,
                  borderBottomWidth : 1
                }}
              />
              <BaseTextinputComponent
                inputRef={reflist[4]}
                label={"ZIP CODE"}
                placeholder={"enter"}
                onChange={(e) => handleInputValueChange("zipCode", e)}
                externelStyle={{
                  borderWidth : 0,
                  borderTopWidth : 1,
                  borderBottomWidth : 1
                }}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "stretch",
            paddingHorizontal: moderateScale(15),
            gap: moderateScale(15),
          }}
        >
          <View style={{ flex: 0.5 }}>
            <BaseOutlineButton label={"CANCEL"} />
          </View>
          <View style={{ flex: 0.5 }}>
            <BaseButton label={"SAVE"} externalStyle={{ width: "100%" }} />
          </View>
        </View>
      </ScrollView>
    </BaseLayout>
  );
};

export default AddNewCardScreen;

const styles = StyleSheet.create({});
