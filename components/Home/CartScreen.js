import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Text, View, FlatList, StyleSheet, KeyboardAvoidingView } from 'react-native';
import BaseLayout from "../../src/components/Container/BaseLayout";
import CartProductContainer from "../../src/components/Cart/CartProductContainer";
import EmptyCartComponent from "../../src/components/Cart/EmptyCartComponent";
import { moderateScale, Colors, Fonts } from '../../src/utils/theme';
import BaseTextinputComponent from '../../src/components/Textinput/BaseTextinputComponent';
import BaseButton from '../../src/components/Buttons/BaseButton';
import BaseDevider from '../../src/components/Atoms/BaseDevider';
import BaseOutlineButton from '../../src/components/Buttons/BaseOutlineButton';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { STACK_NAVIGATION_KEYS } from '../../src/navigation/NavigationKeys';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../../src/redux/actions/cart/fetchCart'
import { fetchpromoCodes } from '../../src/redux/actions/promocodes';
import { triggerToastMessage } from '../../src/services';
import CartListBottomContainer from '../../src/components/Cart/CartListBottomContainer';

const CartScreen = () => {
    
    const navigation = useNavigation()
    const dispatch = useDispatch();

    const cartSliceData = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(fetchCart())
    }, []);

    const CART_PRODUCT_ARR = useMemo(() => cartSliceData.cart?.data, [cartSliceData])

    return (
        <BaseLayout>
            <FlatList
                data={CART_PRODUCT_ARR}
                keyExtractor={(_, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1, paddingVertical: moderateScale(13) }}
                ItemSeparatorComponent={() => <View style={{ margin: moderateScale(5) }} />}
                ListEmptyComponent={() => <EmptyCartComponent isLoading={cartSliceData?.cartDataFetching} />}
                ListFooterComponent={() => (CART_PRODUCT_ARR?.length == 0) ? null : <CartListBottomContainer />}
                renderItem={({ item, index }) => <CartProductContainer item={item} index={index} key={`${index}`} />}
                accessibilityRole={'list'}
                accessible={true}
                keyboardDismissMode={'interactive'}
                keyboardShouldPersistTaps={'never'}
                alwaysBounceVertical={false}
                scrollEventThrottle={16}
                refreshing={cartSliceData?.cartDataFetching}
                onRefresh={() => dispatch(fetchCart())}
            />
        </BaseLayout>
    )
}
export default CartScreen;

const styles = StyleSheet.create({
    listBottomContainer: {
        paddingRight: moderateScale(10),
        paddingLeft: moderateScale(13),
        marginTop: moderateScale(30)
    },
    innerContainer: {
        height: moderateScale(150),
        backgroundColor: Colors.SECONDARY_DEFAULT_BACKGROUND_COLOR,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        borderRadius: moderateScale(5),
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateScale(13),
        marginTop: moderateScale(50)
    }
});