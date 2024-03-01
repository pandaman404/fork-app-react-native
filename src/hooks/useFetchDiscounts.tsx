import { Discount } from "fork-business-library";
import { useState } from "react";
import { getDiscounts } from "../api/user";

const useFetchDiscounts = () => {
  const [discounts, setDiscounts] = useState<Discount[] | never[] | undefined>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);

  const fetchDiscounts = async () => {
    setLoading(true);
    const response = await getDiscounts();
    setDiscounts(response);
    setLoading(false);
  };

  return {
    loading,
    discounts,
    fetchDiscounts,
  };
};

export default useFetchDiscounts;
