import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React, { ReactNode } from 'react'

const Layout = ({children}:{children:ReactNode}) => {
  return (
    <div className='flex flex-col'>
        <Header/>
        <div className='pt-16'>
          {children}
        </div>
        <Footer/>
    </div>
  )
}
export default Layout
