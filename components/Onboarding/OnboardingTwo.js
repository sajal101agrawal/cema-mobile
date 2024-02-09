import React from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native'
import styles from './Styles'
import { useNavigation } from '@react-navigation/native';

const OnboardingTwo = () => {
  const navigation = useNavigation();

  const handleSkip = () => {
    navigation.navigate('Signin');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/Images/Onboarding2.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.infoContainer}>
        <View style={stylesTwo.Viewtextone}>
          <Text style={styles.Textone}>Unleash Your Inner Designer!</Text>
        </View>

        <View style={stylesTwo.Viewtexttwo}>
          <Text style={styles.Texttwo}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSkip}>
          <Text style={styles.buttonText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const stylesTwo = StyleSheet.create({
  Viewtextone: {

    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '20%',

  },
  Viewtexttwo: {
    width: '90%',
    flex: 1,
    flexDirection: 'column',
    position: 'absolute',
    bottom: '40%',
  }
})
export default OnboardingTwo;