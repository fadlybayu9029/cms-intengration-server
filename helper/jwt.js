const jwt = require('jsonwebtoken')

const createToken = function(payload){
    return jwt.sign(payload, process.env.secretToken)
};

const readToken = function(token){
    return jwt.verify(token, process.env.secretToken)
};

module.exports = {
    createToken,
    readToken
};