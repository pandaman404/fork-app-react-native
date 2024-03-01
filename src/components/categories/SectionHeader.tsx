import { View, Text, StyleSheet, Platform } from "react-native";
import React from "react";
import { Product } from "fork-business-library";
import { theme } from "../../styles/theme";
interface SectionListProps {
  name: string;
  data: Product[];
}

const SectionHeader = ({ section: { name } }: any) => {
  return (
    <View>
      <Text style={[
        theme.textVariants.sectionTitle,
        styles.title,
        Platform.OS === 'android' ? styles.titleAndroid : styles.titleIos
      ]}>
        {/* Se dejo este espacio por que se cortaba la primera letra */}
        {' ' + name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: theme.colors.foregroundVariant,
    marginLeft: theme.spacing.m,
  },
  titleAndroid: {
    bottom: 40,
  },
  titleIos: {
    top: -40,
    paddingTop: 5,
    paddingBottom: 5,
  },
});

export default SectionHeader;
