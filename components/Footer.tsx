import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { FacebookIcon, InstagramIcon, TelegramIcon, TikTokIcon} from '@/public/icons'
import Image from 'next/image'
export default function Footer() {
  return (
    <footer className=' container mx-auto'>
        <div className='bg-primary_1 rounded-2xl'>
            <div className='flex flex-col sm:flex-row p-5 lg:p-16'>
                <div className='sm:w-2/4'>
                    <div className=' text-2xl sm:text-4xl font-semibold text-gray-50'>Join our KicksPlus Club & get 15% off</div>
                    <div className=' text-gray-300 py-2 lg:py-6'>Sign up for free! Join the community.</div>
                    <form className='flex gap-2 sm:gap-4'>
                        <Input placeholder='Email address'/>
                        <Button type='submit' variant={"secondary"}>Submit</Button>
                    </form>
                </div>
                <div className='pt-8 pb-5 w-2/4 flex justify-center items-center'>
                    <div className="relative w-3/4 aspect-[4/1] overflow-hidden h-auto">
                        <Image 
                            src="/images/Logo white.svg" 
                            alt="Logo Dark 1" 
                            fill
                            className='object-contain'
                            unoptimized
                        />
                    </div>
                </div>
            </div>
            <div className='flex flex-col bg-gray_1 rounded-xl p-5 pb-0'>
                <ul className='pb-5 grid grid-cols-2 sm:grid-cols-5 gap-5'>
                    <li className='sm:col-span-2'>
                        <div className='text-xl text-orange_1 font-semibold'>About us</div>
                        <p className='text-gray-200'>We are the biggest hyperstore in the universe. We got you all cover with our exclusive collections and latest drops.</p>
                    </li>
                    <li>
                        <div className='text-xl text-orange_1 font-semibold py-2'>Categories</div>
                        <ul className=' flex flex-col gap-1 text-gray-200'>
                            <li>Runners</li>
                            <li>Sneakers</li>
                            <li>Basketball</li>
                            <li>Outdoor</li>
                            <li>Golf</li>
                            <li>Hiking</li>
                        </ul>
                    </li>
                    <li>
                        <div className='text-xl text-orange_1 font-semibold py-2'>Company</div>
                        <ul className='flex flex-col gap-1 text-gray-200'>
                            <li>About</li>
                            <li>Contact</li>
                            <li>Blogs</li>
                        </ul>
                    </li>
                    <li>
                        <div className='text-xl text-orange_1 font-semibold py-2'>Follow us</div>
                        <ul className='flex items-center gap-2 text-gray-200'>
                            <li>
                                <FacebookIcon height="1.3rem" fill="#fff"/>
                            </li>
                            <li>
                                <InstagramIcon height="1.3rem" fill="#fff"/>
                            </li>
                            <li>
                                <TikTokIcon height="1.2rem" fill="#fff"/>
                            </li>
                            <li>
                                <TelegramIcon height="1.3rem" fill="#fff"/>
                            </li>
                        </ul>
                    </li>
                </ul>
                <div className='h-24 sm:h-28 md:h-32 lg:h-48 xl:h-52 2xl:h-64 overflow-hidden'>
                    <div className="relative w-full aspect-[4/1] overflow-hidden h-auto">
                        <Image 
                            src="/images/Logo white.svg" 
                            alt="Logo Dark 1" 
                            fill
                            className='object-contain'
                            unoptimized
                        />
                    </div>
                </div>
            </div>
        </div>
        <div className='w-full text-center py-5 px-10'>
            © All rights reserved | Made with ❤️ by Visiata Systems International
        </div>
    </footer>
  )
}