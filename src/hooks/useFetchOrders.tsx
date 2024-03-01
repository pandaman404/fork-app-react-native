import React, { useState } from "react";
import { getOrders } from "../api/user";

const useFetchOrders = () => {
  const [orders, setOrders] = useState([] as any[])
  const [loading, setLoading] = useState<boolean>(false);

  const fetchOrders = async () => {
    setLoading(true);
    const response = await getOrders();
    setOrders(response)
    setLoading(false);
  };

  return {
    loading,
    orders,
    fetchOrders,
  };
};

export default useFetchOrders;
