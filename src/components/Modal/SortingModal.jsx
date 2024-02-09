import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useCallback, useEffect, useState } from 'react';
import { Colors, DEVICE_STYLES_WITH_STATUSBAR, Fonts, moderateScale } from '../../utils/theme';
import Modal from 'react-native-modal';
import RadioButton from '../Atoms/RadioButton';

const SortingModal = ({ modalVisiblity = false, handleModalVisibilty, setSelectedOption }) => {

    const [currentSelectedType , setCurrentSelectedType] = useState(null)

    const [listData,setListData] = useState([
        // {
        //     label : 'Best Match',
        //     selected : true
        // },
        {
            label : 'New Arrival',
            value : 'newarrival',
            selected : false
        },
        {
            label : 'Most Popular',
            value : 'popular',
            selected : false
        },
        {
            label : 'Newest',
            selected : false,
            value : 'newest'
        },{
            label : 'Customer rating',
            selected : false,
            value : 'customer_rating'
        },
        
    ])

    const handleRadioButtonClick = useCallback((type) => {
        handleModalVisibilty && handleModalVisibilty();
        setCurrentSelectedType(type)
      }, [currentSelectedType]);

      useEffect(() => {
       if(currentSelectedType){
        setSelectedOption(currentSelectedType)
       }
      }, [currentSelectedType])


    const ModalItemContainer = useCallback(({item, index}) => {
        return(
            <TouchableOpacity
                style={styles.modalItemContainerStyle}
                activeOpacity={0.6}
                accessibilityRole={'tab'}
                accessible={true}
                onPress={() => handleRadioButtonClick(item.value)}
            >
                <Text style={styles.labelStyle}>{item.label}</Text>
                <RadioButton isSelected={currentSelectedType == item.value} />
            </TouchableOpacity>
        )
    },[currentSelectedType]);

    return (
        <Modal
            isVisible={modalVisiblity}
            animationIn={'zoomIn'}
            animationOut={'zoomOut'}
            accessibilityRole={'tab'}
            statusBarTranslucent={true}
            deviceHeight={DEVICE_STYLES_WITH_STATUSBAR.height}
            onBackButtonPress={handleModalVisibilty}
            onBackdropPress={handleModalVisibilty}
        >
            <View style={styles.container}>
                {
                    listData.map((ele, index) => <ModalItemContainer item={ele} index={index} key={`${index}`} />)
                }
            </View>
        </Modal>
    )
}

export default memo(SortingModal);

const styles = StyleSheet.create({
    container: {
        width : '95%',
        paddingHorizontal : moderateScale(20),
        paddingVertical : moderateScale(12),
        backgroundColor: Colors.WHITE,
        alignSelf : 'center',
        borderRadius : moderateScale(5)
    },
    modalItemContainerStyle : {
        height : moderateScale(45),
        alignItems : 'center',
        justifyContent : 'space-between',
        flexDirection : 'row',
    },
    labelStyle : {
        fontFamily : Fonts.DM_SANS_REGULER,
        fontSize : moderateScale(14),
        color : Colors.SECONDARY_COLOR,
        textAlign : 'left'
    }
})