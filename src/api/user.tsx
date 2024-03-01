import {
  ConfigurationPutdata,
  UserLogin,
  UserRegister,
  UserUseCase,
} from "fork-business-library";

const userUseCase = new UserUseCase();

export const getGuest = async () => {
  return await userUseCase.getGuest();
};

export const getCurrent = async () => {
  return await userUseCase.getCurrent();
};

export const getConfiguration = async () => {
  return await userUseCase.getConfiguration();
};

export const getStores = async () => {
  return await userUseCase.getStores();
};

export const getAddress = async (id: any) => {
  return await userUseCase.getAddress(id);
};

export const getAddresses = async () => {
  return await userUseCase.getAddresses().catch((e) => {
    return [];
    /*
    if ((e.statusCode = 400)) {
      
    } else {
      console.log(e);
    }
    */
  });
};

export const getOrders = async () => {
  return await userUseCase.getOrders();
};

export const putConfiguration = async (data: ConfigurationPutdata) => {
  return await userUseCase.putConfiguration(data);
};

export const postLogin = async (data: UserLogin) => {
  return await userUseCase.postLogin(data);
};

export const postRegister = async (data: UserRegister) => {
  return await userUseCase.postRegister(data);
};

export const getDiscounts = async () => {
  return await userUseCase.getDiscounts().catch((e) => {
    if ((e.statusCode = 400)) {
      return [];
    } else {
      console.log(e);
    }
  });
};

export const addOneClickCard = async (email: string, fullName: string) => {
  return await userUseCase.addOneClickCard(email, fullName);
};

export const getCards = async () => {
  return await userUseCase.getCards();
};

export const getLastOrderEvaluation = async (userId: number) => {
  return await userUseCase.getLastOrderEvaluation(userId).catch((r) => {
    return r.message;
  });
};

export const cancelLastOrderEvaluation = async (orderId: number) => {
  return await userUseCase.confirmEvaluationOrder(orderId, 0, "SCORE");
};

export const deleteCard = async (id: number) => {
  return await userUseCase.deleteCard(id);
};

export const updateUserData = async (
  email: string,
  name: string,
  lastName: string,
  phoneNumber: string
) => {
  return await userUseCase.updateUser(email, name, lastName, phoneNumber);
};

export const getGeoAddress = async (
  streetName: string,
  number: string,
  commune: string
) => {
  return await userUseCase.getGeoAddress(streetName, number, commune);
};

export const addAddress = async (
  name: string,
  streetName: string,
  number: number,
  unitNumber: string,
  communeId: number,
  comment: string,
  lat: number,
  lon: number
) => {
  return await userUseCase.addAddress(
    name,
    streetName,
    number,
    unitNumber,
    communeId,
    comment,
    lat,
    lon
  );
};

export const updateAddress = async (
  id: number,
  name: string,
  streetName: string,
  number: number,
  unitNumber: string,
  communeId: number,
  comment: string,
  lat: number,
  lon: number
) => {
  return await userUseCase.updateAddress(
    id,
    name,
    streetName,
    number,
    unitNumber,
    communeId,
    comment,
    lat,
    lon
  );
};

export const deleteAddress = async (id: number) => {
  return await userUseCase.deleteAddress(id);
};

export const getCommunes = async () => {
  return await userUseCase.getCommunes();
};
