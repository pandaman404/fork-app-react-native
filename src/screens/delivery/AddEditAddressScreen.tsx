import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { theme } from "../../styles/theme";
import CustomTextInput from "../../components/shared/CustomTextInput";
import DeliverySubmitButton from "../../components/delivery/DeliverySubmitButton";

const AddEditAddressScreen = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      street: "",
      number: "",
      depto: "",
      comuna: "",
    },
  });

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="name"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <CustomTextInput
            placeholder="Nombre (trabajo, casa, oficina, etc)"
            error={error}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        rules={{
          required: "Campo requerido.",
        }}
      />

      <Controller
        control={control}
        name="street"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <CustomTextInput
            placeholder="Calle"
            error={error}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        rules={{
          required: "Campo requerido.",
        }}
      />

      <Controller
        control={control}
        name="number"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <CustomTextInput
            placeholder="Number"
            error={error}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        rules={{
          required: "Campo requerido.",
        }}
      />

      <Controller
        control={control}
        name="depto"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <CustomTextInput
            placeholder="Departamento"
            error={error}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        rules={{
          required: "Campo requerido.",
        }}
      />

      <Controller
        control={control}
        name="comuna"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <CustomTextInput
            placeholder="Comuna"
            error={error}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        rules={{
          required: "Campo requerido.",
        }}
      />

      <View style={styles.buttonContainer}>
        <DeliverySubmitButton title="Continuar" handleSubmit={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.l,
    alignItems: "center",
  },
  buttonContainer: {
    width: "44%",
  },
});

export default AddEditAddressScreen;
