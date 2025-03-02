'use client';

import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckoOutFormDetails, CheckOutFormType } from '@/lib/validation';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { cn } from '@/lib/utils';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

export default function ShippingForm({className,onSubmit}:{className?:string,onSubmit:(data:CheckOutFormType)=>Promise<{success:boolean,error?:string}>}) {
  const form = useForm({
    resolver: zodResolver(CheckoOutFormDetails),
    defaultValues: {
      address: 'Country/City',
      old: false,
      agree: false,
      same: false,
      phone:"9989"
    } as CheckOutFormType
  });
  
  const handleSubmit = async (data: CheckOutFormType) => {
    try {
      const onSubmitRes= await onSubmit(data)
      if(onSubmitRes.error) throw Error(onSubmitRes.error)
      form.reset()
    }
    catch (error) {
      form.setError('address', {
        type: "error",
        message: error instanceof Error ? error.message : 'Something went wrong',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={cn(" p-6 flex flex-col gap-5",className)}>
        <h2 className="text-3xl font-bold">Shipping Address</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
            <FormField
              key={"address"}
              control={form.control}
              name={"address"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=' text-lg font-semibold text-gray_1'>Address</FormLabel>
                  <FormControl>
                    <Input className=' border-gray_4' placeholder="Find Delivery Address*" {...field} />
                  </FormControl>
                  <FormMessage className=' text-red-500' />
                </FormItem>
              )}
            >
            </FormField>

            <FormField
              key={"phone"}
              control={form.control}
              name={"phone"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=' text-lg font-semibold text-gray_1'>Phone number</FormLabel>
                  <FormControl>
                    <PhoneInput
                      // defaultCountry="uz"
                      {...field}
                    />
                    {/* <Input className=' border-gray_4' placeholder="Phone Number*" {...field} /> */}
                  </FormControl>
                  <FormMessage className=' text-red-500' />
                </FormItem>
              )}
            >
            </FormField>
        </div>
        <h2 className="text-3xl font-bold">Delivery Options</h2>
        <FormField
          key={"same"}
          control={form.control}
          name={"same"}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='flex gap-2'>
                  <Checkbox checked={field?.value} onCheckedChange={field.onChange} className='border-gray_4' id='same' />
                  <Label htmlFor="same">My billing and delivery information are the same </Label>
                </div>
              </FormControl>
              <FormMessage className=' text-red-500' />
            </FormItem>
          )}
        >
        </FormField>
        <FormField
          key={"old"}
          control={form.control}
          name={"old"}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='flex gap-2'>
                  <Checkbox checked={field?.value} onCheckedChange={field.onChange} className='border-gray_4' id='old' />
                  <Label htmlFor="old">I’m 13+ year old</Label>
                </div>
              </FormControl>
              <FormMessage className=' text-red-500' />
            </FormItem>
          )}
        >
        </FormField>
        <FormField
          key={"agree"}
          control={form.control}
          name={"agree"}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='flex flex-col gap-2'>
                  <FormLabel className=' text-lg font-semibold text-gray_1'>Also want product updates with our newsletter?</FormLabel>
                  <div className='flex gap-2'>
                    <Checkbox checked={field?.value} onCheckedChange={field.onChange} className='border-gray_4' id='agree' />
                    <Label htmlFor="agree">Yes, I’d like to receive emails about exclusive sales and more.</Label>
                  </div>
                </div>
              </FormControl>
              <FormMessage className=' text-red-500' />
            </FormItem>
          )}
        >
        </FormField>
        <Button type="submit" className="self-start flex justify-between px-10 my-5" variant={"secondary"}>Review AND PAY</Button>
      </form>
    </Form>
  );
}
