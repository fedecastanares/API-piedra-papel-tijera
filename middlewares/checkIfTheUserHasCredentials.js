const jwt = require('jsonwebtoken')

module.exports = (request, response, next) => {
    const token = request.headers.authorization

    try {
        // Valido que el token enviado por el usuario sea correcto
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        
        // Inyecto informacion del usuario en la request para ser usado mas adelante
        request.user = {
            id: decoded.id,
            role: decoded.role
        }

        next()
    } catch(error) {
        return response.status(401).json({
            message: 'Credenciales invalidas'
        })
    }
}
