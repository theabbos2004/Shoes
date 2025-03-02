"use client"
import React, { useEffect, useState } from 'react'
import Bag from './Bag'
import { useUserContext } from '@/context/auth-provider'
import { CartType } from '@/types'
import { client } from '@/lib/appwriteIO/appwrite'
import config from '@/lib/config'
import { ArchiveIcon } from 'lucide-react'
import { createCheckout } from '@/lib/actions/checkout'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import OrderSummry from './OrderSummry'

export default function CartProducts() {
    const {user}=useUserContext()
    const [select, setSelect] = useState<CartType[]>([])
    const {toast}=useToast()
    const route=useRouter()
    useEffect(() => {
      const unSubscribe = client.subscribe([
        `databases.${config.env.databaseId}.collections.${config.env.collactionUserId}.documents`,
        `databases.${config.env.databaseId}.collections.${config.env.collactionCartId}.documents`,
      ], () => {

      });
      return () => unSubscribe();
  }, []);
  const checkoutFunc=async ()=>{
    try{
      if(!user) throw Error("user not found")
      const carts:string[]=[]
      select.forEach((cart)=>carts?.push(cart?.$id))
      const createCheckoutRes=await createCheckout(user,carts)
      if(!createCheckoutRes.data) throw Error(createCheckoutRes?.error)
      localStorage.setItem("checkoutId",createCheckoutRes?.data?.$id)
      route.push("checkout")
    }
    catch(error){
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : error as string,
        type:"foreground",
        variant: "destructive",
      })
    }
  }
  const setSelectFunc=(cart:CartType)=>{
      setSelect((iState)=>{
          const newState=[...iState]
          if(!iState?.includes(cart)){
              newState.push(cart)
          }
          else{
              newState.splice(newState.findIndex((i)=>i===cart),1)
          }
          return newState
      })
    }

  return (
    <div className={`w-full flex flex-col py-5 gap-5`}>
        <div className="w-full grid lg:grid-cols-2 gap-5">
          {
            user && user?.carts?.map((cart,index)=>(
            <Bag key={index} cart={cart} setSelect={setSelectFunc} select={select}/>
          )) 
          }
          {(!user?.carts?.length || !user) && (
            <div className='px-10 gap-5 self-center bg-gray_1 text-gray-50 flex justify-center rounded-lg p-5'>There are no items in your cart  <ArchiveIcon/></div>
            )}
        </div>
        {user?.carts && <OrderSummry checkoutFunc={checkoutFunc} carts={select}/>}
    </div>
  )
}
