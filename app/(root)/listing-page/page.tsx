import FilterCards from '@/components/FilterCards';
import ListingAdvertising from '@/components/ListingAdvertising';
import React from 'react';

export default function Page() {
  return (
    <section className='py-5 container mx-auto'>
      <ListingAdvertising/>
      <FilterCards/>
    </section>
  );
}
