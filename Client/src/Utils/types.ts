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
    categoryId:string;
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

export type ProductCardProps = {
    id: number,
    name:string,
    price:number,
    colorCodes:string[],
    percentOff:number
}