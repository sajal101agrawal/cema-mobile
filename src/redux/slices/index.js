import authReducer from './auth';
import cartReducer from './cart';
import wishlistReducer from './wishlist';
import categoryReducer from './category';
import productReducer from './product';
import promoCodeReducer from './promocodes'
import addressReducer from './address'
import notificationReducer from './notification'

export const reducer  = {
    'auth': authReducer,
    'cart': cartReducer,
    'wishlist': wishlistReducer,
    'category': categoryReducer,
    'product': productReducer,
    'promocode' : promoCodeReducer,
    'address' : addressReducer ,
    'notification' : notificationReducer
}