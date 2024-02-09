import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import BaseLayout from "../components/Container/BaseLayout";
import BasePromocode from "../components/Promocode/BasePromocode";
import { TagIcon } from "../assets/icons";
import { moderateScale } from "../utils/theme";
import BaseTextinputComponent from "../components/Textinput/BaseTextinputComponent";
import BaseButton from "../components/Buttons/BaseButton";
import { useState } from "react";
import { useCallback } from "react";

const PromoCodesScreen = () => {
  const [voucherValue, setVoucherValue] = useState("");

  const handleVoucherChange = useCallback(
    (e) => setVoucherValue(e),
    [voucherValue]
  );

  return (
    <BaseLayout>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, marginTop: moderateScale(10) }}
      >
        <View>
          <View style={{ marginVertical: moderateScale(8) }}>
            <BasePromocode
              icon={<TagIcon height={18} width={18} />}
              label={"20%"}
              expiryDate={"Expire Dec 31, 2023"}
              labelDay={"20lamplight"}
            />
          </View>
          <View style={{ marginVertical: moderateScale(8) }}>
            <BasePromocode
              icon={<TagIcon height={18} width={18} />}
              label={"25%"}
              expiryDate={"Expire Dec 31, 2023"}
              labelDay={"25%fridaysale"}
            />
          </View>
          <View style={{ marginVertical: moderateScale(8) }}>
            <BasePromocode
              icon={<TagIcon height={18} width={18} />}
              label={"10%"}
              expiryDate={"Expire in 3 days"}
              labelDay={"10%rooms23"}
            />
          </View>
        </View>
        <View
          style={[
            styles.contain,
            {
              flexDirection: "row",
              alignItems: "stretch",
              justifyContent: "space-between",
            },
          ]}
        >
          <View style={{ flex: 0.7, alignItems: "stretch" }}>
            <BaseTextinputComponent
              label={"ENTER THE VOUCHER"}
              value={voucherValue}
              onChange={handleVoucherChange}
              placeholder={"Your promocode"}
            />
          </View>
          <View style={{ flex: 0.28, alignItems: "stretch" }}>
            <BaseButton
              externalStyle={{
                height: moderateScale(50),
              }}
              label={"+ADD"}
            />
          </View>
        </View>
      </ScrollView>
    </BaseLayout>
  );
};

export default PromoCodesScreen;

const styles = StyleSheet.create({
  contain: {
    paddingRight: moderateScale(10),
    paddingLeft: moderateScale(20),
    marginVertical: moderateScale(18),
  },
});
