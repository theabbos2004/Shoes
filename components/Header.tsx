"use client"
import { MenuIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useContext } from 'react';
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
  return (
    <header className='h-16 w-[calc(100%-2rem)] sm:w-[calc(640px-2rem)] md:w-[calc(768px-2rem)] lg:w-[calc(1024px-2rem)] xl:w-[calc(1280px-2rem)] 2xl:w-[calc(1536px-2rem)] fixed mt-2 z-10 translate-x-[-50%] left-[50%] bg-gray-50 flex items-center justify-between p-5 rounded-2xl'>
        <Sheet key="left">
            <ul className='hidden md:flex h-full gap-10 flex-row items-center justify-center'>
                {
                navList?.map((nav:NavType,indx)=>(
                    <li key={indx}>
                            {nav.label}
                    </li>
                ))
                }
            </ul>
            <SheetTrigger className='md:hidden'>
                <MenuIcon className='size-6'/>
            </SheetTrigger>
            <SheetNav/>
        </Sheet>
        <div className='h-full flex items-center'>
            <Link href={"/"}>
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
        <div className='flex items-center gap-2'>
            {theme === 'light' ? ( 
                <MoonIcon 
                    className='size-6'
                    onClick={()=>{switchTheme()}}
                />)
            :(
                <SunIcon
                    className='size-6'
                    onClick={()=>{switchTheme()}}
                />
            )}
            <Avatar className='size-6'>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
    </header>
  );
}
export default Header
