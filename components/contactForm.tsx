"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CardContent } from "./ui/card";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [acceptedRODO, setAcceptedRODO] = useState(false);
  const [showRODO, setShowRODO] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!acceptedRODO) {
      setError("Musisz zaakceptować Klauzulę RODO, aby wysłać wiadomość.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement)?.value,
      email: (form.elements.namedItem("email") as HTMLInputElement)?.value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement)?.value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)?.value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Błąd serwera");

      setSuccess("Wiadomość została wysłana pomyślnie!");
      form.reset();
      setAcceptedRODO(false);
    } catch {
      setError("Nie udało się wysłać wiadomości. Spróbuj ponownie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardContent className="p-8 md:p-12 relative">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-foreground">Imię i nazwisko</label>
            <Input id="name" placeholder="Jan Kowalski" className="bg-background" required/>
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
            <Input id="email" type="email" placeholder="jan.kowalski@gmail.com" className="bg-background" required/>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium text-foreground">Telefon</label>
          <Input id="phone" type="tel" placeholder="+48 123 456 789" className="bg-background" required />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-foreground">Wiadomość</label>
          <Textarea
            id="message"
            placeholder="Opisz swoje potrzeby..."
            rows={6}
            className="bg-background resize-none"
            required
          />
        </div>

        <div className="flex items-start gap-2">
          <input
            id="rodo"
            type="checkbox"
            checked={acceptedRODO}
            onChange={(e) => setAcceptedRODO(e.target.checked)}
            className="mt-1"
          />
          <label htmlFor="rodo" className="text-sm text-foreground">
            Akceptuję <span
              onClick={() => setShowRODO(true)}
              className="text-accent underline cursor-pointer font-semibold"
            >
              RODO
            </span> i wyrażam zgodę na przetwarzanie moich danych osobowych.
          </label>
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={loading}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          {loading ? "Wysyłanie..." : "Wyślij wiadomość"}
        </Button>
      </form>

      {success && <p className="text-green-600 text-center font-medium">{success}</p>}
      {error && <p className="text-red-600 text-center font-medium">{error}</p>}

      {showRODO && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
          onClick={() => setShowRODO(false)}
        >
          <div
            className="bg-white max-w-lg w-full max-h-[80vh] overflow-y-auto p-6 rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Klauzula RODO</h2>
            <p className="text-sm text-gray-700 whitespace-pre-line">
				{`Zgodnie z art. 13 ust. 1 i 2 rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679
				z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem
				danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia
				dyrektywy 95/46/WE (dalej „RODO”) informuję, iż:

				1) administratorem Pani/Pana danych osobowych jest spółka „Fiber System Polska sp. z o.o.” z siedzibą w Warszawie ul. Okopowa 59A/97,
				2) kontakt z Inspektorem Ochrony Danych – office@fibersystem.eu,
				3) Pani/Pana dane osobowe przetwarzane będą w celu realizacji umowy, świadczenia pomocy technicznej, doradczej, kontaktu telefonicznego, mailowego lub bezpośredniego kontaktu, wysyłania informacji handlowych, marketingowych, newsletterów, kampanii marketingowych, realizacji uzasadnionego interesu Administratora oraz do celów badawczych, statystycznych i/lub historycznych,
				4) odbiorcami danych będą wyłącznie podmioty uprawnione do uzyskania danych osobowych na podstawie przepisów prawa,
				5) dane przechowywane będą przez okres 5 lat,
				6) posiada Pani/Pan prawo do żądania od administratora dostępu do danych, sprostowania, usunięcia lub ograniczenia przetwarzania, wniesienia sprzeciwu wobec przetwarzania, przenoszenia danych oraz prawo do cofnięcia zgody,
				7) ma Pani/Pan prawo wniesienia skargi do organu nadzorczego,
				8) podanie danych osobowych jest wymogiem ustawowym i dobrowolnym, ich niepodanie może skutkować niezawarciem umowy lub uniemożliwieniem kontaktu ze strony Fiber System Polska sp. z o.o.`}
            </p>
            <Button onClick={() => setShowRODO(false)} className="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground">
              Zamknij
            </Button>
          </div>
        </div>
      )}
    </CardContent>
  )
}
