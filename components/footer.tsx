"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { sanityClient } from "@/lib/sanityClient"
import { useLanguage } from "@/translations/context"

type FooterData = {
  companyName?: string
  copyrightText?: string
  slogan?: string
}

export function Footer() {
  const [footer, setFooter] = useState<FooterData | null>(null)
  const currentYear = new Date().getFullYear()
  const { t } = useLanguage()

  useEffect(() => {
    sanityClient
      .fetch<FooterData>(
        `
      *[_type == "footer"][0]{
        companyName,
        copyrightText,
        slogan
      }
    `
      )
      .then((data) => setFooter(data))
      .catch(() => {})
  }, [])

  const companyName = footer?.companyName || t.footer.companyName
  const copyrightText = t.footer.copyrightText || footer?.copyrightText
  const slogan = t.footer.slogan || footer?.slogan

  const navLinks = [
    { label: t.navigation.about, href: "/#o-nas" },
    { label: t.navigation.offer, href: "/#oferta" },
    { label: t.navigation.gallery, href: "/#galeria" },
    { label: t.navigation.contact, href: "/#kontakt" },
  ]

  const legalLinks = [
    { label: t.contact.form.rodoModalTitle || "RODO", href: "/projektant/#materialy" },
  ]

  return (
    <footer className="bg-primary text-primary-foreground py-12 border-t border-primary-foreground/10">
      <div className="container px-6 lg:px-12 mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Logo & Description */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <a href="#" className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded flex items-center justify-center overflow-hidden transition-all duration-300">
                    <Image
                      src="/shelter.png"
                      alt={`${companyName} Logo`}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                </a>
                <span className="text-xl font-semibold tracking-tight">{companyName}</span>
              </div>
              <p className="text-primary-foreground/70 leading-relaxed max-w-md">
                {t.footer.description}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">{t.footer.navTitle}</h3>
              <ul className="space-y-2">
                {navLinks.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold mb-4">{t.footer.infoTitle}</h3>
              <ul className="space-y-2">
                {legalLinks.map((item, idx) => (
                  <li key={idx}>
                    <a
                      href={item.href}
                      className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-primary-foreground/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-primary-foreground/60">
                © {currentYear} {copyrightText}
              </p>
              <p className="text-sm text-primary-foreground/60">{slogan}</p>
            </div>
            <Link href="https://rumcajzdev.pl/" target="_blank" rel="noopener noreferrer">
              <div className="text-center flex flex-col items-center justify-center gap-3 mt-16">
                <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
                  <Image
                    src="/rumcajzdevlogowhite.png"
                    alt="RumcajzDev Logo"
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                  <span className="text-md text-muted-foreground tracking-wide">
                    {t.footer.developedBy} <span className="font-semibold">rumcajzdev</span>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}