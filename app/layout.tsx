import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "FIBER SYSTEM Polska",
  description: "Bezpieczne, nowoczesne schrony i ukrycia zgodne z normami MSWiA.",
  icons: {
    icon: "/shelter.ico",              
    shortcut: "/shelter.ico",        
    apple: "/shelter.ico",      
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pl" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
