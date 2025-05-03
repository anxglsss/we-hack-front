'use client'

import { useAuthStore } from '@/stores/auth.store'
import clsx from 'clsx'
import {
  Bookmark,
  Calendar,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  LayoutDashboard,
  Settings,
  Users
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const roleBasedNavItems = {
  student: [
    { href: '/dashboard/student/bookings', icon: <Bookmark />, label: 'Мои бронирования' },
    { href: '/dashboard/student/courses', icon: <GraduationCap />, label: 'Мои курсы' },
  ],
  organizer: [
    { href: '/dashboard/organizer/incoming', icon: <Calendar />, label: 'Входящие брони' },
    { href: '/dashboard/organizer/active', icon: <Calendar />, label: 'Активные брони' },
  ],
  admin: [
    { href: '/dashboard/admin/customers', icon: <Users />, label: 'Клиенты' },
    { href: '/dashboard/admin/settings', icon: <Settings />, label: 'Настройки' },
  ],
  common: [
    { href: '/dashboard', icon: <LayoutDashboard />, label: 'Главная' },
  ]
}

export function Sidebar() {
  const pathname = usePathname()
  const {user} = useAuthStore()
  const role = user?.role || 'student'
  const items = [...roleBasedNavItems.common, ...(roleBasedNavItems[role as keyof typeof roleBasedNavItems] || [])]

  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="pt-2 pl-3 pb-2">
      <aside
        className={clsx(
          'h-[calc(100vh-32px)] bg-zinc-900 text-white flex flex-col transition-all duration-300 rounded-2xl shadow-md',
          collapsed ? 'w-20' : 'w-64'
        )}
      >
        {/* Header */}
        <div className={clsx('flex items-center justify-between transition-all duration-300 px-4 py-6', collapsed && 'justify-center px-2')}>
          {!collapsed && <div className="text-2xl font-bold tracking-tight">OUR LOGO</div>}
          <button onClick={() => setCollapsed(!collapsed)} className="text-zinc-300">
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Nav */}
        <nav
          className={clsx(
            'flex flex-col transition-all duration-300 text-sm',
            collapsed ? 'gap-1 px-2' : 'gap-3 px-4'
          )}
        >
          {!collapsed && <div className="text-md text-zinc-400 mb-1"><p>Меню</p></div>}
          {items.map(({ href, icon, label }) => {
            const active = pathname === href

            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  'flex items-center transition-all duration-300 rounded-lg',
                  collapsed ? 'justify-center py-3' : 'gap-4 px-4 py-3',
                  active
                    ? 'bg-zinc-800 border-l-4 border-red-500 text-white'
                    : 'hover:bg-zinc-800 text-zinc-300'
                )}
              >
                <div className={clsx(
                  'transition-all duration-300 flex-shrink-0',
                  collapsed ? 'text-[20px]' : 'text-[24px]'
                )}>
                  {icon}
                </div>
                {!collapsed && (
                  <span className="transition-all duration-300 text-[16px] font-medium">
                    {label}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Footer (user info) */}
        {!collapsed && user && (
          <div className="mt-auto px-4 pt-4 border-t border-zinc-700 text-sm">
            <div>{user.email}</div>
            <div className="text-xs text-zinc-400 capitalize">{user.role}</div>
          </div>
        )}
      </aside>
    </div>
  )
}
