// ============================================================
// MOKEPON.JS — Audios protegidos contra recargas globales
// ============================================================

window.musicaInicio    = window.musicaInicio    || document.getElementById("musica-inicio");
window.musicaSeleccion = window.musicaSeleccion || document.getElementById("musica-seleccion");
window.musicaBatalla   = window.musicaBatalla   || document.getElementById("musica-batalla");
window.sonidoVictoria  = window.sonidoVictoria  || document.getElementById("sonido-victoria");
window.sonidoDerrota   = window.sonidoDerrota   || document.getElementById("sonido-derrota");

const musicaInicio    = window.musicaInicio;
const musicaSeleccion = window.musicaSeleccion;
const musicaBatalla   = window.musicaBatalla;
const sonidoVictoria  = window.sonidoVictoria;
const sonidoDerrota   = window.sonidoDerrota;

function cambiarMusica(nuevaMusica) {
    [musicaInicio, musicaSeleccion, musicaBatalla, sonidoVictoria, sonidoDerrota].forEach(m => {
        m.pause()
        m.currentTime = 0
    })
    nuevaMusica.volume = 0.3
    nuevaMusica.play()
}

// --- FUNCIÓN PARA REPRODUCIR SONIDOS DE ATAQUES ---
function reproducirSonidoAtaque(rutaSonido) {
    if (!rutaSonido) return
    const audio = new Audio(rutaSonido)
    audio.volume = 0.5
    audio.play().catch(err => console.log('Error reproduciendo sonido:', err))
}

// --- VARIABLES GLOBALES ---
let ataqueJugador
let ataqueEnemigo
let vidasJugador   = 100
let vidasEnemigo   = 100
let energiaJugador = 0
let energiaEnemigo = 0
let objetoMascotaJugador
let objetoMascotaEnemigo

// --- BASE DE DATOS DE MOKEPONES CON SONIDOS ---
const mokepones = {
    "Hipoge": { tipo: "FANTASMA", ataques: [
        { nombre: "Infortunio",  tipo: "FANTASMA", daño: 15, costo: -25, sonido: "./assets/sounds/sonidos.hipoge/hipoge-basico.mp3" },
        { nombre: "Bola Sombra", tipo: "FANTASMA", daño: 25, costo: 40,  sonido: "./assets/sounds/sonidos.hipoge/hipoge-medio.mp3" },
        { nombre: "Pesadilla",   tipo: "FANTASMA", daño: 45, costo: 80,  sonido: "./assets/sounds/sonidos.hipoge/hipoge-fuerte.mp3" }
    ]},
    "Capipep": { tipo: "ACERO", ataques: [
        { nombre: "Puño Bala",    tipo: "ACERO", daño: 12, costo: -25, sonido: "./assets/sounds/sonidos.capipep/capipep-basico.mp3" },
        { nombre: "Cuerpo Pesado",tipo: "ACERO", daño: 22, costo: 40,  sonido: "./assets/sounds/sonidos.capipep/capipep-medio.mp3" },
        { nombre: "Tajo",         tipo: "ACERO", daño: 40, costo: 80,  sonido: "./assets/sounds/sonidos.capipep/capipep-fuerte.mp3" }
    ]},
    "Rata": { tipo: "TIERRA", ataques: [
        { nombre: "Excavar",   tipo: "TIERRA", daño: 18, costo: -25, sonido: "./assets/sounds/sonidos.rata/rata-basico.mp3" },
        { nombre: "Terremoto", tipo: "TIERRA", daño: 28, costo: 40,  sonido: "./assets/sounds/sonidos.rata/rata-medio.mp3" },
        { nombre: "Fisura",    tipo: "TIERRA", daño: 45, costo: 80,  sonido: "./assets/sounds/sonidos.rata/rata-fuerte.mp3" }
    ]},
    "Langosta": { tipo: "DRAGON", ataques: [
        { nombre: "Aliento", tipo: "DRAGON", daño: 15, costo: -25, sonido: "./assets/sounds/sonidos.langosta/langosta-basico.mp3" },
        { nombre: "Carga",   tipo: "DRAGON", daño: 26, costo: 40,  sonido: "./assets/sounds/sonidos.langosta/langosta-medio.mp3" },
        { nombre: "Cometa",  tipo: "DRAGON", daño: 45, costo: 80,  sonido: "./assets/sounds/sonidos.langosta/langosta-fuerte.mp3" }
    ]},
    "Pelicanger": { tipo: "PLANTA", ataques: [
        { nombre: "Hoja",       tipo: "PLANTA", daño: 14, costo: -25, sonido: "./assets/sounds/sonidos.pelicanger/pelicanger-basico.mp3" },
        { nombre: "Rayo Solar", tipo: "PLANTA", daño: 25, costo: 40,  sonido: "./assets/sounds/sonidos.pelicanger/pelicanger-medio.mp3" },
        { nombre: "Danza",      tipo: "PLANTA", daño: 38, costo: 80,  sonido: "./assets/sounds/sonidos.pelicanger/pelicanger-fuerte.mp3" }
    ]},
    "Pydos": { tipo: "LUCHA", ataques: [
        { nombre: "Patada",    tipo: "LUCHA", daño: 16, costo: -25, sonido: "./assets/sounds/sonidos.pydos/pydos-basico.mp3" },
        { nombre: "Puño Inc.", tipo: "LUCHA", daño: 24, costo: 40,  sonido: "./assets/sounds/sonidos.pydos/pydos-medio.mp3" },
        { nombre: "Aura",      tipo: "LUCHA", daño: 42, costo: 80,  sonido: "./assets/sounds/sonidos.pydos/pydos-fuerte.mp3" }
    ]}
}

