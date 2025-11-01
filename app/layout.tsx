import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const romanSD = localFont({
  src: "./fonts/Roman SD.ttf",
  variable: "--font-roman",
  display: "swap",
})

export const metadata: Metadata = {
  title: "$NUT - Nut Until Today",
  description: "No Unnecessary Trades. No FOMO. No surrender. Just disciplined warriors resisting the urge to ape in.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${romanSD.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
