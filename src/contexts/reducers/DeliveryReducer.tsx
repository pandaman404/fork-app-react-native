import { updateRadioButtonsState } from "../../utils/handleRadioButtons";
import {
  CHECK_DELIVERY_RADIOBUTTON,
  CLOSE_DELIVERY_MODAL,
  CLOSE_MISSING_PRODUCTS_MODAL,
  CREATE_DELIVERY_RADIOBUTTONS,
  DELIVERY_CONFIG_UPDATE_END,
  DELIVERY_CONFIG_UPDATE_START,
  OPEN_DELIVERY_MODAL,
  OPEN_MISSING_PRODUCTS_MODAL,
  SHOW_DELIVERY_RADIOBUTTONS,
} from "./actions";
import {
  AddressRadioButton,
  StoreRadioButton,
} from "../interfaces/DeliveryContextValue";

const deliveryReducer = (state: any, action: any) => {
  if (action.type === CREATE_DELIVERY_RADIOBUTTONS) {
    const radioButtons: (AddressRadioButton | StoreRadioButton)[] =
      action.payload;
    return { ...state, radioButtons };
  }
  if (action.type === SHOW_DELIVERY_RADIOBUTTONS) {
    return { ...state, showRadioButtons: true };
  }
  if (action.type === CHECK_DELIVERY_RADIOBUTTON) {
    const newRadioButtons = updateRadioButtonsState(
      state.radioButtons,
      action.payload
    );
    return { ...state, radioButtons: newRadioButtons };
  }
  if (action.type === DELIVERY_CONFIG_UPDATE_START) {
    return { ...state, updatingDeliveryConfig: true };
  }
  if (action.type === DELIVERY_CONFIG_UPDATE_END) {
    return { ...state, updatingDeliveryConfig: false };
  }
  if (action.type === OPEN_DELIVERY_MODAL) {
    let { deliverySelectionModal } = state;
    deliverySelectionModal.visible = true;
    deliverySelectionModal.data = action.payload;
    return { ...state, deliverySelectionModal };
  }
  if (action.type === CLOSE_DELIVERY_MODAL) {
    let { deliverySelectionModal } = state;
    deliverySelectionModal.visible = false;
    deliverySelectionModal.data = {};
    return { ...state, deliverySelectionModal };
  }
  if (action.type === OPEN_MISSING_PRODUCTS_MODAL) {
    let { missingProductsModal } = state;
    missingProductsModal.visible = true;
    missingProductsModal.data = action.payload;
    return { ...state, missingProductsModal };
  }
  if (action.type === CLOSE_MISSING_PRODUCTS_MODAL) {
    let { missingProductsModal } = state;
    missingProductsModal.visible = false;
    missingProductsModal.data = {};
    return { ...state, missingProductsModal };
  }
  return state;
};

export default deliveryReducer;
