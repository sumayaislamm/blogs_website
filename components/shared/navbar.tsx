'use client'

import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { LogOut, Settings, User } from 'lucide-react'

// Navigation items array - easy to maintain and organize
const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
]

// User dropdown menu items
const USER_MENU_ITEMS = [
  { label: 'Profile', href: '/profile', icon: User },
  { label: 'Settings', href: '/settings', icon: Settings },
]
type IUser = {
success : boolean,
message : string, 
data : {
    profile : {
        id : string,
        name : string, 
        email :string,
        activeStatus : string, 
        role : string,
        createdAt : string,
        updatedAt : string,
        profile : {
            id : string,
            profilePhoto : string, 
            bio : string | null ,
            userId : string,
            createdAt : string,
            updatedAt : string,

        }
    }
}

};
type NavbarProps = {
    user : IUser;
};

export function Navbar({user} : NavbarProps) {
    // const handleUserMenuAction = (action: string) =>{
    //     console.log(`User menu action: ${action}`)
    // }
  return (
    <nav className="border-b border-border bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="text-primary">NewsPress</span>
        </Link>

        {/* Navigation links - hidden on mobile */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* User dropdown menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div
              className="gap-2 flex cursor-pointer"
            >
              <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-semibold text-primary">JD</span>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <div className="px-2 py-1.5 text-sm font-medium text-foreground mb-2">
              {user.data?.profile.name || "Name"}
            </div>
            <div className="px-2 pb-2 text-xs text-muted-foreground">
              {user.data?.profile.email || "Email"}
            </div>
            <DropdownMenuSeparator className="mb-2" />
            {USER_MENU_ITEMS.map((item) => {
              const Icon = item.icon
              return (
                <DropdownMenuItem key={item.href} asChild>
                  <Link href={item.href} className="flex items-center gap-2 cursor-pointer">
                    <Icon className="size-4" />
                    <span>{item.label}</span>
                  </Link>
                </DropdownMenuItem>
              )
            })}
            <DropdownMenuSeparator className="my-2" />
            <DropdownMenuItem className="gap-2 cursor-pointer text-destructive">
              <LogOut className="size-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}
