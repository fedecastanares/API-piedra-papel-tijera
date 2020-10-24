module.exports = (request, response, next) => {
    // Verificamos si el usuario esta inyectado en la peticion y si el rol es administrador
    if (request.user && request.user.role === 'ADMIN') {
        next()
    } else {
        return response.status(403).json({
            message: 'Acceso invalido'
        })
    }
}