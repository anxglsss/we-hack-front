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
import { loginSchema, LoginValues } from '@/schemas/auth'
import { useAuthStore } from "@/stores/auth.store"
import { motion } from "framer-motion"
import { Loader2, LogIn } from "lucide-react"
import Link from "next/link"
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const form = useAuthForm(loginSchema, { email: "", password: "" })
  const router = useRouter()
  const authStore = useAuthStore()

  const onSubmit = (data: LoginValues) => {
    try{
      authStore.login(data)
    console.log("Login:", data)
    router.replace("/dashboard")
    } catch(e: any) {
      console.log(e)
    }
  }

  return (
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
        Login
      </motion.h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
          <Button
            type="submit"
            disabled={authStore.isLoading}
            className="w-full h-15 text-xl font-medium text-dark rounded-xl"
          >
            {authStore.isLoading ? (
              <div className="flex justify-center items-center space-x-2">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>Please wait...</span>
              </div>
            ) : (
              <div className="flex justify-center items-center space-x-2">
                <LogIn className="w-10 h-10" />
                <span>Sign In</span>
              </div>
            )}
          </Button>
        </form>
      </Form>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="mt-8 text-end text-gray-400 text-lg"
      >
        Don't have an account?{" "}
        <Link href="/auth/register" className="underline hover:text-gray-300">
          Register
        </Link>
      </motion.p>
    </motion.div>
  )
}
