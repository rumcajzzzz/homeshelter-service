"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useLanguage, Language } from "@/translations/context"
import { motion, AnimatePresence } from "framer-motion"

const FLAGS: Record<Language, { label: string; flag: React.ReactNode }> = {
  PL: {
    label: "PL",
    flag: (
      <svg className="w-5 h-3.5 rounded-[2px] object-cover shrink-0 border border-black/10" viewBox="0 0 640 480">
        <rect width="640" height="240" fill="#ffffff" />
        <rect y="240" width="640" height="240" fill="#dc143c" />
      </svg>
    ),
  },
  EN: {
    label: "EN",
    flag: (
      <svg className="w-5 h-3.5 rounded-[2px] object-cover shrink-0 border border-black/10" viewBox="0 0 640 480">
        <path fill="#00247d" d="M0 0h640v480H0z" />
        <path stroke="#fff" strokeWidth="60" d="M0 0l640 480M640 0L0 480" />
        <path stroke="#cf142b" strokeWidth="40" d="M0 0l640 480M640 0L0 480" />
        <path stroke="#fff" strokeWidth="100" d="M320 0v480M0 240h640" />
        <path stroke="#cf142b" strokeWidth="60" d="M320 0v480M0 240h640" />
      </svg>
    ),
  },
  DE: {
    label: "DE",
    flag: (
      <svg className="w-5 h-3.5 rounded-[2px] object-cover shrink-0 border border-black/10" viewBox="0 0 640 480">
        <rect width="640" height="160" fill="#000000" />
        <rect y="160" width="640" height="160" fill="#dd0000" />
        <rect y="320" width="640" height="160" fill="#ffce00" />
      </svg>
    ),
  },
}

const NEXT_LANG: Record<Language, Language> = {
  PL: "EN",
  EN: "DE",
  DE: "PL",
}

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    const isSubpage = pathname !== "/" && !pathname.startsWith("/#")
    setIsScrolled(isSubpage)

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else if (!isSubpage) {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname])

  const handleToggle = () => {
    setLanguage(NEXT_LANG[language])
  }

  const navLinks = [
    { href: "/#o-nas", label: t.navigation.about },
    { href: "/#oferta", label: t.navigation.offer },
    { href: "/inwestor", label: t.navigation.investors },
    { href: "/projektant", label: t.navigation.designers },
    { href: "/galeria", label: t.navigation.gallery },
    { href: "/#spacer", label: t.navigation.virtualTour },
  ]

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-card/95 backdrop-blur-md shadow-sm border-b border-border " : "text-white bg-transparent",
        isMobileMenuOpen && !isScrolled ? "bg-[#1a1a1a]" : ""
      )}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-24 h-24 rounded flex items-center justify-center overflow-hidden transition-all duration-300">
              <Image
                src={isScrolled ? "/shelter-black.png" : "/shelter.png"}
                alt="FIBER SYSTEM Logo"
                width={96}
                height={96}
                className="object-cover"
              />
            </div>
            <span
              className={`text-xl font-semibold tracking-tight text-background hidden sm:block ${
                isScrolled ? "text-foreground" : ""
              }`}
            >
              FIBER SYSTEM
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-background hover:opacity-50 transition-opacity"
              >
                {link.label}
              </a>
            ))}

            {/* Animated Single Toggle Button (Desktop) */}
            <button
              onClick={handleToggle}
              className="flex items-center justify-center min-w-[70px] h-8 px-3 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 border border-border/20 backdrop-blur-sm transition-all text-xs font-semibold active:scale-95 overflow-hidden cursor-pointer"
              title="Zmień język"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={language}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="flex items-center gap-2"
                >
                  {FLAGS[language].flag}
                  <span>{FLAGS[language].label}</span>
                </motion.span>
              </AnimatePresence>
            </button>

            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <a href={"/#kontakt"}>{t.navigation.contact}</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-700 ease-in-out border-t border-border",
            isMobileMenuOpen ? "max-h-screen opacity-100 py-6" : "max-h-0 opacity-0 py-0"
          )}
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium text-muted-foreground transition-colors py-2 ${
                  isScrolled ? "hover:text-foreground" : "text-white hover:text-[#6a6a6a]"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}

            {/* Animated Single Toggle Button (Mobile) */}
            <div className="flex items-center justify-between py-3 my-2 border-y border-border/40">
              <button
                onClick={handleToggle}
                className="flex items-center justify-center min-w-[70px] h-9 px-4 rounded-full bg-black/10 dark:bg-white/10 border border-border/20 text-xs font-semibold active:scale-95 overflow-hidden"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={language}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="flex items-center gap-2"
                  >
                    {FLAGS[language].flag}
                    <span>{FLAGS[language].label}</span>
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>

            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground w-full">
              <a href="/#kontakt" onClick={() => setIsMobileMenuOpen(false)}>
                {t.navigation.contact}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}