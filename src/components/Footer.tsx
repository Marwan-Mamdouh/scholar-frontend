import Link from "next/link";
import LogoIcon from "./Icons/Logo";

const footerLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Contact Us", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="mt-auto w-full">
      {/* Top accent gradient line */}
      <div className="h-1 w-full bg-gradient-to-r from-accent-400 via-primary-400 to-accent-400" />

      {/* Footer content */}
      <div className="flex flex-col items-center gap-4 bg-gradient-to-b from-neutral-800 to-neutral-900 px-6 py-10 sm:py-8">
        {/* Logo */}
        <Link
          href="/"
          aria-label="NEXUS home"
          className="flex items-center gap-2.5 text-primary-300"
        >
          <LogoIcon className="h-10 w-10 sm:h-8 sm:w-8" />
          <span className="text-3xl font-bold tracking-wide sm:text-2xl">
            NEXUS
          </span>
        </Link>

        {/* Links */}
        <nav aria-label="Footer navigation">
          <ul className="flex items-center gap-6">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-neutral-200 transition-colors duration-200 hover:text-primary-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Copyright */}
        <p className="text-xs text-neutral-300">
          &copy; 2026 Scholar Nexus. Our Team.
        </p>
      </div>
    </footer>
  );
}
