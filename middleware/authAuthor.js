const { Author, News } = require("../models");
const { readToken } = require("../helper/jwt");
const { user } = require("pg/lib/defaults");

let authenticate = async function (req, res, next) {
  try {
    if(!req.headers.access_token) throw{name: 'jwt must be provided'}
    const token = readToken(req.headers.access_token);
    const user = await Author.findOne({ where: { email: token.email } });
    if (!user) throw{name: "Unauthorized"}
    req.user = user;
    return next();
  } catch (err) {
    next(err)
  }
};

let authorize = async function(req, res, next){
  try {
    const { role, id } = req.user
    if(role === 'Staff'){
      const news = await News.findOne({where: {id: +req.params.id}})
      if(!news) throw{name: 'News Id not found'}

      if(news.userId !== id) throw{name: "Forbidden"}

    }
    
    return next()
  }
  catch(err){
    next(err)
  }
}

module.exports = {
  authenticate,
  authorize
}
