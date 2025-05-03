"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useAuthStore } from "@/stores/auth.store"
import { motion } from "framer-motion"
import { observer } from "mobx-react-lite"
import { useRouter } from 'next/navigation'
import { useState } from "react"

interface OtpModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const OtpModal = observer(({ open, onOpenChange }: OtpModalProps) => {
  const [code, setCode] = useState("")
  const { verifyCode } = useAuthStore()
  const router = useRouter()

  const handleVerify = () => {
    try{
      const numericCode = parseInt(code)
      if (!isNaN(numericCode) && code.length === 6) {
        verifyCode(numericCode)
        setCode("")
        onOpenChange(false)
        router.replace("/dashboard")
      } 
    } catch (error) {
      console.error("Error verifying code:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md py-12 border-none bg-gradient-to-br from-[#24243d] via-[#13131d] to-[#08080b] text-white rounded-2xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-4xl font-bold text-center">
            Verify Email
          </DialogTitle>
        </DialogHeader>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8 mt-6"
        >
          <p className="text-center text-xl">
            Enter the 6-digit code sent to your email
          </p>

          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={code}
              onChange={(val: any) => setCode(val)}
              className="text-2xl"
              containerClassName="justify-center"
            >
              <InputOTPGroup className='w-full'>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button
            onClick={handleVerify}
            className="w-full h-14 text-white bg-white/10 hover:bg-white/20 rounded-xl text-lg font-semibold"
          >
            Submit Code
          </Button>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
})
