"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function SidebarDemo() {
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-300" />
      ),
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: (
        <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-300" />
      ),
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-neutral-300" />
      ),
    },
    {
      label: "Logout",
      href: "/logout",
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-300" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-7xl flex-1 flex-col overflow-hidden md:flex-row bg-[#0F0F12]",
        "h-screen" // Use h-screen for production
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "User",
                href: "/profile",
                icon: (
                  <div className="h-7 w-7 shrink-0 rounded-full bg-yellow-400 flex items-center justify-center text-black">
                    <span className="text-xs font-semibold">N</span>
                  </div>
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="/dashboard"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal"
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
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal"
    >
      <div className="h-6 w-6 shrink-0 rounded-md bg-yellow-400 flex items-center justify-center">
        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-black">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      </div>
    </Link>
  );
};

// Dummy dashboard component with content
const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="flex h-full w-full flex-1 flex-col gap-2 px-4 py-6">
        <header className="h-14 w-full flex items-center mb-6">
          <h1 className="text-xl font-medium text-white">Dashboard</h1>
          <div className="ml-auto flex items-center gap-4">
            <div className="w-60 h-8 relative rounded bg-[#111111]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IconSettings className="h-3.5 w-3.5 text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-full bg-transparent border-0 rounded pl-8 text-sm text-gray-300 placeholder-gray-500 focus:ring-0 focus:outline-none"
              />
            </div>
          </div>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...new Array(4)].map((_, idx) => (
            <div
              key={idx}
              className="h-36 rounded-lg bg-[#111111] p-4 shadow-sm"
            >
              <h3 className="text-lg font-medium text-white mb-2">Card {idx + 1}</h3>
              <p className="text-sm text-gray-400">This is a sample card for demonstration.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 