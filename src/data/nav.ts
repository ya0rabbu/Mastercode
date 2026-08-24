export type NavLink = { label: string; href: string };

/** Anchors match the ids already on each Section, in scroll order. */
export const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "Results", href: "#results" },
  { label: "FAQ", href: "#faq" },
];

export const navContact: NavLink = { label: "Contact", href: "#contact" };
