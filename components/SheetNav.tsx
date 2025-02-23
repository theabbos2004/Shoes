"use client"
import React, { Dispatch, SetStateAction, useContext } from 'react'
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet'
import { navList } from '@/constans'
import { Logo, LogoDark } from '@/public/images'
import { ThemeContext } from '@/context/theme-provider'
import { NavType } from '@/types'
import { useRouter } from 'next/navigation'

const SheetNav = ({onOpenChange}:{onOpenChange:Dispatch<SetStateAction<boolean>>}) => {
  const {theme}=useContext(ThemeContext)
  const router=useRouter()
  const navClick=()=>{
    router.push("/listing-page")
    onOpenChange(false)
  }
  return (
    <SheetContent className="w-3/4 dark:bg-gray-400" side={"left"}>
        <SheetHeader>
          <SheetTitle className=' flex justify-center'>
            {
              theme==="dark" ? (
                <Logo height="22"/>
              )
              :(
                <LogoDark height="22" className="dark:text-gray-50"/>
              )
            }
          </SheetTitle>
          <SheetDescription>
            
          </SheetDescription>
        </SheetHeader>
        <ul className='h-full flex gap-10 flex-col items-center justify-center'>
          {
            navList?.map((nav:NavType)=>(
              <li key={nav.label} onClick={()=>navClick()} className='dark:text-gray-50'>{nav.label}</li>
            ))
          }
        </ul>
    </SheetContent>
  )
}
export default SheetNav