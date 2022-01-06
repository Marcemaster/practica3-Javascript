import {texto_inicio,texto_eliminatorias,texto_octavos,texto_cuartos,texto_semis,texto_tercer_cuarto,texto_final, ganador,dividir, partido_eliminacion} from './utils/functions.js'
import { setupArrays } from "./utils/shuffle.js";
import { FootballLeague } from "./classes/FootballLeague.js";
import { teams, group_names } from "./teams.js";


texto_inicio()


// Mezclar equipos y dividirlos en 8 grupos. Creamos las variables para la ronda de eliminación.

setupArrays();
teams.shuffle();
let grupos = dividir(teams, 4);
let equipos_clasificados = [];
let cuartos = [], semis = [], tercer_cuarto = [],tercer = [], final=[], campeon = []

// Jugar Fase de Grupos

for (let i = 0; i < grupos.length; i++) {
    let footballLeague = new FootballLeague("Foot", grupos[i], { rounds: 1 });

    footballLeague.scheduleMatchDays();
    // Mostrar los equipos inscritos por pantalla.
    const teamNames = footballLeague.getTeamNames();
    console.log(`GRUPO ${group_names[i]}\n-----------------------`);
    teamNames.forEach(function (team) {
        console.log(team);
    });
    console.log("-----------------------");
    // Mostrar la planificación por pantalla.
    footballLeague.matchDaySchedule.forEach((matchDay, matchDayIndex) => {
        console.log(`Jorndada ${matchDayIndex + 1}: \n`);
        matchDay.forEach((match) => {
                console.log(`-${match.home} vs ${match.away}`);
        });
        console.log("-----------------------");
    });
    // Jugar partidos
    footballLeague.start();
    footballLeague.summaries.forEach((summary, matchDayIndex) => {
        console.log(`Resultados de la jornada ${matchDayIndex + 1}`);
        summary.results.forEach((result) => {
            console.log(
                `${result.homeTeamName} ${result.homeGoals} - ${result.awayGoals} ${result.awayTeamName}`
            );
        });
        console.table(summary.standings,["name", "points","goalsFor","goalsAgainst"]);
    });
    equipos_clasificados.push(footballLeague.summaries[2].standings[0].name);
    equipos_clasificados.push(footballLeague.summaries[2].standings[1].name);
}

texto_eliminatorias(equipos_clasificados)

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

texto_tercer_cuarto()
tercer_cuarto = semis.filter( item => !final.includes(item))
partido_eliminacion(tercer_cuarto, tercer)

// FINAL

texto_final()
partido_eliminacion(final, campeon)
ganador(campeon[0])
