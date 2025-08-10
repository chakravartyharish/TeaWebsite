import "../styles/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Chatbot from "@/components/chatbot-widget";

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="en">
      <body className="min-h-screen bg-tea-cream text-[#1b1b1b]">
        <Header />
        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  )
}


