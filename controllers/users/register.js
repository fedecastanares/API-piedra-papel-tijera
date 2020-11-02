const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Joi = require('@hapi/joi')
const userModel = require('../../models/user')

module.exports = (request, response) => {
    const schema = Joi.object({
        name: Joi.string()
            .required(),

        password: Joi.string()
            .min(7)
            .max(50)
            .required(),

        email: Joi.string()
            .email()
            .required()
    })
    const validationResult = schema.validate(request.body);

    if (!validationResult.error) {
        const passwordHash = bcrypt.hashSync(request.body.password, 2)

        userModel.create({
            password: passwordHash,
            email: request.body.email,
            name: request.body.name,
            role: 'STANDARD',
        }, (error, user) => {
            if (error) {
                response.status(500).json({
                    message: 'No se pudo registrar el usuario',
                    error: error
                })
            } else {
                const userWithoutPassword = user.toObject()

                delete userWithoutPassword.password
                delete userWithoutPassword.email
                delete userWithoutPassword.role
                delete userWithoutPassword._id
                delete userWithoutPassword.__v

                userWithoutPassword.token = jwt.sign({
                    id: user._id,
                    role: user.role
                    }, process.env.JWT_KEY, { expiresIn: '2h' })
                
                response.json({
                    user: userWithoutPassword
                 })    
            }
        })
    } else {
        response.status(400).json({
            message: validationResult.error,
            body: request.body
        })
    }
}
