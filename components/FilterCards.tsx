"use client"
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Button } from './ui/button'
import { ChevronDown, ListFilterIcon } from 'lucide-react'
import TitleComponent from './TitleComponent'
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import ProductCard from './ProductCard'
import { ThemeContext } from '@/context/theme-provider'
import { FilterValues, ProductCardType, screenType } from '@/types'
import setItemInBox from '@/hooks/setItemInBox'
import PaginationUI from './Pagination'
import FilterProducts from './FilterProductsForm'
import { getKicks } from '@/lib/actions/product'
import { client } from '@/lib/appwriteIO/appwrite'
import config from '@/lib/config'

export default function FilterCards() {
    const {screen}=useContext(ThemeContext)
    const [kicks,setKicks]=useState<ProductCardType[]>()
    const [kicksFilter,setKicksFilter]=useState<{drop:ProductCardType[]}[]>()
    const [isFilterCard,setIsFilterCard]=useState<boolean>(false)
    const filterKicks=useCallback((kicks:ProductCardType[])=>{
        const number=screen?.width>768 ? 9: screen?.width>640?6:6
        setKicksFilter(setItemInBox(kicks,number))
    },[screen])
    const getKicksFunc=useCallback(async (screen:screenType)=>{
        const kicksRes=await getKicks()
        if(kicksRes.data && screen.width){
            setKicks(kicksRes.data?.documents)
        }
    },[])
    useEffect(()=>{
        if(kicks){
            filterKicks(kicks)
        }
    },[filterKicks,kicks])
    useEffect(()=>{
        if(screen?.width){
            getKicksFunc(screen)
        }
        const unSubscribe = client.subscribe([
            "account",
            `databases.${config.env.databaseId}.collections.${config.env.collactionKickId}.documents`,
        ], () => {
            getKicksFunc(screen)
        })
        return () => unSubscribe();
    },[screen,getKicksFunc])
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    
    useEffect(() => {
        if (!api) {
            return
        }
        setCurrent(api.selectedScrollSnap() + 1)
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    const nextRef=useRef<HTMLButtonElement | null>(null);
    const previousRef=useRef<HTMLButtonElement | null>(null);
    const handleNext = () => nextRef.current && nextRef.current.click();
    const handlePrevious = () => previousRef.current && previousRef.current.click();
    const submitFilter=(data:FilterValues)=>{
        const filteredData = kicks?.filter((kick) => {
                return (
                    (!data?.colors.length || kick.colors?.some(color =>data.colors?.includes(color)))
                    && (!data?.genders.length || kick.gender?.some(gender =>data.genders?.includes(gender)))
                    && (!data.sizes.length || kick.sizes?.some(size => data.sizes.includes(size)))
                    && (!data.price.length || (kick.price && kick.price >= data.price[0] && kick.price <= data.price[1]))
                    && (!data.categories.length || kick.types?.some(type => data.categories.includes(type)))
                )
        });
        if(filteredData){
            filterKicks(filteredData)
        }
    }
    const colapseFilterCard=()=>{
        setIsFilterCard(!isFilterCard)
    }
  return (
    <section className='conteiner mx-auto py-5 flex flex-col gap-5'>
            <TitleComponent
                className='flex-col md:flex-row gap-5'
                leftElement={
                    <div className='w-full md:w-auto grid grid-cols-2 md:grid-cols-1 justify-between  gap-5'>
                        <Button className='flex gap-5 md:hidden' onClick={colapseFilterCard}>
                            <div>Filters</div>
                            <ListFilterIcon height={"1.25rem"}/>
                        </Button>
                        <Button className='flex gap-5'>
                            <div>Trending</div>
                            <ChevronDown height={"1.25rem"}/>
                        </Button>
                    </div>
                }
                title='Life Style Shoes'
                subTitle={`${kicks?.length} items`}
            />

            <div className='flex gap-5'>
                <FilterProducts 
                    handleSubmit={submitFilter} 
                    defaultValues={{
                        sizes: [],
                        colors: [],
                        categories: [],
                        genders: [],
                        price: [0, 1000],
                        }}
                    isFilterCard={isFilterCard}
                    colapseFilterCard={colapseFilterCard}
                />
                <div className='w-full md:w-3/4 flex flex-col gap-5'>
                    {
                        kicksFilter?.length ? <Carousel setApi={setApi} className="w-full">
                            <CarouselContent>
                                {kicksFilter?.map((box, index) => (
                                    <CarouselItem key={index} className="grid grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 2xl:grid-cols-5 gap-5">
                                            {
                                                box?.drop?.map((kick,indx)=>(
                                                    <ProductCard
                                                        key={indx}
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
                        : <h1 className='self-center text-xl'>No information found</h1>
                    }
                    {kicksFilter && kicksFilter?.length >1 && (
                        <PaginationUI
                            handlePrevious={handlePrevious}
                            handleNext={handleNext}
                            current={current}
                            count={kicksFilter?.length}
                            api={api}
                        />
                    )}
                </div>
            </div>

    </section>
  )
}
