import { useTranslations } from "next-intl";
import { Shield, Star, Moon } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

const FEATURE_ICONS = [Shield, Star, Moon];

export default function GameSection() {
  const t = useTranslations("game");

  const features = ["defense", "collection", "idle"] as const;

  return (
    <section id="games" className="bg-bg-base py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* 헤더 */}
        <AnimatedSection className="mb-16 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary-light">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-light" />
            {t("badge")}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
            {t("title")}
          </h2>
          <p className="font-space-grotesk mt-1 text-sm text-text-muted">
            {t("titleSub")}
          </p>
        </AnimatedSection>

        {/* 게임 카드 */}
        <AnimatedSection delay={0.1}>
          <div className="overflow-hidden rounded-3xl border border-border bg-bg-card">
            {/* 이미지 영역 (CSS 그라디언트 placeholder) */}
            <div className="relative h-64 w-full overflow-hidden md:h-80">
              <div className="absolute inset-0 bg-gradient-to-br from-navy via-primary-dark to-bg-base" />
              {/* 우주 느낌 오버레이 */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(124,58,237,0.3),transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_60%,rgba(6,182,212,0.2),transparent_60%)]" />
              {/* 별 패턴 */}
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "radial-gradient(1px 1px at 20% 30%, white, transparent), radial-gradient(1px 1px at 60% 20%, white, transparent), radial-gradient(1px 1px at 80% 70%, white, transparent), radial-gradient(1.5px 1.5px at 40% 80%, white, transparent), radial-gradient(1px 1px at 90% 40%, white, transparent)",
                }}
              />
              {/* Coming Soon 배지 */}
              <div className="absolute right-6 top-6">
                <span className="font-space-grotesk rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-white shadow-lg">
                  {t("comingSoon")}
                </span>
              </div>
              {/* 게임 제목 오버레이 */}
              <div className="absolute bottom-6 left-6">
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur-sm">
                    {t("genre")}
                  </span>
                  <span className="font-space-grotesk rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur-sm">
                    {t("platform")}
                  </span>
                </div>
              </div>
            </div>

            {/* 게임 정보 */}
            <div className="p-8 md:p-10">
              <p className="mb-6 text-base leading-relaxed text-text-secondary">
                {t("description")}
              </p>

              {/* 특징 3가지 */}
              <div className="grid gap-4 sm:grid-cols-3">
                {features.map((key, i) => {
                  const Icon = FEATURE_ICONS[i];
                  return (
                    <div
                      key={key}
                      className="flex items-start gap-3 rounded-xl border border-border bg-bg-surface p-4"
                    >
                      <div className="mt-0.5 flex-shrink-0 rounded-lg bg-primary/10 p-2 text-primary-light">
                        <Icon size={16} />
                      </div>
                      <div>
                        <p className="mb-1 text-sm font-semibold text-text-primary">
                          {t(`features.${key}.title`)}
                        </p>
                        <p className="text-xs leading-relaxed text-text-muted">
                          {t(`features.${key}.description`)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
