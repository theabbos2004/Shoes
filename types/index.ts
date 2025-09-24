import { Models } from "appwrite";
import { Dispatch, SetStateAction } from "react";

export interface ScreenType {
    width: number,
    height: number
}
export interface NavType {
    label: string,
    route: string
}
export interface UserType {
    accountId: string,
    $id: string,
    avatar?: string,
    name: string,
    lastName: string,
    email: string,
    password: string,
    reviews?: ReviewsType[],
    carts?: CartType[],
    gender: ProductGender
}
export interface IAuthContextType {
    user: UserType | null,
    isLoading: boolean,
    isAuthenticated: boolean,
    setUser: Dispatch<SetStateAction<UserType | null>>,
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>,
    checkAuthUser: () => Promise<{ success: boolean; error?: string, data?: Models.Document }>
}
export enum Colors {
    Orange = "orange",
    Red = "red",
    Blue = "blue",
    Green = "green",
    Black = "black",
    White = "white",
}
export type ProductSize = "38" | "39" | "40" | "41" | "42" | "43" | "44" | "45" | "46" | "47";
export enum ProductType {
    Running = "running",
    Sport = "sport"
}
export enum ProductGender {
    Men = "men",
    Women = "women"
}

export interface ProductCardType {
    $collectionId: string;
    $createdAt: string;
    $databaseId: string;
    $id: string;
    $permissions: (string | null)[];
    $updatedAt: string;
    colors?: Colors[];
    desc?: string;
    gender?: ProductGender[];
    imagesUrl?: string[];
    price?: number;
    sizes?: ProductSize[];
    status?: { title: string; main: string }
    title?: string;
    types?: ProductType[];
    reviews?: ReviewsType[],
}
export interface ProductCardTypeRes extends Omit<ProductCardType, 'status'> {
    status?: string;
}


export interface FilterProductsType {
    sizes: ProductCardType[],
    colors: `${Colors}`[],
    types: ProductType[],
    gender: ProductGender[],
    price: number,
}


export interface ReviewsType {
    $collectionId: string,
    $createdAt: string,
    $databaseId: string,
    $id: string,
    $permissions: (string | null)[],
    $updatedAt: string,
    user?: UserType,
    review?: string,
    star?: number,
    kick?: ProductCardType
}

export interface categoriesType {
    id: string,
    title: string,
    imageUrl: string
}

export interface FilterValues {
    sizes: string[];
    colors: string[];
    categories: string[];
    genders: string[];
    price: number[];
};

export interface AdvertisingCardType {
    $collectionId?: string,
    $createdAt?: string,
    $databaseId?: string,
    $id?: string,
    $permissions?: string[],
    $updatedAt?: string
    title?: string;
    discount?: string;
    desc?: string;
    image?: string;
    isActive?: boolean,
};
export interface CartType {
    $collectionId: string,
    $createdAt: string,
    $databaseId: string,
    $id: string,
    $permissions: string[],
    $updatedAt: string
    user?: UserType,
    color?: string,
    gender?: ProductGender[],
    price?: number,
    size?: ProductSize,
    status: { title: string; main: string },
    type?: ProductType,
    kick?: ProductCardType,
};

export interface CheckoutType {
    $collectionId: string,
    $createdAt: string,
    $databaseId: string,
    $id: string,
    $permissions: string[],
    $updatedAt: string
    user?: UserType,
    carts?: CartType[]
};
export interface CartTypeRes extends Omit<CartType, 'status'> {
    status?: string;
}
