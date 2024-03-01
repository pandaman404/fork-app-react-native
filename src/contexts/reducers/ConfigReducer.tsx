import {
  AUTH_USER_END,
  AUTH_USER_ERROR,
  AUTH_USER_START,
  AUTH_USER_SUBMIT,
  SET_GLOBAL_DATA,
  UPDATE_ADDRESSES,
  UPDATE_DELIVERY_CONFIG,
  UPDATE_USER,
  CHANGE_USER_LOGOUT,
  FETCH_CATEGORIES,
} from "./actions";

const configReducer = (state: any, action: any) => {
  if (action.type === SET_GLOBAL_DATA) {
    const [user, config, stores, addresses, categories] = action.payload;
    return { ...state, user, config, stores, addresses, categories };
  }
  if (action.type === UPDATE_DELIVERY_CONFIG) {
    return { ...state, config: action.payload };
  }
  if (action.type === UPDATE_ADDRESSES) {
    return { ...state, addresses: action.payload };
  }
  if (action.type === AUTH_USER_SUBMIT) {
    const [user, config, addresses, discounts] = action.payload;
    return { ...state, user, config, addresses, discounts };
  }
  if (action.type === AUTH_USER_START) {
    return { ...state, authLoading: true };
  }
  if (action.type === AUTH_USER_END) {
    return { ...state, authLoading: false };
  }
  if (action.type === AUTH_USER_ERROR) {
    return { ...state, authError: action.payload };
  }
  if (action.type === UPDATE_USER) {
    const { user } = state;
    user.email = action.payload.email;
    user.firstName = action.payload.name;
    user.lastName = action.payload.lastName;
    user.phone = action.payload.phoneNumber;
    user.fullName = action.payload.name + " " + action.payload.lastName;
    return { ...state, user };
  }
  if (action.type === CHANGE_USER_LOGOUT) {
    return { ...state, userLogOut: true };
  }
  if (action.type === FETCH_CATEGORIES) {
    return { ...state, categories: action.payload };
  }
  return state;
};

export default configReducer;
