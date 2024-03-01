import { Image, ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { theme } from "../../styles/theme";
import RandomProductFrame from "../shared/RandomProductFrame";
import { windowWidth } from "../../styles/global";

const ProductSlider = ({ pictures }: any) => {
  return (
    <ScrollView
      style={styles.container}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      {pictures.map((picture: string, index: number) => {
        return (
          <View
            style={[
              styles.slideContainer,
              pictures.length == 1
                ? {
                    marginLeft: theme.spacing.s,
                  }
                : index !== pictures.length - 1
                ? {
                    marginRight: theme.spacing.m,
                  }
                : {
                    marginRight: 0,
                  },
            ]}
            key={index}
          >
            <Image source={{ uri: picture }} style={[styles.image]} />
            <RandomProductFrame imageStyles={styles.borderImage} slider />
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: 230,
    bottom: theme.spacing.m,
  },
  slideContainer: {
    height: 230,
    width: windowWidth - 80,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  borderImage: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "101%",
    zIndex: 2,
    tintColor: theme.colors.background,
  },
});

export default ProductSlider;
