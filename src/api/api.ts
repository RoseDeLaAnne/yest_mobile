import axios from "axios";
import {
  AddToCart,
  CartData,
  City,
  GetShopsParams,
  Product,
  Session,
  Shop,
  SmsParams,
  User,
  UserParams,
  ValidCodeParams,
} from "./types";

// axios.defaults.headers.common['Authorization'] = authStore.token;

const api = axios.create({
  baseURL: "https://marketa.su/api/",
  headers: {
    Accept: "application/json, */*",
    "Cache-Control": "no-cache",
    "Accept-Encoding": "gzip, deflate, br",
    Connection: "keep-alive",
    "Content-Type": "application/json",
    Host: "marketa.su",
  },
});

export const registration = (user: any) => api.post("user-create", user);

export const authorization = (params: UserParams) =>
  api.post("user-auth", params);

export const sendSms = (params: SmsParams) => api.post("send-sms", params);

export const validCode = (params: ValidCodeParams) =>
  api.post("valid-code", params);

export const getUser = (sessionId: string) =>
  api.post("user-data", { sessionId: sessionId });

export const getListCity = () => api.post<{ data: City[] }>("all-cities");

export const getListShop = (params: GetShopsParams) =>
  api.post<{ data: Shop[] }>("organizations-by-city", params);

export const getShop = (uuid: string) =>
  api.post<{ data: Shop }>("organization-by-uuid", { uuid: uuid });

export const getListProducts = (organizationUuid: string,categoryUuid:string | null) =>
  api.post<{ data: Product[] }>("products-by-organization", {
    organizationUuid: organizationUuid,
    categoryUuid: categoryUuid || null, 

    
  });

export const searchProducts = (organizationUuid: string, searchValue: string) =>
  api.post<{ data: Product[] }>("/products-by-name", {
    organizationUuid: organizationUuid,
    searchValue: searchValue,
  });

export const getProduct = (productUuid: string) =>
  api.post<{ data: any }>("/product-by-uuid", {
    uuid: productUuid,

  });
export const getCategory = () =>
  api.post<{ data: any }>("/categories-by-organization", {
    organizationUuid : "a7898941-95f4-11eb-850a-0050569dbef0" ,

  });

export const createSession = () => api.post<{ data: Session }>("session");

export const addToCart = (
  sessionId: string,
  organizationId: string,
  productId: string,
  productCount: number,
  additions : [any]
) =>
  api.post<{ data: AddToCart }>("add-to-cart", {
    sessionId: sessionId,
    organizationId: organizationId,
    productId: productId,
    productCount: productCount,
    additions: additions,
  });
export const clearCart = (sessionId: string, organizations: string[]) =>
  api.post("cart-clear", {
    sessionId: sessionId,
    organizations: organizations,
  });

export const viewCart = (sessionId: string, cityId: string) =>
  api.post<{ data: CartData }>("data-cart", {
    sessionId: sessionId,
    cityId: cityId,
  });

export const streetName = (cityUuid: string, name: string) =>
  api.post("street-by-name", { cityUuid: cityUuid, name: name });

export const transferAddress = (
  sessionId: string,
  cityId: string,
  streetGuid: number,
  houseNumber: string,
  pickup: number,
  shop: any,
  organizationId?: string
) => {
  let arr = [shop.uuid]; //pickup === 0 ? shop.branches.map(b => b.id) : shop.uuid;
  // if (pickup === 0) {
  //   arr.unshift(shop.uuid);
  // }
  return api.post("order-address", {
    sessionId: sessionId,
    cityId: cityId,
    streetGuid: streetGuid,
    houseNumber: houseNumber,
    pickup: pickup,
    [pickup === 1 ? "organizationId" : "organizations"]:
      pickup === 1 ? organizationId : arr,
  });
};

export const payForOrder = (
  orderId: string,
  paymentGateway: string,
  orderNumber: string,
  orderSum: any
) =>
  api.post("order-paid-qr", {
    orderId: orderId,
    paymentGateway: paymentGateway,
    orderNumber: orderNumber,
    orderSum: orderSum,
    type: 1,
  });

export const placeOrder = (sessionId: string, cityId: string, data: any) =>
  api.post("order-done", {
    sessionId: sessionId,
    cityId: cityId,
    ...data,
  });

export const auditOrder = (sessionId: string, cityId: string, data: any) =>
  api.post("order-audit", {
    sessionId: sessionId,
    cityId: cityId,
    ...data,
  });
export const orderInfo = (orderId: string) =>
  api.post("order-info", { orderId: orderId });

export const periodTimeApi = (
  sessionId: string,
  cityId: string,
  organizationId: string,
  date: any
) => {
  console.log("-=--=", {
    sessionId: sessionId,
    cityId: cityId,
    organizationId: organizationId,
    date: date,
  });

  return api.post("periods-time", {
    sessionId: sessionId,
    cityId: cityId,
    organizationId: organizationId,
    date: date,
  });
};

export const orderHistoryApi = (phone:string) =>
  api.post("orders-history", {
    phone: phone,
  });

export const orderDateTimeApi = (
  sessionId: string,
  cityId: string,
  organizationId: string,
  deliveryDate: string,
  deliveryTime: string
) =>
  api.post("order-datetime", {
    sessionId: sessionId,
    cityId: cityId,
    organizationId: organizationId,
    deliveryDate: deliveryDate,
    deliveryTime: deliveryTime,
  });

export const userCheckApi = (
  sessionId: string,
  phone: string,
  name: string,
  birthday: string
) =>
  api.post("user-check", {
    sessionId: sessionId,
    phone: phone,
    name: name,
    birthday: birthday,
  });

export const addTable = (
  sessionId: string,
  tableId: string,
  organizationId: string
) =>
  api.post("add-table", {
    sessionId: sessionId,
    tableId: tableId,
    organizationId: organizationId,
  });
