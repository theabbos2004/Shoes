import { UserType } from "@/types";
import config from "../config";
import { ID, Models } from "appwrite";
import { databases } from "../appwriteIO/appwrite";

export const createCheckout = async (
    user:UserType,
    carts:string[]
  ): Promise<{ success: boolean, data?:Models.Document, error?: string }> => {
    try {
        const result = await databases.createDocument(
            config.env.databaseId,
            config.env.collactionCheckoutsId,
            ID.unique(),
            {
              user:user?.$id,
              carts
            }
          );
        if(!result) throw Error()
        return { success: true, data:result };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : error as string};
    }
  };

export const getCheckout = async (
    checkoutId:string
  ): Promise<{ success: boolean, data?:Models.Document, error?: string }> => {
    try {
        const result = await databases.getDocument(
            config.env.databaseId,
            config.env.collactionCheckoutsId,
            checkoutId
          );
        if(!result) throw Error()
        return { success: true, data:result };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : error as string};
    }
  };

export const delCheckout = async (
    checkoutId:string
  ): Promise<{ success: boolean,error?: string }> => {
    try {
        const result = await databases.deleteDocument(
            config.env.databaseId,
            config.env.collactionCheckoutsId,
            checkoutId
          );
        if(!result) throw Error()
        return { success: true};
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : error as string};
    }
  };