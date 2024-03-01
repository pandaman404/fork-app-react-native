import { Linking } from "react-native";
import { useEffect, useState } from "react";
import { User } from "fork-business-library";
import { cancelLastOrderEvaluation, getLastOrderEvaluation } from "../api/user";
import { webURL } from "../utils/env";

const useNps = (user: User) => {
  const [visible, setVisible] = useState(false);
  const [npsData, setNpsData] = useState<any>(null);

  const getLastOrderEvaluationData = async () => {
    if (user.registered) {
      const response = await getLastOrderEvaluation(user.id);
      if (response && response.id) {
        setNpsData(response);
        setTimeout(() => setVisible(true), 500);
      }
    }
  };

  const openEvaluation = (score: number) => {
    Linking.openURL(`${webURL}/${npsData.id}/${user.hash}/${score}`);
    setVisible(false);
  };

  const cancelEvaluation = async () => {
    if (npsData.id) {
      await cancelLastOrderEvaluation(npsData.id);
    }
    setVisible(false);
  };

  useEffect(() => {
    getLastOrderEvaluationData();
  }, [user.registered]);

  return {
    visible,
    npsData,
    openEvaluation,
    cancelEvaluation,
  };
};

export default useNps;
