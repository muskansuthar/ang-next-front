
import "./globals.css";
import ThemeProvider from "@/context/ThemeProvider";

export const metadata = {
  title: "ANGIRA ART EXPORTS",
  icons: {
    icon: "/logo.png",
  },
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