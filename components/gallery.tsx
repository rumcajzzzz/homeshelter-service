"use client"

import Image from "next/image"
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
      src: "/gallery/schron8.jpeg",
      alt: "Łazienka w schronie premium",
      span: "md:col-span-2",
    },
    {
      src: "/gallery/schron13.jpeg",
      alt: "Wnętrze schronu kompaktowego",
      span: "md:col-span-1",
    },
    {
      src: "/gallery/profil.png",
      alt: "Profile ramowe",
      span: "md:col-span-1",
    },
    {
      src: "/gallery/schron15.jpeg",
      alt: "Schron kompaktowy - wejście",
      span: "md:col-span-2",
    },
    {
      src: "/gallery/schron5.jpeg",
      alt: "Toaleta w schronie premium",
      span: "md:col-span-1",
    },
    {
      src: "/gallery/schron10.jpeg",
      alt: "Schron specjalistyczny - magazyn zapasów",
      span: "md:col-span-2",
    },
  ]

  return (
    <section id="galeria" ref={sectionRef} className="py-32 bg-background"  style={{
      backgroundImage: 'url(/fiber-background.jpg)',
      backgroundColor: 'rgba(255,255,255,0.8)', // 10% w kierunku bieli
      backgroundBlendMode: 'screen',            // rozjaśnia obraz
    }}>
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
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  width={1200}
                  height={1200}
                  quality={80}
                  className="w-full h-full object-cover transition-transform duration-700 opacity-80 group-hover:scale-110"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="/placeholder.svg"
                />
                <div className="absolute inset-0 bg-linear-to-t from-primary/60 via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-primary-foreground font-medium text-lg">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-muted-foreground mb-4">
              To tylko część naszych realizacji. Chcesz zobaczyć pełną galerię?
            </p>
            <a
              href="/galeria"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg shadow-lg hover:bg-primary/90 transition-colors duration-300"
            >
              Zobacz więcej
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
