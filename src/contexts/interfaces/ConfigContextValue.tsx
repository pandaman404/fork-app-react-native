import {
  Address,
  Category,
  Configuration,
  Store,
  User,
} from "fork-business-library";

export interface ConfigContextValue {
  user: User;
  config: Configuration;
  stores: Store[];
  addresses: Address[];
  authLoading: boolean;
  authError: string;
  onLoginSubmit: any;
  onLogoutSubmit: any;
  onRegisterSubmit: any;
  updateDeliveryConfig: any;
  showCurrentDelivery: any;
  updateUser: any;
  userLogOut: boolean;
  updateAddresses: any;
  fetchCategories: any;
  categories: any[];
  handleDeleteAddress: any
}
