"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { primaryNav } from "@/lib/site-config";
import { MenuIcon, CloseIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cx } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || open
          ? "bg-phantom-black/85 backdrop-blur-lg border-b border-metallic-silver/10"
          : "bg-transparent"
      )}
    >
      <nav className="container-phantom flex h-20 items-center justify-between">
        <Logo />

        <ul className="hidden lg:flex items-center gap-8">
          {primaryNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cx(
                  "text-sm tracking-wide transition-colors duration-200",
                  pathname === item.href
                    ? "text-ghost-white"
                    : "text-muted-text hover:text-ghost-white"
                )}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button href="/contact" variant="secondary">
            Get in Touch
          </Button>
        </div>

        <button
          type="button"
          className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full border border-metallic-silver/20 text-ghost-white"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden fixed inset-x-0 top-20 h-[calc(100vh-5rem)] overflow-y-auto border-t border-metallic-silver/10 bg-phantom-black">
          <ul className="container-phantom flex flex-col py-6 gap-1">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cx(
                    "block py-3 text-lg font-display",
                    pathname === item.href ? "text-ghost-white" : "text-muted-text"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-4">
              <Button href="/contact" variant="primary" className="w-full">
                Get in Touch
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
