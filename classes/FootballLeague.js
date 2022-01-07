export class FootballLeague {
  constructor(teams, config = {}) {
    this.setupTeams(teams);
    this.setup(config);
    this.matchDaySchedule = [];
    this.summaries = [];
  }

  customizeTeam(teamName) {
    return {
      Equipo: teamName,
      Puntos: 0,
      GolesMarcados: 0,
      GolesEncajados: 0,
      DiferenciaGoles: 0,
    };
  }
  
  setupTeams(teams) {
    this.teams = [];
    for (let teamName of teams) {
      let teamObj = this.customizeTeam(teamName);
      this.teams.push(teamObj);
    }
  }

  setup(config = {}) {
    const defaultConfig = {
      rounds: 1,
      pointsPerWin: 3,
      pointsPerDraw: 1,
    };
    this.config = Object.assign(defaultConfig, config);
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
    homeTeam.DiferenciaGoles += result.homeGoals - result.awayGoals;
    awayTeam.DiferenciaGoles += result.awayGoals - result.homeGoals;

    if (result.homeGoals > result.awayGoals) {
      homeTeam.Puntos += this.config.pointsPerWin;
    } else if (result.homeGoals < result.awayGoals) {
      awayTeam.Puntos += this.config.pointsPerWin;
    } else {
      awayTeam.Puntos++;
      homeTeam.Puntos++;
    }
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
    return this.teams.map((team) => team.Equipo);
  }

  initSchedule(round) {
    const numberOfMatchDays = this.getTeamNames().length - 1;
    const matches = this.getTeamNames().length / 2;

    for (let i = 0; i < numberOfMatchDays; i++) {
      const matchDay = [];

      for (let j = 0; j < matches; j++) {
        let match = { home: "home", away: "away" };
        matchDay.push(match);
      }
      round.push(matchDay);
    }
  }

  setLocalTeams(round) {
    const teamNames = this.getTeamNames();
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
    const teamNames = this.getTeamNames();
    const maxAwayTeams = teamNames.length - 1;
    let teamIndex = maxAwayTeams - 1;
    round.forEach((matchDay) => {
      matchDay.forEach(function (match, matchIndex) {
        if (matchIndex === 0) {
          match.away = teamNames[maxAwayTeams];
        } else {
          match.away = teamNames[teamIndex];
          teamIndex--;
          if (teamIndex < 0) {
            teamIndex = maxAwayTeams - 1;
          }
        }
      });
    });
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
