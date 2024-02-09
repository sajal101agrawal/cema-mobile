import HomeScreen from "../../components/Home/HomeScreen";
import SearchScreen from "../../components/Home/SearchScreen";
import CartScreen from "../../components/Home/CartScreen";
import FavoriteScreen from "../../components/Home/FavoriteScreen";
import ProfileScreen from "../../components/Home/ProfileScreen";
import ProductScreen from "../screens/ProductScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import PaymentMethodScreen from "../screens/PaymentMethodScreen";
import BottomNavigator from "./BottomNavigator";
import NotificationScreen from "../screens/NotificationScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import DescriptionScreen from "../screens/DescriptionScreen";
import MyAddressScreen from "../screens/MyAddressScreen";
import OrderDetailsScreen from "../screens/OrderDetailsScreen";
import PromoCodesScreen from "../screens/PromoCodesScreen";
import RatingScreen from "../screens/RatingScreen";
import ReviewScreen from "../screens/ReviewScreen";
import OrderSuccessScreen from "../screens/OrderSuccessScreen";
import AddNewAddresScreen from "../screens/AddNewAddresScreen";
import AddNewCardScreen from "../screens/AddNewCardScreen";
import OrderFailedScreen from "../screens/OrderFailedScreen";
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from "../../components/Onboarding";
import OrderTrackingScreen from '../screens/OrderTrackingScreen';
import SupportScreen from '../screens/SupportScreen';
import SearchScreenProduct from '../screens/ProductSearchScreen';
import BillingAddressScreen from "../screens/BillingAddressScreen";

export const BOTTOM_NAVIGATION_SCREENS = {
  HomeScreen,
  SearchScreen,
  CartScreen,
  FavoriteScreen,
  ProfileScreen,
};

export const DRAWER_NAVIGATION_SCREENS = {
  BottomNavigator,
};

export const STACK_NAVIGATION_SCREENS = {
  ProductScreen,
  ProductDetailScreen,
  EditProfileScreen,
  PaymentMethodScreen,
  NotificationScreen,
  CheckoutScreen,
  DescriptionScreen,
  MyAddressScreen,
  OrderDetailsScreen,
  PromoCodesScreen,
  RatingScreen,
  ReviewScreen,
  OrderSuccessScreen,
  AddNewAddresScreen,
  AddNewCardScreen,
  OrderFailedScreen,
  ProductDetailScreen,
  EditProfileScreen,
  PaymentMethodScreen,
  SplashScreen,
  OnboardingScreen,
  OrderTrackingScreen,
  SupportScreen,
  SearchScreenProduct,
  BillingAddressScreen
}
