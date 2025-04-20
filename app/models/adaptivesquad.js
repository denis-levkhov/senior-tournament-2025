const TEAM_NAME = 'Adaptive Squad';

function getMemoryBot() {
    let history = [];

    return {
        id: 0,
        name: 'MemoryBot',
        team: TEAM_NAME,
        authors: 'me',

        move: function () {
            const betrayals = history.filter(m => m === FIGHTER_MODE.compete).length;
            return betrayals > 2 ? FIGHTER_MODE.compete : FIGHTER_MODE.cooperate;
        },

        moveResult: function (roundResult) {
            history.push(roundResult.opponentMove);
        },

        init: function () {
            history = [];
        }
    };
}

function getRatioAnalyzer() {
    let competeCount = 0;
    let total = 0;

    return {
        id: 1,
        name: 'RatioAnalyzer',
        team: TEAM_NAME,
        authors: 'me',

        move: function () {
            if (total === 0) return FIGHTER_MODE.cooperate;
            const ratio = competeCount / total;
            return ratio > 0.3 ? FIGHTER_MODE.compete : FIGHTER_MODE.cooperate;
        },

        moveResult: function (roundResult) {
            if (roundResult.opponentMove === FIGHTER_MODE.compete) competeCount++;
            total++;
        },

        init: function () {
            competeCount = 0;
            total = 0;
        }
    };
}

function getStreakWatcher() {
    let streak = 0;

    return {
        id: 2,
        name: 'StreakWatcher',
        team: TEAM_NAME,
        authors: 'me',

        move: function () {
            return streak >= 2 ? FIGHTER_MODE.compete : FIGHTER_MODE.cooperate;
        },

        moveResult: function (roundResult) {
            if (roundResult.opponentMove === FIGHTER_MODE.compete) {
                streak++;
            } else {
                streak = 0;
            }
        },

        init: function () {
            streak = 0;
        }
    };
}

function getMyTeamAdap() {
    return {
        name: TEAM_NAME,
        players: [getMemoryBot(), getRatioAnalyzer(), getStreakWatcher()]
    };
}

module.exports = getMyTeamAdap();