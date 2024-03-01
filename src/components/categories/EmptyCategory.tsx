import { View, Text, StyleSheet } from "react-native";
import React from "react";
import TooBadImg from "../../assets/too-bad.svg";
import { theme } from "../../styles/theme";

const EmptyCategory = () => {
  return (
    <View style={styles.container}>
      <TooBadImg
        style={styles.img}
        height={300}
        width={300}
        fill={theme.colors.primary}
      />
      <View style={styles.textContainer}>
        <Text style={[theme.textVariants.modalTitleVariant2, styles.title]}>
          ¡Ups!
        </Text>
        <Text style={[theme.textVariants.bodyVariant2, styles.desc]}>
          Nos duele decir que hoy no tenemos platos en esta categoría
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  img: {
    transform: [{ scale: 0.7 }],
  },
  textContainer: {
    position: "relative",
    bottom: "18%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "70%",
  },
  title: {
    color: theme.colors.foreground,
    zIndex: 2,
  },
  desc: {
    color: theme.colors.secondaryVariant,
    textAlign: "center",
  },
});

export default EmptyCategory;
