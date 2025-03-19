import type React from "react"
import type { Metadata } from "next"
import { Cairo } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { RTLProvider } from "@/components/rtl-provider"
import { SidebarProvider } from "@/components/layout/sidebar-provider"
import "./globals.css"

const cairo = Cairo({ subsets: ["arabic"] })

export const metadata: Metadata = {
  title: "نظام إدارة تربية المواشي",
  description: "نظام متكامل لإدارة تربية المواشي",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={cairo.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <RTLProvider>
            <SidebarProvider>
              {children}
              <Toaster />
            </SidebarProvider>
          </RTLProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'