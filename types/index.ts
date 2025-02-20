
export interface NavType{
    label:string,
    route:string
}
export interface UserType{
    id:string,
    avatar:string,
    name:string,
    email:string,
    password:string,
    reviews:string,
}
export enum Colors { 
    Orange = "orange",
    Red = "red",
    Blue = "blue",
    Green = "green",
    Black = "black",
    White = "white",
}

export type productSize = "38" | "39" | "40" | "41" | "42" | "43" | "44" | "45" | "46" | "47";
export type productType = "running" | "sport";
export type productGender = "men" | "women";

export interface ProductCardType {
    $collectionId: string;
    $createdAt: string;
    $databaseId: string;
    $id: string;
    $permissions: (string | null)[];
    $updatedAt: string;
    colors?: Colors[];
    desc?: string;
    gender?: productGender[];
    imagesUrl?: string[];
    price?: number;
    sizes?: productSize[];
    status?: { title: string; main: string }
    title?: string;
    types?: productType[];
    reviews?:ReviewsType[],
}
export interface ProductCardTypeRes extends Omit<ProductCardType, 'status'> { 
    status?: string;
}


export interface FilterProductsType{
    sizes:ProductCardType[],
    colors:`${Colors}`[],
    types:productType[],
    gender:productGender[],
    price:number,
}


export interface ReviewsType {
    $collectionId: string,
    $createdAt: string,
    $databaseId:string,
    $id:string,
    $permissions:(string|null)[],
    $updatedAt:string,
    user?:UserType,
    review?:string,
    star?:number,
    kick?:ProductCardType
}

export interface categoriesType {
    id:string,
    title:string,
    imageUrl:string
}

export interface FilterValues{
  sizes: number[];
  colors: string[];
  categories: string[];
  genders: string[];
  price: number[];
};
