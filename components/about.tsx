"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Award, Clock, Users } from "lucide-react"
import { useLanguage } from "@/translations/context"

export function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const icons = [Award, Users, Clock]

  return (
    <section
      id="o-nas"
      ref={sectionRef}
      className="py-24 md:py-32 bg-background"
      style={{
        backgroundImage: "url(/fiber-background.jpg)",
        backgroundColor: "rgba(255,255,255,0.9)",
        backgroundBlendMode: "screen",
      }}
    >
      <div className="container px-6 lg:px-12 mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div
            className={`text-center mb-20 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight text-balance">
              {t.about.heading}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
              {t.about.subHeading}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {t.about.stats.map((stat: { value: string; label: string }, index: number) => {
              const Icon = icons[index] || Award
              return (
                <div
                  key={index}
                  className="text-center transition-all duration-1000"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(20px)",
                    transitionDelay: `${index * 150}ms`,
                  }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
                    <Icon className="w-8 h-8 text-accent" aria-hidden="true" />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-sm md:text-base text-muted-foreground font-medium">{stat.label}</div>
                </div>
              )
            })}
          </div>

          {/* Solutions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div
              className={`transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{t.about.solutionsHeading}</h3>
              <div className="text-muted-foreground leading-relaxed mb-6">
                {t.about.solutionsSubHeading}
              </div>
              <ul className="space-y-3">
                {t.about.solutionsList.map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={`relative h-full min-h-[400px] rounded overflow-hidden transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              <Image
                src="/budowa.jpg"
                alt="Zespół przy realizacji konstrukcji żelbetowej"
                fill
                className="object-cover opacity-60"
                priority={false}
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary/60 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}