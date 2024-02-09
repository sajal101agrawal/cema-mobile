import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import React, { useCallback, memo, useState, useMemo } from "react";
import { Colors, Fonts, moderateScale } from "../../utils/theme";
import { displayAbsoluteAmount, displayDateWithFormat } from "../../services";
import Collapsible from "react-native-collapsible";
import ShippingComponent from "../Collapse/ShippingComponent";
import DeliveredComponent from "../Collapse/DeliveredComponent";

const OrderListContainerComponent = ({ item, index }) => {

    const [isCollapsed, setIsCollasped] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

   console.log("Manishhhhh>>>>>", item)


    const STATUS_COLOR = useMemo(() => {
        switch (item?.order_status) {
            case "pending":
                return "#FFA462";
            case "Delivered":
                return "#00824B";
            case "Canceled":
                return "#F84C6B";
            default:
                return "black";
        }
    }, [item.order_status]);

    const COLLAPSABLE_VIEW = useMemo(() => {
        switch (item.order_status) {
            case "pending":
                return <ShippingComponent orderID={item.id} orderDate={item.order_date} readyToFetch={!isCollapsed} />;
            case "Delivered":
                return <DeliveredComponent orderID={item.id} orderDate={item.order_date} readyToFetch={!isCollapsed} />;
            default:
                return null;
        }
    }, [item.order_status, item.id, ShippingComponent, DeliveredComponent, isCollapsed]);

    const toggleCollapse = useCallback(() => setIsCollasped(!isCollapsed), [isCollapsed]);

    return (
      <>
        <TouchableOpacity
          activeOpacity={0.8}
          accessibilityRole={"tab"}
          accessible={true}
          onPress={toggleCollapse}
        >
          <View
            style={[
              styles.container,
              { flexDirection: "row", alignItems: "stretch" },
            ]}
          >
            <View
              style={{
                justifyContent: "space-evenly",
                flex: 0.5,
                alignItems: "flex-start",
              }}
            >
              <Text
                style={{
                  fontSize: moderateScale(14),
                  color: Colors.SECONDARY_COLOR,
                  fontFamily: Fonts.DM_SANS_BOLD,
                }}
              >
                {item.order_id}
              </Text>
              {/* <Text
                style={{
                  fontSize: moderateScale(12),
                  color: STATUS_COLOR,
                  fontFamily: Fonts.DM_SANS_REGULER,
                  textTransform: "capitalize",
                }}
              >
                {item.order_status}
              </Text> */}
              
            </View>

            <View
              style={{
                justifyContent: "space-evenly",
                flex: 0.5,
                alignItems: "flex-end",
                marginHorizontal: moderateScale(15),
              }}
            >
              <Text
                style={{
                  fontSize: moderateScale(14),
                  color: Colors.SECONDARY_COLOR,
                  fontFamily: Fonts.DM_SANS_BOLD,
                  textTransform: "uppercase",
                }}
              >
                {item.currency} {displayAbsoluteAmount(item.grand_total)}
              </Text>
              <Text
                style={{
                  fontSize: moderateScale(12),
                  color: Colors.PRIMARY_TEXT_COLOR,
                  fontFamily: Fonts.DM_SANS_REGULER,
                  textAlign: "center",
                }}
              >
                {displayDateWithFormat(item.order_date)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <Collapsible collapsed={isCollapsed}>{COLLAPSABLE_VIEW}</Collapsible>
      </>
    );
}

export default memo(OrderListContainerComponent);

const styles = StyleSheet.create({
    container: {
        height: moderateScale(70),
        borderTopWidth: moderateScale(1),
        borderColor: Colors.BORDER_COLOR,
        width: "94%",
        alignSelf: "flex-end",
    },
});
