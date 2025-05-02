// hooks/useAuthForm.ts
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { TypeOf, ZodSchema } from "zod"

export function useAuthForm<T extends ZodSchema>(schema: T) {
  return useForm<TypeOf<T>>({
    resolver: zodResolver(schema),
    defaultValues: {} as TypeOf<T>,
  })
}
