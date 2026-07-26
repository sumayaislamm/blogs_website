

import "./globals.css";
import { Nunito_Sans, Roboto_Slab } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

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
         <Toaster position="top-right" richColors />
        {/* Navbar  */}
        {children}
        {/* Footer  */}
        </body>
    </html>
  );
}
