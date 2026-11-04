'use client';
import { useState } from 'react';

export default function BotonInteractivo() {
  const [likes, setLikes] = useState(0);

  return (
    <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', maxWidth: '400px', marginTop: '20px' }}>
      <p style={{ margin: '0 0 10px 0', color: '#fff' }}>¿Te gusta lo que estás viendo?</p>
      <button 
        onClick={() => setLikes(likes + 1)}
        style={{ backgroundColor: '#38bdf8', color: '#0f172a', border: 'none', padding: '10px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
      >
        ❤️ Likes: {likes}
      </button>
    </div>
  );
}