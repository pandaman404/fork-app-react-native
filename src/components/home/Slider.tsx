import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Platform,
  Linking,
  Text,
  Animated
} from "react-native";
import { Image } from "react-native-elements";
import Loader from "../shared/Loader";
import { theme } from "../../styles/theme";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import useHandleSlider from "../../hooks/useHandleSlider";
import { windowWidth, windowHeight } from "../../styles/global";
import { useConfigContext } from "../../contexts/ConfigContext";

const Slider = ({ navigate, hideSlider }: any) => {
  const { editLink, selectIndex, ref, bannerImgArr, selectId, loader } = useHandleSlider();
  const platformHeight = Platform.OS === "ios" ? (windowHeight <= 667 ? 140 : 160) : 160;
  const { categories } = useConfigContext();
  const [sliderHeight, setSliderHeight] = useState(platformHeight)

  // Funcion que maneja la categoria 'fantasma' y la navegacion tocando una imagen
  const handlePressNav = async (item: any) => {
    let link_ = item.fields.url;
    if (link_.includes("producto")) {
      const supported = await Linking.canOpenURL(link_);
      if (supported) {
        await Linking.openURL(link_);
      }
    }
    if (link_.includes("categoria")) {
      let splitLink = link_.split("categoria/")[1];
      let categoryId = splitLink.split("/")[0];
      let categorySelected = categories.find(
        (x) => x.id === Number(categoryId)
      ).name;
      if (categorySelected) {
        navigate(categorySelected);
      } else {
        navigate("DESTACADOS", {
          id: categoryId,
        });
      }
    }
  };

  useEffect(() => {
    if (hideSlider) {
      setSliderHeight(platformHeight)
    } else {
      setSliderHeight(0)
    }
  }, [hideSlider]);

  return (
    <>
      {bannerImgArr.length > 0 ? (
        <Animated.View style={{ width: windowWidth, height: sliderHeight }}>
          <View style={{ backgroundColor: "white" }}>
            {loader ? (
              <Text style={{ position: "absolute", left: "43%", marginTop: 70 }} >
                {" "}
                <Loader />
              </Text>
            ) : (
              <FlatList
                horizontal
                pagingEnabled
                ref={ref}
                data={bannerImgArr}
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={selectIndex}
                keyExtractor={(item) => item.sys.id}
                renderItem={({ item }) => (
                  <TouchableWithoutFeedback
                    onPress={() => handlePressNav(item)}>
                    <View style={{ width: windowWidth }}>
                      <Image
                        style={[styles.image, { height: platformHeight }]}
                        source={{
                          uri: editLink(
                            item.fields.bannerMobileImage.fields.file.url
                          ),
                        }}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                )}
              />
            )}
            {bannerImgArr.length > 1 && (
              <View style={styles.sliderBulletsView}>
                {bannerImgArr.map((img: any, id: any) => {
                  return (
                    <View
                      key={id}
                      style={[
                        styles.activeBullet,
                        { opacity: id === selectId ? 1 : 0.5 },
                      ]} />
                  );
                })}
              </View>
            )}
          </View>
        </Animated.View>
      ) : (
        <View style={{ width: windowWidth, height: 0 }}></View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    resizeMode: "cover",
  },
  sliderBulletsView: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    height: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  activeBullet: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 3,
    height: 7,
    width: 7,
    margin: 5,
  },
});

export default Slider;
