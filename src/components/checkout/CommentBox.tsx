import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Input } from "react-native-elements";
import { theme } from "../../styles/theme";

const CommentBox = ({ onBlur, onChangeText, value }: any) => {
  return (
    <Input
      containerStyle={styles.container}
      inputContainerStyle={[styles.inputContainer]}
      inputStyle={[theme.textVariants.input, styles.input]}
      onBlur={onBlur}
      onChangeText={onChangeText}
      value={value}
      multiline={true}
      numberOfLines={6}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },
  inputContainer: {
    borderRadius: 3,
    borderWidth: 1,
    padding: theme.spacing.s,
  },
  input: {
    color: theme.colors.foreground,
    height: 80,
    textAlignVertical: "top",
  },
});

export default CommentBox;
