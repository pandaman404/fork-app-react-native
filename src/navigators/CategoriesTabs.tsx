import React, { useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CategoryScreen from "../screens/home/CategoryScreen";
import FeaturedScreen from "../screens/home/FeaturedScreen";
import { theme } from "../styles/theme";
import { globalStyles } from "../styles/global";
import { useConfigContext } from "../contexts/ConfigContext";

const Tab = createMaterialTopTabNavigator();

const CategoriesTabs = ({ setHideSlider, navigation, route }: any) => {
  const { config, fetchCategories, categories } = useConfigContext();

  // useEffect(() => {
  //   if (config.storeId > 0) {
  //     fetchCategories(config.storeId);
  //   }
  // }, [config.storeId]);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarPressColor: theme.colors.secondaryVariant,
        tabBarLabelStyle: theme.textVariants.tabNavigator,
        tabBarItemStyle: globalStyles.tabItem,
        tabBarIndicatorStyle: globalStyles.tabIndicator,
        tabBarStyle: globalStyles.tabContainer,
      }}
    >
      <Tab.Screen
        name="DESTACADOS"
        children={({ navigation, route }) => (
          <FeaturedScreen
            navigation={navigation}
            route={route}
          />
        )}
      />
      {categories.map(({ id, name }: any) => {
        return (
          <Tab.Screen
            name={name}
            key={id}
            options={{ tabBarLabel: ` ${name} ` }}
            children={({ navigation }) => (
              <CategoryScreen
                categoryId={id}
                navigation={navigation}
                setHideSlider={setHideSlider}
              />
            )}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default CategoriesTabs;
