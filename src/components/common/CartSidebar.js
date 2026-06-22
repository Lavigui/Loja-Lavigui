"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartSidebar() {
  const {
    items,
    isCartOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotal,
    totalItems,
  } = useCart();

  return (
    <>
      {/* ── Overlay com blur ── */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm transition-opacity duration-500"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      {/* ── Painel lateral ── */}
      <div
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-500 ease-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* ── Cabeçalho ── */}
        <div className="flex items-center justify-between border-b border-neutral-100 px-8 py-6">
          <h2 className="text-[13px] font-medium uppercase tracking-[0.15em] text-neutral-800">
            Sacola ({totalItems})
          </h2>
          <button
            onClick={closeCart}
            className="text-neutral-400 transition-colors hover:text-neutral-800"
            aria-label="Fechar sacola"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ── Lista de itens ── */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="text-[13px] font-light uppercase tracking-[0.1em] text-neutral-400">
                Sua sacola está vazia
              </p>
              <button
                onClick={closeCart}
                className="mt-4 text-[12px] font-medium uppercase tracking-[0.1em] text-neutral-600 underline underline-offset-4 transition-colors hover:text-neutral-900"
              >
                Continuar Comprando
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => {
                const brand = item.marca_nome || item.brand || "";
                const name = item.nome || item.name || "";
                const price = item.preco || item.price || "";
                const image = item.imagem_url || item.image || "";

                return (
                  <div key={item.id} className="flex gap-4">
                    {/* Thumbnail */}
                    <img
                      src={image}
                      alt={name}
                      className="h-24 w-20 flex-shrink-0 object-cover"
                    />

                    {/* Detalhes */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-400">
                          {brand}
                        </p>
                        <p className="text-[13px] font-light leading-snug text-neutral-800">
                          {name}
                        </p>
                        <p className="mt-0.5 text-[13px] font-medium text-neutral-900">
                          {price}
                        </p>
                      </div>

                      {/* Controles: quantidade + remover */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-neutral-200">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="px-2 py-0.5 text-[12px] text-neutral-500 transition-colors hover:text-neutral-900"
                            aria-label="Diminuir quantidade"
                          >
                            −
                          </button>
                          <span className="px-2 text-[12px] text-neutral-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="px-2 py-0.5 text-[12px] text-neutral-500 transition-colors hover:text-neutral-900"
                            aria-label="Aumentar quantidade"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[11px] uppercase tracking-[0.08em] text-neutral-400 transition-colors hover:text-red-500"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Rodapé: Subtotal + Checkout ── */}
        {items.length > 0 && (
          <div className="border-t border-neutral-100 px-8 py-6">
            <div className="mb-4 flex justify-between text-[13px]">
              <span className="font-light uppercase tracking-[0.1em] text-neutral-500">
                Subtotal
              </span>
              <span className="font-medium text-neutral-900">
                R${" "}
                {subtotal.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full bg-neutral-900 py-3.5 text-center text-[12px] font-medium uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-neutral-800"
            >
              Finalizar Compra
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
