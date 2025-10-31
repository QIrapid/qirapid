export default function Home() {
  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#0B0B0F',
      color: '#EDEDED',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#3B82F6' }}>
        Bienvenido a QIRapid
      </h1>
      <p style={{ fontSize: '1.2rem', textAlign: 'center', maxWidth: '600px' }}>
        Mide tu coeficiente intelectual en minutos. Rápido, preciso y adaptado para todos los idiomas.
      </p>
      <p style={{ marginTop: '2rem', opacity: 0.7 }}>
        🇪🇸 Español | <a href="/" style={{ color: '#3B82F6' }}>English</a> | <a href="/pt" style={{ color: '#3B82F6' }}>Português</a>
      </p>
    </main>
  );
}
