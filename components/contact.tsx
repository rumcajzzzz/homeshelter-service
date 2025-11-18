"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin } from "lucide-react"
import { sanityClient } from "@/lib/sanityClient"

type ContactData = {
  subHeading: string
  Phone: string
  Email: string
  Address: string
}

export function Contact() {
  const [contact, setContact] = useState<ContactData | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement)?.value,
      email: (form.elements.namedItem("email") as HTMLInputElement)?.value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement)?.value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)?.value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Błąd serwera");

      setSuccess("Wiadomość została wysłana pomyślnie!");
      form.reset();
    } catch (err) {
      setError("Nie udało się wysłać wiadomości. Spróbuj ponownie.");
    } finally {
      setLoading(false);
    }
  };
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

  useEffect(() => {
    sanityClient
      .fetch<ContactData>(`*[_type == "contact"][0]{
        subHeading,
        Phone,
        Email,
        Address
      }`)
      .then((data) => {
        if (data) setContact(data) 
      })
      .catch(() => {
      })
  }, [])

  const fallbackContact: ContactData = {
    subHeading: "Jesteśmy do Twojej dyspozycji. Skontaktuj się z nami, aby omówić szczegóły Twojego projektu.",
    Phone: "+48 576 210 845",
    Email: "office@fibersystem.eu",
    Address: "Ul. Okopowa 59a lok.97, 01-043 Warszawa",
  }

  const currentContact = contact || fallbackContact

  const contactInfo = [
    {
      icon: Phone,
      label: "Telefon",
      value: currentContact.Phone,
      href: `tel:${currentContact.Phone.replace(/\s+/g, "")}`,
    },
    {
      icon: Mail,
      label: "Email",
      value: currentContact.Email,
      href: `mailto:${currentContact.Email}`,
    },
    {
      icon: MapPin,
      label: "Adres",
      value: currentContact.Address,
      href: "#",
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
              Skontaktuj się z nami
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
              Jesteśmy do Twojej dyspozycji. Skontaktuj się z nami, aby omówić szczegóły Twojego projektu.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className={`transition-all duration-500 border-border bg-card ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-4">
                    <info.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">{info.label}</h3>
                  <a href={info.href} className="text-foreground font-medium hover:text-accent transition-colors">
                    {info.value}
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card
            className={`transition-all duration-1000 delay-500 border-border bg-card ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <CardContent className="p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      Imię i nazwisko
                    </label>
                    <Input id="name" placeholder="Jan Kowalski" className="bg-background" required/>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="jan.kowalski@gmail.com" className="bg-background" required/>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-foreground">
                    Telefon
                  </label>
                  <Input id="phone" type="tel" placeholder="+48 123 456 789" className="bg-background" required />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    Wiadomość
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Opisz swoje potrzeby..."
                    rows={6}
                    className="bg-background resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  {loading ? "Wysyłanie..." : "Wyślij wiadomość"}
                </Button>
              </form>
              {success && (
                <p className="text-green-600 text-center font-medium">{success}</p>
              )}
              {error && (
                <p className="text-red-600 text-center font-medium">{error}</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
