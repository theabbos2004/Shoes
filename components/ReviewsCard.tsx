import { ReviewsType } from '@/types'
import { StarIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export default function ReviewsCard({review}:{review:ReviewsType}) {
  return (
    <div className='bg-gray-50 flex flex-col rounded-xl overflow-hidden'>
        <div className='flex justify-between p-5 gap-3'>
            <div className='flex flex-col gap-2'>
                <h1 className=' text-xl font-extrabold'>{review?.user?.name}</h1>
                <p className=' text-gray_1 line-clamp-2 min-h-14'>{review?.review}</p>
                <div className=' flex gap-1'>
                    <ul className='flex flex-row gap-0'>
                        {
                            Array.from({ length: review?.star || 5 }).map((__,indx)=>(
                                <StarIcon key={indx} fill='var(--orange_1)' className='text-gray-100'/>
                            ))
                        }
                    </ul>
                    {review?.star}
                </div>
            </div>
            <div className='flex justify-center'>
                <Avatar className='size-16 md:size-12'>
                    <AvatarImage src={review?.user?.avatar} className='object-cover object-center'/>
                    <AvatarFallback>{review?.user?.name}</AvatarFallback>
                </Avatar>
            </div>
        </div>
        <div className='relative w-full h-64'>
            {review?.kick?.imagesUrl && <Image
                alt="ReviewImage"
                src={review?.kick?.imagesUrl[0]}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 
                (max-width: 1200px) 50vw, 
                33vw"
                className="object-cover"
            />}
        </div>
    </div>
  )
}
