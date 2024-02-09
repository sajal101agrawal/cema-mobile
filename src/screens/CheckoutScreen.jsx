import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useMemo, useState, useEffect } from "react";
import BaseLayout from "../components/Container/BaseLayout";
import { ScrollView } from "react-native";
import { Colors, Fonts, moderateScale } from "../utils/theme";
import BaseDevider from "../components/Atoms/BaseDevider";
import { CheckBoxIcon, LocationIcon, PaymentIcon, RightIcon } from "../assets/icons";
import { TouchableOpacity } from "react-native";
import BaseTextinputComponent from "../components/Textinput/BaseTextinputComponent";
import BaseButton from "../components/Buttons/BaseButton";
import EmptyPromocodeComponent from "../components/Promocode/EmptyPromocodeComponent";
import AddressModal from "../components/Modal/AddressModal";
import PaymentModal from "../components/Modal/PaymentModal";
import {
  CommonActions,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { STACK_NAVIGATION_KEYS } from "../navigation/NavigationKeys";
import { useSelector, useDispatch } from "react-redux";
import { displayAbsoluteAmount, triggerToastMessage } from "../services";
import { getAllAddress } from "../redux/actions/address/getAllAddress";
import { getAllBillingAddress } from "../redux/actions/address/getBillingAddress";
import BillingAddressModal from "../components/Modal/BillingAddressModal";
import { fetchCheckout } from "../redux/actions/cart/checkout";

const CheckoutScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const GRAND_TOTAL = route?.params?.grand_total;

  const isFocused = useIsFocused();

  const [filterModalVisiable, setFilterModalVisiable] = useState(false);
  const [addressModalVisiable, setAddressModalVisiable] = useState(false);
  const [paymentModalVisiable, setPaymentModalVisiable] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [billingAddressId, setBillingAddressId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  console.log("id", selectedAddressId);
  console.log("id>>>>>>>>>>>", billingAddressId);

  const cartSliceDetails = useSelector((state) => state.cart);
  const GET_ADDRESS = useSelector((state) => state.address.allAddress);
  const GET_BILLING_ADDRESS = useSelector(
    (state) => state.address.allBillingAddress
  );

  useEffect(() => {
    dispatch(getAllAddress());
  }, [isFocused]);

  useEffect(() => {
    dispatch(getAllBillingAddress());
  }, [isFocused]);

  const toggleChecked = useCallback(() => {
    setChecked(!checked);
  }, [checked]);

  const SHIPPING_ADDRESS = useMemo(() => {
    return GET_ADDRESS.map((item, index) => ({ ...item, selected: false }));
  }, [GET_ADDRESS]);

  const BILLING_ADDRESS = useMemo(() => {
    return GET_BILLING_ADDRESS.map((item, index) => ({
      ...item,
      selected: false,
    }));
  }, [GET_BILLING_ADDRESS]);

  console.log(
    GRAND_TOTAL,
    selectedAddressId?.selectedId,
    billingAddressId?.selectedId
  );

  const handleCheckout = useCallback(() => {
    setIsLoading(true);

    if (selectedAddressId === null || billingAddressId === null) {
      triggerToastMessage({
        type: "warning",
        message: "Please select Address",
      });
      setIsLoading(false);
    } else {
      dispatch(
        fetchCheckout({
          grand_total: GRAND_TOTAL,
          shipping_id: selectedAddressId?.selectedId,
          billing_id: billingAddressId?.selectedId,
          navigation: navigation,
          dis: dispatch,
        })
      ).finally(() => {
        setIsLoading(false);
      });
    }
  }, [GRAND_TOTAL, selectedAddressId, billingAddressId]);

  const isButtonDisabled =
    selectedAddressId === null || billingAddressId === null;

  const toggleAddressModal = useCallback(
    () => setFilterModalVisiable(!filterModalVisiable),
    [filterModalVisiable]
  );

  const toggleBillingAddressModal = useCallback(
    () => setAddressModalVisiable(!addressModalVisiable),
    [addressModalVisiable]
  );

  const togglePaymentModal = useCallback(
    () => setPaymentModalVisiable(!paymentModalVisiable),
    [paymentModalVisiable]
  );

  const CART_PRODUCT_ARR = useMemo(() => {
    const productArr = cartSliceDetails?.cart?.data?.map((ele, index) =>
      ele.variant ? ele.variant : ele.simple_product
    );

    return productArr;
  }, [cartSliceDetails.cart]);

  const CART_PRODUCT_ARR1 = useMemo(
    () => cartSliceDetails.cart?.data,
    [cartSliceDetails]
  );

  const MY_CART_PRODUCTS = useMemo(() => {
    return CART_PRODUCT_ARR1.map((ele, index) => {
      const PRICE =
        ele.simple_product === null ? ele?.product_price : ele?.product_price;
      return (
        <View
          key={`${index}`}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Text
            style={{
              fontSize: moderateScale(14),
              fontFamily: Fonts.DM_SANS_REGULER,
              color: Colors.PRIMARY_TEXT_COLOR,
              textAlign: "left",
              textTransform: "capitalize",
              width: "70%",
            }}
          >
            {ele?.product?.name?.en}
          </Text>
          <Text
            style={{
              fontSize: moderateScale(14),
              fontFamily: Fonts.DM_SANS_REGULER,
              color: Colors.PRIMARY_TEXT_COLOR,
            }}
          >
            {ele.qty} × KD {displayAbsoluteAmount(PRICE)}
          </Text>
        </View>
      );
    });
  }, [CART_PRODUCT_ARR]);

  return (
    <BaseLayout>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.containBox}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: moderateScale(18),
                fontFamily: Fonts.POPPINS_SEMI_BOLD,
                color: Colors.SECONDARY_COLOR,
              }}
            >
              My Order
            </Text>
            <Text
              style={{
                fontSize: moderateScale(18),
                fontFamily: Fonts.POPPINS_SEMI_BOLD,
                color: Colors.SECONDARY_COLOR,
              }}
            >
              KD {GRAND_TOTAL}
            </Text>
          </View>
          <BaseDevider marginVertical={moderateScale(10)} />
          <View style={{ width: "100%", gap: moderateScale(10) }}>
            {MY_CART_PRODUCTS}
          </View>
        </View>
        <View style={styles.shippingDetailsStyle}>
          <TouchableOpacity
            onPress={toggleAddressModal}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: moderateScale(15),
            }}
          >
            <View style={{ gap: moderateScale(10) }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: moderateScale(5),
                }}
              >
                <LocationIcon />
                <Text
                  style={{
                    fontSize: moderateScale(14),
                    fontFamily: Fonts.POPPINS_SEMI_BOLD,
                    color: Colors.SECONDARY_COLOR,
                  }}
                >
                  Shipping Details
                </Text>
              </View>
              <Text
                style={{
                  fontSize: moderateScale(12),
                  fontFamily: Fonts.DM_SANS_REGULER,
                  color: Colors.PRIMARY_TEXT_COLOR,
                }}
              >
                {selectedAddressId?.selectedAddress || "Select Address"}
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <RightIcon />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
        {/* <View
          style={{ alignSelf: "center", width: "93%", flexDirection: "row" }}
        >
          <TouchableOpacity
            onPress={toggleChecked}
            activeOpacity={0.8}
            accessibilityRole="button"
            style={{
              borderWidth: 1,
              height: moderateScale(20),
              width: moderateScale(20),
              borderWidth: 1,
              borderColor: Colors.BORDER_COLOR,
              borderRadius: moderateScale(3),
            }}
          >
            {checked && <CheckBoxIcon />}
          </TouchableOpacity>
          <Text
            style={{
              color: Colors.SECONDARY_COLOR,
              marginLeft: moderateScale(5),
              fontSize: moderateScale(13),
              fontFamily: Fonts.POPPINS_SEMI_BOLD,
            }}
          >
            Same as shipping details
          </Text>
        </View> */}
        <View style={styles.shippingDetailsStyle}>
          <TouchableOpacity
            onPress={toggleBillingAddressModal}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: moderateScale(15),
            }}
          >
            <View style={{ gap: moderateScale(10) }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: moderateScale(5),
                }}
              >
                <LocationIcon />
                <Text
                  style={{
                    fontSize: moderateScale(14),
                    fontFamily: Fonts.POPPINS_SEMI_BOLD,
                    color: Colors.SECONDARY_COLOR,
                  }}
                >
                  Billing Details
                </Text>
              </View>
              <Text
                style={{
                  fontSize: moderateScale(12),
                  fontFamily: Fonts.DM_SANS_REGULER,
                  color: Colors.PRIMARY_TEXT_COLOR,
                }}
              >
                {billingAddressId?.selectedAddress || "Select Address"}
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <RightIcon />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity
          onPress={toggleChecked}
          style={{
            height: moderateScale(20),
            width: moderateScale(20),
            borderWidth: 1,
            marginLeft:'5%'
          }}
        /> */}
        {/* <View style={styles.shippingDetailsStyle}>
          <TouchableOpacity
            onPress={togglePaymentModal}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: moderateScale(15),
            }}
          >
            <View style={{ gap: moderateScale(10) }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: moderateScale(8),
                }}
              >
                <PaymentIcon />
                <Text
                  style={{
                    fontSize: moderateScale(14),
                    fontFamily: Fonts.POPPINS_SEMI_BOLD,
                    color: Colors.SECONDARY_COLOR,
                  }}
                >
                  Payment Method
                </Text>
              </View>
              <Text
                style={{
                  fontSize: moderateScale(12),
                  fontFamily: Fonts.DM_SANS_REGULER,
                  color: Colors.PRIMARY_TEXT_COLOR,
                }}
              >
                **** 4864
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <RightIcon />
            </TouchableOpacity>
          </TouchableOpacity>
        </View> */}
        <View
          style={{
            width: "92%",
            alignSelf: "center",
            marginVertical: moderateScale(10),
          }}
        >
          <BaseTextinputComponent
            label={"COMMENT"}
            placeholder={"Enter your Comment"}
            multiline={true}
            externelStyle={{ height: moderateScale(120) }}
          />
        </View>
        <View
          style={{
            width: "100%",
            marginTop: moderateScale(80),
            marginBottom: moderateScale(15),
          }}
        >
          {isLoading && (
            <ActivityIndicator
              size="large"
              color={Colors.PRIMARY_TEXT_COLOR}
              style={{ marginBottom: 10 }}
            />
          )}
          <BaseButton
            label={"CONFIRM ORDER"}
            onPress={() => handleCheckout()}
          />
        </View>
        <AddressModal
          key={"shippin-address-modal"}
          modalVisiblity={filterModalVisiable}
          handleModalVisibilty={toggleAddressModal}
          Address_list={SHIPPING_ADDRESS}
          onAddressSelect={setSelectedAddressId}
          toggleAddressModal={toggleAddressModal}
          navigation={navigation}
        />
        <BillingAddressModal
          key={"address-modal"}
          modalVisiblity={addressModalVisiable}
          handleModalVisibilty={toggleBillingAddressModal}
          Address_list={BILLING_ADDRESS}
          AddressSelectId={setBillingAddressId}
          toggleBillingAddressModal={toggleBillingAddressModal}
          navigation={navigation}
        />
        <PaymentModal
          key={"payment-modal"}
          modalVisiblity={paymentModalVisiable}
          handleModalVisibilty={togglePaymentModal}
        />
      </ScrollView>
    </BaseLayout>
  );
};

export default CheckoutScreen;
const styles = StyleSheet.create({
  containBox: {
    width: "92%",
    alignSelf: "center",
    backgroundColor: "rgba(219, 233, 245, 0.15)",
    marginVertical: moderateScale(10),
    borderWidth: 1,
    borderColor: Colors.BORDER_COLOR,
    borderRadius: moderateScale(5),
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(12),
  },
  shippingDetailsStyle: {
    width: "93%",
    height: moderateScale(85),
    alignSelf: "center",
    borderWidth: 1,
    borderColor: Colors.BORDER_COLOR,
    borderTopLeftRadius: moderateScale(5),
    borderBottomLeftRadius: moderateScale(5),
    marginVertical: moderateScale(10),
  },
});
