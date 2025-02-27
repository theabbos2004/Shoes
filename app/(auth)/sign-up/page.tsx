import JoinClub from '@/components/JoinClub'
import RegisterForm from '@/components/SignUpForm'
import React from 'react'

export default function page() {
  return (
    <section className='container mx-auto py-5'>
        <div className='flex gap-5 flex-col md:flex-row'>
            <RegisterForm/>
            <JoinClub/>
        </div>
    </section>
  )
}
