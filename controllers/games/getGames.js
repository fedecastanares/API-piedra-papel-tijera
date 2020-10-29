const gamesModel = require('../../models/games')

module.exports = async (request, response) => {
    try {
        const games = await gamesModel.find({"idHost": request.user.id});
        const pendingGames = await gamesModel.find({"idRival": request.user.id}, "-hostPlay");
        response.json({mygames: games, pendingGames: pendingGames, playerId: request.user.id});
    } catch (error) {
        console.log(error);
    }
}