// Async storage keys 
export const ACCESS_TOKEN = '@storage.access_token';
export const REFRESH_TOKEN = '@storage.refresh_token';
export const TOKEN_TYPE = '@storage.token_type';
export const LOGIN_DETAILS = '@storage.login';

//GLOBAL CONSTANTS
export const EMPTY_ARR = [];

//REGEX
export const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const NAME_REGEXP = /^[a-zA-Z ]+$/;
export const PASSWORD_REGEXP = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
export const PHONE_NUMBER_REGEXP = /^\d+$/;