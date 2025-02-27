import JoinClub from '@/components/JoinClub'
import SignInForm from '@/components/SignInForm'
import React from 'react'

export default function page() {
  return (
    <section className='container mx-auto py-5'>
        <div className='flex gap-5 flex-col md:flex-row'>
            <SignInForm/>
            <JoinClub/>
        </div>
    </section>
  )
}
