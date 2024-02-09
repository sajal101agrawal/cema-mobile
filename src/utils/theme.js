import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 813;

const scale = (size) => width / guidelineBaseWidth * size;
const verticalScale = (size) => height / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

export { scale, verticalScale, moderateScale };


export const Colors = {
    WHITE: '#FFFFFF',
    BLACK: '#000000',
    PRIMARY_COLOR: '#916953',
    LIGHT_PRIMARY_COLOR: 'rgb(227,224,219)',
    SECONDARY_COLOR: '#142535',
    PRIMARY_TEXT_COLOR: '#4A5F73',
    BORDER_COLOR: '#DBE9F5',
    TRANSPARENT: '#00000000',
    DEFAULT_BACKGROUND_COLOR: "#ffffff",
    SECONDARY_DEFAULT_BACKGROUND_COLOR : '#DBE9F526',
    PRIMARY_GREY : '#A0ADCC',
    SECONDARY_TRANSPARENT : 'rgba(231, 239, 231, 0.38)',
    BOX_BACKGROUND_COLOR : "rgba(219, 233, 245, 0.15)",
    DARK_GRAY_COLOR : '#C9C9C9',
    BASE_SCREEN_COLOR : '#E3E0DB'
}

export const Fonts = {
    Black: 'DMSans_18pt-Black',
    Bold: 'DMSans_18pt-Bold',
    DM_SANS_REGULER: 'DMSans-Regular',
    DM_SANS_MEDIUM: 'DMSans-Medium',
    DM_SANS_BOLD: 'DMSans-Bold',
    DM_SANS_ITALIC: 'DMSans-Italic',
    POPPINS_BOLD: 'Poppins-Bold',
    POPPINS_SEMI_BOLD: 'Poppins-SemiBold',
    POPPINS_MEDIUM: 'Poppins-Medium',
    POPPINS_REGULAR: 'Poppins-Regular',
}

export const DEVICE_STYLES = {
    SCREEN_WIDTH: width,
    SCREEN_HEIGHT: height,
}

export const DEVICE_STYLES_WITH_STATUSBAR = Dimensions.get('screen');