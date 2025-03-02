"use client"
import Bag from '@/components/Bag'
import OrderSummry from '@/components/OrderSummry'
import ShippingForm from '@/components/ShippingForm'
import { useUserContext } from '@/context/auth-provider'
import { useToast } from '@/hooks/use-toast'
import { deleteCart } from '@/lib/actions/cart'
import { delCheckout, getCheckout } from '@/lib/actions/checkout'
import { CheckOutFormType } from '@/lib/validation'
import { CheckoutType } from '@/types'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function Page() {
  const {checkAuthUser}=useUserContext()
  const [checkout,setCheckout]=useState<CheckoutType>()
  const { toast } = useToast()
    const router = useRouter()
  useEffect(()=>{
    const checkoutId=localStorage.getItem("checkoutId")
    if(checkoutId){
      (async ()=>{
        try{
          const getCheckoutRes = await getCheckout(checkoutId)
          if(!getCheckoutRes.data) throw Error(getCheckoutRes?.error)
          setCheckout(getCheckoutRes.data)
        }
        catch(error){
          toast({
            title: "Error",
            description: error instanceof Error ? error.message : error as string,
            type:"foreground",
            variant: "destructive",
          })
        }
      })()
    }
  },[toast])
  const checkoutSubmit=async (data:CheckOutFormType):Promise<{success:boolean,error?:string}>=>{
    if(!checkout) throw Error("not found checkout")
      const delCheckoutRes=await delCheckout(checkout?.$id)
      if(delCheckoutRes?.error) throw Error()
        checkout.carts?.forEach(async (cart)=>{
      const deleteCartRes=await deleteCart(cart)
      if(deleteCartRes.error) throw Error(deleteCartRes.error)
      })
      checkAuthUser()
      console.log(data);
      router.push('/')
      try{
        toast({
          title: 'Success',
          description: "Your order has been received.",
        })
        return {success:true}
      }
    catch (error) {
      toast({
        title: 'Success',
        description: error instanceof Error ? error.message : error as string,
      })
      return {success:false, error : error instanceof Error ? error.message : error as string}
    }
  }
  return (
    <section className='p-10 container mx-auto flex flex-col-reverse lg:flex-row gap-5'>
        <ShippingForm className='w-full lg:w-[60%]' onSubmit={checkoutSubmit}/>
        <div className='lg:w-[40%] flex flex-col gap-5'>
          <OrderSummry carts={checkout?.carts} variant="checkout"/>
          <div className="w-full grid lg:grid-cols-1 gap-5">
            {
              checkout?.carts && checkout?.carts?.map((cart,index)=>(
                <Bag key={index} cart={cart} variant="checkout"/>
              )) 
            }
          </div>
        </div>
    </section>
  )
}
