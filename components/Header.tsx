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
import { signOutAccount } from '@/lib/actions/user';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { useToast } from '@/hooks/use-toast';
const Header=()=> {
    const {theme,switchTheme}=useContext(ThemeContext)
    const {isAuthenticated,user}=useUserContext()
    const [open, setOpen] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const router=useRouter()    
    const pathname=usePathname()
    const {toast}=useToast()
    const signOutAccountFunc=async()=>{
        try{
            const signOutAccountRes=await signOutAccount()
            if(signOutAccountRes?.error) throw Error(signOutAccountRes?.error)
            router.push("/")
        }
        catch(error){
            toast({
                title:"error",
                description:error instanceof Error ? error?.message : error as string,
                variant:'destructive'
            })
        }
    }
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
            {pathname!=="/cart" && (
                <div className='relative flex'>
                    <ShoppingCart
                        className='size-6 cursor-pointer dark:text-gray-50'
                        onClick={()=>{router.push("/cart")}}
                    />
                    {user?.carts && user?.carts?.length>0 && (
                        <div className=' self-end text-gray-50 h-3 bg-orange-400 rounded-xl text-sm flex justify-center items-center p-1 py-2'>{user?.carts?.length}</div>
                        )}
                </div>
            )}
           { 
            isAuthenticated ? (
                <Collapsible
                    open={isOpen}
                    onOpenChange={setIsOpen}
                    className=' relative'
                    >
                     <CollapsibleTrigger asChild>
                        <Avatar className='size-6 cursor-pointer'>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </CollapsibleTrigger>
                    <CollapsibleContent className='absolute w-auto -bottom-[170%] left-2/4 -translate-x-2/4'>
                        <Button 
                            variant={"secondary"} 
                            onClick={signOutAccountFunc}
                            onMouseLeave={()=>setIsOpen(false)}
                            >Log out</Button>
                    </CollapsibleContent>
                </Collapsible>
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
