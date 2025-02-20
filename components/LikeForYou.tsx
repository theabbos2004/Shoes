"use client"
import React, { useContext, useEffect, useRef, useState } from 'react'
import TitleComponent from './TitleComponent'
import { Button } from './ui/button'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { ThemeContext } from '@/context/theme-provider'
import { ProductCardType } from '@/types'
import ProductCard from './ProductCard'
import setItemInBox from '@/hooks/setItemInBox'
import { getKicks } from '@/lib/actions/product'


export default function LikeForYou() {
    const {screen}=useContext(ThemeContext)
    const [kicks,setKicks]=useState<{drop:ProductCardType[]}[]>()
    useEffect(()=>{
        const getKicksFunc=async ()=>{
            if(screen.width){
                const kicksRes=await getKicks()
                if(kicksRes.data){
                    const number=screen?.width>1024 ? 5 : screen?.width>768 ? 4: screen?.width>640?3:4
                    setKicks(setItemInBox(kicksRes.data?.documents,number))
                }
            }
        }
        getKicksFunc()
    },[screen?.width])
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)
    
    React.useEffect(() => {
        if (!api) {
        return
        }
    
        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)
    
        api.on("select", () => {
        setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])
    const nextRef=useRef<HTMLButtonElement | null>(null);
    const previousRef=useRef<HTMLButtonElement | null>(null);
    const handleNext = () => nextRef.current && nextRef.current.click();
    const handlePrevious = () => previousRef.current && previousRef.current.click();
  return (
    <section className='py-5'>
        <div className='flex flex-col container mx-auto'>
            <TitleComponent 
                className='pb-5'
                title='You may also like'
                titleClassName=' text-black'
                leftElement={<div className='flex gap-2'>
                    <Button onClick={handlePrevious} variant={"gray"}><ChevronLeftIcon/></Button>
                    <Button onClick={handleNext} variant={"secondary"}><ChevronRightIcon/></Button>
                </div>}
                />
            <Carousel setApi={setApi} className="w-full">
                <CarouselContent>
                    {kicks?.map((box, index) => (
                        <CarouselItem key={index} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                                {
                                    box?.drop?.map((kick)=>(
                                        <ProductCard
                                            key={kick?.$id}
                                            kick={kick}
                                        />
                                    ))
                                }
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className='hidden' ref={previousRef}/>
                <CarouselNext className='hidden' ref={nextRef}/>
            </Carousel>
            <div className='w-full py-5 flex justify-center'>
                <div className='flex gap-2'>
                    {
                        Array.from({length:count})?.map((_,index)=>(
                            <div key={index} className={`w-6 h-1 rounded-lg ${current===index+1 ? "bg-primary_1" : "bg-gray_2"}`}></div>
                        ))
                    }
                </div>
            </div>
        </div>
    </section>
  )
}
