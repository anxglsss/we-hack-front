'use client'
import logo from '@/assets/logo1.png'
import Image from 'next/image'

export const CollapsedLogo = () => (
  <Image
    src={logo}
    alt="logo"
    width={48}
    height={64}
    className="transition-all duration-300 mx-auto mt-4"
  />
)
