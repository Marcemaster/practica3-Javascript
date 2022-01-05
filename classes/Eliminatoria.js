import {select_16, grupos} from '../grupos.js'
import {FootballLeague} from './FootballLeague.js'


let teams = select_16[0]
// Hay que encontrar una forma de generar los grupos automáticamente a partir de los 16 clasíficados (Teniendo en cuenta que no se pueden cruzar.)
let grupoA = teams.slice(0,2)
let grupoB = teams.slice(2,4)
let grupoC = teams.slice(4,6)
let grupoD = teams.slice(6,8)
let grupoE = teams.slice(8,10)
let grupoF = teams.slice(10,12)
let grupoG = teams.slice(12,14)
let grupoH = teams.slice(-2)


let select_8 = []
function partido_eliminacion(grupo, ronda) {
    let footballLeague = new FootballLeague('Mundial de Futbol', grupo, { rounds: 1 })
    footballLeague.scheduleMatchDays();
    footballLeague.start();
    // Una vez terminada cada jornada, se deberá mostrar cómo queda la clasificación de la misma.
    footballLeague.summaries.forEach((summary) => {
        summary.results.forEach((result) => {
            let winner = summary.standings[0].name
            if (result.homeGoals - result.awayGoals === 0) {
                console.log(`${result.homeTeamName} ${result.homeGoals+1} - ${result.awayGoals} ${result.awayTeamName} => ${result.homeTeamName}`)
                ronda.push(result.homeTeamName) 
            } else {
                console.log(`${result.homeTeamName} ${result.homeGoals} - ${result.awayGoals} ${result.awayTeamName} => ${winner} `)
                ronda.push(winner) 
            }
        })
    })
}


partido_eliminacion(grupoA, select_8)
partido_eliminacion(grupoB, select_8)
partido_eliminacion(grupoC, select_8)
partido_eliminacion(grupoD, select_8)
partido_eliminacion(grupoE, select_8)
partido_eliminacion(grupoF, select_8)
partido_eliminacion(grupoG, select_8)
partido_eliminacion(grupoH, select_8)
console.log(select_8)

let select_4 = []
let cuartosA = select_8.slice(0,2)
let cuartosB = select_8.slice(2,4)
let cuartosC = select_8.slice(4,6)
let cuartosD = select_8.slice(-2)
partido_eliminacion(cuartosA, select_4)
partido_eliminacion(cuartosB, select_4)
partido_eliminacion(cuartosC, select_4)
partido_eliminacion(cuartosD, select_4)
console.log(select_4)


let semis=[]
let semisA = select_4.slice(0,2)
let semisB = select_4.slice(-2)
partido_eliminacion(semisA, semis)
partido_eliminacion(semisB, semis)
console.log(semis)

let ganador = []
partido_eliminacion(semis, ganador)

console.log(`${ganador[0]} gana el mundial`)
