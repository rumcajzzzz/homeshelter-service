import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Offerings } from "@/components/offerings"
import { Gallery } from "@/components/gallery"
import { Contact } from "@/components/contact"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { VirtualTour }from "@/components/virtual-walk"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Offerings />
      <Gallery />
      <VirtualTour />
      <Contact />
      <Footer />
    </main>
  )
}
