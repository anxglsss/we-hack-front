'use client'
import longLogo from '@/assets/logo5.png'
import Image from 'next/image'

export const ExpandedLogo = () => (
  <Image
    src={longLogo}
    alt="long logo"
    width={200}
    height={64}
    className="transition-all duration-300 mx-auto mt-4"
  />
)
