import ProductCard from "@/components/ui/ProductCard";
import { getCloudinaryUrl, fetchProdutosComMarca } from "@/lib/supabase";

// ── Fallback: produtos estáticos com Cloudinary ──
const FALLBACK_PRODUCTS = [
  {
    id: 1,
    brand: "Lavigui",
    name: "Blazer Estruturado Alfaiataria",
    price: "R$ 1.890",
    image: getCloudinaryUrl("produtos/lavigui-blazer-01", {
      width: 600,
      height: 800,
      crop: "fill",
      quality: "auto",
      fetchFormat: "auto",
    }),
    imageHover: getCloudinaryUrl("produtos/lavigui-blazer-02", {
      width: 600,
      height: 800,
      crop: "fill",
      quality: "auto",
      fetchFormat: "auto",
    }),
  },
  {
    id: 2,
    brand: "Aramis",
    name: "Camisa Slim Fit Linho Italiano",
    price: "R$ 690",
    image: getCloudinaryUrl("produtos/aramis-camisa-linho-01", {
      width: 600,
      height: 800,
      crop: "fill",
      quality: "auto",
      fetchFormat: "auto",
    }),
    imageHover: getCloudinaryUrl("produtos/aramis-camisa-linho-02", {
      width: 600,
      height: 800,
      crop: "fill",
      quality: "auto",
      fetchFormat: "auto",
    }),
  },
  {
    id: 3,
    brand: "Nike",
    name: "Air Max 97 Premium Edition",
    price: "R$ 1.299",
    image: getCloudinaryUrl("produtos/nike-am97-01", {
      width: 600,
      height: 800,
      crop: "fill",
      quality: "auto",
      fetchFormat: "auto",
    }),
    imageHover: getCloudinaryUrl("produtos/nike-am97-02", {
      width: 600,
      height: 800,
      crop: "fill",
      quality: "auto",
      fetchFormat: "auto",
    }),
  },
  {
    id: 4,
    brand: "Lavigui",
    name: "Trench Coat Couro Vegetal",
    price: "R$ 3.490",
    image: getCloudinaryUrl("produtos/lavigui-trench-01", {
      width: 600,
      height: 800,
      crop: "fill",
      quality: "auto",
      fetchFormat: "auto",
    }),
    imageHover: getCloudinaryUrl("produtos/lavigui-trench-02", {
      width: 600,
      height: 800,
      crop: "fill",
      quality: "auto",
      fetchFormat: "auto",
    }),
  },
  {
    id: 5,
    brand: "Nike",
    name: "Dunk Low Retro Panda",
    price: "R$ 899",
    image: getCloudinaryUrl("produtos/nike-dunk-panda-01", {
      width: 600,
      height: 800,
      crop: "fill",
      quality: "auto",
      fetchFormat: "auto",
    }),
    imageHover: getCloudinaryUrl("produtos/nike-dunk-panda-02", {
      width: 600,
      height: 800,
      crop: "fill",
      quality: "auto",
      fetchFormat: "auto",
    }),
  },
  {
    id: 6,
    brand: "Aramis",
    name: "Calça Alfaiataria Sarja Premium",
    price: "R$ 549",
    image: getCloudinaryUrl("produtos/aramis-calca-sarja-01", {
      width: 600,
      height: 800,
      crop: "fill",
      quality: "auto",
      fetchFormat: "auto",
    }),
    imageHover: getCloudinaryUrl("produtos/aramis-calca-sarja-02", {
      width: 600,
      height: 800,
      crop: "fill",
      quality: "auto",
      fetchFormat: "auto",
    }),
  },
  {
    id: 7,
    brand: "Lavigui",
    name: "Vestido Midi Seda Pura",
    price: "R$ 2.290",
    image: getCloudinaryUrl("produtos/lavigui-vestido-seda-01", {
      width: 600,
      height: 800,
      crop: "fill",
      quality: "auto",
      fetchFormat: "auto",
    }),
    imageHover: getCloudinaryUrl("produtos/lavigui-vestido-seda-02", {
      width: 600,
      height: 800,
      crop: "fill",
      quality: "auto",
      fetchFormat: "auto",
    }),
  },
  {
    id: 8,
    brand: "Nike",
    name: "Air Force 1 '07 Branco",
    price: "R$ 799",
    image: getCloudinaryUrl("produtos/nike-af1-01", {
      width: 600,
      height: 800,
      crop: "fill",
      quality: "auto",
      fetchFormat: "auto",
    }),
    imageHover: getCloudinaryUrl("produtos/nike-af1-02", {
      width: 600,
      height: 800,
      crop: "fill",
      quality: "auto",
      fetchFormat: "auto",
    }),
  },
];

export default async function HomePage() {
  // ── Busca produtos do Supabase com fallback ──
  let products = [];
  let dbError = false;

  try {
    const data = await fetchProdutosComMarca({ limit: 8, destaque: true });

    if (data && data.length > 0) {
      products = data.map((produto) => ({
        id: produto.id,
        slug: produto.slug || produto.id,
        brand: produto.marcas?.nome || "",
        name: produto.nome,
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(produto.preco),
        image: getCloudinaryUrl(produto.imagem_url, {
          width: 600,
          height: 800,
          crop: "fill",
          quality: "auto",
          fetchFormat: "auto",
        }),
        imageHover: produto.imagem_url_secundaria
          ? getCloudinaryUrl(produto.imagem_url_secundaria, {
              width: 600,
              height: 800,
              crop: "fill",
              quality: "auto",
              fetchFormat: "auto",
            })
          : null,
      }));
    }
  } catch (error) {
    console.warn(
      "Supabase indisponível, usando produtos de fallback:",
      error.message
    );
    dbError = true;
  }

  // Fallback para os produtos estáticos se o Supabase estiver vazio ou offline
  if (products.length === 0) {
    products = FALLBACK_PRODUCTS;
  }

  return (
    <>
      {/* ═══════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════ */}
      <section className="relative flex h-screen items-center justify-center overflow-hidden">
        {/* Overlay gradiente */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

        {/* Imagem de fundo via Cloudinary */}
        <img
          src={getCloudinaryUrl("site/hero-banner", {
            width: 1920,
            height: 1080,
            crop: "fill",
            quality: "auto",
            fetchFormat: "auto",
          })}
          alt="Loja Lavigui"
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />

        {/* Conteúdo do Hero */}
        <div className="relative z-10 px-4 text-center text-white">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.25em] text-white/60">
            Nova Coleção
          </p>
          <h1 className="mb-6 text-5xl font-extralight tracking-[0.05em] md:text-7xl">
            Essência
          </h1>
          <p className="mx-auto mb-10 max-w-md text-[15px] font-light leading-relaxed text-white/70">
            A união entre o minimalismo contemporâneo e a tradição da
            alfaiataria artesanal.
          </p>
          <a
            href="/colecao"
            className="inline-block border border-white/30 px-10 py-3.5 text-[12px] font-medium uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-all duration-500 hover:border-white/80 hover:bg-white hover:text-neutral-900"
          >
            Explorar Coleção
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 animate-bounce">
          <svg
            className="h-5 w-5 text-white/40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PRODUTOS EM DESTAQUE
          ═══════════════════════════════════════ */}
      <section className="mx-auto max-w-[1440px] px-6 py-28 md:px-8">
        {/* Cabeçalho da seção */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400">
            Destaques
          </p>
          <h2 className="text-3xl font-extralight tracking-[0.04em] text-neutral-900 md:text-4xl">
            Peças Selecionadas
          </h2>
        </div>

        {/* Grid de produtos */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
