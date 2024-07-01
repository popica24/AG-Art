export type ToDoLamp = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    city: string;
    addressLine1: string;
    addressLine2: string;
    postalCode: string;
    state: string;
    phone: string;
    clientName: string;
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
};