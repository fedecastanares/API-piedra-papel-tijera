const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require('../../models/user')

module.exports = (request, response) => {
    userModel.findOne({ 'email': request.body.email }, (error, user) => {
        if (error) {
            response.status(500).json({
                message: 'Error al intentar iniciar sesion'
            })
        } else {
            if (user) {
                const match = bcrypt.compareSync(request.body.password, user.password)

                if (match) {
                    const userWithoutPassword = user.toObject()
                    delete userWithoutPassword.password
                    userWithoutPassword.token = jwt.sign({
                        id: user._id,
                        role: user.role
                    }, process.env.JWT_KEY, { expiresIn: '2h' })

                    response.json({
                        user: userWithoutPassword
                    })
                } else {
                    response.status(401).end().json({
                        message : response.status(401).end(),
                        body: request.body
                    })
                }
            } else {
                response.status(401).end().json({
                    message : response.status(401).end(),
                    body: request.body
                })
            }
        }
    })
}
