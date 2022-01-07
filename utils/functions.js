import { FootballLeague } from "../classes/FootballLeague.js";


export const setupArrays = () => {
    Array.prototype.shuffle = function() {
        var i = this.length, j, temp;
        if ( i == 0 ) return this;
        while ( --i ) {
           j = Math.floor( Math.random() * ( i + 1 ) );
           temp = this[i];
           this[i] = this[j];
           this[j] = temp;
        }
        return this;
    }
}
export function texto_faseGrupos(teams, group_names, equipos_clasificados) {
    console.log("\n=============================================\n====  COMIENZA EL MUNDIAL DE QATAR 2022  ====\n=============================================\n")
    let grupos = dividir(teams, 4)
    for (let i = 0; i < grupos.length; i++) {
        let footballLeague = new FootballLeague(grupos[i]);
        footballLeague.scheduleMatchDays();
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
                console.log(`${result.homeTeamName} ${result.homeGoals} - ${result.awayGoals} ${result.awayTeamName}`);
            });
            console.table(summary.standings,["Equipo", "Puntos","GolesMarcados","GolesEncajados","DiferenciaGoles"]);
        });
        equipos_clasificados.push(footballLeague.summaries[2].standings[0].Equipo);
        equipos_clasificados.push(footballLeague.summaries[2].standings[1].Equipo);
    }
}

export function texto_eliminatorias(equipos) {
    console.log("\n==============================================")
    console.log("==== COMIENZO DE LA FASE DE ELIMINATORIAS ====");
    console.log("==============================================")
    console.log(`\nLos 16 equipos clasificados para octavos de final son los siguientes:\n\n
    ${equipos.slice(0,8)},\n
    ${equipos.slice(8,15)} y 
    ${equipos.slice(-1)}`);
}

export function texto_octavos(equipos_clasificados, cuartos) {
    console.log("\n====  OCTAVOS DE FINAL   ====\n");
    for (let i = 0; i < equipos_clasificados.length; i+=4 ) {
        let cuadro_izquierda = [equipos_clasificados[i],equipos_clasificados[i+3]]
        let cuadro_derecha = [equipos_clasificados[i+1],equipos_clasificados[i+2]]
        partido_eliminacion(cuadro_izquierda, cuartos)
        partido_eliminacion(cuadro_derecha, cuartos)
    }
}

export function texto_cuartos(cuartos, semis) {
    console.log("\n====  CUARTOS DE FINAL  ====\n");
    for (let i= 0; i <cuartos.length; i+=2) {
        partido_eliminacion(cuartos.slice(i,i+2), semis)
    }
}

export function texto_semis(semis, final) {
    console.log("\n====   SEMIFINALES   ====\n");
    for (let i= 0; i <semis.length; i+=2) {
        partido_eliminacion(semis.slice(i,i+2), final)
    }
}

export function texto_tercer_cuarto(semis,final,tercer) {
    let tercer_cuarto = semis.filter((item) => !final.includes(item));
    console.log("\n====  TERCER Y CUARTO PUESTO  ====\n");
    partido_eliminacion(tercer_cuarto, tercer)
}

export function texto_final(final, campeon) {
    console.log("\n====     FINAL     ====\n");
    partido_eliminacion(final, campeon)
    console.log("\n========================================================")
    console.log("\x1b[33m%s\x1b[0m",`¡${campeon[0]} es campeona de la copa mundial de Qatar 2022!`);
    console.log("========================================================")
}

export function dividir(teams, len) {
    setupArrays();
    teams.shuffle();
    var chunks = [], i = 0, n = teams.length;
    while (i < n) {chunks.push(teams.slice(i, (i += len)));}
    return chunks;
}

export function partido_eliminacion(grupo, ronda) {
    let footballLeague = new FootballLeague(grupo);
    footballLeague.scheduleMatchDays();
    footballLeague.start();
    footballLeague.summaries.forEach((summary) => {
        summary.results.forEach((result) => {
            let winner = summary.standings[0].Equipo;
            if (result.homeGoals - result.awayGoals === 0) {
                console.log(`${result.homeTeamName} ${result.homeGoals} - ${result.awayGoals} ${result.awayTeamName} => EMPATE`);
                partido_eliminacion(grupo,ronda)
            } else {
                console.log(`${result.homeTeamName} ${result.homeGoals} - ${result.awayGoals} ${result.awayTeamName} => ${winner} `);
                ronda.push(winner);
            }
        });
    });
}
