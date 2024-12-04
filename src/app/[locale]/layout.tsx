import NavBar from "@/components/main_components/nav_bar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

import initTranslations from "../i18n";
import TranslationProvider from "../../components/TranslationsProvider";
import BackToTop from "@/components/main_components/back_to_top";
const i18nNamespaces = ["home", "common"];

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fayida Academy",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  params: { locale },
}: any) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationProvider
      locale={locale}
      resources={resources}
      namespaces={i18nNamespaces}
    >
      <html lang="en">
        <body className={inter.className}>
          <Toaster />
          <div className="absolute top-0 w-fit">
            <div className="">
              <NavBar />
            </div>
            <div className="pt-8 xmd:pt-20">{children}</div>
          </div>
          <div className=" absolute bottom-12 right-16">
            <BackToTop />
          </div>
        </body>
      </html>
    </TranslationProvider>
  );
}
