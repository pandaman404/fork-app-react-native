import { Text, View } from "react-native";
import React, { useCallback } from "react";
import PaymentRadioButton from "./PaymentRadioButton";
import { theme } from "../../styles/theme";

const PaymentMethodsSection = ({
  radioButtons,
  togglePaymentRadioButtons,
}: any) => {

  // console.log('radioButtons', radioButtons)

  return (
    <View>
      <Text style={theme.textVariants.body}>Medios de pago</Text>
      {radioButtons.map((payment: any) => {
        if (payment.id === 3) {
          return (
            <PaymentRadioButton
              type="oneclick"
              id={payment.id}
              checked={payment.checked}
              disabled={!payment.enabled}
              togglePaymentRadioButtons={togglePaymentRadioButtons}
              key={payment.id}
            />
          );
        }
        if (payment.id === 4) {
          return (
            <PaymentRadioButton
              type="webpay"
              id={payment.id}
              checked={payment.checked}
              disabled={!payment.enabled}
              togglePaymentRadioButtons={togglePaymentRadioButtons}
              key={payment.id}
            />
          );
        }
        if (payment.id === 6) {
          return (
            <PaymentRadioButton
              type="amipass"
              id={payment.id}
              checked={payment.checked}
              disabled={!payment.enabled}
              togglePaymentRadioButtons={togglePaymentRadioButtons}
              key={payment.id}
            />
          );
        }
        if (payment.id === 7) {
          return (
            <PaymentRadioButton
              type="sodexo"
              id={payment.id}
              checked={payment.checked}
              disabled={!payment.enabled}
              togglePaymentRadioButtons={togglePaymentRadioButtons}
              key={payment.id}
            />
          );
        }
        if (payment.id > 10) {
          return (
            <PaymentRadioButton
              type="oneclick"
              id={payment.id}
              checked={payment.checked}
              disabled={!payment.enabled}
              oneclickCard={payment.description}
              togglePaymentRadioButtons={togglePaymentRadioButtons}
              key={payment.id}
            />
          );
        }
        return null;
      })}
    </View>
  );
};

export default PaymentMethodsSection;
