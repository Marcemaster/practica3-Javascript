import { teams, group_names } from "./teams.js";
import { setupArrays } from "./utils/shuffle.js";
import { FootballLeague } from "./classes/FootballLeague.js";

// Mezclar equipos

setupArrays();
teams.shuffle();

// Dividir equipos en 8 grupos

function dividir(arr, len) {
    var chunks = [],
        i = 0,
        n = arr.length;
    while (i < n) {
        chunks.push(arr.slice(i, (i += len)));
    }
    return chunks;
}

export let grupos = dividir(teams, 4);

export let equipos_clasificados = [];

for (let i = 0; i < grupos.length; i++) {
    let footballLeague = new FootballLeague("Foot", grupos[i], { rounds: 1 });

    footballLeague.scheduleMatchDays();
    // DONE: Mostrar los equipos inscritos por pantalla.
    const teamNames = footballLeague.getTeamNames();
    console.log("\n");
    console.log("-----------------------");
    console.log(`GRUPO ${group_names[i]}`);
    teamNames.forEach(function (team) {
        console.log(team);
    });
    console.log("-----------------------");
    console.log("\n");
    // DONE: Mostrar la planificación por pantalla.
    footballLeague.matchDaySchedule.forEach((matchDay, matchDayIndex) => {
        console.log(`Jorndada ${matchDayIndex + 1}`);
        matchDay.forEach((match) => {
            if (match.home === null || match.away === null) {
                const teamName = match.home || match.away;
                console.log(`${teamName} DESCANSA`);
            } else {
                console.log(`${match.home} vs ${match.away}`);
            }
        });
        console.log("=======================");
    });
    // DONE: Jugar los partidos de todas las jornadas.
    footballLeague.start();
    // Una vez terminada cada jornada, se deberá mostrar cómo queda la clasificación de la misma.
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