// ============================================================
// BOTÓN VOLVER
// ============================================================

function mostrarBotonVolver() {
    document.getElementById("boton-volver").style.display = "block"
}

function ocultarBotonVolver() {
    document.getElementById("boton-volver").style.display = "none"
}

function volverAtras() {
    const mascotaVisible = document.getElementById("seleccionar-mascota").style.display !== "none"

    if (mascotaVisible) {
        document.getElementById("seleccionar-mascota").style.display = "none"
        document.getElementById("menu-modos").style.display          = "flex"
        document.querySelectorAll('input[name="mascota"]').forEach(i => i.checked = false)
        ocultarBotonVolver()
        cambiarMusica(musicaInicio)
    }
}

// ============================================================
// INICIO Y NAVEGACIÓN
// ============================================================

function iniciarJuego() {
    document.getElementById("menu-modos").style.display          = "none"
    document.getElementById("seleccionar-mascota").style.display = "none"
    document.getElementById("seleccionar-ataque").style.display  = "none"
    document.getElementById("pantalla-final").style.display      = "none"
    ocultarBotonVolver()

    document.getElementById("boton-comenzar").addEventListener("click", mostrarMenuModos)
    document.getElementById("boton-combate-rapido").addEventListener("click", mostrarSeleccionMascota)
    document.getElementById("boton-mascota").addEventListener("click", seleccionarMascotaJugador)
    document.getElementById("boton-reiniciar").addEventListener("click", reiniciarJuego)
    document.getElementById("boton-volver").addEventListener("click", volverAtras)
}

function mostrarMenuModos() {
    document.getElementById("pantalla-inicio").style.display = "none"
    document.getElementById("menu-modos").style.display      = "flex"
    ocultarBotonVolver()
    cambiarMusica(musicaInicio)
}

function mostrarSeleccionMascota() {
    document.getElementById("menu-modos").style.display = "none"
    const seccion = document.getElementById("seleccionar-mascota")
    seccion.style.display = "flex"
    seccion.classList.add("animacion-suave")
    mostrarBotonVolver()
    cambiarMusica(musicaSeleccion)
}

// ============================================================
// SELECCIÓN DE MASCOTAS
// ============================================================

