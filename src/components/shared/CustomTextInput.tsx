import React from "react";
import { FieldError } from "react-hook-form";
import { StyleSheet } from "react-native";
import { Icon, Input } from "react-native-elements";
import { theme } from "../../styles/theme";

interface Props {
  onBlur: any;
  onChangeText: any;
  value: string;
  placeholder: string;
  error: FieldError | undefined;
  secureTextEntry?: boolean;
  disabled?: boolean;
}

const CustomTextInput = ({
  onBlur,
  onChangeText,
  value,
  placeholder,
  error,
  secureTextEntry = false,
  disabled = false,
}: Props) => {
  return (
    <Input
      containerStyle={styles.container}
      inputContainerStyle={[
        styles.inputContainer,
        error ? styles.ErrorInputBorder : styles.defaultInputBorder,
      ]}
      inputStyle={[theme.textVariants.input, styles.input]}
      placeholder={placeholder}
      placeholderTextColor={
        error ? theme.colors.primary : theme.colors.secondaryVariant
      }
      errorMessage={error && error.message}
      errorStyle={[theme.textVariants.bodyVariant3, styles.error]}
      rightIcon={
        error && (
          <Icon
            name="alert-circle"
            type="material-community"
            size={25}
            color={theme.colors.primary}
          />
        )
      }
      secureTextEntry={secureTextEntry}
      onBlur={onBlur}
      onChangeText={onChangeText}
      value={value}
      disabled={disabled}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    marginBottom: theme.spacing.s,
  },
  inputContainer: {
    borderRadius: 3,
    borderWidth: 1,
    paddingHorizontal: theme.spacing.s,
  },
  input: {
    height: 50,
    color: theme.colors.foreground,
  },
  defaultInputBorder: {
    borderColor: theme.colors.secondaryVariant,
  },
  ErrorInputBorder: {
    borderColor: theme.colors.primary,
  },
  error: {
    color: theme.colors.primary,
    marginTop: 0,
    marginLeft: theme.spacing.s,
  },
});

export default CustomTextInput;
