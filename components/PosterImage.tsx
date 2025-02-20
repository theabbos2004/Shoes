"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { getAdvertisements } from '@/lib/actions/product'
import { ProductCardType } from '@/types'
import { useRouter } from 'next/navigation'

export default function  PosterImage() {
    const [kick,setKick]=useState<ProductCardType>()
    const [selectImage,setSelectImage]=useState<string>()
    const route=useRouter()
    useEffect(()=>{
        (async ()=>{
            const advertisements = await getAdvertisements()
            const kick:ProductCardType=advertisements?.data?.documents[0]?.kick
            let selectImage:string=advertisements?.data?.documents[0]?.kick?.imagesUrl[0]
            setKick(kick)
            setSelectImage(selectImage)
        })()
    },[])
  return (
    <div className='container lg:w-10/12 mx-auto'>    
        <div className='relative rounded-3xl overflow-hidden'>
            <div className="w-full h-[30rem] relative">
                {selectImage && (
                    <Image
                        src={selectImage}  
                        alt="image"
                        fill
                        className="object-cover"
                        priority
                    />
                )}
            </div>
            <div className='absolute top-0 left-0 size-full'>
                <div className='h-2/4 relative flex items-center justify-start'>
                    <span
                        className=" h-4/5 absolute top-1/2 left-0 -translate-y-1/2 -rotate-180 bg-gray_1 text-white text-xs uppercase font-semibold p-2  rounded-bl-xl rounded-tl-xl"
                        style={{ writingMode: 'vertical-rl' }}
                    >
                        Nike product of the year
                    </span>
                </div>
                <div className='h-2/4 flex p-5'>
                    <div className='w-3/4 flex flex-col gap-3 justify-end pr-5'>
                        <div className='text-gray-50 text-2xl font-bold'>{kick?.title}</div>
                        <div className='text-gray-300 text-xl font-semibold'>{kick?.desc}</div>
                        <Button className='self-start  text-gray-50 font-medium uppercase' variant={"primary"} onClick={()=>{route.push(`/product/${kick?.$id}`)}}>Shop Now</Button>
                    </div>
                    <div className='w-3/12 flex flex-col items-end justify-end gap-5'>
                        {
                            kick?.imagesUrl?.filter(kickUrl=>kickUrl!==selectImage).map(kickUrl=>(
                                <div 
                                    key={kickUrl}
                                    className="relative flex-1 aspect-square rounded-2xl border-2 border-gray-50 overflow-hidden"
                                    onClick={()=>setSelectImage(kickUrl)}
                                    >
                                    <Image
                                        src={kickUrl}
                                        alt="image-child"
                                        fill
                                        className="object-cover"
                                        priority
                                        sizes="(max-width: 768px) 6rem, 
                                        (max-width: 768px) 10rem, 
                                        33vw"
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
