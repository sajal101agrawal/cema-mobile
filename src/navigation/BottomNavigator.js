import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BOTTOM_NAVIGATION_SCREENS } from './Routes';
import { BOTTOM_NAVIGATION_KEYS } from './NavigationKeys';
import { HomeFocusedIcon, HomeUnfocusedIcon, SearchFocusedIcon, SearchUnfocusedIcon, CartUnfocusedIcon, CartFocusedIcon, HeartUnfocusedIcon, HeartFocusedIcon, ProfileFocusedIcon, ProfileUnfocusedIcon } from '../assets/icons';
import BaseHeader from '../components/Header/BaseHeader';
import CustomTabBar from '../components/Navigation/CustomTabBar';
import { Colors, moderateScale } from '../utils/theme';
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';
import SearchHeader from '../components/Header/SearchHeader';

const BottomTab = createBottomTabNavigator();

const BottomNavigator = ({ navigation }) => {

	const TabtabBarButton = useCallback(({ onPress, label, accessibilityState, unfocusedIcon, focusedIcon }) => {

		const isFocused = accessibilityState.selected;
		const Icon = isFocused ? focusedIcon : unfocusedIcon;

		return (
			<TouchableOpacity
				accessibilityRole={'tab'}
				activeOpacity={0.8}
				style={styles.tabBarButtonContainer}
				onPress={onPress}
			>
				<Icon />

				{
					isFocused &&
					<Animated.View entering={ZoomIn} exiting={ZoomOut} style={{ position: 'absolute', zIndex: -1000, height : '100%', width : '100%', alignItems : 'center', justifyContent : 'center' }}>
						<View style={styles.buttonCircleContainer} />
						<View style={styles.circleLine} />
					</Animated.View>
				}
			</TouchableOpacity>
		)
	}, []);


	return (
		<BottomTab.Navigator
			initialRouteName="Home"
			screenOptions={{
				tabBarHideOnKeyboard: true,
				tabBarShowLabel: false,
				tabBarStyle: {
					height: 55,
					backgroundColor: '#fff',
					borderTopColor: '#fff',
					borderTopWidth: 1
				}
			}}
			tabBar={(props) => <CustomTabBar {...props} />}
		>
			<BottomTab.Screen
				name={BOTTOM_NAVIGATION_KEYS.HOME}
				component={BOTTOM_NAVIGATION_SCREENS.HomeScreen}
				options={{
					tabBarButton: (props) => <TabtabBarButton {...props} label={'Help'} focusedIcon={() => <HomeFocusedIcon height={moderateScale(23)} width={moderateScale(23)} />} unfocusedIcon={() => <HomeUnfocusedIcon height={moderateScale(24)} width={moderateScale(24)} />} />,
					header: () => <BaseHeader navigation={navigation} label={'Home'} />
				}}
			/>
			<BottomTab.Screen
				name={BOTTOM_NAVIGATION_KEYS.SEARCH}
				component={BOTTOM_NAVIGATION_SCREENS.SearchScreen}
				options={{
					tabBarButton: (props) => <TabtabBarButton {...props} label={'Help'} focusedIcon={() => <SearchFocusedIcon height={moderateScale(24)} width={moderateScale(24)} />} unfocusedIcon={() => <SearchUnfocusedIcon height={moderateScale(24)} width={moderateScale(24)} />} />,
					header: () => <BaseHeader navigation={navigation} label={''} />
				}}
			/>
			<BottomTab.Screen
				name={BOTTOM_NAVIGATION_KEYS.CART}
				component={BOTTOM_NAVIGATION_SCREENS.CartScreen}
				options={{
					tabBarButton: (props) => <TabtabBarButton {...props} label={'Help'} focusedIcon={() => <CartFocusedIcon height={moderateScale(24)} width={moderateScale(24)} />} unfocusedIcon={() => <CartUnfocusedIcon height={moderateScale(24)} width={moderateScale(24)} />} />,
					header: () => <BaseHeader navigation={navigation} label={'My Cart'} />
				}}
			/>
			<BottomTab.Screen
				name={BOTTOM_NAVIGATION_KEYS.FAVORITE}
				component={BOTTOM_NAVIGATION_SCREENS.FavoriteScreen}
				options={{
					tabBarButton: (props) => <TabtabBarButton {...props} label={'Help'} focusedIcon={() => <HeartFocusedIcon height={moderateScale(24)} width={moderateScale(24)} />} unfocusedIcon={() => <HeartUnfocusedIcon height={moderateScale(24)} width={moderateScale(24)} />} />,
					header: () => <BaseHeader navigation={navigation} label={'Wishlist'} />
				}}
			/>
			<BottomTab.Screen
				name={BOTTOM_NAVIGATION_KEYS.PROFILE}
				component={BOTTOM_NAVIGATION_SCREENS.ProfileScreen}
				options={{
					tabBarButton: (props) => <TabtabBarButton {...props} label={'Help'} focusedIcon={() => <ProfileFocusedIcon height={moderateScale(24)} width={moderateScale(24)} />} unfocusedIcon={() => <ProfileUnfocusedIcon height={moderateScale(24)} width={moderateScale(24)} />} />,
					header: () => <BaseHeader navigation={navigation} label={'My Profile'} />
				}}
			/>
		</BottomTab.Navigator>
	)
}

export default BottomNavigator

const styles = StyleSheet.create({
	tabBarButtonContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'stretch',
	},
	buttonCircleContainer: {
		width: moderateScale(50),
		height: moderateScale(50),
		borderRadius: moderateScale(25),
		backgroundColor: Colors.WHITE,
		alignItems: 'center'
	},
	circleLine : {
		width : moderateScale(6),
		height : moderateScale(12),
		backgroundColor : Colors.WHITE,
		position : 'absolute',
		top : 0
	}
})