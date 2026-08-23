import { footer } from "@/data/site";

export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-start gap-3">
      <div className="flex w-full flex-col items-center justify-between gap-3 font-ui text-label text-ink-soft sm:flex-row">
        <p>{footer.copyright}</p>

        <nav className="flex items-center gap-2">
          {footer.links.map((link, index) => (
            <span key={link.label} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">•</span>}
              <a href={link.href} className="transition-colors duration-300 hover:text-cta">
                {link.label}
              </a>
            </span>
          ))}
        </nav>
      </div>
    </footer>
  );
}