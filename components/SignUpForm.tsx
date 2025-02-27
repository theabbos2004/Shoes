'use client';

import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpFormDetails, SignUpFormType } from '@/lib/validation';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { ArrowRightIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { createAccount, createUser, signInAccount, signOutAccount } from '@/lib/actions/user';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUserContext } from '@/context/auth-provider';

export default function RegisterForm() {
  const { toast } = useToast()
  const {checkAuthUser}=useUserContext()
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(SignUpFormDetails),
    defaultValues: {
      name: '',
      lastName: '',
      gender: 'men',
      email: '',
      password: '',
      agree: false,
      keepMe: true
    } as SignUpFormType
  });
  useEffect(() => {
    (async () => await signOutAccount())()
  }, [])
  const handleSubmit = async (data: SignUpFormType) => {
    try {
      const { email, password, name, lastName, gender, keepMe } = data
      await signOutAccount()
      const createAccountRes = await createAccount({ email, password, name })
      if (!createAccountRes.data) throw new Error(createAccountRes.error)
      const createUserRes = await createUser({ accountId: createAccountRes?.data?.$id, email, password, name, lastName, gender })
      if (createUserRes.error) throw new Error(createUserRes.error)
      const signInAccountRes = await signInAccount({ email, password })
      if (signInAccountRes.error) throw new Error(signInAccountRes.error)
      const checkAuthUserRes=await checkAuthUser()
      if(checkAuthUserRes.error) throw new Error(checkAuthUserRes.error)
      toast({
        title: 'Success',
        description: "Success",
      })
      if (!keepMe) {
        await signOutAccount()
      }
      form.reset()
      router.push('/')
    }
    catch (e) {
      form.setError('email', {
        type: "error",
        message: e instanceof Error ? e.message : 'Something went wrong',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="bg-gray-50  rounded-xl w-full md:w-1/3 p-6 flex flex-col gap-5">
        <h2 className="text-3xl font-bold">Register</h2>
        <FormField
          key={"name"}
          control={form.control}
          name={"name"}
          render={({ field }) => (
            <FormItem>
              <FormLabel className=' text-lg font-semibold text-gray_1'>Your Name</FormLabel>
              <FormControl>
                <Input className=' border-gray_2' placeholder="First Name" {...field} />
              </FormControl>
              <FormMessage className=' text-red-500' />
            </FormItem>
          )}
        >
        </FormField>

        <FormField
          key={"lastName"}
          control={form.control}
          name={"lastName"}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className=' border-gray_2' placeholder="Last Name" {...field} />
              </FormControl>
              <FormMessage className=' text-red-500' />
            </FormItem>
          )}
        >
        </FormField>

        <FormField
          key={"gender"}
          control={form.control}
          name={"gender"}
          render={({ field }) => (
            <FormItem>
              <FormLabel className=' text-lg font-semibold text-gray_1'>Gender</FormLabel>
              <FormControl>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className='flex gap-5'
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="men" id="men" className={`border-gray-950`} />
                    <Label htmlFor="men">Men</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="women" id="women" className=' border-gray-950' />
                    <Label htmlFor="women">Women</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage className=' text-red-500' />
            </FormItem>
          )}
        >
        </FormField>

        <FormField
          key={"email"}
          control={form.control}
          name={"email"}
          render={({ field }) => (
            <FormItem>
              <FormLabel className=' text-lg font-semibold text-gray_1'>Login Details</FormLabel>
              <FormControl>
                <Input className=' border-gray_2' type='email' placeholder="Email" {...field} />
              </FormControl>
              <FormMessage className=' text-red-500' />
            </FormItem>
          )}
        >
        </FormField>

        <FormField
          key={"password"}
          control={form.control}
          name={"password"}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className=' border-gray_2' placeholder="Password" {...field} />
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
                <div className='flex gap-2'>
                  <Checkbox checked={field?.value} onCheckedChange={field.onChange} className='border-gray_2' id='agree' />
                  <Label htmlFor="agree">By clicking Log In you agree to our website KicksClub Terms & Conditions, Kicks Privacy Notice and Terms & Conditions.</Label>
                </div>
              </FormControl>
              <FormMessage className=' text-red-500' />
            </FormItem>
          )}
        >
        </FormField>

        <FormField
          key={"keepMe"}
          control={form.control}
          name={"keepMe"}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='flex gap-2'>
                  <Checkbox checked={field?.value} onCheckedChange={field.onChange} className='border-gray_2' id='keepMe' />
                  <Label htmlFor="keepMe">Keep me logged in - applies to all log in options below. More info</Label>
                </div>
              </FormControl>
              <FormMessage className=' text-red-500' />
            </FormItem>
          )}
        >
        </FormField>

        <Button type="submit" className="flex justify-between w-full" variant={"secondary"}>Register<span><ArrowRightIcon /></span></Button>
      </form>
    </Form>
  );
}
