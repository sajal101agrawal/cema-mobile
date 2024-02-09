import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { memo, useCallback } from 'react';
import { moderateScale, Colors, Fonts } from '../../utils/theme';
import { ShoppingBagIcon } from '../../assets/icons';
import BaseOutlineButton from '../Buttons/BaseOutlineButton';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { STACK_NAVIGATION_KEYS } from '../../navigation/NavigationKeys';

const EmptyWishlistComponent = ({ isLoading = false }) => {

  const navigation = useNavigation()

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size={'large'} color={Colors.SECONDARY_COLOR} />
      </View>
    )
  }

  
	const handleShopNowPress = useCallback(() => {
		navigation.dispatch(CommonActions.navigate(STACK_NAVIGATION_KEYS.PRODUCT_SCREEN, { headerName : 'Products' }));
	},[])

  return (
    <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: moderateScale(15) }}>
      <View style={{ flex: 0.85, justifyContent: 'center' }}>
        <View style={styles.iconContainer}>
          <ShoppingBagIcon />
        </View>
        <View style={{ marginTop: moderateScale(15) }}>
          <Text style={{ fontFamily: Fonts.POPPINS_BOLD, fontSize: moderateScale(22), color: Colors.SECONDARY_COLOR }}>Your wishlist is empty!</Text>
        </View>
        <View>
          <Text style={{ fontFamily: Fonts.DM_SANS_REGULER, fontSize: moderateScale(16), color: Colors.PRIMARY_TEXT_COLOR, maxWidth: '65%' }}>Looks like you haven't made your order yet.</Text>
        </View>
      </View>
      <View style={{ flex: 0.15, alignItems: 'center', justifyContent: 'center' }}>
        <BaseOutlineButton onPress={handleShopNowPress} label={'SHOP NOW'} />
      </View>
    </View>
  )
}

export default memo(EmptyWishlistComponent);

const styles = StyleSheet.create({
  iconContainer: {
    width: moderateScale(70),
    height: moderateScale(70),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(35),
    borderColor: Colors.SECONDARY_COLOR,
    borderWidth: moderateScale(2)
  }
})