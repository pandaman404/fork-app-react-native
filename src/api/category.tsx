import { CategoryUseCase } from "fork-business-library";

const categoryUseCase = new CategoryUseCase();

export const getCategory = async (storeId: number, categoryId: number) => {
  return await categoryUseCase.getCategory(storeId, categoryId);
};

export const getCategories = async (storeId: number) => {
  return await categoryUseCase.getCategories(storeId).then((e) => {
    return e.map((element: any) => {
      return { name: element.name, id: element.id };
    });
  });
};

export const getProduct = async (productId: number, storeId: number) => {
  return await categoryUseCase.getProduct(productId, storeId);
};
