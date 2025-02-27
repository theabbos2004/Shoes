import CartProducts from '@/components/CartProducts'
import LikeForYou from '@/components/LikeForYou'
import TitleComponent from '@/components/TitleComponent'
import React from 'react'

export default function page() {
  return (
    <section className='p-10 container mx-auto'>
        <TitleComponent
            title='Saving to celebrate '
            titleClassName='font-extrabold pb-1'
            subTitle='Enjoy up to 60% off thousands of styles during the End of Year sale - while suppiles last. No code needed. Join us  or Sign-in'
            className='w-2/3'
        />
        <CartProducts/>
        <LikeForYou/>
    </section>
  )
}
