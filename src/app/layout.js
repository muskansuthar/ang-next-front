
import "./globals.css";
import ThemeProvider from "@/context/ThemeProvider";

export const metadata = {
  title: "ANGIRA ART EXPORTS",
  description: "Established in 2005, Angira Art Exports is a globally recognized manufacturer and exporter of solid wood and iron furniture.",
  icons: {
    icon: "/logo.png",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <ThemeProvider>
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}