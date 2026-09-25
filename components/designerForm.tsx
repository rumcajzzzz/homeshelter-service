"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import { useLanguage } from "@/translations/context"

export function PartnerForm() {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [acceptedRODO, setAcceptedRODO] = useState(false)
  const [showRODO, setShowRODO] = useState(false)

  const formDict = t.designer?.designerForm || {}

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!acceptedRODO) {
      setError(formDict.rodoError || "Musisz zaakceptować RODO, aby wysłać wiadomość.")
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(null)

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement)?.value,
      email: (form.elements.namedItem("email") as HTMLInputElement)?.value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement)?.value,
      company: (form.elements.namedItem("company") as HTMLInputElement)?.value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)?.value,
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error("Server error")

      setSuccess(formDict.successMessage || "Wiadomość została wysłana pomyślnie!")
      form.reset()
      setAcceptedRODO(false)
    } catch {
      setError("Nie udało się wysłać wiadomości. Spróbuj ponownie.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {formDict.nameLabel || "Imię i nazwisko"}
        </label>
        <input
          name="name"
          type="text"
          className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder={formDict.namePlaceholder || "np. Jan Kowalski"}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {formDict.emailLabel || "Adres e-mail"}
        </label>
        <input
          name="email"
          type="email"
          className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder={formDict.emailPlaceholder || "jan.kowalski@example.com"}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {formDict.phoneLabel || "Numer telefonu"}
        </label>
        <input
          name="phone"
          type="tel"
          required
          className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder={formDict.phonePlaceholder || "+48 123 456 789"}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {formDict.companyLabel || "Firma / Studio"}
        </label>
        <input
          name="company"
          type="text"
          required
          className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder={formDict.companyPlaceholder || "Nazwa firmy"}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {formDict.messageLabel || "Wiadomość"}
        </label>
        <textarea
          name="message"
          rows={4}
          className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent resize-none"
          placeholder={formDict.messagePlaceholder || "Opisz swoje zapotrzebowanie..."}
          required
        />
      </div>

      {/* RODO checkbox z linkiem */}
      <div className="flex items-start gap-2">
        <input
          id="rodo"
          type="checkbox"
          checked={acceptedRODO}
          onChange={(e) => setAcceptedRODO(e.target.checked)}
          className="mt-1"
        />
        <label htmlFor="rodo" className="text-sm text-foreground">
          {formDict.rodoAccept || "Akceptuję"}{" "}
          <span
            onClick={() => setShowRODO(true)}
            className="text-accent underline cursor-pointer font-semibold"
          >
            {formDict.rodoModalTitle || "RODO"}
          </span>{" "}
          {formDict.rodoText || "oraz wyrażam zgodę na przetwarzanie moich danych osobowych."}
        </label>
      </div>

      <Button
        type="submit"
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
        disabled={loading}
      >
        <Mail className="w-4 h-4 mr-2" />
        {loading ? (formDict.sendingButton || "Wysyłanie...") : (formDict.submitButton || "Wyślij zapytanie")}
      </Button>

      {success && (
        <p className="text-green-600 text-center font-semibold">{success}</p>
      )}
      {error && (
        <p className="text-red-600 text-center font-semibold">{error}</p>
      )}

      {/* Modal overlay z tekstem RODO */}
      {showRODO && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
          onClick={() => setShowRODO(false)}
        >
          <div
            className="bg-white max-w-lg w-full max-h-[80vh] overflow-y-auto p-6 rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">{formDict.rodoModalTitle || "Klauzula RODO"}</h2>
            <p className="text-sm text-gray-700 whitespace-pre-line">
              {formDict.rodoModalContent}
            </p>
            <Button
              onClick={() => setShowRODO(false)}
              className="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {formDict.close || "Zamknij"}
            </Button>
          </div>
        </div>
      )}
    </form>
  )
}