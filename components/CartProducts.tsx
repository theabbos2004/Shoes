"use client"
import React, { useState } from 'react'
import Bag from './Bag'
import { Button } from './ui/button'
import { useUserContext } from '@/context/auth-provider'
import { CartType } from '@/types'

export default function CartProducts() {
    const {user}=useUserContext()
    const [select, setSelect] = useState<CartType[]>([])
    const totalFunc=()=>{
      let total=0
      select?.map((cart)=>total+=cart.price as number)
      return total
    }
  return (
    <div className='w-full flex flex-col py-5'>
        <div className="w-full grid lg:grid-cols-2 gap-5">
          {
            user && user?.carts?.map((cart,index)=>(
            <Bag key={index} cart={cart} setSelect={setSelect}/>
          )) 
          }
        </div>
        <div className="w-full flex flex-col justify-around gap-2 p-5">
            <h1 className=" font-semibold text-2xl text-gray_1 capitalize">Order Summary</h1>
            <div className="flex flex-col gap-1 text-gray_1">
                <p className="flex justify-between">{select.length} ITEM 
                  <span className='flex gap-2'>
                    {
                      select.length?(
                        select?.map((cart,indx)=><span key={cart?.$id}>${cart?.price}  {indx!==select.length-1 && "+"}</span>)
                      ):0
                    }
                  </span>
                  </p>
                <p className="flex justify-between">Delivery  <span>$6.99</span></p>
                <p className="flex justify-between">Sales Tax  <span>-</span></p>
                <p className="flex justify-between font-semibold">Total  <span>{totalFunc()}</span></p>
            </div>
            <Button variant={"secondary"} disabled={select.length?false:true}>Checkout</Button>
            <p>User a promo code</p>
        </div>
    </div>
  )
}
