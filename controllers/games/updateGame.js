const Joi = require('@hapi/joi')
const gamesModel = require('../../models/games')
const whoWin = require('./whoWin')

module.exports = async(request, response) => {

    const schema = Joi.object({

        status: Joi.string()
        .required(),

        rivalPlay:Joi.string()
        .required(),


    })
    const validationResult = schema.validate(request.body);

    const gameCheck = await gamesModel.findById(request.params.id)
    

    if (!validationResult.error && gameCheck) {

        const idWin = whoWin(gameCheck.hostPlay, request.body.rivalPlay, gameCheck.idHost, gameCheck.idRival);

        gamesModel.findOneAndUpdate({_id : request.params.id},{
            status: request.body.status,
            rivalPlay: request.body.rivalPlay,
            idWin: idWin
        }, 
        { new: true }, 
        (error, game) => {
            if (error) {
                response.status(500).json({
                    message: 'No se pudo crear game',
                    error: error
                })
            } else {
                response.json({
                   game
                })
            }
        })
    } else {
        response.status(400).json({
            message: validationResult.error
        })
    }
}
