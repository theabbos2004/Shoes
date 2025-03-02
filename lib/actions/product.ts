import { ID, Query } from "appwrite";
import { databases } from "../appwriteIO/appwrite";
import config from "../config";
import { Models } from "appwrite";
import { ProductCardType, ProductCardTypeRes } from "@/types";

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

export const createKick = async (): Promise<{ success: boolean; error?: string, data?:ProductCardType }> => {
    try {
      const result = await databases.createDocument(
        config.env.databaseId,
        config.env.collactionKickId,
        ID.unique(),
        {
          colors: ["black","blue","red"],
          desc: "Shadow Navy / Army Green\n\nThis product is excluded from all promotional discounts and offers.\n\nPay over time in interest-free installments with Affirm, Klarna or Afterpay.Join adiClub to get unlimited free standard shipping, returns, & exchanges",
          gender: ["men"],
          imagesUrl: [
            "https://cloud.appwrite.io/v1/storage/buckets/67c2e8ca0005c3afaeac/files/67c2e8fb001ed104e28a/view?project=67c2e596001348a7a0c9&mode=admin",
            "https://cloud.appwrite.io/v1/storage/buckets/67c2e8ca0005c3afaeac/files/67c2e8fb001ed104e28a/view?project=67c2e596001348a7a0c9&mode=admin",
            "https://cloud.appwrite.io/v1/storage/buckets/67c2e8ca0005c3afaeac/files/67c2e8fb001ed104e28a/view?project=67c2e596001348a7a0c9&mode=admin",
            "https://cloud.appwrite.io/v1/storage/buckets/67c2e8ca0005c3afaeac/files/67c2e8fb001ed104e28a/view?project=67c2e596001348a7a0c9&mode=admin",
            ],
          price: 599,
          sizes: ["38","40","41"],
          status: JSON.stringify({ title: "new", main: "new" }),
          title: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
          types: ["sport"],
        }
      );
      if(!result) throw Error()
      return { success: true , data:result};
    } catch (error) {
      return { success: false, error: error as string };
    }
  };

  export const getAdvertisementsListing = async (): Promise<{ success: boolean; error?: string, data?: Models.DocumentList<Models.Document> }> => {
    try {
      const result = await databases.listDocuments(
        config.env.databaseId,
        config.env.collactionAdvertisementsListingId,
        [Query.equal("isActive",true)]
      );
      if(!result) throw Error()
      return { success: true , data:result};
    } catch (error) {
      return { success: false, error: error as string };
    }
  };
