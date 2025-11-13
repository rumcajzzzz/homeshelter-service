"use client"

import { useEffect, useRef, useState } from "react"
import { Award, Users, Clock } from "lucide-react"
import Image from "next/image"
import { sanityClient } from "@/lib/sanityClient"

type Stat = { value: string; label: string }
type AboutData = {
  heading: string
  subHeading: string
  stats: Stat[]
  solutionsHeading: string
  solutionsSubHeading: any[]
  solutionsList: any[]
}

export function About() {
  const [data, setData] = useState<AboutData | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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

  useEffect(() => {
    sanityClient
      .fetch<AboutData>(`*[_type == "about"][0]{
        heading,
        subHeading,
        stats,
        solutionsHeading,
        solutionsSubHeading,
        solutionsList
      }`)
      .then(setData)
      .catch(() => setData(null))
  }, [])

  // fallback
  const heading = data?.heading || "Nowoczesne schrony i ukrycia zgodne z wytycznymi MSWiA"
  const subHeading =
    data?.subHeading ||
    "Od ponad 20 lat tworzymy konstrukcje ochronne spełniające wymogi MSWiA i Ustawy o Obronie Cywilnej. Łączymy doświadczenie inżynierskie z nowoczesnymi technologiami od schronów żelbetowych po systemy prefabrykowane produkowane w kontrolowanych warunkach."
  const stats: Stat[] =
    data?.stats || [
      { value: "20+", label: "Lat doświadczenia" },
      { value: "200+", label: "Zrealizowanych projektów" },
      { value: "24/7", label: "Wsparcie techniczne" },
    ]
  const solutionsHeading = data?.solutionsHeading || "Nasze rozwiązania"
  const solutionsSubHeading =
    data?.solutionsSubHeading || [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Realizujemy projekty schronów i Doraźnych Miejsc Schronienia (DMS) w oparciu o wytyczne MSWiA. Nasze konstrukcje obejmują:",
          },
        ],
      },
    ]
  const solutionsList =
    data?.solutionsList || [
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "Schrony " }, { _type: "span", text: "żelbetowe monolityczne", marks: ["strong"] }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "Konstrukcje żelbetowe " }, { _type: "span", text: "wylewane „na mokro”", marks: ["strong"] }, { _type: "span", text: " na budowie" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "Modułowe " }, { _type: "span", text: "prefabrykowane konstrukcje żelbetowe", marks: ["strong"] }, { _type: "span", text: " z kontrolą jakości produkcji" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "Ukrycia z materiałów kompozytowych " },
          { _type: "span", text: "GRP", marks: ["strong"] },
          { _type: "span", text: ", " },
          { _type: "span", text: "PEHD", marks: ["strong"] },
          { _type: "span", text: ", rury i profile o przekrojach " },
          { _type: "span", text: "okrągłych", marks: ["strong"] },
          { _type: "span", text: " lub " },
          { _type: "span", text: "prostokątnych", marks: ["strong"] },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "Systemy " },
          { _type: "span", text: "wentylacji", marks: ["strong"] },
          { _type: "span", text: ", " },
          { _type: "span", text: "zasilania", marks: ["strong"] },
          { _type: "span", text: " i " },
          { _type: "span", text: "komunikacji awaryjnej", marks: ["strong"] },
          { _type: "span", text: " zgodne z aktualnymi normami" },
        ],
      },
    ]

  const icons = [Award, Users, Clock]

  function BlockContent({ blocks }: { blocks: any[] }) {
    return (
      <>
        {blocks.map((block, i) => {
          if (block._type === "block") {
            return <p key={i}>{block.children.map((child: any) => child.text).join("")}</p>;
          }
          return null;
        })}
      </>
    );
  }

  return (
    <section id="o-nas" ref={sectionRef} className="py-24 md:py-32 bg-background">
      <div className="container px-6 lg:px-12 mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div
            className={`text-center mb-20 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight text-balance">
              {heading}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
              {subHeading}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {stats.map((stat, index) => {
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
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{solutionsHeading}</h3>
              <div className="text-muted-foreground leading-relaxed mb-6">
                <BlockContent blocks={[solutionsSubHeading]} />
              </div>
              <ul className="space-y-3">
                {solutionsList.map((block, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                    <span className="text-muted-foreground">
                      <BlockContent blocks={[block]} />
                    </span>
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
