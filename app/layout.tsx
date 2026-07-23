

import "./globals.css";
import { Nunito_Sans, Roboto_Slab } from "next/font/google";
import { cn } from "@/lib/utils";

const robotoSlabHeading = Roboto_Slab({subsets:['latin'],variable:'--font-heading'});

const nunitoSans = Nunito_Sans({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", "font-sans", nunitoSans.variable, robotoSlabHeading.variable)}
    >
      <body className="min-h-full flex flex-col">
        {/* Navbar  */}
        {children}
        {/* Footer  */}
        </body>
    </html>
  );
}
