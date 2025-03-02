"use client"
import * as React from "react";

import { cn } from "@/lib/utils";
import { CartType } from "@/types";
import TitleComponent from "./TitleComponent";
import Image from "next/image";
import { ArchiveXIcon } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { deleteCart } from "@/lib/actions/cart";
import { useToast } from "@/hooks/use-toast";


export interface BagType extends React.HTMLAttributes<HTMLDivElement>{
    cart:CartType,
    setSelect:(cart:CartType)=>void,
    select:CartType[],
    variant?:"checkout"
}
const Bag = React.forwardRef<HTMLDivElement, Partial<BagType>>(
  ({ className, cart, select, setSelect , variant ,...props }, ref) => {
    const {toast}=useToast()
    const deleteCartFunc=async (cart:CartType)=>{
        try{
            const deleteCartRes =await deleteCart(cart)
            if(!deleteCartRes.success) throw Error(deleteCartRes.error)
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
    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-5 bg-gray-50 rounded-xl p-5",className)}
        {...props}
        onClick={()=>cart && setSelect && setSelect(cart)}
      >
            <div className="flex justify-between">
                <TitleComponent
                    className="w-2/3"
                    title={variant==="checkout"?"Order Details" : "Your Bag"}
                    subTitle={variant==="checkout"?"" : "Items in your bag not reserved- check out now to make them yours."}
                />
                <Checkbox
                    className={`bg-gray_2 text-primary_1 size-5 font-semibold ${variant==="checkout" && "hidden"}`}
                    checked={select && cart && select.some(selectCart => cart.$id === selectCart?.$id)}
                    onCheckedChange={()=>cart && setSelect && setSelect(cart)}
                />
            </div>
            <div className="flex gap-5">
                <div className="w-1/4 flex items-center">
                    <div className="relative aspect-square w-full rounded-lg overflow-hidden shadow-xl">
                        {
                        cart && cart.kick && cart.kick.imagesUrl &&  (
                            <Image
                                    alt="cartImage"
                                    src={cart?.kick?.imagesUrl[0]}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 
                                    (max-width: 1200px) 50vw, 
                                    33vw"
                                    className="object-cover"
                            />
                            )
                        }
                    </div>
                </div>
                <div className="w-3/4 flex flex-col gap-5">
                    <div className={`flex justify-between ${variant==="checkout" && "flex-col gap-5"}`}>
                        <div className="flex flex-col gap-1 text-gray_1">
                            <h1 className="text-lg font-semibold uppercase">DROPSET TRAINER SHOES</h1>
                            <p><span className="capitalize">{cart?.gender}&apos;s</span> Road {cart?.type} Shoes </p>
                            <p className="capitalize">{cart?.color}</p>
                            <div className="flex gap-5">
                                <p>
                                    size {cart?.size}
                                </p>
                                <p>
                                    Quantity 1
                                </p>
                            </div>
                        </div>
                        <p className="text-primary_1 font-bold">${cart?.kick?.price}</p>
                    </div>
                    <div className={`flex gap-2 text-gray_1 ${variant==="checkout" && "hidden"}`}>
                        {cart && <ArchiveXIcon 
                            onClick={async (e)=>{
                                e.stopPropagation()
                                deleteCartFunc(cart)
                            }}
                            height={"1.25rem"} className=" cursor-pointer"/>}
                    </div>
                </div>
            </div>
      </div>
    );
  }
);

Bag.displayName = "Bag";

export default Bag 
