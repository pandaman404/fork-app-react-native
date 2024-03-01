export type AddressRadioButton = {
  index: number;
  checked: boolean;
  id: number;
  name: string;
  storeId: number;
  streetAndNumber: string;
  isDeliveryAvailable: boolean;
  isDefault: boolean;
};

export type StoreRadioButton = {
  index: number;
  checked: boolean;
  id: number;
  name: string;
  address: string;
  deliveryPrice: number;
  isDefault: boolean;
  isRecent: boolean;
};

export interface deliveryContextValue {
  radioButtons: (AddressRadioButton | StoreRadioButton)[];
  showRadioButtons: boolean;
  deliverySelectionModal: {
    visible: boolean;
    data: any;
  };
  missingProductsModal: {
    visible: boolean;
    data: any;
  };
  splitRadioButtons: any;
  checkRadioButton: any;
  updatingDeliveryConfig: boolean;
  hideLoader: any;
  handlePressContinue: any;
  closeDeliveryModal: any;
  closeMissingProductsModal: any;
  saveChanges: any;
}
