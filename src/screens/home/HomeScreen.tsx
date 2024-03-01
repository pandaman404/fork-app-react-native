import React, { useEffect, useRef, useState } from "react";
import { StatusBar, SafeAreaView, Platform, Animated } from "react-native";
import Header from "../../components/home/Header";
import Slider from "../../components/home/Slider";
import PreviewCart from "../../components/shared/PreviewCart";
import CategoriesTabs from "../../navigators/CategoriesTabs";
import { theme } from "../../styles/theme";
import { useCartContext } from "../../contexts/CartContext";
import WelcomePopUp from "../../components/home/WelcomePopUp";
import NpsPopUp from "../../components/home/NpsPopUp";
import { windowHeight } from "../../styles/global";

const HomeScreen = ({ navigation, route }: any) => {
  const { cart } = useCartContext();
  const { navigate, openDrawer } = navigation;
  const [hideSlider, setHideSlider] = useState(true);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={"white"} />
      <SafeAreaView
        style={{
          flex: 0,
          zIndex: 100,
          elevation: 100,
        }}
      />

      <SafeAreaView
        style={{ flex: 1, backgroundColor: theme.colors.foreground }}
      >
        <Header navigate={navigate} openDrawer={openDrawer} />
        <Slider hideSlider={hideSlider} navigate={navigation.navigate} />
        <WelcomePopUp navigate={navigate} />
        <NpsPopUp />
        <CategoriesTabs setHideSlider={setHideSlider} navigation={navigation} />
        {cart.productsQuantity > 0 && <PreviewCart navigate={navigate} />}
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
