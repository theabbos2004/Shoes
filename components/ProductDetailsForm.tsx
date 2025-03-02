"use client";
import React from "react";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { ProductCardType, UserType } from "@/types";
import { Button } from "./ui/button";
import { HeartIcon } from "lucide-react";
import { ringClasses, bgClasses } from "@/hooks/ux";
import { useRouter } from "next/navigation";
interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  data: ProductCardType | undefined;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  user:UserType| null
}

const ProductDetailsForm = <T extends FieldValues>({
  schema,
  defaultValues,
  data,
  onSubmit,
  user
}: Props<T>) => {
  const router=useRouter()
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });
  const handleSubmit: SubmitHandler<T> = async (data) => {
    await onSubmit(data);
  };

  const renderColorOptions = (color: string, index: number) => {
    const ringClassesRes = ringClasses(color);
    const bgClassesRes = bgClasses(color);
    return (
      <RadioGroupItem
        key={index}
        value={color}
        id={color}
        className={`
          text-transparent
          focus:ring
          ring-0
          border-0
          focus:border-2
          ${index === 0 && form.getValues("color" as Path<T>) === defaultValues?.color ? `border-2 ring ${ringClassesRes} ${bgClassesRes}` : ""}
          size-6
          ${bgClassesRes}
          focus:${ringClassesRes}
        `}
      />
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-5">
        <div className="grid grid-cols-2">
          <FormField
            key={"index"}
            control={form.control}
            name={"color" as Path<T>}
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" text-gray_1 font-bold capitalize">color</FormLabel>
                <FormControl>
                  <RadioGroup
                    className="flex gap-3"
                    onValueChange={(value) => field.onChange(value)}
                  >
                    {data?.colors?.map(renderColorOptions)}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            key={"gender"}
            control={form.control}
            name={"gender" as Path<T>}
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" text-gray_1 font-bold capitalize">Gender</FormLabel>
                <FormControl>
                  <RadioGroup
                    className="flex gap-3"
                    onValueChange={(value) => field.onChange(value)}
                  >
                    {data?.gender?.map((gender,index)=>(
                      <Button
                        key={index}
                        variant={field.value === gender ? "primary" : "default"}
                        onClick={() => field.onChange(gender)}
                        type="button"
                      >
                        {gender}
                      </Button>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          key={"size"}
          control={form.control}
          name={"size" as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray_1 font-bold capitalize">Size</FormLabel>
              <FormControl>
                <div className="flex flex-wrap gap-3">
                  {data?.sizes?.map((size, index) => (
                    <Button
                      key={index}
                      variant={field.value === size ? "primary" : "default"}
                      onClick={() => field.onChange(size)}
                      type="button"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          key={"type"}
          control={form.control}
          name={"type" as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray_1 font-bold capitalize">Type</FormLabel>
              <FormControl>
                <div className="flex flex-wrap gap-3">
                  {data?.types?.map((type, index) => (
                    <Button
                      key={index}
                      variant={field.value === type ? "primary" : "default"}
                      onClick={() => field.onChange(type)}
                      type="button"
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        
        {user ? 
          (
            <div className="flex flex-col gap-2">
              <div className="w-full flex gap-2">
                <Button variant={"secondary"} className="w-full" type="submit">
                  Add to cart
                </Button>
                
                <Button variant={"secondary"}>
                  <HeartIcon />
                </Button>
              </div>
              <Button variant={"primary"}>Buy it now</Button>
            </div>
          )
          :(
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <div className="flex flex-col gap-2">
                <div className="w-full flex gap-2">
                  <Button variant={"secondary"} className="w-full" type="submit" disabled>
                    Add to cart
                  </Button>
                  
                  <Button variant={"secondary"} disabled>
                    <HeartIcon />
                  </Button>
                </div>
                <Button variant={"primary"} disabled>Buy it now</Button>
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                You must register before doing this.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={()=>{router.push("/sign-in")}}>Register</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialog>
          )
        }
      </form>
    </Form>
  );
};

export default ProductDetailsForm;
