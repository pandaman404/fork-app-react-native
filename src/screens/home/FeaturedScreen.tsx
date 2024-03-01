import React, { useRef } from "react";
import { ScrollView, StyleSheet } from "react-native";
import FeaturedCard from "../../components/categories/FeaturedCard";
import Loader from "../../components/shared/Loader";
import { useConfigContext } from "../../contexts/ConfigContext";
import useHandleFeaturedScreen from "../../hooks/useHandleFeaturedScreen";
import { theme } from "../../styles/theme";
import CategoryScreen from "./CategoryScreen";

const FeaturedScreen = ({ navigation, route }: any) => {
  const scrollYRef = useRef(0);
  const { categories } = useConfigContext();
  const { editLink, goToSection, featuredData } = useHandleFeaturedScreen(
    navigation,
    categories
  );

  const handleScroll = (event: any) => {
    const currentYPosition = event.nativeEvent.contentOffset.y;
    // const oldPosition = scrollYRef.current;

    // if (oldPosition < currentYPosition) {
    //   setHideSlider(false);
    // }
    // if (currentYPosition < 90) {
    //   setHideSlider(true);
    // }
    // scrollYRef.current = currentYPosition;
  };

  if (featuredData === null) {
    return <Loader />;
  }

  return (
    <>
      {route.params && route.params.id ? (
        <CategoryScreen
          categoryId={route.params.id}
          navigation={navigation}
        />
      ) : (
        <ScrollView
          contentContainerStyle={styles.container}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {featuredData.length > 0 &&
            featuredData.map((item, id) => {
              return (
                <FeaturedCard
                  image={editLink(item.fields.image.fields.file.url)}
                  key={id}
                  item={item}
                  goToSection={goToSection}
                />
              );
            })}
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.xs,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    backgroundColor: theme.colors.background,
  },
});

export default FeaturedScreen;
