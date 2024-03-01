import { useIsFocused } from "@react-navigation/native";
import { Category } from "fork-business-library";
import { useEffect, useState } from "react";
import { client } from "../api/contentful";

const useHandleFeaturedScreen = (navigation: any, categories: Category[]) => {
  const [featuredData, setFeaturedData] = useState<any[]>([]);
  const isFocused: any = useIsFocused();
  const { navigate, setParams } = navigation;

  const getFeatured = async () => {
    client
      .getEntries({
        content_type: "ecommerceLandingImage",
      })
      .then(async (response: { items: any }) => {
        let resp = await response.items;
        if (resp.length > 0) {
          setFeaturedData(resp);
        }
      })
      .catch((err: any) => console.log("error", err));
  };

  const editLink = (link: any) => {
    let hasHttps = link.includes("https");
    if (!hasHttps) {
      return "https:" + link;
    } else return link;
  };

  const goToSection = (section: any) => {
    const sectionId = section.fields.categoryId;
    categories.forEach((cat) => {
      if (cat.id === sectionId) {
        navigate(cat.name);
      }
    });
  };

  useEffect(() => {
    getFeatured();
    return () => {
      setFeaturedData([]);
    };
  }, []);

  useEffect(() => {
    if (!isFocused) {
      setParams({ id: null });
    }
  }, [isFocused]);

  return {
    getFeatured,
    editLink,
    goToSection,
    featuredData,
  };
};

export default useHandleFeaturedScreen;
