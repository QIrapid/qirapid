import "./globals.css";

export const metadata = {
  title: "QIRapid — Fast IQ Test",
  description:
    "Measure your IQ in minutes. Fast, accurate, and designed for all languages.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container">
            <a className="logo" href="/">QIRapid</a>
            <nav className="nav">
              <a href="/">Home</a>
              <a className="btn btn-primary" href="/test">Start Test</a>
              <div className="langs">
                <span>🌍</span>
                <a href="/">EN</a>
                <a href="/pt">PT</a>
                <a href="/es">ES</a>
              </div>
            </nav>
          </div>
        </header>

        <main className="page">{children}</main>

        <footer className="site-footer">
          <div className="container">
            <small>© {new Date().getFullYear()} QIRapid — Recreational IQ estimation.</small>
          </div>
        </footer>
      </body>
    </html>
  );
}
