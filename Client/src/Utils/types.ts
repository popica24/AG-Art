export type Product = {
    id?:number,
    name:string,
    material:string,
    description:string,
    dimensions:string,
    lightSource:string,
    price?:number,
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
    categoryId?:number,
    Material?:string,
    LightSource?:string,
    Discounted?:boolean,
    Keywords?:string
}

export type ProductCardProps = {
    id: number,
    name:string,
    price:number,
    colorCodes:string[],
    percentOff:number
}

export type UserData = {
    email:string;
    firstName:string;
    lastName:string;
    phoneNumber:string;
    customer:string;
    shippingDetails: ShippingDetails;
    billingDetails: BillingDetails;
}

type ShippingDetails = {
    phone:string;
    street:string;
    zipCode:string;
    city:string;
    countryCode:string;
    state:string;
}

type BillingDetails = {
    street:string;
    zipCode:string;
    city:string;
    countryCode:string;
    state:string;
}

export type Order = {
    id:number;
    name: string;
    price: number;
    quantity: number;
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
    clientName: string;
}