import React from 'react'
import { Button } from './ui/button'
import { ArrowRightIcon } from 'lucide-react'

export default function JoinClub() {
  return (
    <div className='w-full md:w-3/5 bg-gray-100 p-5 rounded-xl text-gray_5 flex flex-col gap-5 self-start'>
        <h1 className='text-2xl font-semibold text-gray_1'>Join  Kicks Club Get Rewarded Today.</h1>
        <p>As kicks club member you get rewarded with what you love for doing what you love. Sign up today and receive immediate access to these Level 1 benefits:</p>
        <ul className='px-5 list-disc'>
            <li>Free shipping​</li>
            <li>A 15% off voucher for your next purchase​</li>
            <li>Access to Members Only products and sales​</li>
            <li>Access to adidas Running and Training apps</li>
            <li>Special offers and promotions</li>
        </ul>
        <p>
        Join now to start earning points, reach new levels and unlock more rewards and benefits from adiClub.​
        </p>
        <Button className=' flex justify-between' variant={"secondary"}>Join the club <span><ArrowRightIcon/></span></Button>
    </div>
  )
}
