"use client"
import { useId, useImperativeHandle, useRef, type ReactNode, type Ref } from "react"
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap"
import styles from "./style.module.css"

export interface DialogHandle {
  open: () => void
  close: () => void
}

interface DialogProps {
  ref?: Ref<DialogHandle>
  title: string
  closeLabel: string
  children: ReactNode
  wide?: boolean
}

// Native <dialog> (focus trap, Escape, top layer) with GSAP enter/leave animations.
export default function Dialog({ ref, title, closeLabel, children, wide = false }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const { contextSafe } = useGSAP()

  const open = contextSafe(() => {
    const dialog = dialogRef.current!
    dialog.showModal()
    gsap.fromTo(dialog, { autoAlpha: 0, y: prefersReducedMotion() ? 0 : 30 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power3.out" })
  })

  const close = contextSafe(() => {
    const dialog = dialogRef.current!
    gsap.to(dialog, {
      autoAlpha: 0,
      y: prefersReducedMotion() ? 0 : 20,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => dialog.close(),
    })
  })

  useImperativeHandle(ref, () => ({ open, close }), [open, close])

  return (
    <dialog
      ref={dialogRef}
      className={`${styles.dialog} ${wide ? styles.wide : ""}`}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault()
        close()
      }}
      onClick={(event) => event.target === event.currentTarget && close()}
    >
      <div className={styles.panel}>
        <button type="button" className={styles.closeButton} onClick={close} aria-label={closeLabel}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
        <h2 id={titleId} className={styles.title}>
          {title}
        </h2>
        {children}
      </div>
    </dialog>
  )
}
