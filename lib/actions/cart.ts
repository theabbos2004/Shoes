import { CartType, CartTypeRes, ProductCardType } from "@/types";
import { databases } from "../appwriteIO/appwrite";
import config from "../config";
import { ID, Models } from "appwrite";
import { ProductFormType } from "../validation";

export const addToCart = async (
    kickForm: ProductFormType,
    kick:ProductCardType,
    userId:string
  ): Promise<{ success: boolean, data?:Models.Document, error?: string }> => {
    try {
        const result = await databases.createDocument(
            config.env.databaseId,
            config.env.collactionCartId,
            ID.unique(),
            {
                user:userId,
                kick:kick?.$id,
                status:JSON.stringify(kick?.status),
                price:kick?.price,
                ...kickForm,
            }
          );
        if(!result) throw Error()
        return { success: true, data:result };
    } catch (error) {
      return { success: false, error: error as string };
    }
  };

export const getCarts = async (): Promise<{ success: boolean, data?:{documents:CartType[],total:number} ,error?: string }> => {
    try {
        const result = await databases.listDocuments(
            config.env.databaseId,
            config.env.collactionCartId,
          );
        if(!result) throw Error()
        const newResult=result?.documents.map((cart:CartTypeRes)=>{
          return {...cart,status:cart?.status && JSON.parse(cart?.status)}
        })
        return { success: true , data:{...result,documents:newResult}};
    } catch (error) {
      return { success: false, error: error as string };
    }
  };