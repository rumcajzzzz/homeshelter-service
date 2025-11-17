import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { FileText, Users, Wrench, BookOpen, Download, Mail, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { getPDPData } from "@/lib/getPDPdata"
import { Catalog } from "@/components/catalog"

export default function ProjektantPage() {

  const katalog = getPDPData()


  const supportAreas = [
    {
      icon: FileText,
      title: "Dokumentacja techniczna",
      description:
        "Kompletne opracowania rysunkowe, schematy instalacyjne i wytyczne branżowe zgodne z obowiązującymi normami MSWiA.",
    },
    {
      icon: Users,
      title: "Konsultacje eksperckie",
      description:
        "Bezpośredni kontakt z naszymi specjalistami w zakresie konstrukcji, wentylacji i zabezpieczeń obiektów ochronnych.",
    },
    {
      icon: Wrench,
      title: "Wsparcie techniczne",
      description:
        "Pomoc przy doborze materiałów, komponentów systemowych i technologii dedykowanych projektom schronowym.",
    },
    {
      icon: BookOpen,
      title: "Baza wiedzy",
      description:
        "Zbiór aktualnych wytycznych projektowych, analiz technicznych oraz przykładów zrealizowanych obiektów.",
    },
  ]

  const resources = [
    {
      title: "Ustawa o Obronie Cywilnej",
      description: "Aktualne przepisy i wymagania dotyczące budownictwa ochronnego",
      type: "PDF",
      size: "2 MB",
    },
    {
      title: "Rozporządzenie MSWiA dotyczące ukryć",
      description: "Wytyczne dotyczące warunków, jakie muszą spełniać Doraźne Miejsca Schronienia (DMS)",
      type: "PDF",
      size: "1,5 MB",
    },
  ]

  const benefits = [
    "Dostęp do certyfikowanych rozwiązań konstrukcyjnych i instalacyjnych",
    "Wsparcie w zakresie interpretacji norm i wytycznych MSWiA",
    "Priorytetowe konsultacje przy projektach technicznych",
    "Możliwość współpracy przy realizacji inwestycji",
    "Udział w szkoleniach i webinarach branżowych",
    "Dostęp do sieci partnerów technologicznych",
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-12">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              Dla Projektantów
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Oferujemy wsparcie techniczne i merytoryczne dla architektów oraz biur projektowych
              realizujących inwestycje z zakresu budownictwa ochronnego. 
              Udostępniamy wiedzę, narzędzia i dokumentację, które ułatwiają tworzenie nowoczesnych i bezpiecznych obiektów.
            </p>
          </div>
        </div>
      </section>

      {/* Support Areas Section */}
      <section className="relative py-20 px-6 lg:px-12">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/professional-construction-team-modern-architecture.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs"></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-background mb-12 text-center">Obszary wsparcia</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {supportAreas.map((area, index) => (
              <div
                key={index}
                className="flex gap-6 p-8 bg-background/80 rounded-lg border border-border hover:border-accent transition-colors"
              >
                <div className="shrink-0">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <area.icon className="w-6 h-6 text-accent" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">{area.title}</h3>
                  <p className="text-muted-foreground">{area.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20 px-6 lg:px-12">
        <div className="container mx-auto max-w-6xl">

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Materiały dla projektantów
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Dysponujemy najnowszymi wytycznymi, które ułatwiają projektantom pracę i wspierają tworzenie bezpiecznych, nowoczesnych obiektów ochronnych. <br />
              <span className="text-orange-500 text-sm">
                Wszystkie dokumenty są aktualne i dostosowane do obowiązujących norm MSWiA
              </span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {resources.map((resource, index) => (
              <div
                key={index}
                className="p-6 bg-card rounded-lg border border-border hover:border-accent transition-colors flex flex-col items-center text-center"
              >
                {/* Ikona */}
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Download className="w-6 h-6 text-accent" />
                </div>

                {/* Tytuł */}
                <h3 className="text-lg font-semibold text-foreground mb-2">{resource.title}</h3>

                {/* Opis */}
                <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>

                {/* Przycisk pobrania */}
                <a
                  href={`./pdf/${resource.title === "Ustawa o Obronie Cywilnej" ? "UOC.pdf" : "RMSWiAIU.pdf"}`}
                  download
                  className="inline-flex items-center px-4 py-2 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Pobierz PDF
                </a>
              </div>
            ))}
          </div>
          
          <div className="container mx-auto max-w-6xl p-10 my-10 flex flex-col justify-center bg-card rounded-2xl shadow-lg">
            <h1 className="text-center text-3xl md:text-4xl font-bold mb-8 text-foreground">
              Katalog projektanta
            </h1>
            <p className="text-center text-muted-foreground mb-6 max-w-3xl mx-auto">
              Przeglądaj <span className="font-bold">kategorie produktów</span>, szczegółowe <span className="font-bold">modele</span> oraz ich <span className="font-bold">warianty i podmodele</span>. 
              Pod każdym podmodelem znajdziesz dedykowane przyciski umożliwiające szybki dostęp do plików rysunkowych w formatach <span className="font-bold">DWG</span> lub <span className="font-bold">RVT</span>, zapewniające pełną kompatybilność z profesjonalnym oprogramowaniem CAD/BIM.
            </p>
            <Catalog data={katalog} />
          </div>

        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 lg:px-12 bg-card">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Korzyści ze współpracy
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Współpraca z nami to dostęp do specjalistycznej wiedzy i zaplecza technicznego,
              które wspierają projektantów w tworzeniu bezpiecznych, zgodnych z przepisami obiektów.
            </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-background rounded-lg border border-border p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">Zostań partnerem</h3>
              <p className="text-muted-foreground mb-6">
                Wypełnij formularz, a nasz zespół skontaktuje się z Tobą w ciągu 24 godzin, aby omówić szczegóły
                współpracy.
              </p>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Imię i nazwisko</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Jan Kowalski"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="jan.kowalski@gmail.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Firma / Studio</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Nazwa firmy"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Wiadomość</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                    placeholder="Opisz swoje potrzeby..."
                  />
                </div>
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Mail className="w-4 h-4 mr-2" />
                  Wyślij zapytanie
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-12">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Potrzebujesz wsparcia projektowego?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Skontaktuj się z naszym działem technicznym — pomożemy dobrać odpowiednie rozwiązania do Twojego projektu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
              <Link href="/#kontakt">Skontaktuj się z ekspertem</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/">Wróć do strony głównej</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
