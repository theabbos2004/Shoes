'use client';

import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInFormDetails, SignInFormType } from '@/lib/validation';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { ArrowRightIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { signInAccount, signOutAccount } from '@/lib/actions/user';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUserContext } from '@/context/auth-provider';

export default function SignInForm() {
  const {toast}=useToast()
  const {checkAuthUser}=useUserContext()
  const router=useRouter()
  const form= useForm({
    resolver: zodResolver(SignInFormDetails),
    defaultValues: {
      email:'',
      password:'',
      keepMe:true
    } as SignInFormType
  });

  useEffect(()=>{
    (async()=>{await signOutAccount()})()
  },[])

  const handleSubmit = async (data:SignInFormType) => {
    try{
      const {email,password,keepMe}=data
      const signInAccountRes=await signInAccount({email,password})
      if(signInAccountRes.error) throw new Error(signInAccountRes.error)
      const checkAuthUserRes=await checkAuthUser()
      if(checkAuthUserRes.error) throw new Error(checkAuthUserRes.error)
      if (!keepMe) {
        await signOutAccount()
      }
      toast({
        title: 'Success',
        description: "Success",
      })
      form.reset()
      router.push('/')
    }
    catch(e){
      form.setError('email', {
        type: "error",
        message: e instanceof Error ? e.message : 'Something went wrong',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="bg-gray-50  rounded-xl w-full md:w-1/3 p-6 flex flex-col gap-5">
              <div>
                <h2 className="text-3xl font-bold">Login</h2>
                <p className=' text-gray_1'>Forgot your password?</p>
              </div>
              <FormField
                key={"email"}
                control={form.control}
                name={"email"}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input className=' border-gray_2' type='email' placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage className=' text-red-500'/>
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
                    <FormMessage className=' text-red-500'/>
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
                          <Checkbox checked={field?.value} onCheckedChange={field.onChange}  className='border-gray_2' id='keepMe'/>
                          <Label htmlFor="keepMe">Keep me logged in - applies to all log in options below. More info</Label>
                      </div>
                    </FormControl>
                    <FormMessage className=' text-red-500'/>
                  </FormItem>
                )}
              >
              </FormField>     

              <Button type="submit" className="flex justify-between w-full" variant={"secondary"}>Email Login <span><ArrowRightIcon/></span></Button>
      </form>
    </Form>
  );
}
