/**
 * Application-wide navigation configuration
 * Centralized so Header and Footer use the same source of truth
 */
export const NAV_ITEMS = [
  { name: "Assessment", href: "/assessment" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Community", href: "/" }
] as const;

/**
 * Footer link groups for the site footer.
 * Keeps footer navigation consistent across the application.
 */
export const FOOTER_LINKS = [
  {
    title: "Platform",
    links: [
      { name: "Assessment", href: "/assessment" },
      { name: "Dashboard", href: "/dashboard" },
      { name: "Integrations", href: "#" }
    ]
  },
  {
    title: "Resources",
    links: [
      { name: "Methodology", href: "#" },
      { name: "API Docs", href: "#" },
      { name: "Community", href: "/" }
    ]
  },
  {
    title: "Company",
    links: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Security", href: "#" }
    ]
  }
] as const;
