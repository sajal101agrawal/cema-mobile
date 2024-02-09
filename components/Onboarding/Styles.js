import { StyleSheet, Dimensions } from "react-native";
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    imageContainer: {
        flex: 0.6,
        alignItems: 'flex',
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    infoContainer: {
        flex: 0.4,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgb(96,113,125)'
    },
    Viewtextone: {
        width: 212,
        height: 57,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        top: '20%',

    },
    Textone: {
        //fontFamily: 'DM Sans',
        fontSize: 21,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    Viewtexttwo: {
        width: '90%',
        flex: 1,
        flexDirection: 'column',
        position: 'absolute',
        bottom: '40%',
    },
    Texttwo: {
        //fontFamily: 'Poppins',
        fontWeight: 'normal',
        textAlign: 'center',
        padding: 10,
        color: 'white',

    },
    button: {
        position: 'absolute',
        width: 30,
        height: 21,
        right: 20,
        bottom: 30,
        //backgroundColor: 'rgb(96,113,125)',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    sliderContainer: {
        position: 'absolute',
        top: 0,
    }
})
export default styles;