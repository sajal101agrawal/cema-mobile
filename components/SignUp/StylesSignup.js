import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(227,224,219)',
        paddingHorizontal: 20,
    },
    signUpContainer: {
        paddingTop: '25%',
        marginBottom: 20,
    },
    signUpText: {
        textAlign: 'left',
        fontSize: 32,
        fontWeight: 'bold'
    },
    input: {
        backgroundColor: 'rgb(227,224,219)',
        height: 40,
        borderColor: 'rgb(145,104,82)',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    signUpButton: {
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: 'rgb(145,104,82)',
    },
    signUpButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    signInContainer: {
        flexDirection: 'row',
        justifyContent: 'left',
        marginTop: 20,
    },
    signInText: {
        marginRight: 5,
        fontSize: 16,
    },
    signInLink: {
        color: 'black',
        fontSize: 16,
    },
    socialLoginContainer: {
        paddingTop: '20%'
    },
    socialText: {
        fontSize: 16,
        textAlign: 'left'
    },
    socialLogoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '10%'
    },
    twitterImage: {
        paddingHorizontal: 5
    },

})
export default styles