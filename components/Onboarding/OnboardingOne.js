import React from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native'
import styles from './Styles'
import { useNavigation } from '@react-navigation/native';

const OnboardingOne = () => {
    const navigation = useNavigation();

    const handleSkip = () => {
        navigation.replace('Signin');
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require('../../assets/Images/Onboarding1.png')}
                    style={styles.image}
                />
            </View>
            <View style={stylesOne.infoContainerOne}>
                <View style={stylesOne.Viewtextone}>
                    <Text style={stylesOne.Textone}>Welcome to Your Dream Space!</Text>
                </View>

                <View style={styles.Viewtexttwo}>
                    <Text style={stylesOne.Texttwo}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSkip}>
                    <Text style={stylesOne.buttonText}>Skip</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const stylesOne = StyleSheet.create({
    infoContainerOne: {
        flex: 0.4,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgb(227,224,219)',
    },
    Viewtextone: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '20%',
    },
    Textone: {
        fontSize: 21,
        fontWeight: 'bold',
        color: 'rgb(149,111,89)',
        textAlign: 'center',
    },
    Texttwo: {
        fontWeight: 'normal',
        textAlign: 'center',
        padding: 10,
        color: 'rgb(144,153,158)',
    },
    buttonText: {
        color: 'rgb(152,117,96)',
        textAlign: 'center',
    }
})
export default OnboardingOne;