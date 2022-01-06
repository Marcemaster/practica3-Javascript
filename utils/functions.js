import { FootballLeague } from "../classes/FootballLeague.js";

export function texto_inicio() {
    console.log("\n=============================================")
    console.log("====  COMIENZA EL MUNDIAL DE QATAR 2022  ====");
    console.log("=============================================\n")
}
export function texto_eliminatorias(equipos) {
    console.log("\n==============================================")
    console.log("==== COMIENZO DE LA FASE DE ELIMINATORIAS ====");
    console.log("==============================================")
    console.log(`\nLos 16 equipos clasificados para octavos de final son los siguientes: \n\n${equipos.slice(0,8)},\n${equipos.slice(8,15)} y ${equipos.slice(-1)} `);
}

export function texto_octavos() {
    console.log("\n==== OCTAVOS DE FINAL ====\n");
}
export function texto_cuartos() {
    console.log("\n==== CUARTOS DE FINAL ====\n");
}
export function texto_semis() {
    console.log("\n==== SEMIFINALES ====!\n");
}
export function texto_tercer_cuarto() {
    console.log("\n==== TERCER Y CUARTO PUESTO ====\n");
}
export function texto_final() {
    console.log("\n==== FINAL ====\n");
}

export function ganador(winner) {
    console.log("\n========================================================")
    console.log(
        "\x1b[33m%s\x1b[0m",
        `¡${winner} es campeona de la copa mundial de Qatar 2022!`
        );
    console.log("========================================================")
}

export function dividir(arr, len) {
    var chunks = [],
        i = 0,
        n = arr.length;
    while (i < n) {
        chunks.push(arr.slice(i, (i += len)));
    }
    return chunks;
}

export function partido_eliminacion(grupo, ronda) {
    let footballLeague = new FootballLeague("Mundial de Futbol", grupo, {
        rounds: 1,
    });
    footballLeague.scheduleMatchDays();
    footballLeague.start();
    footballLeague.summaries.forEach((summary) => {
        summary.results.forEach((result) => {
            let winner = summary.standings[0].name;
            if (result.homeGoals - result.awayGoals === 0) {
                console.log(
                    // ESTO HAY QUE CAMBIARLO, RESULTADO CUANDO EMPATAN EN LA RONDA DE ELIMINACIÓN.
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

