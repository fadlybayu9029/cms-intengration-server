const bcrypt = require('bcrypt')

//make password salt
const hashPassword = function(password){
    return bcrypt.hashSync(password, 10)
}

//compare password
const comparePassword = function(password, hash){
    return bcrypt.compareSync(password, hash)
}

module.exports = {
    hashPassword,
    comparePassword
}
