import "./globals.css";
import Nav from "./nav";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:items-center lg:justify-between lg:py-16 lg:px-8">
          <Nav />
          {children}
        </div>
      </body>
    </html>
  );
}
