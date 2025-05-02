// hooks/useAuthForm.ts
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { ZodSchema } from "zod"

export function useAuthForm<TSchema extends ZodSchema<any>>(schema: TSchema, initialValues?: any) {
  return useForm({
    resolver: zodResolver(schema),
    defaultValues: initialValues ?? {},
  })
}

