"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const NAV_LINKS = [
  { label: "Novidades", href: "/novidades" },
  { label: "Feminino", href: "/feminino" },
  { label: "Masculino", href: "/masculino" },
  { label: "Marcas", href: "/marcas" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);
  const { totalItems, openCart } = useCart();

  // ── Detecta scroll ──
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Foco automático no input de busca ──
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // ── Fecha busca ao clicar fora ──
  useEffect(() => {
    if (!isSearchOpen) return;
    const handleClickOutside = (e) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target) &&
        !e.target.closest("[data-search-toggle]")
      ) {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSearchOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      setSearchQuery("");
      window.location.href = `/busca?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  // ── Classes dinâmicas baseadas no scroll ──
  const iconColorClass = isScrolled
    ? "text-neutral-700 hover:text-neutral-900"
    : "text-white/90 hover:text-white";

  const linkColorClass = isScrolled
    ? "text-neutral-700 hover:text-neutral-900"
    : "text-white/90 hover:text-white";

  const logoColorClass = isScrolled ? "text-neutral-900" : "text-white";

  const searchBorderClass = isScrolled
    ? "border-neutral-200"
    : "border-white/30";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.05)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 md:px-8">
        {/* ── Left: Hamburger + Links de Navegação ── */}
        <div className="flex items-center gap-6 md:gap-8">
          {/* Hamburger */}
          <button
            className="group flex flex-col gap-[5px] p-1"
            aria-label="Abrir menu"
          >
            <span
              className={`block h-[1.5px] w-5 transition-all duration-300 ${
                isScrolled ? "bg-neutral-800" : "bg-white"
              }`}
            />
            <span
              className={`block h-[1.5px] w-4 transition-all duration-300 group-hover:w-5 ${
                isScrolled ? "bg-neutral-800" : "bg-white"
              }`}
            />
          </button>

          {/* Links desktop */}
          <div className="hidden gap-6 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] font-medium uppercase tracking-[0.12em] transition-colors duration-300 ${linkColorClass}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* ── Center: Logo ── */}
        <Link
          href="/"
          className={`absolute left-1/2 -translate-x-1/2 text-lg font-light uppercase tracking-[0.3em] transition-colors duration-500 md:text-xl md:tracking-[0.35em] ${logoColorClass}`}
        >
          Lavigui
        </Link>

        {/* ── Right: Search, Profile, Cart ── */}
        <div className="flex items-center gap-4 md:gap-5">
          {/* Search */}
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex items-center"
          >
            <button
              type="button"
              data-search-toggle
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`p-1 transition-colors duration-300 ${iconColorClass}`}
              aria-label="Buscar"
            >
              <svg
                className="h-[18px] w-[18px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`absolute right-0 top-1/2 -translate-y-1/2 transition-all duration-500 ease-out ${
                isSearchOpen
                  ? "w-40 opacity-100 md:w-48"
                  : "w-0 opacity-0"
              } rounded-none border-b bg-transparent py-1 pl-2 pr-8 text-[13px] font-light uppercase tracking-[0.08em] text-neutral-800 placeholder-neutral-400 outline-none ${searchBorderClass}`}
            />
          </form>

          {/* Profile */}
          <Link
            href="/login"
            className={`p-1 transition-colors duration-300 ${iconColorClass}`}
            aria-label="Login"
          >
            <svg
              className="h-[18px] w-[18px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </Link>

          {/* Cart */}
          <button
            onClick={openCart}
            className={`relative p-1 transition-colors duration-300 ${iconColorClass}`}
            aria-label="Sacola de compras"
          >
            <svg
              className="h-[18px] w-[18px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-[17px] w-[17px] items-center justify-center rounded-full bg-neutral-900 text-[10px] font-medium text-white">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
