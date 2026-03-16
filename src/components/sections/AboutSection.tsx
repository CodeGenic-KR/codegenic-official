import { useTranslations } from "next-intl";
import { Cpu, Globe, Flame } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

const VALUE_ICONS = [Cpu, Globe, Flame];

export default function AboutSection() {
  const t = useTranslations("about");

  const values = ["ai", "global", "indie"] as const;

  return (
    <section id="about" className="bg-bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* 헤더 */}
        <AnimatedSection className="mb-16 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent-light">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-light" />
            {t("badge")}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
            {t("description")}
          </p>
        </AnimatedSection>

        {/* 가치 카드 3개 */}
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((key, i) => {
            const Icon = VALUE_ICONS[i];
            return (
              <AnimatedSection key={key} delay={i * 0.1}>
                <div className="group rounded-2xl border border-border bg-bg-card p-8 transition-all duration-300 hover:border-primary/40 hover:bg-bg-card/80">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary-light transition-colors group-hover:bg-primary/20">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-space-grotesk mb-2 text-lg font-bold text-text-primary">
                    {t(`values.${key}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {t(`values.${key}.description`)}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
