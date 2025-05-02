'use client'

import clsx from 'clsx'
import {
  BookOpenCheck,
  CalendarClock,
  ClipboardList,
  LayoutDashboard,
  Settings,
  UserCog,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
  { href: '/incoming', icon: <CalendarClock size={18} />, label: 'Incoming bookings' },
  { href: '/active', icon: <BookOpenCheck size={18} />, label: 'Active bookings' },
  { href: '/customers', icon: <Users size={18} />, label: 'Customers' },
  { href: '/mechanics', icon: <UserCog size={18} />, label: 'Mechanics' },
  { href: '/pricing', icon: <Settings size={18} />, label: 'Price settings' },
  { href: '/finished', icon: <ClipboardList size={18} />, label: 'Finished bookings' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="h-screen w-64 bg-zinc-900 text-white flex flex-col px-4 py-6">
      <div className="text-2xl font-bold mb-8">SHODIM.SDU</div>
      <nav className="flex flex-col gap-2 text-sm">
        <div className="text-xs text-zinc-400 mb-2">Menus</div>
        {navItems.map(({ href, icon, label }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors',
              pathname === href
                ? 'bg-zinc-800 border-l-4 border-red-500 text-white'
                : 'hover:bg-zinc-800 text-zinc-300'
            )}
          >
            <span className={clsx('text-white', pathname === href ? 'text-red-400' : '')}>
              {icon}
            </span>
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
