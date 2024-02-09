import { View } from 'react-native'
import React, { useEffect } from 'react';
import * as BootSplashScreen from 'expo-splash-screen';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../utils/constant';
import { AsyncStorageGetItem } from '../utils/storage';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { STACK_NAVIGATION_KEYS } from '../navigation/NavigationKeys';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfileDetails } from '../redux/actions/profile/fetchProfileDetails';
import axios from 'axios';

BootSplashScreen.preventAutoHideAsync();

const SplashScreen = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const authSliceDetails = useSelector((state) => state.auth);

    const init = async () => {
        const ASYNC_ACCESS_TOKEN = await AsyncStorageGetItem(ACCESS_TOKEN);
        const ASYNC_REFRESH_TOKEN = await AsyncStorageGetItem(REFRESH_TOKEN);

        axios.defaults.headers.Authorization = `Bearer ${ASYNC_ACCESS_TOKEN}`;

        if (Boolean(ASYNC_ACCESS_TOKEN && ASYNC_REFRESH_TOKEN)) {
            dispatch(fetchProfileDetails({refresh_token : JSON.stringify(ASYNC_REFRESH_TOKEN), access_token : JSON.stringify(ASYNC_ACCESS_TOKEN)}));
        } else {
            handleNavigation(STACK_NAVIGATION_KEYS.ONBOARDING);
        }
    }

    useEffect(() => {

        if (authSliceDetails.isUserLoggedIn) {
            handleNavigation('DrawerNavigator');
        }

    }, [authSliceDetails.isUserLoggedIn]);

    useEffect(() => {
        init();
    }, []);

    const handleNavigation = async (routeName) => {
        navigation.dispatch(CommonActions.reset({
            index: 0,
            routes: [
                { name: routeName }
            ]
        }));
        await BootSplashScreen.hideAsync();
    }

    return (
        <View style={{flex : 1,backgroundColor : '#fff'}} />
    )
}

export default SplashScreen;