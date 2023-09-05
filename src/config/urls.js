export const API_BASE_URl = 'http://206.189.133.64:8000/';
export const getApiUrl = ApiEndPoints => API_BASE_URl + ApiEndPoints;
console.log('api--', getApiUrl);

export const LOGIN = getApiUrl('api/login/');
export const SIGNUP = getApiUrl('api/register/');
