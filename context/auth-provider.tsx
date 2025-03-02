"use client"
import { currentAccount, getUser } from "@/lib/actions/user";
import { client } from "@/lib/appwriteIO/appwrite";
import config from "@/lib/config";
import { IAuthContextType, UserType } from "@/types";
import { Models } from "appwrite";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

const INITIAL_STATE = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => {return{success:false}},
};

const AuthContext = createContext<IAuthContextType>(INITIAL_STATE);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType|null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkAuthUser = useCallback(async ():Promise<{ success: boolean; error?: string, data?: Models.Document}> => {
    setIsLoading(true);
    try {
      const currentAccountRes = await currentAccount();
      if(!currentAccountRes.data) {
        throw new Error(currentAccountRes.error)
      }
      const getUserRes=await getUser({accountId:currentAccountRes?.data?.$id});
      if(!getUserRes?.data){
        throw new Error(getUserRes.error);
      }
      const user=getUserRes?.data?.documents[0];
      setUser({
        accountId: user.accountId,
        $id: user.$id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        reviews: user.reviews,
        carts: user.carts,
        gender:user.gender
        });
      setIsAuthenticated(true);
      return { success: true, data: user };
    } catch (error) {
      setIsAuthenticated(false);
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    } finally {
      setIsLoading(false);
    }
  },[])

    useEffect(() => {
      checkAuthUser();
      const unSubscribe = client.subscribe([
        "account",
        `databases.${config.env.databaseId}.collections.${config.env.collactionUserId}.documents`,
        `databases.${config.env.databaseId}.collections.${config.env.collactionCartId}.documents`,
      ], () => {
        checkAuthUser()
      });
      return () => unSubscribe();
  }, []);

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUserContext = () => useContext(AuthContext);

