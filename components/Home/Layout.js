import React, { useState } from 'react'
import { View, StyleSheet, Dimensions, Text } from 'react-native'
import BottomNav from './BottomNav'
import HomeScreen from './HomeScreen'
import SearchScreen from './SearchScreen';
import CartScreen from './CartScreen';
import FavoriteScreen from './FavoriteScreen';
import ProfileScreen from './ProfileScreen';

const height = Dimensions.get('window').height
const Layout = () => {

    const [currentScreen, setCurrentScreen] = useState('HomeScreen');

    const changeScreen = (screenName) => {
        setCurrentScreen(screenName);
    };

    return (
        <View style={styles.container}>
            <View style={styles.screenContainer}>
                {currentScreen === 'HomeScreen' && <HomeScreen />}
                {currentScreen === 'SearchScreen' && <SearchScreen />}
                {currentScreen === 'CartScreen' && <CartScreen />}
                {currentScreen === 'FavoriteScreen' && <FavoriteScreen />}
                {currentScreen === 'ProfileScreen' && <ProfileScreen />}
            </View>
            <View style={styles.bottomNavContainer}>
                <BottomNav changeScreen={changeScreen} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'scroll'
    },
    screenContainer: {
        flex: 0.93,
        backgroundColor: 'white'
    },
    bottomNavContainer: {
        flex: 0.07,
        backgroundColor: 'rgb(145,104,82)'
    }

})
export default Layout