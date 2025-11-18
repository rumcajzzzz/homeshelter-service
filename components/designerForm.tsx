"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

export function PartnerForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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

	  setSuccess("Twoje zapytanie zostało wysłane. Skontaktujemy się z Tobą wkrótce!")
      form.reset()
    } catch {
      setError("Nie udało się wysłać wiadomości. Spróbuj ponownie.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Imię i nazwisko</label>
        <input
          name="name"
          type="text"
          className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="Jan Kowalski"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Email</label>
        <input
          name="email"
          type="email"
          className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="jan.kowalski@gmail.com"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Telefon</label>
        <input
          name="phone"
          type="tel"
		  required
          className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="+48 123 456 789"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Firma / Studio</label>
        <input
          name="company"
          type="text"
		  required
          className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="Nazwa firmy"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Wiadomość</label>
        <textarea
          name="message"
          rows={4}
          className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent resize-none"
          placeholder="Opisz swoje potrzeby..."
          required
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
        disabled={loading}
      >
        <Mail className="w-4 h-4 mr-2" />
        {loading ? "Wysyłanie..." : "Wyślij zapytanie"}
      </Button>

      {success && (
        <p className="text-green-600 text-center font-semibold">{success}</p>
      )}
      {error && (
        <p className="text-red-600 text-center font-semibold">{error}</p>
      )}
    </form>
  )
}
