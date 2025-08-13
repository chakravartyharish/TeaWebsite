import "../styles/globals.css";
import Providers from "@/components/providers";
import LayoutContent from "@/components/layout-content";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <html lang="en">
        <body>
          <LayoutContent>{children}</LayoutContent>
        </body>
      </html>
    </Providers>
  )
}


