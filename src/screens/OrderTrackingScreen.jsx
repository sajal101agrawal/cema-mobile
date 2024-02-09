import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useLayoutEffect, useMemo } from 'react'
import { useNavigation } from '@react-navigation/native';
import BackHeader from '../components/Header/BackHeader'
import BaseLayout from '../components/Container/BaseLayout'
import OrderTrackCircleComponent from '../components/Atoms/OrderTrackCircleComponent'
import { Colors, Fonts, moderateScale } from '../utils/theme';
import { orderTrackingData } from '../mock';
import { displayDateWithFormat } from '../services';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { trackMyOrder } from '../redux/actions/cart/trackMyOrder';

const OrderTrackingScreen = ({route}) => {

  const ORDER_DETAILS = route?.params?.details;
  const trackingId = ORDER_DETAILS?.orderitems[0]?.tracking_id;
  const ORDER_DATE = route.params.Date;

  // console.log("route data" ,ORDER_DETAILS)
  // console.log("trackingId" ,trackingId)

  const navigation = useNavigation();
  const dispatch = useDispatch()


  const TRACK_DATA = useSelector((state) => state.cart)

  useEffect(() => {
    dispatch(trackMyOrder({traking_id : trackingId}))
  } , [])
 
  console.log("hello" , TRACK_DATA.trakingOrder)



  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <BackHeader label={'Track your order'} />
    })
  }, [navigation]);

  const KeyValuePair = useCallback(({keyName = 'LABEL', value = 'VALUE'}) => {
    return(
      <View style={styles.keyValuePairContainer}>
        <View style={{alignItems : 'flex-start', justifyContent : 'center'}}>
          <Text style={styles.keyLabelStyle}>{keyName} :</Text>
        </View>
        <View style={{flexGrow : 1, alignItems : 'stretch', justifyContent : 'flex-end'}}>
          <View style={styles.lineStyle} />
        </View>
        <View style={{alignItems : 'flex-start', justifyContent : 'center'}}>
          <Text style={styles.valueLabelStyle}>{value}</Text>
        </View>
      </View>
    )
  },[]);

  return (
    <BaseLayout>
      <View style={{flex : 1,padding : moderateScale(10)}}>
        <KeyValuePair keyName='Your order' value={TRACK_DATA.trakingOrder?.parent_order_id} />
        <KeyValuePair keyName='Date' value={TRACK_DATA.trakingOrder?.placed_on} />
        <View style={{paddingVertical : moderateScale(10)}}>
          {orderTrackingData.map((ele, index) => {
            return(
              <View key={`${index}`} style={styles.orderDetailContainer}>
                <View style={{flex : 0.16, justifyContent : 'space-between', alignItems : 'center'}}>
                  <OrderTrackCircleComponent isCompleted={ele.isCompleted} />

                  <View style={styles.indicatorStyle} />
                </View>
                <View style={{flex : 0.84,justifyContent : 'flex-start',gap : moderateScale(3)}}>
                  <Text numberOfLines={1} style={styles.orderDetailContainerLabelStyle}>{ele.label}</Text>
                  <Text numberOfLines={2} style={styles.orderDetailContainerDescriptionStyle}>{ele.description}</Text>
                </View>
              </View>
            )
          })}
        </View>
      </View>
    </BaseLayout>
  )
}

export default OrderTrackingScreen

const styles = StyleSheet.create({
  keyValuePairContainer : {
    flexDirection : 'row',
    alignItems : 'stretch',
    padding : moderateScale(5),
    marginVertical : moderateScale(5)
  },
  keyLabelStyle : {
    fontFamily : Fonts.DM_SANS_REGULER,
    fontSize : moderateScale(14),
    color : Colors.PRIMARY_TEXT_COLOR,
    textAlign : 'left'
  },
  valueLabelStyle : {
    fontFamily : Fonts.DM_SANS_REGULER,
    fontSize : moderateScale(14),
    color : Colors.SECONDARY_COLOR,
    textAlign : 'right'
  },
  lineStyle : {
    borderBottomWidth : moderateScale(1.3),
    alignSelf : 'center',
    width : '95%',
    borderColor : Colors.BORDER_COLOR,
    borderStyle : 'dashed'
  },
  orderDetailContainer : {
    height : moderateScale(67),
    marginVertical : moderateScale(4),
    flexDirection : 'row',
    alignItems : 'stretch'
  },
  indicatorStyle : {
    flexGrow : 0.9,
    borderWidth : moderateScale(1.5),
    borderRadius : moderateScale(10),
    borderColor : Colors.BORDER_COLOR,
    borderStyle : 'dashed',
    borderCurve : 'circular'
  },
  orderDetailContainerDescriptionStyle : {
    fontFamily : Fonts.DM_SANS_REGULER,
    fontSize : moderateScale(14),
    color : Colors.PRIMARY_TEXT_COLOR,
    textAlign : 'left',
    flexGrow : 1,
    flexWrap : 'wrap'
  },
  orderDetailContainerLabelStyle : {
    fontFamily : Fonts.POPPINS_SEMI_BOLD,
    fontSize : moderateScale(14),
    color : Colors.SECONDARY_COLOR,
    textAlign : 'left',
    textTransform : 'capitalize'
  }
})