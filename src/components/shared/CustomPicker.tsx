import { View, Text, StyleSheet, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { theme } from "../../styles/theme";
import { Icon } from "react-native-elements";
import { Commune } from "fork-business-library";
import { formatPrice } from "../../utils/formatText";

const CustomPicker = ({
  data,
  value,
  error,
  placeholder,
  onChange,
  from,
  setIosSchedule,
  setShowPicker,
  iosSchedule,
}: any) => {
  useEffect(() => {
    if (Platform.OS === "ios" && value !== "") {
      data &&
        data.map((x: any) => {
          if (x.id.toString() === value) {
            setIosSchedule({
              ...iosSchedule,
              obj: { from: x.from, to: x.to, price: x.price },
            });
          }
        });
      setTimeout(() => {
        setShowPicker(false);
      }, 1500);
    }
  }, [value]);

  return (
    <View style={[styles.container]}>
      <View
        style={[
          styles.pickerContainer,
          error ? styles.errorBorderContainer : styles.defaultBorderContainer,
        ]}
      >
        <Picker
          selectedValue={value}
          onValueChange={onChange}
          style={styles.pickerStyles}
        >
          <Picker.Item
            label={`${from === "horarios" ? "Selecciona hora" : ""}`}
            value=""
            enabled={value.length < 1 || error ? true : false}
          />
          {from === "comunas" &&
            data &&
            data.map((item: Commune) => (
              <Picker.Item
                key={item.id}
                label={item.name}
                value={`${item.id}_${item.name}`}
              />
            ))}
          {from === "horarios" &&
            data &&
            data.map((item: any) => (
              <Picker.Item
                key={item.id}
                label={
                  item.from + "-" + item.to + "  " + formatPrice(item.price)
                }
                value={`${item.id}`}
                style={{ height: Platform.OS === "ios" ? 10 : 40 }}
              />
            ))}
        </Picker>
        {value.length < 1 && (
          <Text
            style={[
              styles.fakePlaceholder,
              error
                ? { color: theme.colors.primary }
                : { color: theme.colors.secondaryVariant },
            ]}
          >
            {placeholder}
          </Text>
        )}
      </View>
      {error && (
        <Text style={[theme.textVariants.bodyVariant3, styles.errorMessage]}>
          {error.message}
        </Text>
      )}
      {error && (
        <View style={styles.errorIcon}>
          <Icon
            name="alert-circle"
            type="material-community"
            size={25}
            color={theme.colors.primary}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: theme.spacing.xxl,
  },
  heightIos: {
    height: 50,
  },
  pickerContainer: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 3,
  },
  defaultBorderContainer: {
    borderColor: theme.colors.secondaryVariant,
  },
  errorBorderContainer: {
    borderColor: theme.colors.primary,
  },
  pickerStyles: {
    width: "100%",
    fontSize: 6,
  },
  pickerItem: {
    color: theme.colors.foreground,
  },
  fakePlaceholder: {
    color: theme.colors.secondaryVariant,
    position: "absolute",
    top: "35%",
    left: 10,
  },
  errorMessage: {
    color: theme.colors.primary,
    marginLeft: theme.spacing.s,
    position: "absolute",
    bottom: -16,
  },
  errorIcon: {
    position: "absolute",
    top: theme.spacing.m,
    right: 12,
    backgroundColor: theme.colors.secondary,
  },
});

export default CustomPicker;
