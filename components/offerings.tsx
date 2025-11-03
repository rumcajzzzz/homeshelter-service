"use client"

import { useEffect, useRef, useState } from "react"
import { Home, Building2, Shield, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function Offerings() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const offerings = [
    {
      icon: Home,
      title: "Schrony rodzinne",
      description:
        "Kompaktowe rozwiązania dla rodzin, zapewniające komfort i bezpieczeństwo na najwyższym poziomie.",
      features: ["Do 8 osób", "Systemy wentylacji", "Autonomia 14 dni"],
      blobShape: {
        roundedTL: "40px",
        roundedTR: "40px",
        roundedBL: "150px",
        rotate: "5deg",
      },
      blobSrc: "/blobs/blob1.jpg",
    },
    {
      icon: Building2,
      title: "Schrony premium",
      description:
        "Luksusowe schrony z pełnym wyposażeniem, łączące bezpieczeństwo z najwyższym komfortem życia.",
      features: ["Do 20 osób", "Pełne wyposażenie", "Autonomia 30 dni"],
      blobShape: {
        roundedTL: "60px",
        roundedTR: "30px",
        roundedBL: "120px",
        rotate: "-5deg",
      },
      blobSrc: "/blobs/blob4.png",
    },
    {
      icon: Shield,
      title: "Schrony specjalistyczne",
      description:
        "Dedykowane rozwiązania dla firm i instytucji wymagających najwyższych standardów bezpieczeństwa.",
      features: ["Dowolna pojemność", "Zaawansowane systemy", "Pełna customizacja"],
      blobShape: {
        roundedTL: "50px",
        roundedTR: "50px",
        roundedBL: "100px",
        rotate: "8deg",
      },
      blobSrc: "/blobs/blob2.jpg",
    },
    {
      icon: Zap,
      title: "Modernizacja",
      description:
        "Kompleksowa modernizacja istniejących schronów z wykorzystaniem najnowszych technologii.",
      features: ["Audyt techniczny", "Nowe systemy", "Upgrade wyposażenia"],
      blobShape: {
        roundedTL: "70px",
        roundedTR: "30px",
        roundedBL: "140px",
        rotate: "-8deg",
      },
      blobSrc: "/blobs/blob3.png",
    },
  ]
  
  
  return (
    <section id="oferta" ref={sectionRef} className="py-32 bg-muted/30">
      <div className="container px-6 lg:px-12 mx-auto">
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight text-balance">
              Nasza oferta
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
              Oferujemy kompleksowe rozwiązania dostosowane do Twoich potrzeb. Od projektu, przez budowę, aż po pełne
              wyposażenie.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {offerings.map((offering, index) => (
             <Card
             key={index}
             className={`group relative overflow-hidden hover:shadow-lg transition-all duration-500 border-border bg-card ${
               isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
             }`}
             style={{ transitionDelay: `${index * 150}ms` }}
           >
             <div className="absolute -bottom-10 -right-5 w-64 h-64 overflow-hidden pointer-events-none">
                <img
                  src={offering.blobSrc} 
                  alt=""
                  style={{
                    borderTopLeftRadius: offering.blobShape.roundedTL,
                    borderTopRightRadius: offering.blobShape.roundedTR,
                    borderBottomLeftRadius: offering.blobShape.roundedBL,
                    transform: `rotate(${offering.blobShape.rotate})`,
                  }}
                  className="w-full h-full object-cover opacity-50"
                />
              </div>
               <CardContent className="p-8 relative z-10">
                 <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-accent/10 mb-6 group-hover:bg-accent/20 transition-colors">
                   <offering.icon className="w-7 h-7 text-accent" />
                 </div>
                 <h3 className="text-2xl font-bold text-foreground mb-3">{offering.title}</h3>
                 <p className="text-muted-foreground leading-relaxed mb-6 shadow-xl bg-gray-50">{offering.description}</p>
                 <ul className="space-y-2">
                   {offering.features.map((feature, idx) => (
                     <li key={idx} className="flex items-center gap-3">
                       <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                       <span className="text-sm text-muted-foreground ">{feature}</span>
                     </li>
                   ))}
                 </ul>
               </CardContent>
           </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
