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
import { ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { ProductCardType } from "@/types";
import { Button } from "./ui/button";
import { HeartIcon } from "lucide-react";
import { ringClasses, bgClasses } from "@/hooks/ux";
interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  data: ProductCardType | undefined;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
}

const ProductDetailsForm = <T extends FieldValues>({
  schema,
  defaultValues,
  data,
  onSubmit,
}: Props<T>) => {
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
      </form>
    </Form>
  );
};

export default ProductDetailsForm;
