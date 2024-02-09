import React from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native'
import styles from './Styles'
import { useNavigation } from '@react-navigation/native';

const OnboardingThree = () => {
    const navigation = useNavigation();

    const handleSkip = () => {
        navigation.navigate('Signin');
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require('../../assets/Images/Onboarding3.png')}
                    style={styles.image}
                />
            </View>
            <View style={stylesThree.infoContainerThree}>
                <View style={styles.Viewtextone}>
                    <Text style={styles.Textone}>Let's Transform Your Space Together!</Text>
                </View>

                <View style={styles.Viewtexttwo}>
                    <Text style={styles.Texttwo}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSkip}>
                    <Text style={styles.buttonText}>Skip</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const stylesThree = StyleSheet.create({
    infoContainerThree: {
        flex: 0.4,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgb(145,104,82)',
    }
})
export default OnboardingThree;