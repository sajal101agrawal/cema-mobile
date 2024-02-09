import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        //paddingTop: 50,
        justifyContent: 'center',
        backgroundColor: 'rgb(227,224,219)',
    },
    welcomeText: {
        fontSize: 32,
        fontWeight: 'bold',
        width: '100%',
    },
    subText: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 30,
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
    eyeIcon: {
        padding: 10,
        width: 24,
        height: 24,
    },
    checkboxContainer: {
        flexDirection: 'row',
    },
    checkboxLabel: {
        color: 'rgb(78,98,118)',
        right: 10,
        top: 15,
    },
    forgotPasswordText: {
        color: '#142535',
        fontSize: 16,
        left: 80,
        top: 15,
    },
    signInButton: {
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: 'rgb(145,104,82)',
    },
    signInButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    signupText: {
        marginRight: 5,
    },
    signupLink: {
        color: 'black',
    },
    socialButtonsContainer: {
        flexDirection: 'column',
        paddingVertical: 40,

    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 15,
        marginBottom: 20,
    },
    socialButtonText: {
        color: 'black',
        //fontFamily: 'Inter-Medium',
        fontSize: 18,
        marginLeft: 60,
    },
    logo: {
        width: 32,
        height: 32,
        marginRight: 10,
    },
});
export default styles