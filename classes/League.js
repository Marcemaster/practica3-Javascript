export default class League {
    constructor(name, teams, config = {}) {
        this.name = name;
        this.setupTeams(teams);
        this.setup(config);
        this.matchDaySchedule = [];
        this.summaries = [];
    }

    setup(config = {}) {
        const defaultConfig = { rounds: 1 };
        this.config = Object.assign(defaultConfig, config);
    }

    setupTeams(teams) {
        this.teams = [];
        for (let teamName of teams) {
            let teamObj = this.customizeTeam(teamName);
            this.teams.push(teamObj);
        }
    }

    customizeTeam(teamName) {
        return {
            name: teamName,
            matchesWon: 0,
            matchesDraw: 0,
            matchesLost: 0,
        };
    }

    start() {
        for (const matchDay of this.matchDaySchedule) {
            const matchDaySummary = {
                results: [],
                standings: undefined,
            };
            for (const match of matchDay) {
                const result = this.play(match);
                this.updateTeams(result);

                matchDaySummary.results.push(result);
            }

            matchDaySummary.standings = this.getStandings().map((team) =>
                Object.assign({}, team)
            );

            this.summaries.push(matchDaySummary);
        }
    }

    createRound() {
        const round = [];
        this.initSchedule(round);
        this.setLocalTeams(round);
        this.setAwayTeams(round);
        return round;
    }

    scheduleMatchDays() {
        for (let i = 0; i < this.config.rounds; i++) {
            const round = this.createRound();
            if (i % 2 === 1) {
                this.swapTeamsWithinMatches(round);
            }
            this.matchDaySchedule = this.matchDaySchedule.concat(round);
        }
    }

    swapTeamsWithinMatches(round) {
        for (const matchDay of round) {
            for (const match of matchDay) {
                const localTeam = match.home;
                match.home = match.away;
                match.away = localTeam;
            }
        }
    }

    getTeamNames() {
        return this.teams.map((team) => team.name);
    }

    getTeamNamesForSchedule() {
        const teamNames = this.getTeamNames();
        return teamNames;
    }

    initSchedule(round) {
        const numberOfMatchDays = this.getTeamNamesForSchedule().length - 1;
        const numberOfMatchesPerMatchDay =
            this.getTeamNamesForSchedule().length / 2;

        for (let i = 0; i < numberOfMatchDays; i++) {
            const matchDay = [];

            for (let j = 0; j < numberOfMatchesPerMatchDay; j++) {
                let match = { home: "home", away: "away" };
                matchDay.push(match);
            }
            round.push(matchDay);
        }
    }

    setLocalTeams(round) {
        const teamNames = this.getTeamNamesForSchedule();
        let teamIndex = 0;
        const teamIndexMaxValue = teamNames.length - 1 - 1;
        round.forEach((matchDay) => {
            matchDay.forEach((match) => {
                match.home = teamNames[teamIndex];
                teamIndex++;
                if (teamIndex > teamIndexMaxValue) {
                    teamIndex = 0;
                }
            });
        });
    }

    setAwayTeams(round) {
        const teamNames = this.getTeamNamesForSchedule();
        const maxAwayTeams = teamNames.length - 1;
        let teamIndex = maxAwayTeams - 1;
        round.forEach((matchDay) => {
            matchDay.forEach(function (match, matchIndex) {
                // los arrays empiezan las posiciones en 0
                if (matchIndex === 0) {
                    match.away = teamNames[maxAwayTeams];
                } else {
                    // para el resto de partidos que no son el primero
                    match.away = teamNames[teamIndex];
                    teamIndex--;
                    if (teamIndex < 0) {
                        teamIndex = maxAwayTeams - 1;
                    }
                }
            });
        });
    }
}
