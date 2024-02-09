import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { Colors, DEVICE_STYLES, Fonts, moderateScale } from "../../utils/theme";
import { useNavigation } from "@react-navigation/native";
import { BackIcon } from "../../assets/icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BackHeader = ({ label , externalStyle = {} }) => {
	const navigation = useNavigation();
	const SafeAreaInsets = useSafeAreaInsets();

	return (
		<View style={[styles.headerContaier, { top : SafeAreaInsets.top } , externalStyle]}>
			<View
				style={{
					flex: 0.15
				}}
			>
				<Pressable style={{flex : 1,alignItems:'center',justifyContent:'center'}} onPress={() => navigation.goBack()}>
					<BackIcon height={15} width={15} />
				</Pressable>
			</View>
			<View
				style={{
					flex: 0.85,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Text style={styles.textStyle}>{label}</Text>
			</View>
		</View>
	);
};
export default memo(BackHeader);

const styles = StyleSheet.create({
	headerContaier: {
		height: DEVICE_STYLES.SCREEN_HEIGHT * 0.079,
		backgroundColor: '#fff',
		flexDirection: "row",
	},
	textStyle: {
		color: Colors.SECONDARY_COLOR,
		fontSize: moderateScale(16),
		fontFamily: Fonts.DM_SANS_REGULER,
		left: moderateScale(-28)
	},
});
