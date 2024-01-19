// IMPORT COMPONENTS
import HeaderDefault from "@/components/Header";
import FooterDefault from "@/components/Footer";
// PROVIDERS
import { Providers } from "@/app/Providers";
// STATIC FILE
import "@/app/globals.css";

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body suppressHydrationWarning={true}>
          <Providers attribute="class" defaultTheme="dark">
            <HeaderDefault />
            {children}
            <FooterDefault />
          </Providers>
        </body>
      </html>
    </>
  );
}
