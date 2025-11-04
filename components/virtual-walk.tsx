"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function VirtualTour() {
  // definiujemy możliwe klucze
  type TourKey = "bunker1" | "bunker2" | "bunker3"

  const [activeTour, setActiveTour] = useState<TourKey>("bunker1")

  const tours: Record<TourKey, { name: string; src: string }> = {
    bunker1: {
      name: "Schron A – Podmiejski",
      src: "https://evryplace.com/embed/vythac#ab308b58-3fb5-4737-a57e-c717c1b92346",
    },
    bunker2: {
      name: "Schron B – Techniczny",
      src: "https://evryplace.com/embed/vythac#185c006e-6936-4bd1-8854-1eb5dafa3a3b",
    },
    bunker3: {
      name: "Schron C – Wejściowy",
      src: "https://evryplace.com/embed/vythac#9ca841dc-5c61-4a27-990f-405820d7b919",
    },
  }

  return (
    <section className="py-20 px-6 lg:px-12 bg-card">
      <div className="container mx-auto max-w-6xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Przejdź się z nami po schronie
        </h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          Odkryj nasze projekty schronów w pełnej przestrzeni 3D. Możesz obracać, przybliżać i zwiedzać każdy zakamarek —
          wszystko w Twojej przeglądarce.
        </p>

        {/* Przełączniki schronów */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(tours).map(([key, tour]) => (
            <Button
              key={key}
              variant={activeTour === key ? "default" : "outline"}
              className={`transition-colors ${
                activeTour === key
                  ? "bg-accent text-accent-foreground hover:bg-accent/90"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveTour(key as TourKey)}
            >
              {tour.name}
            </Button>
          ))}
        </div>

        {/* Wirtualny spacer */}
        <div className="relative w-full overflow-hidden rounded-lg shadow-lg aspect-video transition-opacity duration-500">
          <iframe
            key={activeTour}
            src={tours[activeTour].src}
            width="100%"
            height="100%"
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  )
}
