import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import BaseLayout from "../components/Container/BaseLayout";
import BaseAddress from "../components/Address/BaseAddress";
import BaseButton from "../components/Buttons/BaseButton";
import { CommonActions, useFocusEffect, useNavigation } from "@react-navigation/native";
import { STACK_NAVIGATION_KEYS } from "../navigation/NavigationKeys";
import { useDispatch, useSelector } from "react-redux";
import { getAllAddress } from "../redux/actions/address/getAllAddress";
import { Colors, moderateScale } from "../utils/theme";
import ScreenLoaderModal from "../components/Modal/ScreenLoaderModal";

const MyAddressScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const GET_ADDRESS = useSelector((state) => state.address.allAddress);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          await dispatch(getAllAddress());
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
            <ScreenLoaderModal visiable={loading}/>
          ) : (
            <View style={{ marginVertical: moderateScale(8) }}>
              <BaseAddress Address_list={GET_ADDRESS} />
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
                CommonActions.navigate(
                  STACK_NAVIGATION_KEYS.ADD_NEW_ADDRESS, {id:0}
                )
              )
            }
          />
        </View>
      </View>
    </BaseLayout>
  );
};

export default MyAddressScreen;

const styles = StyleSheet.create({});
