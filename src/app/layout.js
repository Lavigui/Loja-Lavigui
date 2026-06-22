import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/common/Navbar";
import CartSidebar from "@/components/common/CartSidebar";
import Footer from "@/components/common/Footer";
import "./globals.css";

export const metadata = {
  title: "Loja Lavigui | Moda de Grife & Multimarcas",
  description:
    "Curadoria de moda de grife. Peças selecionadas das marcas mais desejadas do mundo.",
  openGraph: {
    title: "Loja Lavigui | Moda de Grife & Multimarcas",
    description:
      "Curadoria de moda de grife. Peças selecionadas das marcas mais desejadas do mundo.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-white font-sans text-neutral-900 antialiased">
        <CartProvider>
          <Navbar />
          <CartSidebar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
