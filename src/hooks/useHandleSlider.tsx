import { FlatList } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import { useConfigContext } from "../contexts/ConfigContext";
import { client } from "../api/contentful";

const useHandleSlider = () => {
  const currentDate = moment().toISOString();
  const [bannerImgArr, setBannerImgArr] = useState<any[]>([]);
  const [selectId, setSelectId] = useState(0);
  const index = useRef(0);
  const ref = useRef<FlatList>(null);
  const { config, fetchCategories, categories } = useConfigContext();
  const [loader, setLoader] = useState(false);

  // useEffect(() => {
  //   if (config.storeId > 0) {
  //     fetchCategories(config.storeId);
  //   }
  // }, []);

  const getBannerImages = async () => {
    setLoader(true);
    client
      .getEntries({
        content_type: "ecommercePromos",
        "fields.begins[lt]": currentDate,
        "fields.ends[gt]": currentDate,
        select: "fields",
      })
      .then(async (response: { items: any }) => {
        let resp = await response.items;
        setLoader(false);
        if (resp.length > 0) {
          setBannerImgArr(resp);
        }
      });
  };

  const editLink = (link: any) => {
    let hasHttps = link.includes("https");
    if (!hasHttps) {
      return "https:" + link;
    } else return link;
  };

  // Funcion para obtener index seleccionado despues de hacer un scroll y asi activar puntitos
  const selectIndex = (event: any) => {
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const contentOffset = event.nativeEvent.contentOffset.x;
    const indexSelected = Math.floor(contentOffset / viewSize);
    setSelectId(indexSelected);
    index.current = indexSelected;
  };

  const autoScroll = (id: number) => {
    if (id == bannerImgArr.length - 1) {
      setSelectId(0);
    }
    if (id < bannerImgArr.length - 1) {
      setSelectId(id + 1);
    }
    ref.current?.scrollToIndex({
      index: id,
      animated: true,
    });
  };

  const translateSlide = (id: number) => {
    ref.current?.scrollToIndex({
      index: id,
      animated: true,
    });
  };

  useEffect(() => {
    getBannerImages();
    return () => {
      setBannerImgArr([]);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      autoScroll(selectId);
    }, 4000);
    return () => clearInterval(interval);
  }, [bannerImgArr, selectId]);

  useEffect(() => {
    translateSlide(selectId);
  }, [selectId]);

  return {
    getBannerImages,
    editLink,
    selectIndex,
    autoScroll,
    ref,
    bannerImgArr,
    selectId,
    index,
    loader,
  };
};

export default useHandleSlider;
