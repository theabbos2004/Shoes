import * as React from "react";

import { cn } from "@/lib/utils";
import { CartType } from "@/types";
import TitleComponent from "./TitleComponent";
import Image from "next/image";
import { ArchiveXIcon, HeartIcon } from "lucide-react";
import { Checkbox } from "./ui/checkbox";


export interface BagType extends React.HTMLAttributes<HTMLDivElement>{
    cart:CartType,
    setSelect:React.Dispatch<React.SetStateAction<CartType[]>>
}
const Bag = React.forwardRef<HTMLDivElement, Partial<BagType>>(
  ({ className, cart, setSelect ,...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-5 bg-gray-50 rounded-xl p-5",className)}
        {...props}
      >
            <div className="flex justify-between">
                <TitleComponent
                    className="w-2/3"
                    title="Your Bag"
                    subTitle="Items in your bag not reserved- check out now to make them yours."
                />
                <Checkbox 
                    className="bg-gray_2 text-primary_1 size-5 font-semibold"
                    onCheckedChange={()=>{
                        if(cart && setSelect){
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
                    }}
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
                            />
                            )
                        }
                    </div>
                </div>
                <div className="w-3/4 flex flex-col gap-5">
                    <div className="flex justify-between">
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
                    <div className="flex gap-2 text-gray_1">
                        <HeartIcon height={"1.25rem"} className=" cursor-pointer"/>
                        <ArchiveXIcon height={"1.25rem"} className=" cursor-pointer"/>
                    </div>
                </div>
            </div>
      </div>
    );
  }
);

Bag.displayName = "Bag";

export default Bag 
