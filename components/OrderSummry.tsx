"use client"
import React from 'react'
import { Button } from './ui/button'
import { CartType } from '@/types'

interface Props{
  carts?:CartType[],
  checkoutFunc?:()=>void,
  variant?:"checkout"
}
export default function OrderSummry({carts,checkoutFunc,variant}:Props) {
  const totalFunc=()=>{
    let total=0
    carts?.map((cart)=>total+=cart.price as number)
    return total
  }
  const handleSubmit=()=>{
    if(checkoutFunc) checkoutFunc()
  }
  return (
    <div className={`w-full flex flex-col justify-around gap-2 p-5 ${variant==="checkout" && "bg-gray-50 rounded-xl"}`}>
          <h1 className=" font-semibold text-2xl text-gray_1 capitalize">Order Summary</h1>
          <div className="flex flex-col gap-1 text-gray_1">
              <p className="flex justify-between">{carts?.length} ITEM 
                <span className='flex gap-2'>
                  {
                    carts?.length?(
                      carts?.map((cart,indx)=><span key={cart?.$id}>${cart?.price}  {indx!==carts.length-1 && "+"}</span>)
                    ):0
                  }
                </span>
                </p>
              <p className="flex justify-between">Delivery  <span>$6.99</span></p>
              <p className="flex justify-between">Sales Tax  <span>-</span></p>
              <p className="flex justify-between font-semibold">Total  <span>${totalFunc()}</span></p>
          </div>
          <Button 
            onClick={handleSubmit} 
            variant={"secondary"} 
            disabled={carts?.length?false:true}
            className={`${variant==="checkout" && "hidden"}`}
            >
              Checkout
          </Button>
          <p className={`${variant==="checkout" && "hidden"}`}>User a promo code</p>
      </div>
  )
}
