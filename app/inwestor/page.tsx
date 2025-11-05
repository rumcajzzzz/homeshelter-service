import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Shield, FileText, Calculator, Headphones, CheckCircle2, ArrowRight, ArrowDown } from "lucide-react"
import Link from "next/link"

export default function InwestorPage() {
  const benefits = [
    {
      icon: Shield,
      title: "Bezpieczeństwo gwarantowane",
      description: "Certyfikowane rozwiązania spełniające najwyższe normy ochrony",
    },
    {
      icon: FileText,
      title: "Kompleksowa dokumentacja",
      description: "Pełna dokumentacja techniczna i prawna dla Twojej inwestycji",
    },
    {
      icon: Calculator,
      title: "Transparentna wycena",
      description: "Jasne i szczegółowe kosztorysy bez ukrytych opłat",
    },
    {
      icon: Headphones,
      title: "Wsparcie 24/7",
      description: "Dedykowany opiekun projektu dostępny na każdym etapie",
    },
  ]

  const packages = [
    {
      name: "Wersja Podstawowa",
      price: "od 150 000 zł",
      features: [
        "Schron dla 4–6 osób",
        "Konstrukcja z rur PEHD Ø2500–3600 mm",
        "Wejście z zamykanym włazem i podłogą",
        "Oświetlenie LED, wentylacja podstawowa",
        "Materiały całkowicie wodoodporne",
        "Projekt techniczny i architektoniczny",
      ],
    },
    {
      name: "Wersja Rozszerzona",
      price: "od 280 000 zł",
      highlighted: true,
      features: [
        "Dodatkowe pomieszczenia: techniczne, sanitarne, magazynowe",
        "Komora dezaktywacyjna Ø2000 mm z prysznicem",
        "Toaleta, prysznic, umywalka lub zlewozmywak",
        "Łóżka piętrowe i szafki magazynowe",
        "Drzwi gazoszczelne i przeciwwybuchowe",
        "Filtrowentylacja renomowanych firm szwajcarskich",
      ],
    },
    {
      name: "Wersja Premium",
      price: "od 420 000 zł",
      features: [
        "System modułowy z możliwością łączenia w labirynt pomieszczeń",
        "Ogrzewanie elektryczne i system zasilania awaryjnego",
        "Monitoring, TV, radio, Internet, telefon satelitarny",
        "Zbiorniki na wodę i ścieki z możliwością podłączenia do sieci",
        "Czujniki bezpieczeństwa (CO₂, ruch, wodór, poziom mediów)",
        "Panel sterowania i aplikacja do obsługi automatyki",
      ],
    },
  ]
  const steps = [
    { step: "01", title: "Konsultacja", desc: "Analiza potrzeb i lokalizacji" },
    { step: "02", title: "Projekt", desc: "Opracowanie dokumentacji technicznej" },
    { step: "03", title: "Realizacja", desc: "Budowa i instalacja systemów" },
    { step: "04", title: "Odbiór", desc: "Testy i przekazanie obiektu" },
  ]
  
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-12">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              Dla Inwestorów
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Kompleksowa pomoc i oferta dla osób planujących budowę prywatnego schronu. Zapewniamy pełne wsparcie od
              koncepcji po realizację.
            </p>
          </div>
        </div>
      </section>
      {/* Benefits Section */}
      <section className="relative py-20 px-6 lg:px-12">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/modern-underground-shelter-interior-concrete-minim.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs"></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-background mb-12 text-center">
            Dlaczego warto z nami współpracować
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex gap-6 p-8 bg-background/70 rounded-lg border border-border hover:border-accent transition-colors"
              >
                <div className="shrink-0">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-accent" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 px-6 lg:px-12">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Nasza oferta</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Wybierz pakiet dopasowany do Twoich potrzeb. Każda oferta może być indywidualnie modyfikowana.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-lg border ${
                  pkg.highlighted ? "border-accent bg-accent/5 shadow-lg" : "border-border bg-card"
                }`}
              >
                {pkg.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Najpopularniejszy
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{pkg.name}</h3>
                  <p className="text-3xl font-bold text-accent">{pkg.price}</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-muted-background">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    pkg.highlighted
                      ? "bg-accent hover:bg-accent/90 text-accent-foreground"
                      : "bg-card hover:bg-muted border border-border text-foreground"
                  }`}
                  asChild
                >
                  <Link href="/#kontakt">
                    Zapytaj o ofertę
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

     {/* Process Section */}
     <section className="py-20 px-6 lg:px-12 bg-card">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
          Proces realizacji
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-between">
          {steps.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center relative">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-accent">{item.step}</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>

              {/* Strzałka */}
              {index < steps.length - 1 && (
                <>
                  {/* Pozioma strzałka na desktop */}
                  <div className="hidden md:block absolute right-[-60px] top-1/2 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-accent" />
                  </div>

                  {/* Pionowa strzałka na mobile */}
                  <div className="block md:hidden mt-4">
                    <ArrowDown className="w-6 h-6 text-accent mx-auto" />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-12">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Gotowy na rozmowę o Twoim projekcie?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Skontaktuj się z nami, aby otrzymać bezpłatną wycenę i konsultację
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
              <a href="/#kontakt">Umów konsultację</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/">Wróć do strony głównej</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
