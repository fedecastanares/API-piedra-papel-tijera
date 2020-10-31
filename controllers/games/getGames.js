const gamesModel = require('../../models/games')

module.exports = async (request, response) => {
    try {
        const gamesHost = await gamesModel.find({"idHost": request.user.id});
        const pendingGames = await gamesModel.find({"idRival": request.user.id, status: { $eq : "pending"}}, "-hostPlay");
        const CompletedGames = await gamesModel.find({"idRival": request.user.id, status: { $eq : "completed"}});
        response.json({
            mygames: gamesHost, 
            pendingGames: pendingGames.concat(CompletedGames), 
            playerId: request.user.id});
    } catch (error) {
        console.log(error);
    }
}