import { useEffect, useState } from "react";
import { getProduct } from "../api/category";
import { sortCartProducts } from "../utils/sortElements";
import { updateRadioButtonsState } from "../utils/handleRadioButtons";

const useFetchProductDetails = (productId: number, storeId: number) => {
  const [product, setProduct] = useState<any>(null);
  const [packNProductsSection, setPackNProductsSection] = useState<any>(null);
  const [packMenuSections, setPackMenuSections] = useState<any>(null);

  const fetchproduct = async () => {
    const response = await getProduct(productId, storeId);
    setProduct(response);
    if (response && response.packType?.code === "N_DISTINTOS") {
      const packSection = {
        title: response.packSections[0].title,
        items: response.packSections[0].items.map((item: any) => {
          return { ...item, quantity: 0 };
        }),
      };
      setPackNProductsSection(packSection);
      return null;
    }
    if (response && response.packType?.code === "MENU") {
      const packSections = response.packSections.map((section, index) => {
        return {
          title: section.title,
          sectionIndex: index,
          items: section.items.map((item) => {
            return { ...item, checked: false };
          }),
        };
      });
      setPackMenuSections(packSections);
      return null;
    }
  };

  // Pack N Products
  const getSelectedItemsQuantity = (data: any) => {
    return data.reduce((acc: any, curr: any) => (acc += curr.quantity), 0);
  };

  const decreaseItemQuantity = (productId: number) => {
    const { title, items: packItems } = packNProductsSection;
    const packItemsUpdated = packItems.map((product: any) => {
      if (product.id === productId && product.id > 0) {
        product.quantity -= 1;
      }
      return product;
    });
    setPackNProductsSection({ title, items: packItemsUpdated });
  };

  const increaseItemQuantity = (productId: number) => {
    const { title, items: packItems } = packNProductsSection;
    const currQuantity = getSelectedItemsQuantity(packNProductsSection.items);
    if (product.packType.quantity > currQuantity) {
      const packItemsUpdated = packItems.map((product: any) => {
        if (product.id === productId) {
          product.quantity += 1;
        }
        return product;
      });
      setPackNProductsSection({ title, items: packItemsUpdated });
    }
  };

  // Pack Menu
  const checkItemInSection = (productId: number, index: number) => {
    const sectionsData = [...packMenuSections];

    const { title, sectionIndex, items: packItems } = sectionsData[index];

    const packSectionItemsUpdated = updateRadioButtonsState(
      packItems,
      productId
    );

    sectionsData[index] = {
      title,
      sectionIndex,
      items: packSectionItemsUpdated,
    };

    setPackMenuSections(sectionsData);
  };

  const verifyCheckedSections = (sections: any) => {
    let allChecked = true;
    const checkedData = sections.map((section: any) => {
      return section.items.filter((element: any) => element.checked === true);
    });
    checkedData.forEach((element: any) =>
      element.length === 0 ? (allChecked = false) : null
    );

    return allChecked;
  };

  const getCheckedItems = (data: any) => {
    return data.map((section: any) => {
      return section.items
        .filter((element: any) => element.checked === true)
        .reduce((acc: any, curr: any) => {
          curr = {
            sku: curr.sku,
            quantity: 1,
          };
          return curr;
        }, {});
    });
  };

  // Preparar data Pack para añadir a carro
  const preparePackToCart = (type: string, data: any) => {
    if (type === "N_DISTINTOS") {
      let currQuantity = getSelectedItemsQuantity(data.items);
      if (Number(product.packType.quantity) === currQuantity) {
        const selectedItems = data.items
          .map((item: any) => {
            return {
              sku: item.sku,
              quantity: item.quantity,
            };
          })
          .filter((item: any) => item.quantity > 0);
        const packMenu = {
          sku: product.sku,
          quantity: 1,
          pack: selectedItems,
        };
        return packMenu;
      } else {
        return null;
      }
    }
    if (type === "MENU") {
      if (verifyCheckedSections(data) === true) {
        const checkedItems = getCheckedItems(data);
        const packMenu = {
          sku: product.sku,
          quantity: 1,
          pack: checkedItems,
        };
        return packMenu;
      } else {
        return null;
      }
    }
  };

  useEffect(() => {
    fetchproduct();
  }, []);

  return {
    product,
    packNProductsSection,
    decreaseItemQuantity,
    increaseItemQuantity,
    packMenuSections,
    checkItemInSection,
    preparePackToCart,
  };
};

export default useFetchProductDetails;
