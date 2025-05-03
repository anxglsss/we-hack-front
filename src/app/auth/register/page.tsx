"use client"

import { OtpModal } from "@/components/modals/OtpModal"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAuthForm } from '@/hooks/useAuthForm'
import { registerSchema, RegisterValues } from '@/schemas/auth'
import { useAuthStore } from '@/stores/auth.store'
import { motion } from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from 'react'

export default function RegisterPage() {
  const [isOtpOpen, setIsOtpOpen] = useState(false)
  const form = useAuthForm(registerSchema, { firstName: "", lastName: "", email: "", password: "", phoneNumber: "" })
  const authStore = useAuthStore()

  const onSubmit = async (data: RegisterValues) => {
    setIsOtpOpen(true)
    await authStore.register(data)
  
    setTimeout(() => {
      authStore.sendVerificationCode(data.email)
    }, 2000) 
    console.log("Register:", data)
  }

  useEffect(()=>{
    console.log("logs")
    console.log(authStore.user)
    console.log(authStore.user?.role)
  }, [])
  

  return (
    <>
      <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="z-10 w-full max-w-2xl rounded-3xl border border-white/10 bg-white/10 p-10 backdrop-blur-lg shadow-xl"
    >
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-8 text-center text-5xl font-extrabold text-white"
      >
        Register
      </motion.h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white text-xl">First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John"
                    {...field}
                    className="h-14 text-2xl bg-white/20 text-white placeholder:text-white/50 rounded-xl px-4"
                  />
                </FormControl>
                <FormMessage className="text-lg text-red-400 font-medium" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white text-xl">Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Doe"
                    {...field}
                    className="h-14 text-2xl bg-white/20 text-white placeholder:text-white/50 rounded-xl px-4"
                  />
                </FormControl>
                <FormMessage className="text-lg text-red-400 font-medium" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white text-xl">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    {...field}
                    className="h-14 text-2xl bg-white/20 text-white placeholder:text-white/50 rounded-xl px-4"
                  />
                </FormControl>
                <FormMessage className="text-lg text-red-400 font-medium" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white text-xl">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    {...field}
                    className="h-14 text-2xl bg-white/20 text-white placeholder:text-white/50 rounded-xl px-4"
                  />
                </FormControl>
                <FormMessage className="text-lg text-red-400 font-medium" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white text-xl">Phone</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="+1234567890"
                    {...field}
                    className="h-14 text-2xl bg-white/20 text-white placeholder:text-white/50 rounded-xl px-4"
                  />
                </FormControl>
                <FormMessage className="text-lg text-red-400 font-medium" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full h-14 text-xl text-dark rounded-xl"
          >
            Sign Up
          </Button>
        </form>
      </Form>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="mt-8 text-end text-gray-400 text-lg"
      >
        Already have an account?{" "}
        <Link href="/auth/login" className="underline hover:text-gray-300">
          Login
        </Link>
      </motion.p>
    </motion.div>
    <OtpModal open={isOtpOpen} onOpenChange={setIsOtpOpen}/>
    </>
  )
}
