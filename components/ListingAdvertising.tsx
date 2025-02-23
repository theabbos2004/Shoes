"use client";
import React, { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Image from "next/image";
import { getAdvertisementsListing } from "@/lib/actions/product";
import { AdvertisingCardType } from "@/types";

export default function ListingAdvertising(){
  const [advertisings, setAdvertisings] = useState<AdvertisingCardType[]>();
  useEffect(() => {
    (async () => {
      const response = await getAdvertisementsListing();
      if (response.data) {
        setAdvertisings(response.data?.documents);
      }
    })()
  },[]);
  return (
      <Carousel className="w-full rounded-xl">
        <CarouselContent className='ml-0'>
          {
            advertisings?.map((advertising,index)=>(
                <CarouselItem key={index} className={`relative overflow-hidden rounded-2xl min-h-56 md:min-h-72 grid grid-cols-3 gap-5 p-5`}>
                  {advertising?.image && <Image
                    src={advertising?.image}
                    alt='advertising card'
                    fill
                    priority
                    className="object-cover object-center"
                  />}
                  <div className='w-3/4 md:w-5/12 px-5 md:p-5 flex flex-col gap-1 md:gap-2 absolute left-0 bottom-5 md:bottom-auto md:top-2/4 md:-translate-y-2/4'>
                    <div className='text-gray_2 md:text-2xl '>{advertising?.title}</div>
                    <div className='text-white font-semibold text-3xl md:text-5xl '>{advertising?.discount}</div>
                    <div className='text-gray_2 md:text-xl line-clamp-2 md:line-clamp-3'>{advertising?.desc}</div>
                  </div>
                </CarouselItem>
              ))
            }
        </CarouselContent>
      </Carousel>
  )
}

