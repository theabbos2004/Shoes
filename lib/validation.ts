import { z } from "zod";

export const ProductFormDetails = z.object({
  color:z.enum(["orange", "red", "blue", "green", "black", "white"]),
  size: z.string(),
  gender:z.enum(["men","women"]),
  type:z.enum(["running","sport"]),
});

export type ProductFormType = z.infer<typeof ProductFormDetails>;

export const CheckoOutFormDetails = z.object({
  address:z.string().nonempty(),
  phone:z.string().nonempty(),
  agree:z.boolean(),
  same:z.boolean(),
  old:z.boolean(),
}).refine((data)=>data.agree === true, {
    message: "You must agree to the terms and conditions",
    path: ["agree"],
  })
  .refine((data)=>data.same === true, {
    message: "You must same to the terms and conditions",
    path: ["same"],
  })
  .refine((data)=>data.old === true, {
    message: "You must old to the terms and conditions",
    path: ["old"],
  })
export type CheckOutFormType = z.infer<typeof CheckoOutFormDetails>;

export const SignUpFormDetails = z.object({
  name:z.string().nonempty(),
  lastName:z.string().nonempty(),
  gender:z.enum(["men","women"]),
  email:z.string().email(),
  password:z.string().min(8),
  agree:z.boolean(),
  keepMe:z.boolean(),
}).refine((data) => data.agree === true, {
  message: "You must agree to the terms and conditions",
  path: ["agree"],
});

export type SignUpFormType = z.infer<typeof SignUpFormDetails>;

export const SignInFormDetails = z.object({
  email:z.string().email(),
  password:z.string().min(8),
  keepMe:z.boolean(),
})

export type SignInFormType = z.infer<typeof SignInFormDetails>;
