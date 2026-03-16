import { useTranslations } from "next-intl";
import { Mail, Instagram } from "lucide-react";
import { CONTACT } from "@/lib/constants";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-border bg-bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center gap-6 text-center">
          <div>
            <p className="font-space-grotesk text-xl font-bold text-text-primary">
              Codegenic
            </p>
            <p className="mt-1 text-sm text-text-secondary">{t("tagline")}</p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={`mailto:${CONTACT.email}`}
              className="flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-text-primary"
            >
              <Mail size={16} />
              {t("emailLabel")}
            </a>
            <a
              href={CONTACT.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-text-primary"
            >
              <Instagram size={16} />
              {t("instagramLabel")}
            </a>
          </div>

          <p className="text-xs text-text-muted">{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
