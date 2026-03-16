import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

export default function Navbar() {
  const t = useTranslations("nav");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-bg-base/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#"
          className="font-space-grotesk text-xl font-bold tracking-tight text-text-primary"
        >
          Codegenic
        </a>

        <div className="hidden items-center gap-8 text-sm text-text-secondary md:flex">
          <a
            href="#about"
            className="transition-colors hover:text-text-primary"
          >
            {t("about")}
          </a>
          <a
            href="#games"
            className="transition-colors hover:text-text-primary"
          >
            {t("games")}
          </a>
          <a
            href="#contact"
            className="transition-colors hover:text-text-primary"
          >
            {t("contact")}
          </a>
        </div>

        <LanguageSwitcher />
      </nav>
    </header>
  );
}