function seleccionarMascotaJugador() {
    const inputSeleccionado = document.querySelector('input[name="mascota"]:checked')

    if (!inputSeleccionado) {
        alert("¡SELECCIONA UNA MASCOTA, MANO!")
        return
    }

    const nombre = inputSeleccionado.id
    objetoMascotaJugador = mokepones[nombre]

    document.getElementById("mascota-jugador").innerHTML = nombre
    document.getElementById("img-jugador").src = `./assets/${nombre}.png`

    document.getElementById("seleccionar-mascota").style.display = "none"
    document.getElementById("seleccionar-ataque").style.display  = "flex"

    ocultarBotonVolver()
    cambiarMusica(musicaBatalla)
    actualizarBarrasEnergia()
    mostrarAtaques(objetoMascotaJugador.ataques)
    seleccionarMascotaEnemigo()
}

function seleccionarMascotaEnemigo() {
    const nombres = Object.keys(mokepones)
    const nombre  = nombres[aleatorio(0, nombres.length - 1)]
    objetoMascotaEnemigo = mokepones[nombre]

    document.getElementById("mascota-enemigo").innerHTML = nombre
    document.getElementById("img-enemigo").src = `./assets/${nombre}.png`
}

// ============================================================
// SISTEMA DE ATAQUES Y ENERGÍA
// ============================================================

function mostrarAtaques(ataques) {
    const contenedor = document.getElementById("contenedor-botones")
    contenedor.innerHTML = ""

    ataques.forEach((ataque) => {
        const boton = document.createElement("button")
        boton.classList.add("boton-ataque", "tipo-" + ataque.tipo.toLowerCase())

        if (ataque.costo > 0 && energiaJugador < ataque.costo) {
            boton.disabled = true
            boton.innerHTML = `${ataque.nombre} (Falta: ${ataque.costo - energiaJugador}🔋)`
        } else if (ataque.costo < 0) {
            boton.innerHTML = `${ataque.nombre} (+⚡)`
        } else {
            boton.innerHTML = `${ataque.nombre} (Coste: ${ataque.costo}🔋)`
        }

        boton.addEventListener("click", () => {
            ataqueJugador = ataque
            if (ataque.costo > 0) {
                energiaJugador -= ataque.costo
            } else {
                energiaJugador = Math.min(100, energiaJugador + Math.abs(ataque.costo))
            }
            actualizarBarrasEnergia()
            ataqueIAEnemigo()
        })

        contenedor.appendChild(boton)
    })
}

function ataqueIAEnemigo() {
    const ataquesDisponibles = objetoMascotaEnemigo.ataques.filter(a => a.costo < 0 || a.costo <= energiaEnemigo)

    if (ataquesDisponibles.length === 0) {
        ataqueEnemigo = objetoMascotaEnemigo.ataques[0]
    } else {
        const ultimate = objetoMascotaEnemigo.ataques[2]
        if (ultimate && energiaEnemigo >= ultimate.costo && Math.random() < 0.7) {
            ataqueEnemigo = ultimate
        } else {
            ataqueEnemigo = ataquesDisponibles[aleatorio(0, ataquesDisponibles.length - 1)]
        }
    }

    if (ataqueEnemigo.costo > 0) {
        energiaEnemigo -= ataqueEnemigo.costo
    } else {
        energiaEnemigo = Math.min(100, energiaEnemigo + Math.abs(ataqueEnemigo.costo))
    }

    actualizarBarrasEnergia()
    combate()
}

// ============================================================
// LÓGICA DE COMBATE
// ============================================================

function crearTextoDaño(contenedorId, cantidad, esCritico) {
    const contenedor = document.getElementById(contenedorId)
    const texto = document.createElement("div")
    texto.innerHTML = `-${cantidad}`
    texto.classList.add("daño-flotante")
    if (esCritico) texto.classList.add("daño-critico")
    contenedor.appendChild(texto)
    setTimeout(() => texto.remove(), 800)
}

