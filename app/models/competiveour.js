const TEAM_COMPETITIVE_MASTERS = 'Competitive Masters';

function getGrudger() {
    var gtactor = {
        id: 0,
        name: 'Grudger',
        team: TEAM_COMPETITIVE_MASTERS,
        authors: 'me',
        mode: FIGHTER_MODE.cooperate,
        betrayed: false,

        move: function (round) {
            return this.betrayed ? FIGHTER_MODE.compete : FIGHTER_MODE.cooperate;
        },

        moveResult: function (roundResult) {
            if (roundResult.opponentMove === FIGHTER_MODE.compete) {
                this.betrayed = true;
            }
        },

        init: function () {
            this.mode = FIGHTER_MODE.cooperate;
            this.betrayed = false;
        }
    }

    return gtactor;
}

function getTitForTat() {
    var gtactor = {
        id: 1,
        name: 'TitForTat',
        team: TEAM_COMPETITIVE_MASTERS,
        authors: 'me',
        lastMove: FIGHTER_MODE.cooperate,

        move: function (round) {
            return this.lastMove;
        },

        moveResult: function (roundResult) {
            this.lastMove = roundResult.opponentMove;
        },

        init: function () {
            this.lastMove = FIGHTER_MODE.cooperate;
        }
    }

    return gtactor;
}

function getSneakyFinisher() {
    var gtactor = {
        id: 2,
        name: 'SneakyFinisher',
        team: TEAM_COMPETITIVE_MASTERS,
        authors: 'me',
        mode: FIGHTER_MODE.cooperate,

        move: function (round) {
            if (round.roundNum === round.maxRounds) {
                return FIGHTER_MODE.compete; // Удар в спину в конце
            }
            return this.mode;
        },

        moveResult: function (roundResult) {
            if (roundResult.opponentMove === FIGHTER_MODE.compete) {
                this.mode = FIGHTER_MODE.compete;
            }
        },

        init: function () {
            this.mode = FIGHTER_MODE.cooperate;
        }
    }

    return gtactor;
}


function getMyTeamCompetitive() {
    return {
        name: TEAM_COMPETITIVE_MASTERS,
        players: [getGrudger(), getTitForTat(), getSneakyFinisher()]
    }
}

module.exports = getMyTeamCompetitive();