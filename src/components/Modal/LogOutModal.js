import { Text, View } from "react-native";
import React, { memo } from "react";
import {
  Colors,
  DEVICE_STYLES_WITH_STATUSBAR,
  Fonts,
  moderateScale,
} from "../../utils/theme";
import BaseButton from "../Buttons/BaseButton";
import { LogOutModalicon } from "../../assets/icons/";
import Modal from "react-native-modal";

const LogOutModal = ({ onClick, onCancel, visible = false }) => {
  return (
    <Modal
      isVisible={visible}
      style={{ width: "80%", alignSelf: "center" }}
      animationIn={"zoomIn"}
      animationOut={"zoomOut"}
      accessibilityRole={"tab"}
      statusBarTranslucent={true}
      deviceHeight={DEVICE_STYLES_WITH_STATUSBAR.height}
    >
      <View
        style={{ backgroundColor: "white", borderRadius: moderateScale(4) }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "flex-start",
            paddingVertical: moderateScale(25),
            paddingHorizontal : moderateScale(18)
          }}
        >
          <LogOutModalicon />
          {/* <View style={{ width: '100%', height: 1, backgroundColor: '#eeeeee', marginVertical: 20 }} /> */}
          <Text style={{ fontSize: moderateScale(18), color: "#000",marginTop:moderateScale(10) , fontFamily:Fonts.DM_SANS_ITALIC }}>
           { `Are You Sure You Want To\nSign Out ?`}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            paddingBottom: moderateScale(22),
            paddingTop: moderateScale(10),
          }}
        >
          <View style={{ flex: 0.4 }}>
            <BaseButton
              onPress={() => onCancel && onCancel()}
              label={"CANCEL"}
              labelColor={Colors.WHITE}
              externalStyle={{
                backgroundColor: Colors.PRIMARY_COLOR,
              }}
            />
          </View>
          <View style={{ flex: 0.4 }}>
            <BaseButton
              onPress={() => onClick && onClick()}
              label={"SURE"}
              labelColor={Colors.BLACK}
              externalStyle={{
                borderWidth: moderateScale(1.2),
                borderColor: Colors.BLACK,
                backgroundColor: Colors.TRANSPARENT,
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default memo(LogOutModal);
