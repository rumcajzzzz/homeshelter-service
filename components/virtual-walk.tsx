"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/translations/context"

type TourKey = "bunker1" | "bunker2" | "bunker3"

const tourSources: Record<TourKey, string> = {
  bunker1: "https://evryplace.com/p/vythac",
  bunker2: "https://evryplace.com/p/pcrrfv",
  bunker3: "https://evryplace.com/p/uusici",
}

export function VirtualTour() {
  const [activeTour, setActiveTour] = useState<TourKey>("bunker1")
  const { t } = useLanguage()

  const tourKeys: TourKey[] = ["bunker1", "bunker2", "bunker3"]

  return (
    <section className="py-20 px-6 lg:px-12 bg-card" id="spacer">
      <div className="container mx-auto max-w-6xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          {t.virtualTour.heading}
        </h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          {t.virtualTour.subHeading}
        </p>

        {/* Przełączniki schronów */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tourKeys.map((key) => (
            <Button
              key={key}
              variant={activeTour === key ? "default" : "outline"}
              className={`transition-colors ${
                activeTour === key
                  ? "bg-accent text-accent-foreground hover:bg-accent/90"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveTour(key)}
            >
              {t.virtualTour.tours[key]}
            </Button>
          ))}
        </div>

        {/* Wirtualny spacer */}
        <div className="relative w-full overflow-hidden rounded-lg shadow-lg transition-opacity duration-500 h-[70vh] sm:aspect-video">
          <iframe
            key={activeTour}
            src={tourSources[activeTour]}
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