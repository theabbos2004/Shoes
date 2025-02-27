"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import {ProductCardType } from '@/types'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { getKick } from "@/lib/actions/product";
import { ProductFormDetails, ProductFormType} from "@/lib/validation";
import ProductDetailsForm from "@/components/ProductDetailsForm";
import { useToast } from '@/hooks/use-toast'
import { addToCart } from '@/lib/actions/cart'
import { useUserContext } from '@/context/auth-provider'

type PropsType={productId:string}
const ProductDetailsImage: React.FC<React.HTMLAttributes<HTMLDivElement> & PropsType> = 
    ({ className, productId }) => {
    const [kick,setKick]=useState<ProductCardType>()
    const [selectImage,setSelectImage]=useState<string>()
    const {toast }=useToast()
    const {user}=useUserContext()
    useEffect(()=>{
        if(productId) {
            (async ()=>{
                const getDropsKicksRes=await getKick({productId})
                if(getDropsKicksRes?.data && getDropsKicksRes?.data?.imagesUrl){
                    setKick(getDropsKicksRes?.data)
                    setSelectImage(getDropsKicksRes?.data?.imagesUrl[0])
                }
            })()
        } 
    },[productId])
    const onSubmit= async (
        kickForm: ProductFormType
      ): Promise<{ success: boolean; error?: string }> => {
        try {
            if(kick && user){
                const addToCartRes=await addToCart(kickForm,kick,user?.$id)
                if(addToCartRes.error){
                    throw new Error(addToCartRes.error)
                }
                toast({
                    title: "Success",
                    description: `cart was added`,
                  })
            }
            else{
                toast({
                    title: "Error",
                    description: `kick undefind`,
                  })
            }
          return { success: true };
        } catch (error) {
          return { success: false, error: error as string };
        }
      };
    return (
        <div className={cn("container mx-auto gap-10",className)}>
            <div className='relative h-[25rem] md:h-96 md:col-span-2 flex flex-col md:flex-row gap-5'>
                <div className='relative aspect-square rounded-2xl overflow-hidden'>
                    {selectImage && <Image
                        alt="kick's details"
                        src={selectImage}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, 
                        (max-width: 1200px) 50vw, 
                        33vw"
                    />}
                    <div className='absolute bottom-0 left-[50%] translate-x-[-50%] p-3'>
                        <ul className='flex gap-2'>
                            {
                                kick?.imagesUrl?.map((img,indx)=>(
                                    <li 
                                        key={indx} 
                                        className={`size-2 rounded-xl ${img===selectImage ? "bg-primary_1":" bg-gray_2"}`}
                                        onClick={()=>setSelectImage(img)}
                                        >
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <ul className='w-3/4 md:w-auto md:h-full relative grid grid-cols-4 md:grid-cols-1 gap-5'>
                    {
                        kick?.imagesUrl?.map((img,indx)=>(
                            <li key={indx} className='relative aspect-square rounded-xl overflow-hidden'>
                                <Image
                                        alt="kick's details"
                                        src={img}
                                        fill
                                        className="object-cover"
                                        priority
                                        sizes="(max-width: 768px) 8rem, 
                                        (max-width: 1200px) 8rem, 
                                        33vw"
                                        onClick={()=>setSelectImage(img)}
                                    />  
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className='flex flex-col gap-5'>
                <div>
                    <Button variant={"primary"}>New Release</Button>
                </div>
                <div>
                    <h1 className='text-2xl font-semibold text-gray_1'>{kick?.title}</h1>
                    <p className='text-xl font-semibold text-primary_1'>${kick?.price}</p>
                </div>
                {kick?.colors && kick?.sizes && kick?.gender && kick?.types && <ProductDetailsForm
                    defaultValues={{ color: kick?.colors[0], size: kick?.sizes[0],gender:kick?.gender[0],type:kick?.types[0]}}
                    data={kick}
                    onSubmit={onSubmit}
                    schema={ProductFormDetails}
                />}
                <div>
                    <h1 className=' text-xl font-bold uppercase pb-2'>About the product</h1>
                    <span className=' whitespace-pre-line'>
                        {kick?.desc}
                    </span>
                </div>
            </div> 
        </div>
    )
    }

export default ProductDetailsImage