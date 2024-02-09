import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo, useCallback, useState } from "react";
import {
  Colors,
  DEVICE_STYLES_WITH_STATUSBAR,
  Fonts,
  moderateScale,
} from "../../utils/theme";
import Modal from "react-native-modal";
import RadioButton from "../Atoms/RadioButton";
import BaseDevider from "../Atoms/BaseDevider";
import { ModalAddressData, ModalPaymentData } from "../../mock";

const PaymentModal = ({ modalVisiblity = false, handleModalVisibilty }) => {
  const [listData, setListData] = useState([
    {
      label: "Best Match",
      selected: true,
    },
    {
      label: "Price: low to high",
      selected: false,
    },
    {
      label: "Price: high to low",
      selected: false,
    },
    {
      label: "Newest",
      selected: false,
    },
    {
      label: "Customer rating",
      selected: false,
    },
    {
      label: "Most popular",
      selected: false,
    },
  ]);

  const handleRadioButtonClick = useCallback(
    (index) => {
      ModalPaymentData[index].selected = !ModalPaymentData[index].selected;
      setListData([...ModalPaymentData]);
      handleModalVisibilty && handleModalVisibilty();
    },
    [ModalPaymentData]
  );

  const renderContain = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={`${index}`}
        activeOpacity={0.6}
        accessibilityRole={"tab"}
        accessible={true}
        onPress={() => handleRadioButtonClick(index)}
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
                width: moderateScale(41),
                height: moderateScale(13),
                backgroundColor: Colors.DARK_GRAY_COLOR,
              }}
            />
            <Text
              style={{
                fontSize: moderateScale(14),
                color: Colors.PRIMARY_TEXT_COLOR,
                fontFamily: Fonts.DM_SANS_REGULER,
                //   marginTop: moderateScale(3),
              }}
            >
              {item.name}
            </Text>
          </View>
        </View>
        <RadioButton isSelected={item.selected} />
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      isVisible={modalVisiblity}
      animationIn={"zoomIn"}
      animationOut={"zoomOut"}
      accessibilityRole={"tab"}
      statusBarTranslucent={true}
      deviceHeight={DEVICE_STYLES_WITH_STATUSBAR.height}
      onBackButtonPress={handleModalVisibilty}
      onBackdropPress={handleModalVisibilty}
    >
      <View style={styles.container}>
        <Text
          style={{
            fontSize: moderateScale(18),
            color: Colors.SECONDARY_COLOR,
            fontFamily: Fonts.POPPINS_MEDIUM,
            marginVertical: moderateScale(12),
            marginHorizontal: moderateScale(20),
          }}
        >
          Choose Payment Method:
        </Text>
        <View>
          <FlatList
            data={ModalPaymentData}
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
      </View>
    </Modal>
  );
};

export default memo(PaymentModal);

const styles = StyleSheet.create({
  container: {
    width: "95%",
    // paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(12),
    backgroundColor: Colors.WHITE,
    alignSelf: "center",
    borderRadius: moderateScale(5),
  },
  modalItemContainerStyle: {
    height: moderateScale(45),
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  labelStyle: {
    fontFamily: Fonts.DM_SANS_REGULER,
    fontSize: moderateScale(14),
    color: Colors.SECONDARY_COLOR,
    textAlign: "left",
  },
  ModalContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(15),
  },
});
