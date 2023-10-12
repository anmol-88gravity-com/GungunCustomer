export const ApiEndpoints = {
  auth: {
    login: '/api/login/',
    register: '/api/register/',
    registerOtp: '/api/register-otp/',
    uniqueCheck: '/api/phone-email-check/',
    otpVerify: '/api/otp-verify/',
    otpGenerate: '/api/otp-generate/',
    updatePassword: '/api/forget-password/',
  },
  user: {
    changePassword: '/api/change-user-password/',
    editProfile: '/api/customer-profile/', //patch and get user Profile
  },
  address: {
    addAddress: '/api/customer-address/',
    getAllAddresses: '/api/customer-address/USER_ID/',
    editAddress: '/api/customer-address/USER_ID/ADDRESS_ID/', // Put and Delete Single Address
    setDefaultAddress: '/api/set_default_address/ADDRESS_ID/',
  },
  profile: {
    getUserProfile: '/api/customer-profile/USER_ID',
    editProfile: '/api/customer-profile/USER_ID',
  },
  categoryFoodType: {
    foodType: 'api/food-type/',
  },
  restaurantDetail: {
    restaurantDetails: 'api/restaurant/STORE_ID/',
  },
  home: {
    searchQuery: '/api/search/',
    restaurantList:
      '/api/nearby-stores/?latitude=28.498987&longitude=77.085049',
    recentSearches: '/api/recent-searches/',
    deleteSearch: '/api/recent-searches/delete/',
  },
  cart: {
    createCart: 'api/cards/',
    addCartItem: '/api/card-items/',
    getCartItems: '/api/cards/list/DISH_ITEM_ID/',
    deleteCart: 'api/card-items/delete-zero-item/CART_ID/  ',
    increaseQuantity: '/api/card-items/increase-quantity/',
    decreaseQuantity: '/api/card-items/decrease-quantity/',
    billSummary: '/api/bill-summary/',
  },
};
