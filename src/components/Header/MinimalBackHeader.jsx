import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { Colors, moderateScale } from '../../utils/theme';
import BaseIconButton from '../Buttons/BaseIconButton';
import { BackIcon } from '../../assets/icons';

const MinimalBackHeader = ({navigation}) => {
    return (
        <View style={styles.container}>
            <BaseIconButton
                styles={{flex : 1,alignItems:'center',justifyContent:'center'}}
                onPress={() => navigation && navigation?.goBack()}
            >
                <BackIcon />
            </BaseIconButton>
        </View>
    )
}

export default memo(MinimalBackHeader);

const styles = StyleSheet.create({
    container: {
        height: moderateScale(40),
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        paddingHorizontal: moderateScale(15),
        backgroundColor : Colors.LIGHT_PRIMARY_COLOR
    }
})