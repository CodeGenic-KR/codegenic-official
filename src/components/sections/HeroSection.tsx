"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* 배경 그라디언트 글로우 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute left-1/4 top-2/3 h-[300px] w-[300px] rounded-full bg-accent/10 blur-[80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-32 text-center">
        {/* 배지 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary-light"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary-light" />
          {t("badge")}
        </motion.div>

        {/* 타이틀 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 text-4xl font-bold leading-tight tracking-tight text-text-primary sm:text-5xl md:text-6xl"
        >
          {t("title")}
          <br />
          <span className="font-space-grotesk bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">
            {t("titleBrand")}
          </span>
        </motion.h1>

        {/* 설명 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mb-10 max-w-xl whitespace-pre-line text-base leading-relaxed text-text-secondary sm:text-lg"
        >
          {t("description")}
        </motion.p>

        {/* CTA 버튼 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button
            variant="primary"
            onClick={() =>
              document
                .getElementById("games")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-3.5 text-base"
          >
            {t("cta")}
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-3.5 text-base"
          >
            {t("ctaSecondary")}
          </Button>
        </motion.div>
      </div>

      {/* 하단 스크롤 힌트 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-border p-1.5">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-2 w-1 rounded-full bg-text-muted"
          />
        </div>
      </motion.div>
    </section>
  );
}
