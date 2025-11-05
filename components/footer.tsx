import Image from "next/image"
import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-primary-foreground py-12 border-t border-primary-foreground/10">
      <div className="container px-6 lg:px-12 mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Logo & Description */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
              <a href="#" className="flex items-center gap-3 group">
                <div
                  className={`w-10 h-10 rounded flex items-center justify-center overflow-hidden transition-all duration-300`}
                >
                  <Image
                    src="/shelter.png"
                    alt="Fiber System Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
              </a>
                <span className="text-xl font-semibold tracking-tight">FIBER SYSTEM</span>
              </div>
              <p className="text-primary-foreground/70 leading-relaxed max-w-md">
                Profesjonalne projektowanie i budowa schronów domowych. Bezpieczeństwo i komfort dla Twojej rodziny.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">Nawigacja</h3>
              <ul className="space-y-2">
                {["O nas", "Oferta", "Galeria", "Kontakt"].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase().replace(" ", "-")}`}
                      className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold mb-4">Informacje</h3>
              <ul className="space-y-2">
                {["Polityka prywatności", "Regulamin", "RODO"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-primary-foreground/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-primary-foreground/60">
                © {currentYear} FIBER SYSTEM. Wszelkie prawa zastrzeżone.
              </p>
              <p className="text-sm text-primary-foreground/60">Zaprojektowane z myślą o Twoim bezpieczeństwie</p>
            </div>
            <Link href="https://rumcajzdev.netlify.app/" target="_blank">
              <div className="text-center flex flex-col items-center justify-center gap-3 mt-16">
                <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
                  <img
                    src="/rumcajzdevlogowhite.png"
                    alt="RumcajzDev Logo"
                    className="w-12 h-12 object-contain"
                  />
                  <span className="text-md text-muted-foreground tracking-wide">
                    Developed by <span className="font-semibold">rumcajzdev</span>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
