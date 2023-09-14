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
  },
  profile: {
    getUserProfile: '/api/customer-profile/USER_ID',
    editProfile: '/api/customer-profile/',
  },
  categoryFoodType: {
    foodType: 'api/food-type/',
  }
};
