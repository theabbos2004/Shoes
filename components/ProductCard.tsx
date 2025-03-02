import { ProductCardType } from '@/types'
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button';
import Link from 'next/link';


export default function ProductCard({ kick }: { kick: ProductCardType }) {
    return (
      <Link href={`/product/${kick?.$id}`} as={`/product/${kick?.$id}`} className="w-full self-baseline flex flex-col justify-between gap-3">
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden border-gray-50 border-[0.4rem] md:border-[0.5rem]">
            {kick?.status && (
            <span
                className={`absolute z-[1] top-0 left-0 text-xs font-semibold px-2 py-1 rounded-tl-md rounded-br-2xl ${
                kick?.status?.title === "new" ? "bg-blue-500 text-white" : "bg-orange_1 text-gray_1"
                }`}
            >
                {kick?.status?.main}
            </span>
            )}
          {kick?.imagesUrl && <Image
            alt={kick?.title || "Product Image"}
            src={kick?.imagesUrl[0]}
            fill
            priority
            className="object-cover transition-transform duration-300 hover:scale-125"
            sizes="(max-width: 768px) 100vw, 
            (max-width: 1200px) 50vw, 
            33vw"
          />}
        </div>
        <h3 className="text-sm min-h-10 text-center  text-black uppercase font-semibold line-clamp-2">{kick?.title}</h3>
        <Button className='w-full' variant={"secondary"}>
          <span>View Product -</span>
          <span className='text-orange_1'>${kick?.price}</span>
        </Button>
      </Link>
    );
  }
  