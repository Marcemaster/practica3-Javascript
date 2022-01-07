import {
  texto_faseGrupos,
  texto_eliminatorias,
  texto_octavos,
  texto_cuartos,
  texto_semis,
  texto_tercer_cuarto,
  texto_final,
} from "./utils/functions.js";
import { teams, group_names } from "./utils/teams.js";

let equipos_clasificados = [],
cuartos = [],
semis = [],
tercer = [],
final = [],
campeon = [];

texto_faseGrupos(teams, group_names, equipos_clasificados);
texto_eliminatorias(equipos_clasificados);
texto_octavos(equipos_clasificados, cuartos);
texto_cuartos(cuartos, semis);
texto_semis(semis, final);
texto_tercer_cuarto(semis, final, tercer);
texto_final(final, campeon);
