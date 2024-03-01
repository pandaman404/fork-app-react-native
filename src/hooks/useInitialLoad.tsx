import { http } from "fork-business-library";
import { useState } from "react";
import { getData, storeData } from "../utils/storage";
import * as Font from "expo-font";
import { getGuest } from "../api/user";

const useInitialLoad = () => {
  const [initialLoadIsCompleted, setinitialLoadIsCompleted] =
    useState<boolean>(false);

  http.injectTokenInterceptor(() => getData("@auth_token"));

  const fetchToken = async () => {
    const token = await getData("@auth_token");
    if (token === null) {
      const guest = await getGuest();
      await storeData("@auth_token", guest.token);
    }
  };

  const useFonts = async () =>
    await Font.loadAsync({
      "Montserrat-Regular": require("../assets/fonts/montserrat_regular.ttf"),
      "Montserrat-Medium": require("../assets/fonts/montserrat_medium.ttf"),
      "Montserrat-Semibold": require("../assets/fonts/montserrat_semibold.ttf"),
      "Rift-Bold": require("../assets/fonts/rift_bold.otf"),

      "Roboto-Black": require("../assets/fonts/roboto_black.ttf"),
      "Roboto-Bold": require("../assets/fonts/roboto_bold.ttf"),
      "Roboto-Medium": require("../assets/fonts/roboto_medium.ttf"),
      "Roboto-Regular": require("../assets/fonts/roboto_regular.ttf"),
      "Zero-Regular": require("../assets/fonts/zerocalcare_script.ttf"),
    });

  const loadInitialData = async () => {
    try {
      await Promise.all([useFonts(), fetchToken()]);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    initialLoadIsCompleted,
    setinitialLoadIsCompleted,
    loadInitialData,
  };
};

export default useInitialLoad;
