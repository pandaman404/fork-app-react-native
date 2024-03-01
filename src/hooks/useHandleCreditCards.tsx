import React, { useState } from "react";
import { getCart } from "../api/cart";
import { addOneClickCard, deleteCard, getCards } from "../api/user";
import { useCartContext } from "../contexts/CartContext";
import { useConfigContext } from "../contexts/ConfigContext";

const useHandleCreditCards = () => {
  const { config, user } = useConfigContext();
  const { updateCreditCard } = useCartContext();
  const [cardList, setCardList] = useState([] as any[]);

  // Obtener tarjetas
  const getCardList = async () => {
    const resp = await getCards();
    setCardList(resp);
  };

  // Agregar tarjeta
  const addCreditCard = async () => {
    return await addOneClickCard(user.email, user.fullName);
  };

  // Eliminar tarjeta
  const deleteCreditCard = async (id: number) => {
    return await deleteCard(id);
  };

  // Actualizar tarjeta en cart context
  const updateCreditCardInContext = async () => {
    const payments = await getCart(config.storeId).then((r) => r.payments);
    updateCreditCard(payments);
  };

  return {
    getCardList,
    addCreditCard,
    deleteCreditCard,
    updateCreditCardInContext,
    cardList,
  };
};

export default useHandleCreditCards;
