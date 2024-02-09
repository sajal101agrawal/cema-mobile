import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo, useCallback, useState , useEffect } from "react";
import {
  Colors,
  DEVICE_STYLES,
  DEVICE_STYLES_WITH_STATUSBAR,
  Fonts,
  moderateScale,
} from "../../utils/theme";
import Modal from "react-native-modal";
import RadioButton from "../Atoms/RadioButton";
import BaseDevider from "../Atoms/BaseDevider";
import { HomeFocusedIcon } from "../../assets/icons";
import BaseButton from "../Buttons/BaseButton";
import { STACK_NAVIGATION_KEYS } from "../../navigation/NavigationKeys";

const AddressModal = ({
  modalVisiblity = false,
  handleModalVisibilty,
  Address_list,
  onAddressSelect,
  toggleAddressModal,
  navigation
}) => {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    setListData([...Address_list]);
  }, [Address_list]);

  //  console.log('data', Address_list)
  //  console.log('data???????', listData)

  const handleRadioButtonClick = useCallback(
    (index) => {
      const selectedAddress = listData[index];

      const updatedListData = listData.map((item, i) => {
        return {
          ...item,
          selected: i === index,
        };
      });

      setListData(updatedListData);
      handleModalVisibilty && handleModalVisibilty();

      onAddressSelect &&
        onAddressSelect({
          selectedId: selectedAddress.id,
          selectedAddress: selectedAddress.address,
        });
    },
    [listData, handleModalVisibilty, onAddressSelect]
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
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        {listData.length != 0 ? <Text
          style={{
            fontSize: moderateScale(18),
            textAlign: "center",
            color: Colors.SECONDARY_COLOR,
            fontFamily: Fonts.POPPINS_MEDIUM,
            marginVertical: moderateScale(12),
          }}
        >
          Choose Delivery Address:
        </Text> : null}
         {listData.length == 0 ? null : <BaseDevider />}

        <View style={{ maxHeight: DEVICE_STYLES.SCREEN_HEIGHT * 0.7 }}>
          <FlatList
            data={listData}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, overflow: "hidden" }}
            accessibilityRole={"list"}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 2,
                  width: "100%",
                  backgroundColor: Colors.BORDER_COLOR,
                }}
              />
            )}
            ListEmptyComponent={() => {
              return <BaseButton onPress={() => {
                toggleAddressModal()
                navigation.navigate(STACK_NAVIGATION_KEYS.ADD_NEW_ADDRESS, {id:0})
              }} label={'+ Add shipping address'} />
            }}
            renderItem={renderContain}
          />
        </View>
      </View>
    </Modal>
  );
};

export default memo(AddressModal);

const styles = StyleSheet.create({
  container: {
    width: "95%",
    // paddingHorizontal: moderateScale(20),
    // height : undefined ,
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
