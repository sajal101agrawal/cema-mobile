import { StyleSheet, Text, View, Share, TouchableOpacity, TouchableHighlight, StatusBar } from 'react-native';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Colors, Fonts, moderateScale } from '../../utils/theme';
import { CloseIcon, RightChevronIcon, NotificationIcon, SupportIcon } from '../../assets/icons';
import FastImage from 'react-native-fast-image';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import BaseIconButton from '../Buttons/BaseIconButton';
import { DRAWER_ROUTE_DATA } from '../../mock';
import { BOTTOM_NAVIGATION_KEYS, STACK_NAVIGATION_KEYS } from '../../navigation/NavigationKeys'
import { useSelector } from 'react-redux';

const PROFILE_LINK = 'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const CustomDrawerContent = (props) => {

	const navigation = useNavigation();
	const authSliceDetails = useSelector((state) => state.auth);

	const handleNavigationClick = useCallback((label) => {
		navigation.dispatch(DrawerActions.closeDrawer());

		if(label == 'Categories') {
			navigation.navigate(BOTTOM_NAVIGATION_KEYS.SEARCH);
			return;
		}
		navigation.navigate(STACK_NAVIGATION_KEYS.PRODUCT_SCREEN, { headerName : label });
	},[])

	const handleNotificationNavigate = useCallback(() => {
		navigation.dispatch(DrawerActions.closeDrawer());
		navigation.navigate(STACK_NAVIGATION_KEYS.NOTIFICATION_SCREEN);
	},[]);

	const handleSupportNavigate = useCallback(() => {
		navigation.dispatch(DrawerActions.closeDrawer());
		navigation.navigate(STACK_NAVIGATION_KEYS.SUPPORT_SCREEN);
	},[]);

	const SCREEN_ROUTES = useMemo(() => {
		return (
			(DRAWER_ROUTE_DATA.map((ele, index) => {
				return (
					<TouchableOpacity 
						activeOpacity={0.8}
						accessibilityRole={'button'}
						accessible={true}
						onPress={() => handleNavigationClick(ele.label)}
						key={`${index}`}
						style={styles.routeContainer}
					>
						<RightChevronIcon />
						<Text style={styles.routeLabelStyle}>{ele.label}</Text>
						{/* {(ele.subLabel) && <Text style={{ fontFamily: Fonts.POPPINS_REGULAR, fontSize: moderateScale(10), color: Colors.PRIMARY_TEXT_COLOR, marginLeft: moderateScale(5), top: moderateScale(2.6) }}>{ele.subLabel}</Text>} */}
					</TouchableOpacity>
				)
			}))
		)
	}, [DRAWER_ROUTE_DATA,handleNavigationClick]);

	const userDetails = useMemo(() => authSliceDetails.userDetails,[authSliceDetails]);

	return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: Colors.WHITE, flexGrow: 1 }}
      >
        <View style={styles.headerPartStyle}>
          <BaseIconButton onPress={() => props.navigation.closeDrawer()}>
            <CloseIcon height={moderateScale(35)} width={moderateScale(35)} />
          </BaseIconButton>
        </View>
        <View style={styles.profileContainer}>
          <View
            style={{
              flex: 0.28,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={styles.imageContainer}>
              <FastImage
                source={{
                  uri:
                    !userDetails?.profile_picture.includes(".jpg") &&
                    !userDetails?.profile_picture.includes(".png") &&
                    !userDetails?.profile_picture.includes(".jpeg")
                      ? `${userDetails?.profile_picture}.png`
                      : userDetails?.profile_picture,
                  priority: FastImage.priority.high,
                  cache: FastImage.cacheControl.cacheOnly,
                }}
                fallback={true}
                resizeMode={"cover"}
                style={{
                  height: "100%",
                  width: "100%",
                }}
              />
            </View>
          </View>
          <View style={{ flex: 0.72, justifyContent: "center" }}>
            <Text
              style={{
                fontFamily: Fonts.POPPINS_SEMI_BOLD,
                fontSize: moderateScale(14),
                color: Colors.SECONDARY_COLOR,
                textAlign: "left",
              }}
            >
              {userDetails?.name}
            </Text>
            <Text
              style={{
                fontFamily: Fonts.DM_SANS_REGULER,
                fontSize: moderateScale(14),
                color: Colors.PRIMARY_TEXT_COLOR,
                textAlign: "left",
              }}
            >
              {userDetails?.email}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            paddingTop: moderateScale(15),
            paddingLeft: moderateScale(25),
          }}
        >
          {SCREEN_ROUTES}
        </View>
        <View
          style={{
            width: "100%",
            paddingTop: moderateScale(15),
            paddingLeft: moderateScale(25),
            gap: moderateScale(15),
          }}
        >
          <TouchableOpacity
            activeOpacity={0.78}
            accessibilityRole={"button"}
            accessible={true}
            pressRetentionOffset={200}
            style={styles.buttonContainer}
            onPress={handleNotificationNavigate}
          >
            <View
              style={{
                flex: 0.13,
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <NotificationIcon />
            </View>
            <View
              style={{
                flex: 0.87,
                justifyContent: "center",
                paddingLeft: moderateScale(13),
              }}
            >
              <Text style={styles.buttonContainerText}>Notifications</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.78}
            accessibilityRole={"button"}
            accessible={true}
            pressRetentionOffset={200}
            style={styles.buttonContainer}
            onPress={handleSupportNavigate}
          >
            <View
              style={{
                flex: 0.13,
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <SupportIcon />
            </View>
            <View
              style={{
                flex: 0.87,
                justifyContent: "center",
                paddingLeft: moderateScale(13),
              }}
            >
              <Text style={styles.buttonContainerText}>Support</Text>
            </View>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

export default memo(CustomDrawerContent);

const styles = StyleSheet.create({
	imageContainer: {
		width: moderateScale(60),
		height: moderateScale(60),
		backgroundColor: '#fff',
		borderRadius: moderateScale(30),
		backgroundColor: Colors.SECONDARY_COLOR,
		overflow: 'hidden'
	},
	headerPartStyle: {
		width: '100%',
		height: moderateScale(68),
		alignItems: 'flex-end',
		justifyContent: 'flex-start',
		padding: moderateScale(8),
		paddingTop : 0
	},
	profileContainer: {
		width: '100%',
		height: moderateScale(80),
		flexDirection: 'row',
		alignItems: 'stretch',
		borderWidth: 1,
		borderColor: Colors.BORDER_COLOR
	},
	routeContainer: {
		width: '100%',
		height: moderateScale(45),
		flexDirection: 'row',
		alignItems: 'center',
		overflow : 'hidden'
	},
	routeLabelStyle: {
		fontFamily: Fonts.DM_SANS_REGULER,
		fontSize: moderateScale(14),
		color: Colors.SECONDARY_COLOR,
		textAlign: 'left',
		marginLeft: moderateScale(8)
	},
	buttonContainer: {
		height: moderateScale(55),
		backgroundColor: Colors.WHITE,
		borderWidth: 1,
		borderColor: Colors.BORDER_COLOR,
		flexDirection: 'row',
		alignItems: 'stretch'
	},
	buttonContainerText: {
		fontFamily: Fonts.DM_SANS_REGULER,
		fontSize: moderateScale(16),
		color: Colors.SECONDARY_COLOR,
		textAlign: 'left',
	},
	notificationBadgeContainer : {
		width : moderateScale(16),
		height : moderateScale(16),
		borderRadius : moderateScale(20),
		alignItems : 'center',
		justifyContent : 'center',
		backgroundColor : '#F84C6B',
		position : 'absolute',
		alignSelf : 'center',
		right : moderateScale(20)
	},
	notificationBadgeContainerText : {
		fontFamily : Fonts.DM_SANS_BOLD,
		fontSize : moderateScale(8),
		color : Colors.WHITE
	}
})