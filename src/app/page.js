import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#0f172a', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '20px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Mi Portafolio Full-Stack // Trainee</h1>
      <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '600px', marginBottom: '30px' }}>
        Construido con Next.js (App Router) y Tailwind CSS. Preparando la ruta hacia bases de datos y despliegues profesionales.
      </p>
      <div style={{ display: 'flex', gap: '15px' }}>
        <Link 
          href="/proyectos" 
          style={{ backgroundColor: '#38bdf8', color: '#0f172a', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', textDecoration: 'none' }}
        >
          Ver Proyectos
        </Link>
      </div>
    </main>
  );
}