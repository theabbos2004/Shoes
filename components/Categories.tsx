"use client"
import React, { useContext, useEffect, useRef, useState } from 'react'
import TitleComponent from './TitleComponent'
import { Button } from './ui/button'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { categoriesType } from '@/types'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { ThemeContext } from '@/context/theme-provider'
import setItemInBox from '@/hooks/setItemInBox'
import Link from 'next/link'
import { getCategories } from '@/constans'
export default function Categories() {
    const {screen}=useContext(ThemeContext)
    const [categories,setCategories]=useState<{drop:categoriesType[]}[]>()
    useEffect(()=>{
        if(screen?.width){
            (async ()=>{
                const categories = await getCategories()
                setCategories(setItemInBox(categories,screen?.width>1024? 3 : 2))
            })()
        }
    },[screen?.width])
    const nextRef=useRef<HTMLButtonElement | null>(null);
    const previousRef=useRef<HTMLButtonElement | null>(null);
    const handleNext = () => nextRef.current && nextRef.current.click();
    const handlePrevious = () => previousRef.current && previousRef.current.click();
  return (
    <section className='bg-gray_1 py-5'>
        <div className='flex flex-col container mx-auto'>
            <TitleComponent 
                className='pb-5'
                title='Categories'
                titleClassName=' text-gray-50'
                leftElement={<div className='flex gap-2'>
                    <Button onClick={handlePrevious}><ChevronLeftIcon/></Button>
                    <Button onClick={handleNext}><ChevronRightIcon/></Button>
                </div>}
                />
            <Carousel className="w-full rounded-l-3xl overflow-hidden">
                <CarouselContent>
                    {categories?.map((box, index) => (
                        <CarouselItem key={index} className="flex flex-col md:flex-row bg-gray-50">
                                {
                                    box?.drop?.map((categorie)=>(
                                        <div key={categorie?.id} className='md:w-2/4 lg:w-2/6 flex flex-col'>
                                            <div key={categorie?.title} className='relative h-80 w-full'>
                                                <Image
                                                    src={categorie?.imageUrl}
                                                    alt={categorie?.title}
                                                    fill
                                                    priority
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, 
                                                    (max-width: 1200px) 50vw, 
                                                    33vw"
                                                />
                                            </div>
                                            <div className='p-5 flex justify-between items-center'>
                                                <h1 className='text-2xl font-semibold line-clamp-2' >
                                                    {categorie?.title}
                                                </h1>
                                                <Link href={"/listing-page"} as={"/listing-page"}>
                                                    <Button variant={"secondary"}><ArrowUpRight/></Button>
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                }
        
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className='hidden' ref={previousRef}/>
                <CarouselNext className='hidden' ref={nextRef}/>
            </Carousel>
        </div>
    </section>
  )
}
