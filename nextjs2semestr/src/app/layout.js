import Link from "next/link";
import "./globals.css";

// import { Lavishly_Yours } from 'next/font/google'

//   const lavishly = Lavishly_Yours({
//     subsets: ["latin"],
//     weight: ["400"],

//   })

export default function RootLayout({ children }) {

  return (
    // <html lang="en" className={lavishly.className}>
    <html lang="en">
      <body className="pt-5 px-5">
        <header className="flex justify-around">
          <Link href="/" className="text-xl font-bold">LOGO</Link>
          <nav className="flex gap-10">
            <Link href="/">Главная</Link>
            <Link href="/products">Товары</Link>
            <Link href="/posts">Посты</Link>
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
