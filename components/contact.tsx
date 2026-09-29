"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin } from "lucide-react"
import ContactForm from "./contactForm"
import Link from "next/link"
import { useLanguage } from "@/translations/context"

export function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const contactData = {
    email: "office@fibersystem.eu",
    address: "Ul. Okopowa 59a lok.97, 01-043 Warszawa",
  }

  const contactInfo = [
    {
      id: "phone",
      icon: Phone,
      label: t.contact.phoneLabel,
      value: t.footer.phoneNumber,
      href: `tel:${t.footer.phoneNumber.replace(/\s+/g, "")}`,
      isExternal: false,
    },
    {
      id: "email",
      icon: Mail,
      label: t.contact.emailLabel,
      value: contactData.email,
      href: `mailto:${contactData.email}`,
      isExternal: false,
    },
    {
      id: "address",
      icon: MapPin,
      label: t.contact.addressLabel,
      value: contactData.address,
      href: "https://maps.app.goo.gl/Y1wsRfAZ9pEtcQjKA",
      isExternal: true,
    },
  ]

  return (
    <section id="kontakt" ref={sectionRef} className="py-32 bg-muted/30">
      <div className="container px-6 lg:px-12 mx-auto">
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight text-balance">
              {t.contact.heading}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
              {t.contact.subHeading}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {contactInfo.map((info, index) => (
              <Card
                key={info.id}
                className={`transition-all duration-500 border-border bg-card ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                <Link
                  href={info.href}
                  target={info.isExternal ? "_blank" : undefined}
                  rel={info.isExternal ? "noopener noreferrer" : undefined}
                  className="block h-full"
                >
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-4">
                      <info.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">{info.label}</h3>
                    <span className="text-foreground font-medium hover:text-accent transition-colors block">
                      {info.value}
                    </span>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>

          <Card
            className={`transition-all duration-1000 delay-500 border-border bg-card ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <ContactForm />
          </Card>
        </div>
      </div>
    </section>
  )
}