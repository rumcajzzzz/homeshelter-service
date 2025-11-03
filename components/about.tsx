"use client"

import { useEffect, useRef, useState } from "react"
import { Award, Users, Clock } from "lucide-react"

export function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const stats = [
    {
      icon: Award,
      value: "15+",
      label: "Lat doświadczenia",
    },
    {
      icon: Users,
      value: "200+",
      label: "Zrealizowanych projektów",
    },
    {
      icon: Clock,
      value: "24/7",
      label: "Wsparcie techniczne",
    },
  ]

  return (
    <section id="o-nas" ref={sectionRef} className="py-32 bg-background">
      <div className="container px-6 lg:px-12 mx-auto">
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight text-balance">
              Bezpieczeństwo to nasza misja
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
              Od ponad 15 lat specjalizujemy się w projektowaniu i budowie schronów domowych najwyższej jakości. Każdy
              projekt traktujemy indywidualnie, dbając o najdrobniejsze szczegóły.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-1000 delay-${index * 100}`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(20px)",
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
                  <stat.icon className="w-8 h-8 text-accent" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-sm md:text-base text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div
              className={`transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Nasze wartości</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Wierzymy, że każda rodzina zasługuje na miejsce, w którym może czuć się bezpiecznie. Nasze schrony to
                połączenie najnowszych technologii z przemyślanym designem.
              </p>
              <ul className="space-y-3">
                {[
                  "Najwyższa jakość materiałów i wykonania",
                  "Indywidualne podejście do każdego projektu",
                  "Pełna dyskrecja i profesjonalizm",
                  "Kompleksowa obsługa od projektu do realizacji",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={`transition-all duration-1000 delay-500 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              <div className="relative h-full min-h-[400px] rounded overflow-hidden">
                <img src="/professional-construction-team-modern-architecture.jpg" alt="Our team" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
