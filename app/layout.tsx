import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const spartacus = localFont({
  src: "./fonts/Spartacus-KVdLp.ttf",
  variable: "--font-spartacus",
  display: "swap",
})

export const metadata: Metadata = {
  title: "$NUT - Nut Until Today",
  description: "Join the movement. No snacking. No surrender. Just nutty warriors.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spartacus.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
