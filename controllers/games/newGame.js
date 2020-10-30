const Joi = require('@hapi/joi')
const gamesModel = require('../../models/games')

module.exports = (request, response) => {

    const schema = Joi.object({
        idRival: Joi.string()
        .required(),

        hostPlay: Joi.string()
        .required(),

        status: Joi.string()
        .required(),

        nameRival: Joi.string()
        .required(),
        
        nameHost: Joi.string()
        .required(),

    })
    const validationResult = schema.validate(request.body);

    if (!validationResult.error) {

        gamesModel.create({
            idHost: request.user.id,
            idRival: request.body.idRival,
            hostPlay: request.body.hostPlay,
            status: request.body.status,
            nameRival: request.body.nameRival,
            nameHost: request.body.nameHost
        }, (error, game) => {
            if (error) {
                response.status(500).json({
                    message: 'No se pudo crear game',
                    error: error
                })
            } else {
                response.json({
                   gameId: game.id
                })
            }
        })
    } else {
        response.status(400).json({
            message: validationResult.error
        })
    }
}
