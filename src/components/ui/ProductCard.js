"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    addItem(product);
  };

  // Compatível tanto com dados do Supabase (marcas.nome) quanto placeholders (brand)
  const brand =
    product.marcas?.nome || product.marca_nome || product.brand || "";
  const name = product.nome || product.name || "";
  const price = product.preco || product.price || "";
  const image = product.imagem_url || product.image || "";
  const imageHover =
    product.imagem_url_secundaria || product.imageHover || "";
  const slug = product.slug || product.id;

  return (
    <Link
      href={`/produto/${slug}`}
      className="group block cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Container da Imagem ── */}
      <div className="relative mb-5 overflow-hidden bg-neutral-100">
        {/* Skeleton placeholder enquanto carrega */}
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-neutral-200" />
        )}

        {/* Imagem principal */}
        <img
          src={image}
          alt={name}
          onLoad={() => setImageLoaded(true)}
          className={`h-[420px] w-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.03] ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
        />

        {/* Imagem secundária (hover) */}
        {imageHover && (
          <img
            src={imageHover}
            alt={`${name} - vista alternativa`}
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
          />
        )}

        {/* Botão rápido de adicionar à sacola */}
        <button
          onClick={handleAddToCart}
          className={`absolute bottom-4 left-4 right-4 bg-white/90 py-3 text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-900 backdrop-blur-md transition-all duration-500 hover:bg-white ${
            isHovered
              ? "translate-y-0 opacity-100"
              : "translate-y-2 opacity-0"
          }`}
        >
          Adicionar à Sacola
        </button>
      </div>

      {/* ── Informações do Produto ── */}
      <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.15em] text-neutral-400">
        {brand}
      </p>
      <h3 className="mb-1 text-[14px] font-light leading-snug text-neutral-800">
        {name}
      </h3>
      <p className="text-[14px] font-medium text-neutral-900">{price}</p>
    </Link>
  );
}
