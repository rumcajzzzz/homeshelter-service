"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/translations/context"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={language}
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}