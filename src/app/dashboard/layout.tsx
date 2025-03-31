"use client";

import React, { useState } from 'react';
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { IconBrandTabler, IconFolderPlus, IconHome, IconBolt } from "@tabler/icons-react";
import { Analytics } from '@vercel/analytics/react';
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion } from "motion/react";
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    {
      label: "Ideate",
      href: "/dashboard/analysis",
      icon: (
        <IconBolt className="h-5 w-5 shrink-0 text-neutral-300" />
      ),
    },
    {
      label: "Explore",
      href: "/dashboard",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-300" />
      ),
    },
    {
      label: "Projects",
      href: "/dashboard/projects",
      icon: (
        <IconFolderPlus className="h-5 w-5 shrink-0 text-neutral-300" />
      ),
    },
    {
      label: "Dashboard",
      href: "/dashboard/personal",
      icon: (
        <IconHome className="h-5 w-5 shrink-0 text-neutral-300" />
      ),
    },
  ];

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden bg-[#0A0A0A]">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between bg-[#0F0F12] dark:bg-[#0F0F12]">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-6 flex flex-col gap-2 px-2">
              {links.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <SidebarLink 
                    key={idx} 
                    link={{
                      ...link,
                      icon: React.cloneElement(link.icon as React.ReactElement, {
                        className: cn(
                          "h-5 w-5 shrink-0",
                          isActive 
                            ? "text-yellow-400" 
                            : "text-neutral-300 group-hover/sidebar:text-neutral-100"
                        )
                      } as React.HTMLAttributes<SVGElement>)
                    }}
                    className={isActive ? "font-semibold" : ""}
                  />
                );
              })}
            </div>
          </div>
          <div className="mt-auto">
            <SidebarLink
              link={{
                label: "User",
                href: "/profile",
                icon: (
                  <div className="h-7 w-7 shrink-0 rounded-full bg-[#111111] flex items-center justify-center border border-[#333333]/40">
                    <span className="text-xs font-semibold text-white">N</span>
                  </div>
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      
      <div className="flex-1 overflow-auto">
        <header className="h-14 px-4 flex items-center justify-between bg-[#0A0A0A] border-b border-[#222222]/20 z-30">
          <div className="flex items-center">
            <span className="text-base font-medium text-white">
              {links.find(link => pathname === link.href)?.label || "Ideaflow"}
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-64 relative">
              <input
                type="text"
                placeholder="Search anything..."
                className="w-full h-8 bg-[#111111] border-0 rounded px-4 py-1 text-sm text-gray-300 placeholder-gray-500 focus:ring-0 focus:outline-none"
              />
            </div>
          </div>
        </header>
        
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
      
      <Analytics />
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="/dashboard"
      className="relative z-20 flex items-center space-x-2 py-3 px-4 text-sm font-normal"
    >
      <div className="h-6 w-6 shrink-0 rounded-md bg-yellow-400 flex items-center justify-center">
        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-black">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-yellow-400"
      >
        Ideaflow
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="/dashboard"
      className="relative z-20 flex items-center justify-center py-3 text-sm font-normal"
    >
      <div className="h-6 w-6 shrink-0 rounded-md bg-yellow-400 flex items-center justify-center">
        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-black">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      </div>
    </Link>
  );
}; 