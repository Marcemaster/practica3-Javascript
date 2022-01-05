import { teams } from "./teams.js";
import { setupArrays } from "./utils/shuffle.js";

// Mezclar equipos

setupArrays();
teams.shuffle();

const groups = ["A", "B", "C", "D", "E", "F", "G", "H"];

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

let grupos = dividir(teams, 4);
// console.log(grupos)

for (let i = 0; i < groups.length; i++) {
    groups[i]=grupos[i]
    console.log(groups[i])
}