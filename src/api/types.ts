export type User = {
  sessionId: string;
  name: string;
  phone: number;
  birthday: number;
  gender: string;
};

export type UserParams = {
  sessionId: string;
  phone: number;
  getSession: number;
};

export type SmsParams = {
  sessionId: string;
  phone: number;
  //addressIp: string;
};

export type ValidCodeParams = {
  code: number;
  type: number;
};

export type City = {
  active: boolean;
  categories: string[];
  _id: string;
  uuid: string;
  name: string;
  transliteration: string;
  updated: string;
  __v: number;
};

export type GetShopsParams = {
  cityUuid: string;
  limit: number;
  random: number;
  name: string;
};

export type DeliveryParameters = {
  minimumAmountOfOrder: string;
  deliveryPrice: string;
  freeDeliverSum: string;
};

export type Branch = {
  _id: string;
  id: string;
  name: string;
  addressId: string;
  street: string;
  house: string;
};

export type Numbers = {
  deliveryNumber: string;
  pickupNumber: string;
};

export type WorkingHours = {
  _id: string;
  from: string;
  to: string;
};

export type Categories = {};

export type Shop = {
  _id: string;
  uuid: string;
  cityUuid: string;
  name: string;
  transliteration: string;
  active: boolean;
  description: string;
  logo: string;
  updated: string;
  __v: number;
  numbers: Numbers;
  DeliveryParameters: DeliveryParameters;
  Categories: Categories[];
  branches: Branch[];
  workingHours: WorkingHours[];
  paymentGateway : string;
};

export type Specification = {};

export type Product = {
  show: boolean;
  active: boolean;
  available: boolean;
  onlyWithSpecifications: boolean;
  groupWith: string;
  groupName: string;
  groupWeight: string;
  quantity: number;
  calories: number;
  fat: number;
  protein: number;
  carbohydrate: number;
  weight: string;
  _id: string;
  uuid: string;
  organizationUuid: string;
  name: string;
  price: string;
  fakeprice: string;
  categoryUuid: string;
  description: string;
  measure: string;
  image: string;
  imageGrid: string;
  specifications: Specification[];
  updated: string;
  __v: number;
};

export type Session = {
  success: boolean;
  sessionId: string;
};

export type AddToCart = {
  success: boolean;
};

export type OrganizationInfo = {
  _id: string;
  uuid: string;
  cityUuid: string;
  name: string;
  transliteration: string;
  active: boolean;
  branches: Branch[];
};

export type CartItems = {
  productCount: number;
  gift: number;
  additions: [];
  productInfo: {
    show: boolean;
    active: boolean;
    available: boolean;
    onlyWithSpecifications: boolean;
    groupWith: string;
    groupName: string;
    groupWeight: string;
    quantity: number;
    calories: number;
    fat: number;
    protein: number;
    carbohydrate: number;
    weight: string;
    _id: string;
    uuid: string;
    organizationUuid: string;
    name: string;
    price: string;
    fakeprice: string;
    categoryUuid: string;
    description: string;
    measure: string;
    image: string;
    imageGrid: string;
    updated: string;
    __v: number;
  };
};
export type CartData = {
  organizationInfo: OrganizationInfo;
  cartPrice: number;
  deliveryPrice: number;
  discountSum: number;
  sum: number;
  productsCount: number;
  cart: CartItems[];
};
