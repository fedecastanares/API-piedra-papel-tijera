const jwt = require('jsonwebtoken')

module.exports = (request, response, next) => {
    const token = request.headers.authorization.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY)
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
