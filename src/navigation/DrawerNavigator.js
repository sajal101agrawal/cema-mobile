import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DRAWER_NAVIGATION_KEYS } from './NavigationKeys';
import { DRAWER_NAVIGATION_SCREENS } from './Routes';
import CustomDrawerContent from '../components/Navigation/CustomDrawerContent';
import { Colors, Fonts, moderateScale } from '../utils/theme';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: '80%'
        },
        unmountOnBlur: true
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name={DRAWER_NAVIGATION_KEYS.BOTTOM_NAVIGATOR}
        component={DRAWER_NAVIGATION_SCREENS.BottomNavigator}
      />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator

const styles = StyleSheet.create({})