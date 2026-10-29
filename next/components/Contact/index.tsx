"use client"
import { useRef, useState, type FormEvent } from "react"
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/site"
import SectionTitle from "@/components/SectionTitle"
import Dialog, { type DialogHandle } from "@/components/Dialog"
import { Icon } from "@/components/Icons"
import type { Dictionary } from "@/content"
import styles from "./style.module.css"

const FORM_ENDPOINT = "https://submit-form.com/OTTnr3nxj"

type Status = "idle" | "sending" | "sent" | "error"

export default function Contact({ t }: { t: Dictionary["contact"] }) {
  const dialogRef = useRef<DialogHandle>(null)
  const [status, setStatus] = useState<Status>("idle")
  const [copied, setCopied] = useState(false)

  const openForm = () => {
    setStatus("idle")
    dialogRef.current?.open()
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${EMAIL}`
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const fields = new FormData(form)
    setStatus("sending")

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          message: fields.get("message"),
          _email: { from: fields.get("email"), subject: fields.get("name") },
        }),
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      form.reset()
      setStatus("sent")
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="contact" className={styles.contact}>
      <SectionTitle>{t.title}</SectionTitle>

      <div className={styles.body}>
        <p className={styles.lead}>{t.lead}</p>

        <button type="button" className={styles.email} onClick={copyEmail}>
          <span className={styles.address}>{EMAIL}</span>
          <span className={styles.copyState} aria-live="polite">
            {copied ? t.copied : t.copy}
          </span>
        </button>

        <div className={styles.actions}>
          <button type="button" className={styles.primary} onClick={openForm} data-testid="button-contact">
            {t.button}
          </button>
          <a href={LINKEDIN_URL} className={styles.iconLink} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Icon name="linkedin" />
          </a>
          <a href={GITHUB_URL} className={styles.iconLink} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Icon name="github" />
          </a>
        </div>
      </div>

      <Dialog ref={dialogRef} title={status === "sent" ? t.sentTitle : t.dialogTitle} closeLabel={t.close}>
        {status === "sent" ? (
          <div className={styles.sent} role="status">
            <p>{t.sentText}</p>
            <button type="button" className={styles.submitButton} onClick={() => dialogRef.current?.close()}>
              {t.close}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label htmlFor="contact-name">{t.name}</label>
              <input id="contact-name" name="name" type="text" autoComplete="given-name" required />
            </div>
            <div className={styles.field}>
              <label htmlFor="contact-email">{t.email}</label>
              <input id="contact-email" name="email" type="email" autoComplete="email" required />
            </div>
            <div className={styles.field}>
              <label htmlFor="contact-message">{t.message}</label>
              <textarea id="contact-message" name="message" rows={5} required />
            </div>
            <button type="submit" className={styles.submitButton} disabled={status === "sending"}>
              {status === "sending" ? t.sending : t.send}
            </button>
            {status === "error" && (
              <p className={styles.error} role="alert">
                {t.error} <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
              </p>
            )}
          </form>
        )}
      </Dialog>
    </section>
  )
}
