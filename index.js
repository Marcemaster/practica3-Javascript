import {texto_inicio,texto_eliminatorias,texto_octavos,texto_cuartos,texto_semis,texto_tercer_cuarto,texto_final, ganador,texto_equipos_clasificados,dividir, partido_eliminacion} from './utils/functions.js'
import { setupArrays } from "./utils/shuffle.js";
import { FootballLeague } from "./classes/FootballLeague.js";
import { teams, group_names } from "./teams.js";


// Inicio del Mundial

texto_inicio()

// Mezclar equipos

setupArrays();
teams.shuffle();

// Dividir equipos en 8 grupos y creamos las variables para guardar los ganadres.

let grupos = dividir(teams, 4);
let equipos_clasificados = [];
let cuartos = [], semis = [], tercer_cuarto = [], final=[], campeon = []

// Jugar Fase de Grupos

for (let i = 0; i < grupos.length; i++) {
    let footballLeague = new FootballLeague("Foot", grupos[i], { rounds: 1 });

    footballLeague.scheduleMatchDays();
    // Mostrar los equipos inscritos por pantalla.
    const teamNames = footballLeague.getTeamNames();
    console.log("-----------------------");
    console.log(`GRUPO ${group_names[i]}`);
    teamNames.forEach(function (team) {
        console.log(team);
    });
    console.log("-----------------------");
    // Mostrar la planificación por pantalla.
    footballLeague.matchDaySchedule.forEach((matchDay, matchDayIndex) => {
        console.log(`Jorndada ${matchDayIndex + 1}`);
        matchDay.forEach((match) => {
                console.log(`${match.home} vs ${match.away}`);
        });
        console.log("=======================");
    });
    // Jugar partidos
    footballLeague.start();
    // Mostrar clasificación tras cada jornada
    footballLeague.summaries.forEach((summary, matchDayIndex) => {
        console.log("\n");
        console.log(`Resultados de la jornada ${matchDayIndex + 1}`);
        summary.results.forEach((result) => {
            console.log(
                `${result.homeTeamName} ${result.homeGoals} - ${result.awayGoals} ${result.awayTeamName}`
            );
        });
        console.table(summary.standings);
    });
    equipos_clasificados.push(footballLeague.summaries[2].standings[0].name);
    equipos_clasificados.push(footballLeague.summaries[2].standings[1].name);
}

texto_eliminatorias()
texto_equipos_clasificados(equipos_clasificados)

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
texto_tercer_cuarto()
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
