"use client"

import { useEffect, useRef, useState } from "react"

export function Gallery() {
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

  const images = [
    {
      src: "/modern-shelter-entrance-steel-door-concrete.jpg",
      alt: "Wejście do schronu",
      span: "md:col-span-2",
    },
    {
      src: "/shelter-interior-living-space-modern-furniture.jpg",
      alt: "Wnętrze schronu - strefa dzienna",
      span: "md:col-span-1",
    },
    {
      src: "/shelter-ventilation-system-technical-room.jpg",
      alt: "System wentylacji",
      span: "md:col-span-1",
    },
    {
      src: "/luxury-shelter-bedroom-comfortable-interior.jpg",
      alt: "Sypialnia w schronie premium",
      span: "md:col-span-2",
    },
    {
      src: "/shelter-control-room-monitoring-systems.jpg",
      alt: "Centrum kontroli",
      span: "md:col-span-1",
    },
    {
      src: "/shelter-storage-room-supplies-organized.jpg",
      alt: "Magazyn zapasów",
      span: "md:col-span-2",
    },
  ]

  return (
    <section id="galeria" ref={sectionRef} className="py-32 bg-background">
      <div className="container px-6 lg:px-12 mx-auto">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight text-balance">
              Nasze realizacje
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
              Zobacz przykłady naszych projektów. Każdy schron jest unikalny i dostosowany do indywidualnych potrzeb
              klienta.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <div
                key={index}
                className={`${image.span} group relative overflow-hidden rounded-lg aspect-4/3 transition-all duration-500 ${
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-primary-foreground font-medium text-lg">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
