'use client'

import { useAuthStore } from '@/stores/auth.store'
import clsx from 'clsx'
import {
  ArrowBigLeftDash,
  ArrowBigRightDash,
  Calendar,
  Settings,
  Users
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ExpandedLogo } from './ExpandedLogo'

const roleBasedNavItems = {
  student: [],
  organizer: [
    { icon: <Calendar />, label: 'Входящие брони', href: '/dashboard/incoming' },
    { icon: <Calendar />, label: 'Активные брони', href: '/dashboard/active' },
  ],
  admin: [
    { icon: <Users />, label: 'Клиенты', href: '/dashboard/clients' },
    { icon: <Settings />, label: 'Настройки', href: '/dashboard/settings' },
  ],
  common: [
    { icon: <Calendar />, label: 'События', href: '/dashboard/events' },
    { icon: <Users />, label: 'Клубы', href: '/dashboard/clubs' },
    { icon: <Users />, label: 'Все места', href: '/dashboard/places' },
    { icon: <Calendar />, label: 'Мои билеты', href: '/dashboard/tickets' }, // ✅ New item
  ]
  
}

export function Sidebar() {
  const { user } = useAuthStore()
  const role = user?.role || 'student'
  const router = useRouter()

  const items = [...roleBasedNavItems.common, ...(roleBasedNavItems[role as keyof typeof roleBasedNavItems] || [])]

  const [collapsed, setCollapsed] = useState(false)
  const [selectedLabel, setSelectedLabel] = useState<string>('События')

  return (
    <div className="pt-2 pl-3 pb-2">
      <aside
        className={clsx(
          'h-[calc(100vh-32px)] bg-zinc-900 text-white flex flex-col transition-all duration-300 rounded-2xl shadow-md',
          collapsed ? 'w-20' : 'w-64'
        )}
      >
        <div className="relative flex justify-center items-center px-4 pt-6 pb-6">
          {collapsed ? <></> : <ExpandedLogo/>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="absolute right-4 top-4 text-zinc-300"
          >
            {collapsed ? <ArrowBigRightDash size={28} className='mb-80' /> : <ArrowBigLeftDash size={28} />}
          </button>
        </div>
        <nav
          className={clsx(
            'flex flex-col transition-all duration-300 text-sm',
            collapsed ? 'gap-1 px-2' : 'gap-3 px-4'
          )}
        >
          {!collapsed && <div className="text-lg text-zinc-400 mb-1"><p>Меню</p></div>}
          {items.map(({ icon, label, href }) => {
            const active = selectedLabel === label
            return (
              <button
                key={label}
                onClick={() => {
                  setSelectedLabel(label)
                  router.push(href)
                }}
                className={clsx(
                  'flex items-center transition-all duration-300 rounded-lg relative group w-full',
                  collapsed ? 'justify-center py-3 mt-4' : 'gap-4 px-4 py-3',
                  active
                    ? 'bg-zinc-800 text-white'
                    : 'hover:bg-zinc-800 text-zinc-300'
                )}
              >
                <span
                  className={clsx(
                    'absolute left-0 top-0 h-full w-1 bg-primary rounded-r transition-opacity duration-300',
                    active ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                  )}
                />
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
              </button>
            )
          })}
        </nav>

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
