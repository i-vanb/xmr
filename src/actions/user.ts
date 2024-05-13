'use server'
import { z } from "zod";
import db from "@/lib/db";
import bcryptjs from "bcryptjs";
import {signIn} from "@/auth";


type loginProps = {
  email: string
  password: string
}
export const loginUser = async ({email, password}:loginProps) => {
  const existUser = await db.user.findUnique({
    where: {
      email
    }
  })
  if (!existUser || !existUser.password) {
    return {
      message: 'User not found',
      success: false
    }
  }
  const isValidPassword = await bcryptjs.compare(password, existUser.password)
  if (!isValidPassword) {
    return {
      message: 'Invalid password',
      success: false
    }
  }

  await signIn('credentials', {
    email,
    password,
    redirectTo: '/dashboard',
  })


  return {
    message: 'User logged in successfully',
    success: true
  }
}

type signupProps = {
  username: string
  email: string
  password: string
  confirmPassword: string
}
export const signUser = async ({username, email, password, confirmPassword}:signupProps) => {
  const existUser = await db.user.findUnique({
    where: {
      email
    }
  })
  if (existUser) {
    return {
      message: 'User already exists',
      success: false
    }
  }
  if(!password) {
    return {
      message: 'Password is required',
      success: false
    }
  }
  if(password !== confirmPassword) {
    return {
      message: 'Passwords do not match',
      success: false
    }
  }

  const hashedPassword = await bcryptjs.hash(password, 10)
  const newUser = await db.user.create({
    data: {
      name: username,
      email,
      password: hashedPassword
    }
  })
  if(!newUser) {
    return {
      message: 'Failed to create user',
      success: false
    }
  }

  await signIn('credentials', {
    email,
    password,
    redirectTo: '/dashboard',
  })

  return {
    message: 'User created successfully',
    success: true
  }
}

