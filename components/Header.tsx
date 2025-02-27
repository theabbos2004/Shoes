"use client"
import { MenuIcon, MoonIcon, ShoppingCart, SunIcon } from 'lucide-react';
import { useContext, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Sheet, SheetTrigger } from './ui/sheet';
import SheetNav from './SheetNav';
import { ThemeContext } from '@/context/theme-provider';
import { navList } from '@/constans';
import Link from 'next/link';
import { NavType } from '@/types';
import { Logo, LogoDark } from '@/public/images';
import { usePathname, useRouter } from 'next/navigation';
import { useUserContext } from '@/context/auth-provider';
import { Button } from './ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';
import { signOutAccount } from '@/lib/actions/user';
const Header=()=> {
    const {theme,switchTheme}=useContext(ThemeContext)
    const {isAuthenticated}=useUserContext()
    const [open, setOpen] = useState<boolean>(false);
    const router=useRouter()    
    const pathname=usePathname()
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
        <div className='flex md:order-3 items-center gap-3'>
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
            {pathname!=="/cart" && <ShoppingCart
                className='size-6 cursor-pointer dark:text-gray-50'
                onClick={()=>{router.push("/cart")}}
            />}
           { 
            isAuthenticated ? (
                <HoverCard>
                    <HoverCardTrigger>
                        <Avatar className='size-6 cursor-pointer'>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </HoverCardTrigger>
                    <HoverCardContent className=' w-auto'>
                        <Button variant={"secondary"} onClick={async ()=>signOutAccount()}>Log out</Button>
                    </HoverCardContent>
                </HoverCard>
            )
            :(
                <div className='flex gap-2'>
                    <Button variant={pathname==="/sign-in" ? "primary":"default"} onClick={()=>router.push("/sign-up")} className={`${pathname==="/sign-up" && "hidden"}`}>Sign Up</Button>
                    <Button variant={"primary"} onClick={()=>router.push("/sign-in")} className={`${pathname==="/sign-in" && "hidden"}`}>Sign In</Button>
                </div>
            )
            }
        </div>
    </header>
  );
}
export default Header
