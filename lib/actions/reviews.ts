import { Models } from "appwrite";
import { databases } from "../appwriteIO/appwrite";
import config from "../config";

export const getReviews = async ({ condition }: { condition?: string[] }): Promise<{ success: boolean; error?: string, data?: Models.DocumentList<Models.Document> }> => {
    try {
        const result = await databases.listDocuments(
            config.env.databaseId,
            config.env.collactionReviewsId,
            condition
        );
        if (!result) throw Error();
        return { success: true, data: result };
    } catch (error) {
        return { success: false, error: error as string };
    }
};