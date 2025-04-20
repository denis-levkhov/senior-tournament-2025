function getGameRules() {
    var gameRules = {
        description: 'Classical GT Dilemma with apriori unknown number of rounds',
        game : loadGame(),
        minRounds : 16,
        maxRounds : 24
    }
    return gameRules;
}

module.exports = getGameRules();

