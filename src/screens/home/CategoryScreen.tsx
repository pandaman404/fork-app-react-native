import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef } from "react";
import { Platform, SectionList, StyleSheet, ScrollView, Animated } from "react-native";
import ProductCard from "../../components/categories/ProductCard";
import SectionFooter from "../../components/categories/SectionFooter";
import SectionHeader from "../../components/categories/SectionHeader";
import Loader from "../../components/shared/Loader";
import { useConfigContext } from "../../contexts/ConfigContext";
import { globalStyles } from "../../styles/global";
import { theme } from "../../styles/theme";
import useFetchCategory from "../../hooks/useFetchCategory";
import EmptyCategory from "../../components/categories/EmptyCategory";

const CategoryScreen = ({ categoryId, navigation, setHideSlider }: any) => {
  const { config } = useConfigContext();
  const { sections, refreshing, fetchCategory, refreshCategory } =
    useFetchCategory();
  const scrollYRef = useRef(0);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          await fetchCategory(config.storeId, categoryId);
        } catch (error) {
          console.log(error);
        }
      })();
    }, [config.storeId])
  );

  const handleScroll = (event: any) => {
    const currentYPosition = event.nativeEvent.contentOffset.y;
    const oldPosition = scrollYRef.current;
    if (oldPosition < currentYPosition) { // down
      setHideSlider(false)
    }
    if (currentYPosition <= 20) { // up
      setHideSlider(true)
    }
    scrollYRef.current = currentYPosition
  }


  if (sections === null) {
    return (
      <ScrollView
        contentContainerStyle={[
          globalStyles.flex1,
          globalStyles.flexCenter,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <Loader />
      </ScrollView>
    );
  }

  if (sections == false) {
    return <EmptyCategory />;
  }

  return (
    <Animated.SectionList
      onScroll={handleScroll}
      scrollEventThrottle={16}
      sections={sections}
      keyExtractor={(item) => item.sku}
      renderItem={({ item }) => (
        <ProductCard product={item} navigation={navigation} />
      )}
      renderSectionHeader={SectionHeader}
      renderSectionFooter={SectionFooter}
      onRefresh={() => refreshCategory(config.storeId, categoryId)}
      refreshing={refreshing}
      initialNumToRender={5}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[globalStyles.background, styles.container]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "ios" ? "15%" : "5%",
    paddingBottom: "15%",
    paddingLeft: theme.spacing.m,
    backgroundColor: theme.colors.background,
  },
  title: {
    color: theme.colors.foregroundVariant,
    marginLeft: theme.spacing.m,
    bottom: Platform.OS === "ios" ? 20 : 40,
  },
  immediateConsumption: {
    paddingHorizontal: theme.spacing.xs,
    color: theme.colors.foregroundVariant,
    marginBottom: theme.spacing.xxxl,
  },
});

export default CategoryScreen;
