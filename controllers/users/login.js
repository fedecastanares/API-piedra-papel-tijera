const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require('../../models/user')

module.exports = async (request, response) => {

    const { email, password } = request.body;

     try {
         let user = await userModel.findOne({ email });
         if(!user) {
             return response.status(400).json({msg: 'El usuario no existe'});
         }
 
         const passOk = bcrypt.compareSync(password, user.password)
         if(!passOk) {
             return response.status(400).json({msg: 'Password Incorrecto' })
         }
 
         const userWithoutPassword = user.toObject()
         delete userWithoutPassword.password
         userWithoutPassword.token = jwt.sign({
            id: user._id,
            role: user.role
            }, process.env.JWT_KEY, { expiresIn: '2h' })
        
         response.json({
            user: userWithoutPassword
         })
         }
        catch (error) {
            response.json({
                messange: "El usuario no existe"
             })
        }
 }