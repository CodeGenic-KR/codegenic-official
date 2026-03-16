import { useTranslations } from "next-intl";
import { Mail, Instagram } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { CONTACT } from "@/lib/constants";

export default function ContactSection() {
  const t = useTranslations("contact");

  return (
    <section id="contact" className="bg-bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <AnimatedSection className="text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent-light">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-light" />
            {t("badge")}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-text-secondary">
            {t("description")}
          </p>
        </AnimatedSection>

        <AnimatedSection
          delay={0.15}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href={`mailto:${CONTACT.email}`}
            className="inline-flex items-center gap-2.5 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-primary-light"
          >
            <Mail size={16} />
            {t("emailLabel")}
          </a>
          <a
            href={CONTACT.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full border border-border px-8 py-3.5 text-sm font-semibold text-text-primary transition-all duration-200 hover:border-primary hover:text-primary"
          >
            <Instagram size={16} />
            {t("instagramLabel")}
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
