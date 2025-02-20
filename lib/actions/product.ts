import { Query } from "appwrite";
import { databases } from "../appwriteIO/appwrite";
import config from "../config";
import { ProductFormType } from "../validation";
import { Models } from "appwrite";
import { ProductCardType, ProductCardTypeRes } from "@/types";

export const addToCard = async (
    kick: ProductFormType
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      alert(`color:${kick?.color}, size:${kick?.size}`)
      return { success: true };
    } catch (error) {
      return { success: false, error: error as string };
    }
  };

export const getAdvertisements = async (): Promise<{ success: boolean; error?: string, data?: Models.DocumentList<Models.Document> }> => {
    try {
      const result = await databases.listDocuments(
        config.env.databaseId,
        config.env.collactionAdvertisementsId,
        [Query.equal("isActive",true)]
      );
      if(!result) throw Error()
      return { success: true , data:result};
    } catch (error) {
      return { success: false, error: error as string };
    }
  };

export const getKicks = async (): Promise<{ success: boolean; error?: string, data?:{documents:ProductCardType[],total:number} }> => {
    try {
      const result = await databases.listDocuments(
        config.env.databaseId,
        config.env.collactionKickId
      );
      if(!result) throw Error()
      const newResult=result?.documents.map((kick:ProductCardTypeRes)=>{
        return {...kick,status:kick?.status && JSON.parse(kick?.status)}
      })
      return { success: true , data:{...result,documents:newResult}};
    } catch (error) {
      return { success: false, error: error as string };
    }
  };

export const getKick = async ({productId}:{productId:string}): Promise<{ success: boolean; error?: string, data?:ProductCardType }> => {
    try {
      const result = await databases.getDocument(
        config.env.databaseId,
        config.env.collactionKickId,
        productId
      );
      if(!result) throw Error()
      return { success: true , data:result};
    } catch (error) {
      return { success: false, error: error as string };
    }
  };