import League from "./League.js";

export class FootballLeague extends League {
    constructor(teams, config = {}) {
        super(teams, config);
    }

    setup(config = {}) {
        const defaultConfig = {
            rounds: 1,
            pointsPerWin: 3,
            pointsPerDraw: 1,
        };
        this.config = Object.assign(defaultConfig, config);
    }

    customizeTeam(teamName) {
        const customizedTeam = super.customizeTeam(teamName);
        return {
            ...customizedTeam,
            Puntos: 0,
            GolesMarcados: 0,
            GolesEncajados: 0,
            DiferenciaGoles: 0,
        };
    }

    play(match) {
        const homeGoals = this.generateGoals();
        const awayGoals = this.generateGoals();

        return {
            homeTeamName: match.home,
            homeGoals,
            awayTeamName: match.away,
            awayGoals,
        };
    }

    generateGoals() {
        return Math.floor(Math.random() * 6);
    }

    updateTeams(result) {
        const homeTeam = this.teams.find(
            (team) => team.Equipo === result.homeTeamName
        );
        const awayTeam = this.teams.find(
            (team) => team.Equipo === result.awayTeamName
        );
        homeTeam.GolesMarcados += result.homeGoals;
        homeTeam.GolesEncajados += result.awayGoals;
        awayTeam.GolesMarcados += result.awayGoals;
        awayTeam.GolesEncajados += result.homeGoals;
        homeTeam.DiferenciaGoles += result.homeGoals - result.awayGoals
        awayTeam.DiferenciaGoles += result.awayGoals - result.homeGoals

        if (result.homeGoals > result.awayGoals) {
            homeTeam.Puntos += this.config.pointsPerWin;
        } else if (result.homeGoals < result.awayGoals) {
            awayTeam.Puntos += this.config.pointsPerWin;
        } else {
            awayTeam.Puntos++;
            homeTeam.Puntos++;
        }
    }

    getStandings() {
        const teams = [...this.teams];
        return teams.sort(function (teamA, teamB) {
            if (teamA.Puntos > teamB.Puntos) {
                return -1;
            } else if (teamA.Puntos < teamB.Puntos) {
                return 1;
            } else {
                if (teamA.DiferenciaGoles > teamB.DiferenciaGoles) {
                    return -1;
                } else if (teamA.DiferenciaGoles < teamB.DiferenciaGoles) {
                    return 1;
                } else if (teamA.GolesMarcados < teamB.GolesMarcados) {
                    return 1;
                } else {
                    return 0;
                }
            }
        });
    }
}
