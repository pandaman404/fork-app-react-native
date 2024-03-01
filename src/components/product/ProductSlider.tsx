import {
  Image,
  ScrollView,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import React from "react";
import { theme } from "../../styles/theme";

const ProductSlider = ({ image }: any) => {
  const windowWidth = useWindowDimensions().width;
  return (
    <ScrollView
      style={styles.container}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      <Image
        source={{ uri: image }}
        style={[
          {
            height: 240,
            width: windowWidth - 100,
            borderRadius: 100,
            marginRight: theme.spacing.s,
          },
        ]}
      />
      <Image
        source={{ uri: image }}
        style={[
          {
            height: 240,
            width: windowWidth - 100,
            borderRadius: 100,
            marginRight: theme.spacing.s,
          },
        ]}
      />
      <Image
        source={{ uri: image }}
        style={[
          {
            height: 240,
            width: windowWidth - 100,
            borderRadius: 100,
            marginRight: theme.spacing.s,
          },
        ]}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "85%",
    height: 240,
    bottom: theme.spacing.m,
  },
});

export default ProductSlider;
