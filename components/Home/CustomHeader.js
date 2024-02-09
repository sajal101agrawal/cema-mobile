import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import your icon library of choice
import { useNavigation } from '@react-navigation/native';

CustomHeader = () => {
    const navigation = useNavigation();

    const handleMenuPress = () => {
    }

    const handleShoppingCartPress = () => {
        navigation.navigate('ShoppingCart');
    }

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

        </View>
    );
}

export default CustomHeader;
