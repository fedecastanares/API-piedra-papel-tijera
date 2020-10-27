const userModel = require('../../models/user')

module.exports = async (request, response) => {
    try {
        const players = await userModel.find({}, '-password -email -role -__v');
        response.json({players});
    } catch (error) {
        console.log(error);
    }
}