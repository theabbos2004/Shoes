"use client"
import { MenuIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useContext, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Sheet, SheetTrigger } from './ui/sheet';
import SheetNav from './SheetNav';
import { ThemeContext } from '@/context/theme-provider';
import { navList } from '@/constans';
import Link from 'next/link';
import { NavType } from '@/types';
import { Logo, LogoDark } from '@/public/images';
const Header=()=> {
    const {theme,switchTheme}=useContext(ThemeContext)
    const [open, setOpen] = useState<boolean>(false);
  return (
    <header className='h-16 w-[calc(100%-2rem)] sm:w-[calc(640px-2rem)] md:w-[calc(768px-2rem)] lg:w-[calc(1024px-2rem)] xl:w-[calc(1280px-2rem)] 2xl:w-[calc(1536px-2rem)] fixed mt-2 z-10 translate-x-[-50%] left-[50%] bg-gray-50 dark:bg-gray-400 flex items-center justify-between p-5 rounded-2xl'>
        <div className='md:order-2'>
            <Sheet key="left"  open={open} onOpenChange={setOpen}>
                <div className='hidden md:flex h-full gap-10 flex-row items-center justify-center'>
                    {
                    navList?.map((nav:NavType,indx)=>(
                        <Link href={"listing-page"} as={"/listing-page"} key={indx} className='cursor-pointer dark:text-gray-50'>
                                {nav.label}
                        </Link>
                    ))
                    }
                </div>
                <SheetTrigger className='md:hidden'>
                    <MenuIcon className='size-6 dark:text-gray-50'/>
                </SheetTrigger>
                <SheetNav onOpenChange={setOpen}/>
            </Sheet>
        </div>
        <div className='md:order-1 h-full flex items-center'>
            <Link href={"/"} as={"/"}>
                {
                    theme==="dark" ? (
                        <Logo height="1.3rem"/>
                    )
                    :(
                        <LogoDark height="1.3rem"/>
                    )
                }
            </Link>
        </div>
        <div className='flex md:order-3 items-center gap-2'>
            {theme === 'light' ? ( 
                <MoonIcon 
                    className='size-6 cursor-pointer'
                    onClick={()=>{switchTheme()}}
                />)
            :(
                <SunIcon
                    className='size-6 cursor-pointer dark:text-gray-50'
                    onClick={()=>{switchTheme()}}
                />
            )}
            <Avatar className='size-6 cursor-pointer'>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
    </header>
  );
}
export default Header
