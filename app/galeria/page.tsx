// page.tsx
"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowLeft, ArrowRight, X } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { useLanguage } from "@/translations/context"

interface ImageItem {
  src: string
  altKey: string
  category: string
}

export default function GalleryPage() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("catAll")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const galleryTranslations = (t as any).gallery || {}
  const altTexts = galleryTranslations.altTexts || {}

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
    { src: "/gallery2/budowa1.jpg", altKey: "budowa1", category: "catRealizations" },
    { src: "/gallery2/budowa2.JPG", altKey: "budowa2", category: "catRealizations" },
    { src: "/gallery2/budowa4.jpg", altKey: "budowa4", category: "catRealizations" },
    { src: "/gallery2/d9acd4f7-2925-42d3-8450-2f8dae4c6232.jpeg", altKey: "montaz_modulow", category: "catRealizations" },
    { src: "/gallery2/budowa3.jpg", altKey: "budowa3", category: "catRealizations" },
    { src: "/gallery2/IMG_2994.jpeg", altKey: "wnetrze_surowe", category: "catRealizations" },
    { src: "/gallery2/realizacja.png", altKey: "realizacja_piaseczno1", category: "catRealizations" },
    { src: "/gallery2/realizacja2.jpg", altKey: "realizacja_piaseczno2", category: "catRealizations" },
  
    // --- Schrony kompaktowe (2–4 osoby) ---
    { src: "/gallery2/schron2wejscie.jpeg", altKey: "schron2_wejscie", category: "catCompact" },
    { src: "/gallery2/schron2salon.jpeg", altKey: "schron2_salon", category: "catCompact" },
    { src: "/gallery2/schron2lazienka.jpeg", altKey: "schron2_lazienka", category: "catCompact" },
    { src: "/gallery2/schron4wejscie.jpeg", altKey: "schron4_wejscie", category: "catCompact" },
    { src: "/gallery2/schron4widokzgory.jpeg", altKey: "schron4_widok", category: "catCompact" },
  
    // --- Schrony żelbetowe i modułowe ---
    { src: "/gallery2/schron100rzut.jpeg", altKey: "schron100_rzut", category: "catConcrete" },
    { src: "/gallery2/schron100techniczne.jpeg", altKey: "schron100_techniczne", category: "catConcrete" },
    { src: "/gallery2/schron100sypialnia.jpeg", altKey: "schron100_sypialnia", category: "catConcrete" },
    { src: "/gallery2/schron100magazyn.jpeg", altKey: "schron100_magazyn", category: "catConcrete" },
    { src: "/gallery2/schron100lazienka.jpeg", altKey: "schron100_lazienka", category: "catConcrete" },
    { src: "/gallery2/schronmodulowyzelbetowyrzut.jpeg", altKey: "schron20_rzut", category: "catConcrete" },
    { src: "/gallery2/schronmodulowyzelbetowysypialnia.jpeg", altKey: "schron20_sypialnia", category: "catConcrete" },
    { src: "/gallery2/schronmodulowyzelbetowysalonimagzyn.jpeg", altKey: "schron20_salon", category: "catConcrete" },
    
    // --- Systemy i urządzenia ---
    { src: "/gallery2/drzwiwlazowe.JPG", altKey: "drzwi_wewnatrz", category: "catSystems" },
    { src: "/gallery2/drzwiwlazowe2.JPG", altKey: "drzwi_bok", category: "catSystems" },
    { src: "/gallery2/IMG_2609.jpg", altKey: "filtrowentylacja", category: "catSystems" },
    { src: "/gallery2/IMG_3566.jpg", altKey: "zespol_filtrow", category: "catSystems" },
    { src: "/gallery2/IMG_3564.jpg", altKey: "mocowania_drzwi", category: "catSystems" },
    { src: "/gallery2/IMG_3563.jpg", altKey: "mechanizm_drzwi_wew", category: "catSystems" },
    { src: "/gallery2/IMG_3562.jpg", altKey: "drzwi_wew", category: "catSystems" },
    { src: "/gallery2/IMG_3561.jpg", altKey: "drzwi_zew", category: "catSystems" },
    { src: "/gallery2/IMG_3560.jpg", altKey: "drzwi_bok2", category: "catSystems" },
    { src: "/gallery2/IMG_3559.jpg", altKey: "drzwi_gazoszczelne", category: "catSystems" },
    { src: "/gallery2/IMG_3558.jpg", altKey: "drzwi_gazoszczelne_wew", category: "catSystems" },
    { src: "/gallery2/df1de736-fb87-4690-9878-3c43580691e0.jpeg", altKey: "wlaz_kanal_zew", category: "catSystems" },
    { src: "/gallery2/29a7e839-eecc-41d9-9fd7-b8b8ffbd916d.jpg", altKey: "wlazy_ucieczkowe", category: "catSystems" },
    { src: "/gallery2/33d65881-5541-4dee-918d-4fca513a0d3f.jpg", altKey: "wlaz_ucieczkowy1", category: "catSystems" },
    { src: "/gallery2/4453d3fd-d7f3-45a3-871a-c60f51492692.jpg", altKey: "wlaz_ucieczkowy2", category: "catSystems" },
    { src: "/gallery2/IMG_2621.jpg", altKey: "zawor_reczny", category: "catSystems" },
    { src: "/gallery2/IMG_2619.jpg", altKey: "zawor_nadcisnieniowy1", category: "catSystems" },
    { src: "/gallery2/IMG_2618.jpg", altKey: "zawor_nadcisnieniowy2", category: "catSystems" },

    // --- Konstrukcje żelbetowe ---
    { src: "/gallery2/profilebudowa.png", altKey: "profil_rury", category: "catConstructions" },
    { src: "/gallery2/profilramowy.png", altKey: "profil_rama", category: "catConstructions" },
  ];

  const categoryKeys = [
    "catAll",
    "catCompact",
    "catConcrete",
    "catSystems",
    "catConstructions",
    "catRealizations"
  ];

  const fallbackNames: Record<string, string> = {
    catAll: "Wszystkie",
    catCompact: "Schrony kompaktowe",
    catConcrete: "Schrony żelbetowe",
    catSystems: "Systemy i urządzenia",
    catConstructions: "Konstrukcje żelbetowe",
    catRealizations: "Realizacje"
  };

  const filteredImages =
    selectedCategory === "catAll"
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
                {galleryTranslations.heading || "Galeria realizacji"}
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
                {galleryTranslations.subHeading || "Zobacz przykłady naszych projektów. Każdy schron jest unikalny i dostosowany do indywidualnych potrzeb klienta."}
              </p>

              {/* Filtry kategorii */}
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                {categoryKeys.map((catKey) => (
                  <button
                    key={catKey}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                      selectedCategory === catKey
                        ? "bg-accent text-accent-foreground border-accent"
                        : "bg-background text-foreground border-border hover:bg-accent/20"
                    }`}
                    onClick={() => setSelectedCategory(catKey)}
                  >
                    {galleryTranslations[catKey] || fallbackNames[catKey]}
                  </button>
                ))}
              </div>
            </div>

            {/* Galeria */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredImages.map((image, index) => {
                const isSpecialImage = image.src === "/gallery2/realizacja2.jpg"
                const altText = altTexts[image.altKey] || "Zdjęcie"
                
                const containerClasses = `group relative overflow-hidden rounded-lg cursor-pointer transition-all duration-1000 ${ isSpecialImage ? "aspect-auto bg-orange-200 opacity-20" : "aspect-square" } ${
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`
              
                const imageClasses = `w-full h-full ${
                  isSpecialImage ? "object-contain" : "object-cover"
                } transition-transform duration-700 group-hover:scale-105`

                return (
                  <div
                    key={index}
                    className={containerClasses}
                    style={{ transitionDelay: `${index * 100}ms`}}
                    onClick={() => openLightbox(index)}
                  >
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={altText}
                      width={800}
                      height={isSpecialImage ? 500 : 800} 
                      quality={75}
                      placeholder="blur"
                      blurDataURL="/placeholder.svg"
                      loading="lazy"
                      className={imageClasses}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50 text-white text-center text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {altText}
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
              alt={altTexts[filteredImages[lightboxIndex].altKey] || "Zdjęcie"}
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