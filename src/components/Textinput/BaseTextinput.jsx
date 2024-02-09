import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, memo, useDeferredValue, useMemo } from "react";
import { Colors, Fonts, moderateScale } from "../../utils/theme";
import { EyeOffIcon, EyeOnIcon, RightIcon, VerifyIcon } from "../../assets/icons";

const BaseTextinput = ({
  inputRef,
  value,
  onChange,
  onSubmit,
  keyboard = "default",
  placeholder,
  maxLength = undefined,
  isSecured = false,
  multiline = false,
  isRight = false,
  autoCapitalize = "none",
  externelStyle = {},
  defaultValue = "",
  label,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hide, setHide] = useState(isSecured);

  const LABEL_CONTAINER = useMemo(() => {
    return (
      <View style={styles.labelContainer}>
        <Text style={styles.labelContainerText}>{label}</Text>
      </View>
    );
  }, [label]);

  return (
    <View style={{ height: moderateScale(60), alignItems: "stretch" }}>
      <View
        style={[
          styles.container,
          {
            // borderWidth: isFocused ? moderateScale(2.2) : moderateScale(1.3),
            height: moderateScale(50),
          },
          externelStyle,
        ]}
      >
        <TextInput
          ref={inputRef}
          value={value}
          defaultValue={defaultValue}
          onChangeText={(e) => {
            if (keyboard === "number-pad") {
              const trimValue = e.replace(/[^0-9]/g, "");
              onChange(trimValue);
              return;
            }

            onChange && onChange(e);
          }}
          keyboardType={keyboard}
          onSubmitEditing={() => onSubmit && onSubmit()}
          maxLength={maxLength}
          multiline={multiline}
          placeholder={placeholder}
          placeholderTextColor={Colors.PRIMARY_GREY}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          secureTextEntry={hide}
          cursorColor={Colors.BLACK}
          style={[
            styles.containerTextStyle,
            { textAlignVertical: multiline ? "top" : "auto", height: "100%" },
          ]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {isRight ? (
          <View style={{height:'100%',right:moderateScale(14), alignItems:'center', justifyContent:'center'}}>
            <VerifyIcon />
          </View>
        ) : null}
        {isSecured ? (
          <TouchableOpacity
            style={{
              position: "absolute",
              right: moderateScale(15),
              alignSelf: "center",
            }}
            onPress={() => setHide(!hide)}
            activeOpacity={0.4}
            accessibilityRole={"button"}
          >
            {hide ? (
              <EyeOffIcon
                width={moderateScale(26)}
                height={moderateScale(26)}
              />
            ) : (
              <EyeOnIcon width={moderateScale(26)} height={moderateScale(26)} />
            )}
          </TouchableOpacity>
        ) : null}
      </View>
      {LABEL_CONTAINER}
    </View>
  );
};

export default memo(BaseTextinput);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BASE_SCREEN_COLOR,
    borderRadius: moderateScale(0),
    paddingLeft: moderateScale(13),
    paddingRight: moderateScale(5),
    borderColor: Colors.PRIMARY_COLOR,
    borderTopWidth: 1.2,
    borderBottomWidth: 1.2,
    borderBottomWidth: moderateScale(1),
    flexDirection: "row",
    alignItems: "flex-start",
  },
  containerTextStyle: {
    fontFamily: Fonts.DM_SANS_REGULER,
    fontSize: moderateScale(16),
    color: Colors.BLACK,
    flex: 1,
  },
  labelContainer: {
    backgroundColor: Colors.BASE_SCREEN_COLOR,
    paddingHorizontal: moderateScale(6),
    position: "absolute",
    top: moderateScale(-6),
    left: moderateScale(10),
  },
  labelContainerText: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.DM_SANS_MEDIUM,
    color: Colors.PRIMARY_TEXT_COLOR,
    textAlign: "left",
    backgroundColor: Colors.BASE_SCREEN_COLOR,
  },
});
