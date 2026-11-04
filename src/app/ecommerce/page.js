import Link from 'next/link';

export default function EcommercePage() {
  return (
    <main style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: '#fff', padding: '20px', fontFamily: 'Arial, sans-serif', display: 'flex', flexDirection: 'column' }}>
      
      {/* Botón para volver */}
      <div style={{ marginBottom: '15px' }}>
        <Link 
          href="/proyectos" 
          style={{ background: 'transparent', border: '2px solid #38bdf8', color: '#38bdf8', padding: '8px 16px', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold' }}
        >
          ← Volver al Portafolio
        </Link>
      </div>

      {/* Contenedor con altura ampliada para que baje el scroll */}
      <div style={{ flex: 1, width: '100%', minHeight: '90vh', backgroundColor: '#1e293b', borderRadius: '12px', overflow: 'hidden', border: '1px solid #334155' }}>
        <iframe 
          src="/tienda/index.html" 
          style={{ width: '100%', height: '100%', minHeight: '850px', border: 'none' }}
          title="E-commerce Streetwear"
        />
      </div>

    </main>
  );
}