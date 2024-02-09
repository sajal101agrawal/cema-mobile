import { ActivityIndicator, Modal, View } from 'react-native'
import React, { memo } from 'react';
import { Colors } from '../../utils/theme';

const ScreenLoaderModal = ({ visiable = false }) => {
    return (
        <Modal
            visible={visiable}
            animationType={'fade'}
            statusBarTranslucent={true}
            transparent={true}
        >
            <View style={{flex : 1, alignItems:'center', justifyContent: 'center',backgroundColor:'rgba(1,1,1,0.5)'}}>
                <ActivityIndicator
                    size={'large'}
                    color={Colors.WHITE}
                />
            </View>
        </Modal>
    )
}

export default memo(ScreenLoaderModal);