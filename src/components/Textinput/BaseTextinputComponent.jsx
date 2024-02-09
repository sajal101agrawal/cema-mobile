import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, memo, useDeferredValue, useMemo } from 'react';
import { Colors, Fonts, moderateScale } from '../../utils/theme';
// import { EyeOffIcon, EyeOnIcon } from '@assets/icons/index';

const BaseTextinputComponent = ({
	inputRef,
	value,
	onChange,
	onSubmit,
	keyboard = 'default',
	placeholder,
	maxLength = undefined,
	isSecured = false,
	multiline = false,
	autoCapitalize = 'none',
	externelStyle = {},
	defaultValue = '',
	label
}) => {

	const [isFocused, setIsFocused] = useState(false);
	const [hide, setHide] = useState(isSecured);

	const LABEL_CONTAINER = useMemo(() => {
		return(
			<View style={styles.labelContainer}>
				<Text style={styles.labelContainerText}>{label}</Text>
			</View>
		)
	},[label]);

	return (
		<View style={{height : moderateScale(60), alignItems : 'stretch'}}>
			<View style={[styles.container, { borderWidth: isFocused ? moderateScale(2.2) : moderateScale(1.3),height : moderateScale(50)}, externelStyle]}>
				<TextInput
					ref={inputRef}
					value={value}
					defaultValue={defaultValue}
					onChangeText={(e) => {

						if (keyboard === 'number-pad') {
							const trimValue = e.replace(/[^0-9]/g, "");
							onChange(trimValue);
							return;
						}

						onChange && onChange(e)
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
					style={[styles.containerTextStyle, { textAlignVertical: multiline ? 'top' : 'auto', height: '100%', marginTop: multiline ? moderateScale(10) : 0,}]}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
				/>
				
				

				{/* {
                (isSecured) ?
                    <TouchableOpacity
                        style={{ position: 'absolute', right: moderateScale(15), alignSelf: 'center' }}
                        onPress={() => setHide(!hide)}
                        activeOpacity={0.4}
                        accessibilityRole={'button'}
                    >
                        {
                            (hide) ? <EyeOffIcon width={moderateScale(24)} height={moderateScale(24)} /> : <EyeOnIcon width={moderateScale(24)} height={moderateScale(24)} />
                        }
                    </TouchableOpacity>
                    :
                    null
            } */}
			</View>
			{LABEL_CONTAINER}
		</View>
	)
}

export default memo(BaseTextinputComponent);

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.WHITE,
		borderRadius: moderateScale(0),
		paddingLeft : moderateScale(13),
		paddingRight : moderateScale(5),
		borderColor: Colors.BORDER_COLOR,
		borderWidth : moderateScale(1),
		flexDirection: 'row',
		alignItems: 'flex-start'
	},
	containerTextStyle: {
		fontFamily: Fonts.DM_SANS_REGULER,
		fontSize: moderateScale(16),
		color: Colors.BLACK,
		flex: 1
	},
	labelContainer : {
		backgroundColor : Colors.WHITE,
		paddingHorizontal : moderateScale(6),
		position : 'absolute',
		top : moderateScale(-6),
		left : moderateScale(10)
	},
	labelContainerText : {
		fontSize : moderateScale(12),
		fontFamily : Fonts.DM_SANS_MEDIUM,
		color : Colors.PRIMARY_TEXT_COLOR,
		textAlign : 'left',
		backgroundColor : Colors.WHITE
	}
});