import { Configuration, User } from "fork-business-library";

const configInitialState = {
  user: new User(0, "", "", "", "", "", "", "", false, ""),
  config: new Configuration("PICKUP", 28, 0, false),
  stores: [],
  addresses: [],
  authLoading: false,
  authError: "",
  userLogOut: false,
  categories: [],
};

export default configInitialState;
