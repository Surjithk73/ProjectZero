"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps as NextThemeProviderProps } from "next-themes";

export interface ThemeProviderProps extends Omit<NextThemeProviderProps, "attribute"> {
  children: React.ReactNode;
  attribute?: "class" | "data-theme" | "data-mode";
  defaultTheme?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

export function ThemeProvider({ 
  children, 
  ...props 
}: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
} 