"use client"
import React, { useContext, useEffect, useState } from 'react'
import TitleComponent from './TitleComponent'
import { Button } from './ui/button'
import { ReviewsType } from '@/types'
import ReviewsCard from './ReviewsCard'
import { ThemeContext } from '@/context/theme-provider'
import { getReviews } from '@/lib/actions/reviews'
import { Query } from 'appwrite'
import { client } from '@/lib/appwriteIO/appwrite'
import config from '@/lib/config'

export default function Reviews() {
    const {screen}=useContext(ThemeContext)
    const [reviews,setReviews]=useState<ReviewsType[]>()
    useEffect(()=>{
        const getReviewsFunc=async()=>{
            const reviewsRes=await getReviews({condition:[Query.greaterThanEqual("star", 3)]})
            if(reviewsRes?.success){
                const number=screen?.width>1024 ? 3  : 2
                setReviews(reviewsRes?.data?.documents.slice(0,number))
            }
        }
        getReviewsFunc()
        if(screen?.width){
            getReviewsFunc()
        }
        const unSubscribe = client.subscribe([
            "account",
            `databases.${config.env.databaseId}.collections.${config.env.collactionReviewsId}.documents`,
        ], () => {
            getReviewsFunc()
        })
        return () => unSubscribe();
    },[screen?.width])
  return (
    <section>
        <div className=' container mx-auto'>
            <TitleComponent
                className='py-5'
                title='Reviews'
                leftElement={<Button variant={"primary"} >See All</Button>}
            />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    reviews?.map((review)=>(
                        <ReviewsCard key={review?.$id} review={review}/>
                    ))
                }
            </div>
        </div>
    </section>
  )
}
