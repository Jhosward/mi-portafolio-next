import Link from 'next/link';

export default function ProyectosPage() {
  const proyectos = [
    {
      id: 'ecommerce',
      titulo: 'E-commerce Streetwear',
      tecnologias: 'React, Vite, CSS',
      estado: 'Completado',
      link: '/ecommerce'
    },
    {
      id: 'buscador',
      titulo: 'Buscador de Películas',
      tecnologias: 'TypeScript, HTML5, CSS3',
      estado: 'Completado',
      link: '/portafolio-app'
    },
    {
      id: 'juego',
      titulo: 'Mokepon Game',
      tecnologias: 'JavaScript, HTML5, CSS3',
      estado: 'Completado',
      link: '/juego'
    }
  ];

  return (
    <main style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: '#fff', padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '10px' }}>
        Mis Proyectos (Server Component)
      </h1>
      <p style={{ color: '#94a3b8', marginBottom: '40px' }}>
        Esta sección se renderiza en el servidor.
      </p>

      {/* Grid de las 3 tarjetas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '50px' }}>
        {proyectos.map((proyecto) => (
          <div 
            key={proyecto.id} 
            style={{ 
              backgroundColor: '#1e293b', 
              border: '1px solid #334155', 
              borderRadius: '12px', 
              padding: '24px', 
              display: 'flex', 
              flexDirection: 'column',
              justify: 'space-between'
            }}
          >
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '8px' }}>
                {proyecto.titulo}
              </h2>
              <p style={{ color: '#38bdf8', fontSize: '0.9rem', marginBottom: '12px' }}>
                Tecnologías: {proyecto.tecnologias}
              </p>
              <span style={{ 
                backgroundColor: 'rgba(16, 185, 129, 0.2)', 
                color: '#34d399', 
                padding: '4px 10px', 
                borderRadius: '6px', 
                fontSize: '0.8rem', 
                fontWeight: 'bold',
                display: 'inline-block',
                marginBottom: '20px'
              }}>
                {proyecto.estado}
              </span>
            </div>

            <Link 
              href={proyecto.link} 
              style={{ 
                backgroundColor: '#38bdf8', 
                color: '#0f172a', 
                textAlign: 'center', 
                padding: '10px', 
                borderRadius: '8px', 
                fontWeight: 'bold', 
                textDecoration: 'none',
                display: 'block'
              }}
            >
              Ver Proyecto 🚀
            </Link>
          </div>
        ))}
      </div>

    </main>
  );
}