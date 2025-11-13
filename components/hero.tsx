"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Shield } from "lucide-react"
import { useEffect, useState } from "react"
import Image from "next/image"


export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/front.jpeg"
          alt="Prefabrykowany schron żelbetowy"
          width={1920}
          height={1080}
          priority
          quality={85}
          className="w-full h-full object-cover opacity-30"
        />

        <div className="absolute inset-0 bg-linear-to-b from-primary/80 via-primary/70 to-primary" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-6 lg:px-12 py-32">
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 mb-8">
            <Shield className="w-4 h-4 text-accent" />
            <span className="text-xs font-medium text-primary-foreground">
              Zgodne z wytycznymi MSWiA i ustawą o ochronie ludności
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-6 tracking-tight text-balance leading-[1.1]">
            Schrony i ukrycia
            <span className="block text-accent mt-2">nowej generacji</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed text-pretty">
            <span className="font-extrabold">Szybko, solidnie i zawsze zgodnie z obowiązującymi normami.</span> <br />
            <span className="text-primary-foreground/60">
              Realizujemy nowoczesne schrony i ukrycia (DMS) z certyfikowanych modułów żelbetowych.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-base px-8 h-14"
              asChild
            >
              <a href="#kontakt">
                Skontaktuj się z nami
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8 h-14 bg-transparent"
              asChild
            >
              <a href="#oferta">Zobacz ofertę</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-accent rounded-full" />
        </div>
      </div>
    </section>
  )
}
