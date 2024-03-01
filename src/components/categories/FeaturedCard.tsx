import React from "react";
import { View, Image, StyleSheet, Platform } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { windowWidth } from "../../styles/global";
import { theme } from "../../styles/theme";
interface Props {
  image: string;
  goToSection: Function;
  item: Object;
}

const FeaturedCard = ({ image, goToSection, item }: Props) => {

  return (
    <View style={styles.container} >
      <TouchableWithoutFeedback onPress={() => goToSection(item)}>
        <Image
          source={{
            uri: image,
          }}
          style={[
            styles.image,
            {
              resizeMode: Platform.OS == 'ios' ?
                windowWidth <= 375 ? 'contain' : 'cover' :
                "contain"
            }
          ]}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    width: "49%",
    borderWidth: 0.8,
    borderColor: theme.colors.secondary,
    padding: theme.spacing.xs,
    backgroundColor: theme.colors.background,
    shadowColor: theme.colors.secondaryVariant,
    shadowOpacity: 0.4,
    shadowOffset: { width: 1, height: 1 },
    elevation: 2,
    marginBottom: "2%",
  },
  image: {
    height: "100%",
  },
});

export default FeaturedCard;
