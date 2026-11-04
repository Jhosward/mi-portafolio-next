'use client';
import { useEffect } from 'react';
import Link from 'next/link';

export default function JuegoPage() {
  useEffect(() => {
    // Cargamos el script del juego
    const script = document.createElement('script');
    script.src = '/mokepon.js';
    script.async = true;
    
    script.onload = () => {
      // Forzamos el inicio del juego una vez cargado el script
      if (typeof iniciarJuego === 'function') {
        iniciarJuego();
      }
    };

    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div style={{ backgroundColor: '#1a1c20', minHeight: '100vh', color: 'white', padding: '20px', fontFamily: 'sans-serif' }}>
      
      {/* Botón Volver al Portafolio */}
      <div style={{ marginBottom: '20px' }}>
        <Link 
          href="/proyectos" 
          style={{ background: 'transparent', border: '2px solid #d4af37', color: '#d4af37', padding: '10px 20px', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold' }}
        >
          ← Volver al Portafolio
        </Link>
      </div>

      {/* BOTÓN VOLVER — fijo del juego */}
      <button id="boton-volver" style={{ display: 'none' }}>← VOLVER</button>

      {/* PANTALLA DE INICIO */}
      <section id="pantalla-inicio" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
        <h1 style={{ fontSize: '3rem', color: '#ffcb05', marginBottom: '30px', textAlign: 'center' }}>MOKEPON!</h1>
        <button id="boton-comenzar" style={{ background: 'transparent', border: '3px solid #ffcb05', color: '#ffcb05', padding: '15px 40px', borderRadius: '50px', fontSize: '1.2rem', cursor: 'pointer', fontWeight: 'bold' }}>
          COMENZAR JUEGO
        </button>
      </section>

      {/* MENÚ DE MODOS */}
      <section id="menu-modos" style={{ display: 'none', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ fontSize: '3rem', color: '#ffcb05', marginBottom: '30px' }}>MOKEPON!</h1>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <button id="boton-combate-rapido" style={{ background: '#1a1a1a', border: '2px solid #d4af37', color: '#ffcb05', padding: '30px', borderRadius: '20px', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 'bold' }}>
            COMBATE RÁPIDO
          </button>
        </div>
      </section>

      {/* SELECCIONAR MASCOTA */}
      <section id="seleccionar-mascota" style={{ display: 'none', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#ffcb05', marginBottom: '10px' }}>MOKEPON!</h1>
        <h2 style={{ color: '#bbb', marginBottom: '20px' }}>Elige a tu mascota:</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', maxWidth: '500px', margin: '0 auto 30px auto' }}>
          {['Hipoge', 'Capipep', 'Rata', 'Langosta', 'Pelicanger', 'Pydos'].map((mascota) => (
            <div key={mascota}>
              <input type="radio" name="mascota" id={mascota} style={{ display: 'none' }} />
              <label htmlFor={mascota} style={{ background: '#1a1a1a', border: '2px solid #333', padding: '15px', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', color: '#fff' }}>
                <img src={`/assets/${mascota}.png`} alt={mascota} style={{ width: '80px', height: '80px', objectFit: 'contain', marginBottom: '10px' }} />
                <p style={{ fontWeight: 'bold' }}>{mascota}</p>
              </label>
            </div>
          ))}
        </div>

        <button id="boton-mascota" style={{ background: 'transparent', border: '2px solid #d4af37', color: '#d4af37', padding: '12px 40px', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' }}>
          Seleccionar
        </button>
      </section>

      {/* SELECCIONAR ATAQUE (ARENA DE BATALLA) */}
      <section id="seleccionar-ataque" style={{ display: 'none', flexDirection: 'column', alignItems: 'center' }}>
        <h2 id="instruccion-ataque" style={{ color: '#bbb', marginBottom: '20px' }}>Elige tu ataque:</h2>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '25px', width: '100%', maxWidth: '800px', marginBottom: '20px' }}>
          {/* Tarjeta Jugador */}
          <div id="tarjeta-jugador" style={{ background: '#1a1a1a', border: '3px solid #d4af37', borderRadius: '20px', padding: '20px', width: '240px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{ fontSize: '0.8rem', color: '#888', fontWeight: 'bold', marginBottom: '10px' }}>TÚ</p>
            <div style={{ width: '100%', height: '10px', background: '#333', borderRadius: '5px', overflow: 'hidden', marginBottom: '5px' }}>
              <div id="barra-vida-jugador" style={{ width: '100%', height: '100%', background: '#2ecc71', transition: 'width 0.5s' }}></div>
            </div>
            <div style={{ width: '100%', height: '6px', background: '#222', borderRadius: '5px', overflow: 'hidden', marginBottom: '15px' }}>
              <div id="barra-energia-jugador" style={{ width: '0%', height: '100%', background: '#00d2ff', transition: 'width 0.4s' }}></div>
            </div>
            <img id="img-jugador" src={null} alt="" style={{ width: '100px', height: '100px', objectFit: 'contain', marginBottom: '10px' }} />
            <p><span id="mascota-jugador" style={{ color: '#d4af37', fontWeight: 'bold' }}></span></p>
            <div id="ataque-jugador-display" style={{ background: '#000', color: '#ffcb05', padding: '5px 15px', borderRadius: '5px', marginTop: '10px', border: '1px solid #333' }}>---</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: '#ffcb05', color: '#000', width: '55px', height: '55px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '1.4rem' }}>VS</div>
            <div id="resultado-ronda" style={{ background: 'rgba(0,0,0,0.8)', border: '2px solid #d4af37', padding: '8px 15px', borderRadius: '10px', color: '#d4af37', fontSize: '0.85rem', textAlign: 'center' }}>¡LISTOS!</div>
          </div>

          {/* Tarjeta Enemigo */}
          <div id="tarjeta-enemigo" style={{ background: '#1a1a1a', border: '3px solid #333', borderRadius: '20px', padding: '20px', width: '240px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{ fontSize: '0.8rem', color: '#888', fontWeight: 'bold', marginBottom: '10px' }}>PC</p>
            <div style={{ width: '100%', height: '10px', background: '#333', borderRadius: '5px', overflow: 'hidden', marginBottom: '5px' }}>
              <div id="barra-vida-enemigo" style={{ width: '100%', height: '100%', background: '#2ecc71', transition: 'width 0.5s' }}></div>
            </div>
            <div style={{ width: '100%', height: '6px', background: '#222', borderRadius: '5px', overflow: 'hidden', marginBottom: '15px' }}>
              <div id="barra-energia-enemigo" style={{ width: '0%', height: '100%', background: '#00d2ff', transition: 'width 0.4s' }}></div>
            </div>
            <img id="img-enemigo" src={null} alt="" style={{ width: '100px', height: '100px', objectFit: 'contain', marginBottom: '10px' }} />
            <p><span id="mascota-enemigo" style={{ color: '#d4af37', fontWeight: 'bold' }}></span></p>
            <div id="ataque-enemigo-display" style={{ background: '#000', color: '#ffcb05', padding: '5px 15px', borderRadius: '5px', marginTop: '10px', border: '1px solid #334155' }}>---</div>
          </div>
        </div>

        <div style={{ textAlign: 'center', margin: '10px 0', fontSize: '0.85rem', color: '#aaa' }}>
          <p>Salud: <span id="vidas-jugador">100</span>% | <span id="vidas-enemigo">100</span>%</p>
          <p>Energía: <span id="energia-texto-jugador">0</span>/100 | <span id="energia-texto-enemigo">0</span>/100</p>
        </div>

        <div id="contenedor-botones" style={{ display: 'flex', gap: '15px', marginTop: '20px', flexWrap: 'wrap', justifyContent: 'center' }}></div>
      </section>

      {/* PANTALLA FINAL */}
      <div id="pantalla-final" style={{ display: 'none', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.9)', zIndex: 2000, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ background: '#1a1a1a', border: '4px solid #ffcb05', padding: '50px', borderRadius: '30px', textAlign: 'center' }}>
          <h2 id="titulo-final" style={{ fontSize: '3rem', marginBottom: '20px' }}></h2>
          <button id="boton-reiniciar" style={{ background: '#ffcb05', color: '#000', border: 'none', padding: '15px 40px', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem' }}>
            ¿OTRA PARTIDA?
          </button>
        </div>
      </div>

      {/* AUDIOS */}
      <audio id="musica-inicio" src="/assets/sounds/inicio.mp3" loop></audio>
      <audio id="musica-seleccion" src="/assets/sounds/seleccion.mp3" loop></audio>
      <audio id="musica-batalla" src="/assets/sounds/batalla.mp3" loop></audio>
      <audio id="sonido-victoria" src="/assets/sounds/victoria.mp3"></audio>
      <audio id="sonido-derrota" src="/assets/sounds/derrota.mp3"></audio>
    </div>
  );
}