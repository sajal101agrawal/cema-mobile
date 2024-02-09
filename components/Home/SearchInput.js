import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TextInput } from 'react-native';

const SearchInput = () => {

    const [searchText, setSearchText] = useState('');
    const navigation = useNavigation();

    const handleSearch = () => {
        navigation.navigate('SearchResults', { searchText });
    };

    return (
        <TextInput
            placeholder="Search..."
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
            onSubmitEditing={handleSearch}
        />
    );
}
export default SearchInput