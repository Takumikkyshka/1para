import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="pt-4">
        <header className="flex justify-around">
          <div>LOGO</div>
          <nav className="flex gap-10">
            <Link href="/">Главная</Link>
            <Link href="/products">Товары</Link>
            <Link href="/about">О нас</Link>
            <Link href="/about/company">Компания</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer></footer>
      </body>
    </html>
  );
}
