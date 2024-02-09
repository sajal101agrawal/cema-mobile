import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import BaseLayout from "../components/Container/BaseLayout";
import BaseAddress from "../components/Address/BaseAddress";
import BaseButton from "../components/Buttons/BaseButton";
import {
  CommonActions,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { STACK_NAVIGATION_KEYS } from "../navigation/NavigationKeys";
import { useDispatch, useSelector } from "react-redux";
import { getAllAddress } from "../redux/actions/address/getAllAddress";
import {  moderateScale } from "../utils/theme";
import ScreenLoaderModal from "../components/Modal/ScreenLoaderModal";
import axios from "axios";
import { API_ENPOINTS } from "../utils/api";
import { getAllBillingAddress } from "../redux/actions/address/getBillingAddress";

const BillingAddressScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const GET_BILLING_ADDRESS = useSelector(
    (state) => state.address.allBillingAddress
  );

  const [loading, setLoading] = useState(true);
  const GET_ADDRESS = useSelector((state) => state.address.allAddress);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          dispatch(getAllBillingAddress())
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      };

      fetchData();
    }, [dispatch])
  );

  return (
    <BaseLayout>
      <View style={{ flex: 1, marginTop: moderateScale(10) }}>
        <View style={{ flex: 0.85 }}>
          {loading ? (
            <ScreenLoaderModal visiable={loading} />
          ) : (
            <View style={{ marginVertical: moderateScale(8) }}>
              <BaseAddress Address_list={GET_BILLING_ADDRESS} />
            </View>
          )}
        </View>
        <View
          style={{ flex: 0.15, alignItems: "center", justifyContent: "center" }}
        >
          <BaseButton
            label={"+ Add new Address"}
            onPress={() =>
              navigation.dispatch(
                CommonActions.navigate(STACK_NAVIGATION_KEYS.ADD_NEW_ADDRESS, {
                  id: 1,
                })
              )
            }
          />
        </View>
      </View>
    </BaseLayout>
  );
};

export default BillingAddressScreen;

const styles = StyleSheet.create({});
