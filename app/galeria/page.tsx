"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowLeft, ArrowRight, X } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Image from "next/image"

interface ImageItem {
  src: string
  alt: string
  category: string
}

export default function Gallery() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("Wszystkie")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

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

  const images: ImageItem[] = [
    // --- Realizacje i budowa ---
    { src: "/gallery2/budowa1.jpg", alt: "Etap budowy – prace fundamentowe i podbudowa", category: "Realizacje" },
    { src: "/gallery2/budowa2.JPG", alt: "Montaż prefabrykowanego elementu przy użyciu dźwigu", category: "Realizacje" },
    { src: "/gallery2/budowa4.jpg", alt: "Montaż prefabrykowanego elementu przy użyciu dźwigu", category: "Realizacje" },
    { src: "/gallery2/d9acd4f7-2925-42d3-8450-2f8dae4c6232.jpeg", alt: "Montaż modułów prefabrykowanych", category: "Realizacje" },
    { src: "/gallery2/budowa3.jpg", alt: "Prace konstrukcyjno-montażowe", category: "Realizacje" },
    { src: "/gallery2/IMG_2994.jpeg", alt: "Wnętrze schronu w stanie surowym", category: "Realizacje" },
    { src: "/gallery2/realizacja.png", alt: "Realizacja w Piasecznie – PEHD DN2400 mm, długość 20 m", category: "Realizacje" },
    { src: "/gallery2/realizacja2.jpg", alt: "Realizacja w Piasecznie – PEHD DN2400 mm, długość 20 m", category: "Realizacje" },
  
    // --- Schrony kompaktowe (2–4 osoby) ---
    { src: "/gallery2/schron2wejscie.jpeg", alt: "Wejście do schronu kompaktowego dla 2 osób", category: "Schrony kompaktowe" },
    { src: "/gallery2/schron2salon.jpeg", alt: "Wnętrze schronu kompaktowego – salon dla 2 osób", category: "Schrony kompaktowe" },
    { src: "/gallery2/schron2lazienka.jpeg", alt: "Łazienka w schronie kompaktowym dla 2 osób", category: "Schrony kompaktowe" },
    { src: "/gallery2/schron4wejscie.jpeg", alt: "Wejście do schronu rodzinnego dla 4 osób", category: "Schrony kompaktowe" },
    // { src: "/gallery2/schron4lazienka.jpeg", alt: "Łazienka w schronie kompaktowym dla 4 osób", category: "Schrony kompaktowe" },
    { src: "/gallery2/schron4widokzgory.jpeg", alt: "Schron kompaktowy dla 4 osób – widok z góry", category: "Schrony kompaktowe" },
  
    // --- Schrony żelbetowe i modułowe ---
    { src: "/gallery2/schron100rzut.jpeg", alt: "Projekt schronu żelbetowego dla 100 osób – rzut techniczny", category: "Schrony żelbetowe" },
    { src: "/gallery2/schron100techniczne.jpeg", alt: "Pomieszczenie techniczne w schronie żelbetowym dla 100 osób", category: "Schrony żelbetowe" },
    { src: "/gallery2/schron100sypialnia.jpeg", alt: "Sypialnia w schronie żelbetowym dla 100 osób", category: "Schrony żelbetowe" },
    { src: "/gallery2/schron100magazyn.jpeg", alt: "Magazyn zapasów w schronie żelbetowym dla 100 osób", category: "Schrony żelbetowe" },
    { src: "/gallery2/schron100lazienka.jpeg", alt: "Łazienka w schronie żelbetowym dla 100 osób", category: "Schrony żelbetowe" },
    { src: "/gallery2/schronmodulowyzelbetowyrzut.jpeg", alt: "Modułowy schron żelbetowy dla 20 osób i 2 osób z obsługi", category: "Schrony żelbetowe" },
    { src: "/gallery2/schronmodulowyzelbetowysypialnia.jpeg", alt: "Sypialnia w schronie dla 20 osób i 2 osób z obsługi", category: "Schrony żelbetowe" },
    { src: "/gallery2/schronmodulowyzelbetowysalonimagzyn.jpeg", alt: "Strefa dzienna i magazynowa w schronie dla 20 osób i 2 osób z obsługi", category: "Schrony żelbetowe" },
    
    
    // --- Systemy i urządzenia ---
    { src: "/gallery2/drzwiwlazowe.JPG", alt: "Drzwi frontowe – widok z wewnątrz", category: "Systemy i urządzenia" },
    { src: "/gallery2/drzwiwlazowe2.JPG", alt: "Drzwi frontowe – widok z boku z mechanizmem ryglowania", category: "Systemy i urządzenia" },
    { src: "/gallery2/IMG_2609.jpg", alt: "System filtrowentylacji", category: "Systemy i urządzenia" },
    { src: "/gallery2/IMG_3566.jpg", alt: "Zespół filtrow do filtrowentylacji", category: "Systemy i urządzenia" },
    { src: "/gallery2/IMG_3564.jpg", alt: "System mocowań dla drzwi do schronu", category: "Systemy i urządzenia" },
    { src: "/gallery2/IMG_3563.jpg", alt: "Mechanizm drzwi wejściowych do schronu - widok z wewnątrz", category: "Systemy i urządzenia" },
    { src: "/gallery2/IMG_3562.jpg", alt: "Drzwi do schronu - widok z wewnątrz", category: "Systemy i urządzenia" },
    { src: "/gallery2/IMG_3561.jpg", alt: "Drzwi do schronu - widok z zewewnątrz", category: "Systemy i urządzenia" },
    { src: "/gallery2/IMG_3560.jpg", alt: "Drzwi do schronu - widok z boku", category: "Systemy i urządzenia" },
    { src: "/gallery2/IMG_3559.jpg", alt: "Drzwi wejściowe gazoszcelne", category: "Systemy i urządzenia" },
    { src: "/gallery2/IMG_3558.jpg", alt: "Drzwi wejściowe gazoszcelne - widok z wewnątrz", category: "Systemy i urządzenia" },
    { src: "/gallery2/df1de736-fb87-4690-9878-3c43580691e0.jpeg", alt: "Właz kanału ucieczkowego, szczelny - widok z zewnątrz", category: "Systemy i urządzenia" },
    { src: "/gallery2/29a7e839-eecc-41d9-9fd7-b8b8ffbd916d.jpg", alt: "Włazy ucieczkowe ze schronu", category: "Systemy i urządzenia" },
    { src: "/gallery2/33d65881-5541-4dee-918d-4fca513a0d3f.jpg", alt: "Właz ucieczkowy", category: "Systemy i urządzenia" },
    { src: "/gallery2/4453d3fd-d7f3-45a3-871a-c60f51492692.jpg", alt: "Właz ucieczkowy", category: "Systemy i urządzenia" },
    { src: "/gallery2/IMG_2621.jpg", alt: "Zawór ręczny", category: "Systemy i urządzenia" },
    { src: "/gallery2/IMG_2619.jpg", alt: "Zawór nadciśnieniowy", category: "Systemy i urządzenia" },
    { src: "/gallery2/IMG_2618.jpg", alt: "Zawór nadciśnieniowy", category: "Systemy i urządzenia" },

    // --- Konstrukcje żelbetowe ---
    { src: "/gallery2/profilebudowa.png", alt: "Profil konstrukcyjny na bazie okrągłych rur żelbetowych podczas budowy", category: "Konstrukcje żelbetowe" },
    { src: "/gallery2/profilramowy.png", alt: "Profil ramowej konstrukcji żelbetowej podczas montażu", category: "Konstrukcje żelbetowe" },
  ];
  const categories = [
    "Wszystkie",
    "Schrony kompaktowe",
    "Schrony żelbetowe",
    "Systemy i urządzenia",
    "Konstrukcje żelbetowe",
    "Realizacje"
  ];
  const filteredImages =
    selectedCategory === "Wszystkie"
      ? images
      : images.filter((img) => img.category === selectedCategory)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  const prevImage = () => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length)
  }
  const nextImage = () => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex + 1) % filteredImages.length)
  }

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === "ArrowLeft") prevImage()
      if (e.key === "ArrowRight") nextImage()
      if (e.key === "Escape") closeLightbox()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [lightboxIndex, filteredImages.length])
  return (
    <main className="min-h-screen bg-background">
      
      <Navigation />

      <section id="galeria" className="py-32 bg-background">
        <div className="container px-6 lg:px-12 mx-auto">
          <div className="max-w-7xl mx-auto">
            <div
              ref={sectionRef} 
              className={`text-center mb-12 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight text-balance">
                Galeria
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
                Zobacz przykłady naszych projektów. Każdy schron jest unikalny i dostosowany do indywidualnych potrzeb klienta.
              </p>

              {/* Filtry kategorii */}
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                      selectedCategory === cat
                        ? "bg-accent text-accent-foreground border-accent"
                        : "bg-background text-foreground border-border hover:bg-accent/20"
                    }`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Galeria */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredImages.map((image, index) => {
                const isSpecialImage = image.src === "/gallery2/realizacja2.jpg"
                
                const containerClasses = `group relative overflow-hidden rounded-lg cursor-pointer transition-all duration-1000 ${
                  isSpecialImage 
                    ? "aspect-auto bg-orange-200 opacity-20"
                    : "aspect-square"
                } ${
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`
              
                const imageClasses = `w-full h-full ${
                  isSpecialImage ? "object-contain" : "object-cover"
                } transition-transform duration-700 group-hover:scale-105`

                return (
                  <div
                    key={index}
                    className={containerClasses}
                    style={{ transitionDelay: `${index * 100}ms` }}
                    onClick={() => openLightbox(index)}
                  >
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      width={800}
                      height={isSpecialImage ? 500 : 800} 
                      quality={75}
                      placeholder="blur"
                      blurDataURL="/placeholder.svg"
                      loading="lazy"
                      className={imageClasses}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50 text-white text-center text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {image.alt}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Lightbox */}
        {lightboxIndex !== null && (
          <div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            onClick={closeLightbox}
          >
            <img
              src={filteredImages[lightboxIndex].src}
              alt={filteredImages[lightboxIndex].alt}
              className="max-h-full max-w-full rounded-lg shadow-lg"
              onClick={(e) => e.stopPropagation()}
            />
            {/* Lewa strzałka */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/40 rounded-full hover:bg-black/60"
              onClick={(e) => { e.stopPropagation(); prevImage() }}
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            {/* Prawa strzałka */}
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/40 rounded-full hover:bg-black/60"
              onClick={(e) => { e.stopPropagation(); nextImage() }}
            >
              <ArrowRight className="w-6 h-6 text-white" />
            </button>
            {/* Zamknij */}
            <button
              className="absolute top-4 right-4 p-2 bg-black/40 rounded-full hover:bg-black/60"
              onClick={(e) => { e.stopPropagation(); closeLightbox() }}
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        )}
      </section>

      <Footer />

    </main>
  )
}
