import "react-native-gesture-handler";
import React, { useState, useEffect, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signin from "./components/SignIn/Signin";
import ForgotPassword from "./components/SignIn/ForgotPassword";
import ResetPassword from "./components/SignIn/ResetPassword";
import PasswordChangeDone from "./components/SignIn/PasswordChangeDone";
import SignUp from "./components/SignUp/SignUp";
import PhoneVerification from "./components/SignUp/PhoneVerification";
import VerificationCode from "./components/SignUp/VerificationCode";
import DrawerNavigator from './src/navigation/DrawerNavigator';
import { useFonts, loadAsync } from 'expo-font';
import BackHeader from "./src/components/Header/BackHeader";
import { STACK_NAVIGATION_KEYS } from './src/navigation/NavigationKeys';
import ProductScreen from './src/screens/ProductScreen';
import { STACK_NAVIGATION_SCREENS } from './src/navigation/Routes';
import { BASE_URL } from './src/utils/api';
import { Provider } from 'react-redux';
import FlashMessage from 'react-native-flash-message';
import store from './src/redux/store/store';
import axios from 'axios';
import SignupDone from "./components/SignUp/SignupDone";
import NetInfo from "@react-native-community/netinfo";
import { triggerToastMessage } from "./src/services";


const Stack = createNativeStackNavigator();

const App = () => {

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if(state.isConnected == false){
        triggerToastMessage({
          type : 'warning',
          message : 'please check your internet connection'
        })
      }
    })
    
    return () => {
      unsubscribe();
    }
  }, [])

  const [fontsLoaded, fontError] = useFonts({
    'DMSans-Regular': require('./assets/fonts/DMSans-Regular.ttf'),
    'DMSans-Medium': require('./assets/fonts/DMSans-Medium.ttf'),
    'DMSans-Bold': require('./assets/fonts/DMSans-Bold.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'DMSans-Italic': require('./assets/fonts/DMSans-Italic.ttf'),
  });

  const onNavigationReady = useCallback(async () => {
    if (fontsLoaded || fontError) {
      // StatusBar.setBackgroundColor(Colors.WHITE);
      // StatusBar.setBarStyle('dark-content');
      axios.defaults.baseURL = BASE_URL;
      axios.defaults.headers['Content-Type'] = 'multipart/form-data;';
      axios.defaults.headers['Cache-Control'] = 'no-cache';
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

 

  return (
    <Provider store={store}>
      <>
        <NavigationContainer
          onReady={onNavigationReady}
        >
          <Stack.Navigator
            initialRouteName={STACK_NAVIGATION_KEYS.SPLASH}
            screenOptions={{
              animation: 'slide_from_right'
            }}
          >
            <Stack.Screen
              name={STACK_NAVIGATION_KEYS.SPLASH}
              component={STACK_NAVIGATION_SCREENS.SplashScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={STACK_NAVIGATION_KEYS.ONBOARDING}
              component={STACK_NAVIGATION_SCREENS.OnboardingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Signin"
              component={Signin}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown:false}} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} options={{headerShown:false}}/>
            <Stack.Screen name="PasswordChangeDone" component={PasswordChangeDone} options={{headerShown:false}} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="PhoneVerification" component={PhoneVerification} options={{headerShown:false}} />
            <Stack.Screen name="VerificationCode" component={VerificationCode} options={{headerShown:false}} />
            <Stack.Screen name="SignupDone" component={SignupDone} options={{headerShown:false}} />
            {/* <Stack.Screen name="Layout" component={Layout} options={{ headerLeft: "", headerTitle: "", headerStyle: { backgroundColor: 'white' } }} /> */}
            <Stack.Screen
              name="DrawerNavigator"
              component={DrawerNavigator}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={STACK_NAVIGATION_KEYS.PRODUCT_DETAILS}
              component={STACK_NAVIGATION_SCREENS.ProductDetailScreen}
            />
            <Stack.Screen
              name={STACK_NAVIGATION_KEYS.PAYMENT_METHOD}
              component={STACK_NAVIGATION_SCREENS.PaymentMethodScreen}
              options={{ header: () => <BackHeader label={"Payment method"} /> }}
            />
            <Stack.Screen
              name={STACK_NAVIGATION_KEYS.ADD_NEW_ADDRESS}
              component={STACK_NAVIGATION_SCREENS.AddNewAddresScreen}
              options={{ header: () => <BackHeader label={"Add a new address"} /> }}
            />
            <Stack.Screen
              name={STACK_NAVIGATION_KEYS.ADD_NEW_CARD_SCREEN}
              component={STACK_NAVIGATION_SCREENS.AddNewCardScreen}
              options={{ header: () => <BackHeader label={"Add a new card"} /> }}
            />
            <Stack.Screen
              name={STACK_NAVIGATION_KEYS.MY_ADDRESS_SCREEN}
              component={STACK_NAVIGATION_SCREENS.MyAddressScreen}
              options={{ header: () => <BackHeader label={"Shipping Address"} /> }}
            />
            <Stack.Screen
              name={STACK_NAVIGATION_KEYS.BILLING_ADDRESS_SCREEN}
              component={STACK_NAVIGATION_SCREENS.BillingAddressScreen}
              options={{ header: () => <BackHeader label={"Billing Address"} /> }}
            />

            <Stack.Screen
              name={STACK_NAVIGATION_KEYS.ORDER_DETAILS_SCREEN}
              component={STACK_NAVIGATION_SCREENS.OrderDetailsScreen}
              options={{ header: () => <BackHeader label={"Order history"} /> }}
            />

            <Stack.Screen
              name={STACK_NAVIGATION_KEYS.REVIEW_SCREEN}
              component={STACK_NAVIGATION_SCREENS.ReviewScreen}
              options={{ header: () => <BackHeader label={"Reviews"} /> }}
            />

            <Stack.Screen
              name={STACK_NAVIGATION_KEYS.PROMO_CODE_SCREEN}
              component={STACK_NAVIGATION_SCREENS.PromoCodesScreen}
              options={{ header: () => <BackHeader label={"My promcodes"} /> }}
            />

            <Stack.Screen
              name={STACK_NAVIGATION_KEYS.DESCRIPTION_SCREEN}
              component={STACK_NAVIGATION_SCREENS.DescriptionScreen}
              options={{ header: () => <BackHeader label={"Description"} /> }}
            />

            <Stack.Screen
              name={STACK_NAVIGATION_KEYS.RATING_SCREEN}
              component={STACK_NAVIGATION_SCREENS.RatingScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name={STACK_NAVIGATION_KEYS.CHECKOUT_SCREEN}
              component={STACK_NAVIGATION_SCREENS.CheckoutScreen}
              options={{ header: () => <BackHeader label={"Checkout"} /> }}
            />

            <Stack.Screen
              name={STACK_NAVIGATION_KEYS.NOTIFICATION_SCREEN}
              component={STACK_NAVIGATION_SCREENS.NotificationScreen}
              options={{ header: () => <BackHeader label={"Notification"} /> }}
            />

            <Stack.Screen
              name={STACK_NAVIGATION_KEYS.ORDER_SUCCESS_SCREEN}
              component={STACK_NAVIGATION_SCREENS.OrderSuccessScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name={STACK_NAVIGATION_KEYS.ORDER_FAILED_SCREEN}
              component={STACK_NAVIGATION_SCREENS.OrderFailedScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name={STACK_NAVIGATION_KEYS.PRODUCT_SCREEN}
              component={ProductScreen}
            />
            <Stack.Screen
              name={STACK_NAVIGATION_KEYS.EDIT_PROFILE}
              component={STACK_NAVIGATION_SCREENS.EditProfileScreen}
            />

            <Stack.Screen
              name={STACK_NAVIGATION_KEYS.ORDER_TRACKING_SCREEN}
              component={STACK_NAVIGATION_SCREENS.OrderTrackingScreen}
            />

            <Stack.Screen
              name={STACK_NAVIGATION_KEYS.SUPPORT_SCREEN}
              component={STACK_NAVIGATION_SCREENS.SupportScreen}
              options={{ header: () => <BackHeader label={"Support"} /> }}
            />
             <Stack.Screen
              name={STACK_NAVIGATION_KEYS.PRODUCT_SEARCH_SCREEN}
              component={STACK_NAVIGATION_SCREENS.SearchScreenProduct}
              options={{ animation:'fade_from_bottom'}}
              
            />
          </Stack.Navigator>
        </NavigationContainer>
      </>

      <FlashMessage />
    </Provider>
  );
};

export default App;
