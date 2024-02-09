import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import BaseLayout from "../../src/components/Container/BaseLayout";
import CategoryContainer from "../../src/components/Container/CategoryContainer";
import { moderateScale, Colors, Fonts, DEVICE_STYLES } from '../../src/utils/theme';
import { SEARCH_DATA } from '../../src/mock';
import FastImage from 'react-native-fast-image';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../src/redux/actions/category/fetchCategories';

const SearchScreen = () => {

    const dispatch = useDispatch();

    const categorySliceData = useSelector((state) => state.category);

    useEffect(() => {
        dispatch(fetchCategories({ page : 1 }));
    },[]);

    const categories = useMemo(() => {
        return categorySliceData ? categorySliceData?.category?.data : [];
    },[categorySliceData])

    return (
        <BaseLayout>
            <FlatList
                data={categories}
                numColumns={2}
                keyExtractor={(_, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1, paddingVertical: moderateScale(13), paddingHorizontal : moderateScale(5), alignItems : 'stretch' }}
                renderItem={({ item, index }) => <CategoryContainer item={item} index={index} key={`${index}`} />}
                accessibilityRole={'list'}
                accessible={true}
                alwaysBounceVertical={false}
                scrollEventThrottle={16}
                onEndReached={() => {
                }}
                onEndReachedThreshold={0.1}
                refreshing={false}
            />
        </BaseLayout>
    )
}
export default SearchScreen;

const styles = StyleSheet.create({});