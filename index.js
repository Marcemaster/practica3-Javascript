import {texto_inicio,texto_octavos,texto_cuartos,texto_semis,texto_final, ganador,texto_equipos_clasificados, partido_eliminacion} from './utils/functions.js'
import {equipos_clasificados} from './grupos.js'

let cuartos = [], semis = [], tercer_cuarto = [], final=[], campeon = []

texto_inicio()
texto_equipos_clasificados()
console.log(equipos_clasificados)

// RONDA DE OCTAVOS 
texto_octavos()
for (let i = 0; i < equipos_clasificados.length; i+=4 ) {
    let cuadro_izquierda = [equipos_clasificados[i],equipos_clasificados[i+3]]
    let cuadro_derecha = [equipos_clasificados[i+1],equipos_clasificados[i+2]]
    partido_eliminacion(cuadro_izquierda, cuartos)
    partido_eliminacion(cuadro_derecha, cuartos)
}

// CUARTOS DE FINAL

texto_cuartos()
for (let i= 0; i <cuartos.length; i+=2) {
    partido_eliminacion(cuartos.slice(i,i+2), semis)
}

// SEMIFINAL
texto_semis()
for (let i= 0; i <semis.length; i+=2) {
    partido_eliminacion(semis.slice(i,i+2), final)
}

// TERCER Y CUARTO PUESTO

/*
let tercer = []
let cuarto = []
tercer_cuarto =
partido_eliminacion(tercer_cuarto, tercer)
cuarto = semis.filter((item) => item!==(tercer[0]))
console.log(tercer[0])
console.log(cuarto[0])
*/

// FINAL
texto_final()
partido_eliminacion(final, campeon)
ganador(campeon[0])
