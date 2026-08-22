import Container from "@/components/ui/Container";
import IconButton from "@/components/ui/IconButton";
import Logo from "./Logo";

function Rule() {
  return <span aria-hidden="true" className="hidden h-px flex-1 bg-hair sm:block" />;
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className="size-8">
      <path
        d="M8 12h16M8 20h16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Figma renders it literally as { Contact } — braces are separate spans. */
function ContactLink() {
  return (
    <a
      href="#contact"
      className="flex shrink-0 items-center gap-[7.2px] font-body text-[18px] font-semibold leading-none tracking-[0.48px] text-ink-soft transition-colors hover:text-cta sm:text-h5"
    >
      <span aria-hidden="true">&#123;</span>
      <span>Contact</span>
      <span aria-hidden="true">&#125;</span>
    </a>
  );
}

export default function Header() {
  return (
    <header className="w-full bg-bg-white">
      <Container className="flex items-center gap-2.5 py-5">
        <IconButton label="Open menu" size="md" variant="outline">
          <MenuIcon />
        </IconButton>
        <Rule />
        <Logo />
        <Rule />
        <ContactLink />
      </Container>
    </header>
  );
}