import { Models, Query } from "appwrite";
import { account, databases, ID } from "../appwriteIO/appwrite";
import config from "../config";

// Account 
export const createAccount = async ({ email, password, name }: { email: string, password: string, name: string }): Promise<{ success: boolean; error?: string, data?: Models.User<Models.Preferences> }> => {
    try {
        const result = await account.create(
            ID.unique(),
            email,
            password,
            name
        );
        if (!result) throw Error()
        return { success: true, data: result };
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
};
export const currentAccount = async (): Promise<{ success: boolean; error?: string, data?: Models.User<Models.Preferences> }> => {
    try {
        const result = await account.get();
        if (!result) throw Error()
        return { success: true, data: result };
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
};


export const signInAccount = async ({ email, password }: { email: string, password: string }): Promise<{ success: boolean; error?: string, data?: Models.Session }> => {
    try {
        const result = await account.createEmailPasswordSession(email, password)
        if (!result) throw Error()
        return { success: true, data: result };
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
};

export const signOutAccount = async (): Promise<{ success: boolean; error?: string, data?: Models.User<Models.Preferences> }> => {
    try {
        const result = await account.deleteSession("current");
        if (!result) throw Error()
        return { success: true };
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
};

// User

export const createUser = async ({ accountId, email, password, name, lastName, gender }: { email: string, password: string, name: string, accountId: string, lastName: string, gender: string })
    : Promise<{ success: boolean; error?: string, data?: Models.Document }> => {
    try {
        const result = await databases.createDocument(
            config.env.databaseId,
            config.env.collactionUserId,
            ID.unique(),
            {
                accountId,
                email,
                password,
                name,
                lastName,
                gender
            }
        );
        if (!result) throw Error()
        return { success: true, data: result };
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
};

export const getUser = async ({ accountId}: {accountId: string})
    : Promise<{ success: boolean; error?: string, data?: Models.DocumentList<Models.Document> }> => {
    try {
        const result = await databases.listDocuments(
            config.env.databaseId,
            config.env.collactionUserId,
            [Query.equal('accountId', accountId)],
        );
        if (!result) throw Error()
        if (result.total===0) {
            throw new Error("User not found")
        }
        return { success: true, data: result };
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
};