function combate() {
    let multiplicadorJugador = 1
    let multiplicadorEnemigo = 1

    const superEfectivo = [
        ["TIERRA", "ACERO"], ["LUCHA", "ACERO"], ["LUCHA", "TIERRA"],
        ["PLANTA", "TIERRA"], ["FANTASMA", "LUCHA"], ["DRAGON", "DRAGON"]
    ]
    const pocoEfectivo = [["FANTASMA", "ACERO"], ["ACERO", "FANTASMA"]]

    const esEfectivo = (ataqueT, defensorT, tabla) => tabla.some(([a, d]) => a === ataqueT && d === defensorT)

    if (esEfectivo(ataqueJugador.tipo, objetoMascotaEnemigo.tipo, superEfectivo))      multiplicadorJugador = 1.5
    else if (esEfectivo(ataqueJugador.tipo, objetoMascotaEnemigo.tipo, pocoEfectivo)) multiplicadorJugador = 0.7

    if (esEfectivo(ataqueEnemigo.tipo, objetoMascotaJugador.tipo, superEfectivo))      multiplicadorEnemigo = 1.5
    else if (esEfectivo(ataqueEnemigo.tipo, objetoMascotaJugador.tipo, pocoEfectivo)) multiplicadorEnemigo = 0.7

    const dañoFinalJugador = Math.floor(ataqueJugador.daño * multiplicadorJugador)
    const dañoFinalEnemigo = Math.floor(ataqueEnemigo.daño * multiplicadorEnemigo)

    crearTextoDaño("tarjeta-enemigo", dañoFinalJugador, multiplicadorJugador > 1)
    crearTextoDaño("tarjeta-jugador", dañoFinalEnemigo, multiplicadorEnemigo > 1)

    vidasEnemigo = Math.max(0, vidasEnemigo - dañoFinalJugador)
    vidasJugador = Math.max(0, vidasJugador - dañoFinalEnemigo)

    actualizarInterfaz()

    let resultado
    if (multiplicadorJugador > 1)                        resultado = "¡SÚPER EFECTIVO! 🔥"
    else if (multiplicadorEnemigo > 1)                   resultado = "¡ES MUY EFECTIVO EN TU CONTRA! 😰"
    else if (dañoFinalJugador > dañoFinalEnemigo)        resultado = "¡PEGASTE DURO!"
    else if (dañoFinalEnemigo > dañoFinalJugador)        resultado = "¡TE DIERON FUERTE!"
    else                                                 resultado = "EMPATE DE PODER"

    mostrarMensajeCombate(resultado, dañoFinalJugador, dañoFinalEnemigo)
    revisarVidas()
}

function actualizarInterfaz() {
    document.getElementById("vidas-jugador").innerHTML = vidasJugador
    document.getElementById("vidas-enemigo").innerHTML = vidasEnemigo

    const barraJugador = document.getElementById('barra-vida-jugador')
    const barraEnemigo = document.getElementById('barra-vida-enemigo')
    barraJugador.style.width = vidasJugador + "%"
    barraEnemigo.style.width = vidasEnemigo + "%"

    if (vidasJugador <= 30) barraJugador.classList.add("vida-baja")
    if (vidasEnemigo <= 30) barraEnemigo.classList.add("vida-baja")
}

function actualizarBarrasEnergia() {
    const barraJugador = document.getElementById('barra-energia-jugador')
    const textoJugador = document.getElementById('energia-texto-jugador')
    barraJugador.style.width = energiaJugador + "%"
    textoJugador.innerHTML   = energiaJugador

    if (energiaJugador >= 100) {
        barraJugador.classList.add("barra-maxima")
        textoJugador.classList.add("texto-energia-full")
    } else {
        barraJugador.classList.remove("barra-maxima")
        textoJugador.classList.remove("texto-energia-full")
    }

    const barraEnemigo = document.getElementById('barra-energia-enemigo')
    const textoEnemigo = document.getElementById('energia-texto-enemigo')
    barraEnemigo.style.width = energiaEnemigo + "%"
    if (textoEnemigo) textoEnemigo.innerHTML = energiaEnemigo

    if (energiaEnemigo >= 100) {
        barraEnemigo.classList.add("barra-maxima")
    } else {
        barraEnemigo.classList.remove("barra-maxima")
    }
}

