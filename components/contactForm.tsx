"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CardContent } from "./ui/card";
import { useLanguage } from "@/translations/context";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [acceptedRODO, setAcceptedRODO] = useState(false);
  const [showRODO, setShowRODO] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!acceptedRODO) {
      setError(t.contact.form.rodoError);
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

      if (!res.ok) throw new Error("Server error");

      setSuccess(t.contact.form.successMessage);
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
            <label htmlFor="name" className="text-sm font-medium text-foreground">
              {t.contact.form.nameLabel}
            </label>
            <Input 
              id="name" 
              placeholder={t.contact.form.namePlaceholder} 
              className="bg-background" 
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              {t.contact.form.emailLabel}
            </label>
            <Input 
              id="email" 
              type="email" 
              placeholder={t.contact.form.emailPlaceholder} 
              className="bg-background" 
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium text-foreground">
            {t.contact.form.phoneLabel}
          </label>
          <Input 
            id="phone" 
            type="tel" 
            placeholder={t.contact.form.phonePlaceholder} 
            className="bg-background" 
            required 
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-foreground">
            {t.contact.form.messageLabel}
          </label>
          <Textarea
            id="message"
            placeholder={t.contact.form.messagePlaceholder}
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
            {t.contact.form.rodoAccept}{" "}
            <span
              onClick={() => setShowRODO(true)}
              className="text-accent underline cursor-pointer font-semibold"
            >
              {t.contact.form.rodoModalTitle}
            </span>{" "}
            {t.contact.form.rodoText}
          </label>
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={loading}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          {loading ? t.contact.form.sendingButton : t.contact.form.submitButton}
        </Button>
      </form>

      {success && <p className="text-green-600 text-center font-medium mt-4">{success}</p>}
      {error && <p className="text-red-600 text-center font-medium mt-4">{error}</p>}

      {showRODO && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setShowRODO(false)}
        >
          <div
            className="bg-white max-w-[800px] w-full max-h-[400px] flex flex-col p-6 rounded-lg shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4 shrink-0">{t.contact.form.rodoModalTitle}</h2>
            
            <div className="overflow-y-auto pr-2 my-2 flex-1">
              <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                {t.contact.form.rodoModalContent}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t shrink-0 flex justify-end">
              <Button onClick={() => setShowRODO(false)} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                {t.contact.form.close}
              </Button>
            </div>
          </div>
        </div>
      )}
    </CardContent>
  )
}