import type {Metadata} from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "HST Star Wars",
    description: "HST Star Wars is a fan site for Star Wars fans.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body>
        <main className="flex min-h-screen flex-col justify-between bg-gray-100">
            <div>
                <Header/>
                <section className="px-4 sm:px-10 lg:px-20 py-4 sm:py-10 lg:py-20">
                    {children}
                </section>
            </div>
            <Footer/>
        </main>
        </body>
        </html>
    );
}
