LADA_SPORT_TEAM = 'LADA SPORT';

function getNiva() {
    var gtactor = {
        id: 0,
        name: 'Niva LEGEND SPORT',
        team: LADA_SPORT_TEAM,
        authors: 'Levkhov, Kolevatov',
        mode: FIGHTER_MODE.cooperate,
        firstCompete: true,
        trigger: false,
        finalFraud: false,

        move: function (round) {
            if (round.opponentTeam === LADA_SPORT_TEAM) {
                return this.mode = FIGHTER_MODE.compete;
            }

            if (round.roundNum >= round.minRounds) {
                this.trigger = Math.random() < ((round.roundNum - round.minRounds) / (round.maxRound - round.minRounds) * 0.9 + 0.1);
                if (this.trigger === true) {
                    this.finalFraud = true;
                }
            }

            if (this.finalFraud === true) {
                return FIGHTER_MODE.compete;
            }

            return this.mode;
        },

        moveResult: function (roundResult) {
           this.mode = roundResult.opponentMove;
        },

        init: function (gameRules) {
            this.mode = FIGHTER_MODE.cooperate;
            this.finalFraud = false;
        }
    }

    return gtactor;
}

function getVesta() {
    var gtactor = {

        id: 1,
        name: 'Vesta NG TCR',
        team: LADA_SPORT_TEAM,
        authors: 'Levkhov, Kolevatov',

        move: function (round) {
            if (round.opponentName === "Niva LEGEND SPORT") {
                return this.mode = FIGHTER_MODE.cooperate;
            }

            if (round.opponentName === "Granta Sport Liftback") {
                return this.mode = FIGHTER_MODE.compete;
            }

            if (round.roundNum === 24) {
                return this.mode = FIGHTER_MODE.compete;
            }

            return this.mode;
        },

        moveResult: function (roundResult) {
            this.mode = roundResult.opponentMove;
        },

        init: function (gameRules) {
            this.mode = FIGHTER_MODE.cooperate;
        }
    }

    return gtactor;
}

function getGranta() {
    var gtactor = {

        id: 2,
        name: 'Granta Sport Liftback',
        team: LADA_SPORT_TEAM,
        authors: 'Levkhov, Kolevatov',
        saveValue: 0,
        trigger: false,

        move: function (round) {
            if (round.opponentName === "Niva LEGEND SPORT") {
                return this.mode = FIGHTER_MODE.cooperate;
            }

            if (round.opponentName === "Vesta NG TCR") {
                return this.mode = FIGHTER_MODE.cooperate;
            }

            if (round.roundNum === 24) {
                return this.mode = FIGHTER_MODE.compete;
            }

            if (this.trigger === true) {
                return FIGHTER_MODE.compete;
            }

            return this.mode;
        },

        moveResult: function (roundResult) {
            this.mode = roundResult.opponentMove;
            this.saveValue = roundResult.opponentScore;

            if (roundResult.opponentMove === FIGHTER_MODE.compete && roundResult.roundInfo.roundNum >= 18) {
                this.trigger = true;
            }
        },

        init: function (gameRules) {
            this.mode = FIGHTER_MODE.cooperate;
            this.trigger = false;
        }
    }

    return gtactor;
}


function getLadaSportTeam(){
    var team = {
        name: LADA_SPORT_TEAM,
        players: [getNiva(), getVesta(), getGranta()]
    }
    
    return team;
}


module.exports = getLadaSportTeam();

