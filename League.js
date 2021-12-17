export default class League {
    // name
    // teams
    // rounds
    // players
    // matchDays
    // matches
    // results
    // scores
    constructor(name, teams, config = {}) {
        this.name = name;
    
        this.setupTeams(teams);
        this.setup(config);
        // planificación
        this.matchDaySchedule = [];
        this.scores = [];
        this.matches = [];
    }

    setup(config = {}) {
        const defaultConfig = {rounds: 1};
        this.config = Object.assign(defaultConfig, config);
    }

    setupTeams(teams) {
        this.teams = [];
        for(let teamName of teams) {
            let teamObj = this.customizeTeam(teamName);
            // añadimos el objeto descriptivo del equipo al array de equipos
            this.teams.push(teamObj)
        }
    }

    customizeTeam(teamName) {
        return {
            name: teamName,
            matchesWon: 0,
            matchesDraw: 0,
            matchesLost: 0
        }
    }

    // TODO: Crear la planificación de jornadas y partidos de cada jornada.
    scheduleMatchDays() {
        // genera el layout de la planificación
        this.initSchedule()
        // ponemos los equipos locales según https://es.wikipedia.org/wiki/Sistema_de_todos_contra_todos
        this.setLocalTeams();
        // setAwayTeams()
    }

    initSchedule(){
        // planificación es un conjunto de jornadas // planificacion = [j1, j2, j3, j4, ...]
        // jornada es un conjunto de partidos // jornada = [p1, p2, p3, p4, ...]
        // partido tiene local y visitante // partido = {local: 'Local', visitante: 'Visitante'}

        // inicializamos la planificación
        this.matchDaySchedule = [];
        const numberOfMatchDays = this.teams.length - 1; // numero de jornadas
        const numberOfMatchesPerMatchDay = this.teams.length / 2; // numero de partidos por jornada
        for( let i = 0; i < numberOfMatchDays; i++) {
            const matchDay = []
            for ( let j = 0; j < numberOfMatchesPerMatchDay; j++) {
                let match = {home: 'home', away: 'away'}
                matchDay.push(match);
            }
            this.matchDaySchedule.push(matchDay);
        }
    }

    setLocalTeams(){
        const teamNames = this.teams.map(team => team.name); // teamNames = ['A', 'B', 'C', 'D'] posiciones: 0,1,2,3
        let teamIndex = 0;
        const teamIndexMaxValue = teamNames.length - 1 -1;  // teamNames.length === 4
        this.matchDaySchedule.forEach(matchDay => {
            matchDay.forEach(match => {
                match.home = teamNames[teamIndex];
                teamIndex++
                if(teamIndex > teamIndexMaxValue) {
                    teamIndex = 0;
                }
            })
        })
    }
    
}