export type Order = {
  id:number;
  total:number;
  clientName:string;
  shippingCity: string;
  shippingCountry: string;
  shippingAddress: string;
  shippingPostalCode: string;
  shippingState: string;
  billingCity: string;
  billingCountry: string;
  billingAddress: string;
  billingPostalCode: string;
  billingState: string;
  paymentMethod:string;
  placedAt:string;
  products: ProductOrder[];
}
export type ProductOrder = {
  id:number;
  name:string;
  material:string;
  description:string;
  dimensions:string;
  lightSource:string;
  price:number;
  percentOff:number;
  quantity:number;
  variant:string;
}

  export type Product = {
    id?:number,
    name:string,
    material:string,
    description:string,
    dimensions:string,
    lightSource:string,
    price?:number,
    stripeId: string,
    percentOff?:number,
    keywords:string[],
    categoryId:number;
    visible: boolean;
    variants: Variant[]
}
export type Variant = {
  id:number,
  name:string,
  colorCode:string,
  productId:number
}

export type ProductQueryParameters = {
  categoryId?:string,
  Material?:string,
  LightSource?:string,
  Discounted?:boolean,
  Keywords?:string
}

export type UserContactProps = {
  name: string;
    email: string;
    phone: string;
    addressCity: string;
    addressCountry: string;
    addressLine1: string;
    addressLine2: string;
    addressPostalCode: string;

    shippingCity: string;
    shippingCountry: string;
    shippingLine1: string;
    shippingLine2: string;
    shippingPostalCode: string;
    shippingState: string;
};

export type PostProduct = {
  name:string;
  categoryId:number;
  material:string;
  description:string;
  height:number;
  width:number;
  length:number
  weight:number;
  lightSource:string;
  price:number;
  keywords:string[]
}

export type CarouselProps = {
  id: number;
  name: string;
  url?: string;
  productId:number
};