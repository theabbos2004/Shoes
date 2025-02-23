import React from 'react'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from './ui/pagination'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './ui/button'
import { CarouselApi } from './ui/carousel'
interface Props {
    handlePrevious:()=>void,
    handleNext:()=>void,
    current:number,
    count:number,
    api:CarouselApi|undefined
}
export default function PaginationUI({handlePrevious,handleNext,current,count,api}:Props) {
  return (
    <Pagination>
        <PaginationContent className='flex gap-5'>
            <PaginationItem>
                <Button variant={"outline"} onClick={handlePrevious}>
                    <ChevronLeft/>
                </Button>
            </PaginationItem>
            {<PaginationItem>
                <Button
                    variant={1===current?"secondary":"outline"}
                    onClick={()=>api&&api.scrollTo(0)}
                    >
                        {1}
                </Button>
            </PaginationItem>}
            { 
                count >3 && current!==1 && current!==2 && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )
            }
            {
                count>2 && Array.from({length:count})
                    ?.map((_, index) =>index+1)
                        .filter((item)=>item > 1 && item < count && item===current || (item===2 && count<=3))
                        ?.map((item,index)=>(
                            <PaginationItem key={index}>
                                <Button
                                    variant={item===current?"secondary":"outline"}
                                    onClick={()=>api&&api.scrollTo(item-1)}
                                    >
                                        {item}
                                </Button>
                            </PaginationItem>
                        )
                    )
            }
            {
                count >3 && current !== count-1 && count!==current && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )
            }
            {
                count!==1 && (
                    <PaginationItem>
                        <Button
                            variant={count===current?"secondary":"outline"}
                            onClick={()=>api&&api.scrollTo(count)}
                            >
                                {count}
                        </Button>
                    </PaginationItem>
                )
            }
            <PaginationItem>
                <Button variant={"outline"} onClick={handleNext}>
                    <ChevronRight/>
                </Button>
            </PaginationItem>
        </PaginationContent>
    </Pagination>
  )
}
