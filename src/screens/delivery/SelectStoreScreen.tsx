import React from "react";
import { ScrollView } from "react-native";
import DeliveryRadioButton from "../../components/delivery/DeliveryRadioButton";
import { useDeliveryContext } from "../../contexts/DeliveryContext";
import { globalStyles } from "../../styles/global";

const SelectStoreScreen = () => {
  const { radioButtons, splitRadioButtons, checkRadioButton } =
    useDeliveryContext();
  const { storeRadioButtons } = splitRadioButtons(radioButtons);

  return (
    <ScrollView
      contentContainerStyle={[
        globalStyles.background,
        globalStyles.flexColumn,
        globalStyles.flexStartCenter,
        globalStyles.minHeight,
      ]}
    >
      {storeRadioButtons.map((item: any) => {
        return (
          <DeliveryRadioButton
            {...item}
            checkRadioButton={checkRadioButton}
            key={item.id}
          />
        );
      })}
    </ScrollView>
  );
};

export default SelectStoreScreen;
