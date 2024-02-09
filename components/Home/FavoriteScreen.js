import React, { useEffect, useMemo } from 'react'
import { Text, View, FlatList , ActivityIndicator} from 'react-native';
import BaseLayout from "../../src/components/Container/BaseLayout";
import WishlistProductContainer from "../../src/components/Product/WishlistProductContainer";
import EmptyWishlistComponent from "../../src/components/Product/EmptyWishlistComponent";
import { Colors, moderateScale } from '../../src/utils/theme';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWishlist } from '../../src/redux/actions/wishlist/fetchWishlist'
import { useIsFocused } from '@react-navigation/native';

const FavoriteScreen = () => {

    const dispatch = useDispatch();

    const isFocused = useIsFocused()

    const wishlistSliceData = useSelector((state) => state.wishlist);

    useEffect(() => {
        dispatch(fetchWishlist());
    },[isFocused]);

    const wishlistData = useMemo(() => wishlistSliceData.wishlist,[wishlistSliceData]);

    if(wishlistSliceData.dataFetching) {
        return (
            <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:Colors.TRANSPARENT}}>
                <ActivityIndicator size={'large'} color={Colors.PRIMARY_TEXT_COLOR}/>
            </View>
        )
    }

    return (
        <BaseLayout>
            <FlatList
                data={wishlistData}
                keyExtractor={(_, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1, paddingVertical : moderateScale(13)}}
                ItemSeparatorComponent={() => <View style={{ margin: moderateScale(5) }} />}
                renderItem={({ item, index }) => <WishlistProductContainer item={item} index={index} key={`${index}`} />}
                ListEmptyComponent={() => <EmptyWishlistComponent />}
                accessibilityRole={'list'}
                accessible={true}
                alwaysBounceVertical={false}
                scrollEventThrottle={16}
                refreshing={false}
                onRefresh={() => dispatch(fetchWishlist())}
            />
        </BaseLayout>
    )
}

export default FavoriteScreen