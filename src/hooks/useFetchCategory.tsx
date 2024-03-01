import { Section } from "fork-business-library";
import { useState } from "react";
import { getCategory } from "../api/category";

const useFetchCategory = () => {
  const [sections, setSections] = useState<any>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchCategory = async (storeId: number, categoryId: number) => {
    let categoryResult = await getCategory(storeId, categoryId)
      .then((r) => {
        return r.sections.map(({ name, items }: Section) => {
          return {
            name,
            data: items,
          };
        });
      })
      .catch((e) => {
        console.log(e);
        return null;
      });

    const verifyCategoryExists = categoryResult!.filter(
      (e) => e.data.length > 0
    );

    if (verifyCategoryExists.length === 0) {
      setSections(false);
    } else {
      setSections(categoryResult);
    }
  };

  const refreshCategory = async (storeId: number, categoryId: number) => {
    console.log('refreshCategory', storeId, categoryId)
    setSections(null);
    setRefreshing(true);
    fetchCategory(storeId, categoryId);
    setRefreshing(false);
  };

  return {
    sections,
    fetchCategory,
    refreshing,
    refreshCategory,
  };
};

export default useFetchCategory;
