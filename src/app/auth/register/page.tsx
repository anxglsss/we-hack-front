"use client"

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
import Link from "next/link"

export default function RegisterPage() {
  const form = useAuthForm(registerSchema)

  const onSubmit = (data: RegisterValues) => {
    console.log("Login:", data)
  }

  return (
    <div className="z-10 w-full max-w-2xl rounded-3xl border border-white/10 bg-white/10 p-10 backdrop-blur-lg shadow-xl">
      <h2 className="mb-8 text-center text-5xl font-extrabold text-white">Register</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
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
            name="lastname"
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
            name="phone"
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
            className="w-full h-14 text-xl text-dark rounded-xl hover:bg-white/90"
          >
            Sign Up
          </Button>
        </form>
      </Form>
      <p className="mt-8 text-end text-gray-400 text-lg">
        Already have an account?{" "}
        <Link href="/auth/login" className="underline hover:text-gray-300">
          Login
        </Link>
      </p>
    </div>
  )
}
