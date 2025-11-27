"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

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

  const navLinks = [
    { href: "/#o-nas", label: "O nas" },
    { href: "/#oferta", label: "Oferta" },
    { href: "/inwestor", label: "Dla inwestorów" },
    { href: "/projektant", label: "Dla projektantów" },
    { href: "/galeria", label: "Galeria" },
    { href: "/#spacer", label: "Spacer Wirtualny" },
  ]
  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-card/95 backdrop-blur-md shadow-sm border-b border-border " : "text-white bg-transparent",
        (isMobileMenuOpen && !isScrolled) ? "bg-[#1a1a1a]" : ""
      )}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
         {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div
              className="w-24 h-24 rounded flex items-center justify-center overflow-hidden transition-all duration-300"
            >
              <Image
                src={isScrolled ? "/shelter-black.png" : "/shelter.png"}
                alt="FIBER SYSTEM Logo"
                width={96}
                height={96}
                className="object-cover"
              />
            </div>
            <span className={`text-xl font-semibold tracking-tight text-background hidden sm:block ${isScrolled ? "text-foreground" : ""}`}>
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
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <a href={"/#kontakt"}>Skontaktuj się</a>
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
                className={`text-sm font-medium text-muted-foreground transition-colors py-2 ${isScrolled ? "hover:text-foreground" : "text-white hover:text-[#6a6a6a]"}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground w-full">
              <a href="/#kontakt" onClick={() => setIsMobileMenuOpen(false)}>
                Skontaktuj się
              </a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
