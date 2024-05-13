import {z} from "zod";

export const SignUpSchema = z.object(
  {
    email: z.string({
      invalid_type_error: 'Invalid Email',
    }).email('error.email.invalid').min(1, {message: 'error.email.required'}),
    password: z.string({
      invalid_type_error: 'Invalid Password',
    }).min(8, {message: 'error.password.required'}),
    name: z.string({
      invalid_type_error: 'Invalid Name',
    }).min(1, {message: 'error.name.required'}),
    repeat_password: z.string({
      invalid_type_error: 'Invalid Password',
    }).min(8, {message: 'error.password.required'}),
  })


export const SignInSchema = z.object(
  {
    email: z.string({
      invalid_type_error: 'Invalid Email',
    }).email('error.email.invalid').min(1, {message: 'error.email.required'}),
    password: z.string({
      invalid_type_error: 'Invalid Password',
    }).min(8, {message: 'error.password.required'})
  })