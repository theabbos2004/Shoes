"use client"
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { ProductCardType, screenType } from '@/types';
import ProductCard from './ProductCard';
import TitleComponent from './TitleComponent';
import { getKicks } from '@/lib/actions/product';
import { ThemeContext } from '@/context/theme-provider';
import { useRouter } from 'next/navigation';
import { client } from '@/lib/appwriteIO/appwrite';
import config from '@/lib/config';

export default function NewDrops() {
    const [kicks,setKicks]=useState<ProductCardType[]>()
    const {screen}=useContext(ThemeContext)
    const router = useRouter()
    const getKicksApp=useCallback(async (screen:screenType)=>{
        const kicks = await getKicks()
        if(kicks.success){
            const number=screen?.width>1280 ? 5 : screen?.width>1024 ? 4: screen?.width>768?3:4
            setKicks(kicks.data?.documents.slice(0,number))
        }
    },[])
    useEffect(()=>{
        if(screen?.width){
            getKicksApp(screen)
        }
        const unSubscribe = client.subscribe([
            "account",
            `databases.${config.env.databaseId}.collections.${config.env.collactionKickId}.documents`,
        ], () => {
            getKicksApp(screen)
        })
        return () => unSubscribe();
    },[screen,getKicksApp])
  return (
    <section className='container mx-auto'>
        <div className='flex flex-col gap-5'>
            <TitleComponent
                title='Don’t miss out new drops'
                leftElement={<Button variant={"primary"} onClick={()=>{router.push('/listing-page')}}>Shop new drops</Button>}
            />
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
                {
                kicks?.map((kick:ProductCardType)=>(
                    <ProductCard key={kick?.$id} kick={kick}/>
                ))   
                }
            </div>
        </div>
    </section>
  )
}
