import { FootballLeague } from "../classes/FootballLeague.js";

export function texto_inicio() {
    console.log("\n¡Comienza el mundial de Quatar 2022!\n");
}
export function texto_equipos_clasificados() {
    console.log("\nLos 16 equipos clasificados son los siguientes: \n");
}
export function texto_octavos() {
    console.log("\n¡Comienzan los octavos de final!\n");
}
export function texto_cuartos() {
    console.log("\n¡Comienzan los cuartos de final!\n");
}
export function texto_semis() {
    console.log("\n¡Comienzan las semifinales!\n");
}
export function texto_final() {
    console.log("\n¡Comienza la gran final!\n");
}
export function ganador(winner) {
    console.log(
        "\x1b[33m%s\x1b[0m",
        `¡${winner} es campeona de la copa mundial de Qatar 2022!`
    );
}

export function partido_eliminacion(grupo, ronda) {
    let footballLeague = new FootballLeague("Mundial de Futbol", grupo, {
        rounds: 1,
    });
    footballLeague.scheduleMatchDays();
    footballLeague.start();
    // Una vez terminada cada jornada, se deberá mostrar cómo queda la clasificación de la misma.
    footballLeague.summaries.forEach((summary) => {
        summary.results.forEach((result) => {
            let winner = summary.standings[0].name;
            if (result.homeGoals - result.awayGoals === 0) {
                console.log(
                    `${result.homeTeamName} ${result.homeGoals + 1} - ${
                        result.awayGoals
                    } ${result.awayTeamName} => ${result.homeTeamName}`
                );
                ronda.push(result.homeTeamName);
            } else {
                console.log(
                    `${result.homeTeamName} ${result.homeGoals} - ${result.awayGoals} ${result.awayTeamName} => ${winner} `
                );
                ronda.push(winner);
            }
        });
    });
}
