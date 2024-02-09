import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const BottomNav = ({ changeScreen }) => {
    const navigation = useNavigation();

    const navigateToScreen = (screenName) => {
        changeScreen(screenName);
    };

    return (
        <View style={styles.bottomNavContainer}>
            <TouchableOpacity onPress={() => navigateToScreen('HomeScreen')}>
                <Image source={require('../../assets/Icon/Home.png')} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigateToScreen('SearchScreen')}>
                <Image source={require('../../assets/Icon/Home.png')} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigateToScreen('CartScreen')}>
                <Image source={require('../../assets/Icon/Home.png')} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigateToScreen('FavoriteScreen')}>
                <Image source={require('../../assets/Icon/favorite.png')} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigateToScreen('ProfileScreen')}>
                <Image source={require('../../assets/Icon/UserProfile.png')} style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    bottomNavContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    icon: {

    }
})
export default BottomNav;