function mostrarMensajeCombate(resultado, dañoJugador, dañoEnemigo) {
    document.getElementById("ataque-jugador-display").innerHTML = ataqueJugador.nombre
    document.getElementById("ataque-enemigo-display").innerHTML = ataqueEnemigo.nombre
    document.getElementById("resultado-ronda").innerHTML        = resultado

    // REPRODUCIR SONIDOS DE ATAQUES
    reproducirSonidoAtaque(ataqueJugador.sonido)
    setTimeout(() => reproducirSonidoAtaque(ataqueEnemigo.sonido), 200)

    if (dañoJugador > dañoEnemigo) {
        document.getElementById("tarjeta-enemigo").classList.add("animar-daño")
        setTimeout(() => document.getElementById("tarjeta-enemigo").classList.remove("animar-daño"), 400)
    } else if (dañoEnemigo > dañoJugador) {
        document.getElementById("tarjeta-jugador").classList.add("animar-daño")
        setTimeout(() => document.getElementById("tarjeta-jugador").classList.remove("animar-daño"), 400)
    }

    document.querySelectorAll('.boton-ataque').forEach(b => b.disabled = true)

    setTimeout(() => {
        if (vidasJugador > 0 && vidasEnemigo > 0) mostrarAtaques(objetoMascotaJugador.ataques)
    }, 800)
}

function revisarVidas() {
    if (vidasJugador <= 0 || vidasEnemigo <= 0) {
        let final
        if (vidasJugador <= 0 && vidasEnemigo <= 0) final = "¡EMPATE! 🤯"
        else if (vidasEnemigo <= 0)                 final = "¡VICTORIA! 🏆"
        else                                        final = "DERROTA... 💀"
        crearMensajeFinal(final)
    }
}

function crearMensajeFinal(resultadoFinal) {
    const pantallaFinal = document.getElementById('pantalla-final')
    const tituloFinal   = document.getElementById('titulo-final')
    pantallaFinal.style.display = 'flex'
    tituloFinal.innerHTML = resultadoFinal

    if (resultadoFinal.includes("VICTORIA")) {
        tituloFinal.className = "texto-victoria"
        cambiarMusica(sonidoVictoria)
    } else if (resultadoFinal.includes("DERROTA")) {
        tituloFinal.className = "texto-derrota"
        cambiarMusica(sonidoDerrota)
    } else {
        tituloFinal.className = "texto-empate"
        ;[musicaInicio, musicaSeleccion, musicaBatalla, sonidoVictoria, sonidoDerrota].forEach(m => {
            m.pause()
            m.currentTime = 0
        })
    }
}

// ============================================================
// REINICIO
// ============================================================

function reiniciarJuego() {
    vidasJugador   = 100
    vidasEnemigo   = 100
    energiaJugador = 0
    energiaEnemigo = 0

    actualizarInterfaz()
    actualizarBarrasEnergia()

    document.getElementById("ataque-jugador-display").innerHTML = "---"
    document.getElementById("ataque-enemigo-display").innerHTML = "---"
    document.getElementById("resultado-ronda").innerHTML        = "¡LISTOS!"

    document.getElementById('barra-vida-jugador').classList.remove("vida-baja")
    document.getElementById('barra-vida-enemigo').classList.remove("vida-baja")

    document.getElementById('pantalla-final').style.display      = "none"
    document.getElementById("seleccionar-ataque").style.display  = "none"
    document.getElementById("seleccionar-mascota").style.display = "flex"

    mostrarBotonVolver()
    cambiarMusica(musicaSeleccion)

    document.querySelectorAll('input[name="mascota"]').forEach(input => input.checked = false)
}

// ============================================================
// UTILIDADES
// ============================================================

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener("load", iniciarJuego)