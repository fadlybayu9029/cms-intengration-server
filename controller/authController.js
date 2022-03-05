const { Author } = require("../models")
const { comparePassword } = require("../helper/bcrypt")
const { createToken } = require("../helper/jwt")
const { OAuth2Client } = require('google-auth-library')

class AuthController {

    static async registerAdmin(req, res, next){
       try {
           const newAuthor = await Author.create({
            email: req.body.email,
            password: req.body.password,
            role: "Admin",
            phoneNumber: req.body.phoneNumber,
            address: req.body.address
           });
           res.status(201).json({
               msg: `Register Compleate`,
               identity: newAuthor
           })
       } 
       catch (err){
        next(err)  
       }
    }

    static async home(req, res){
        res.status(200).json({msg:'this is home'})
    }

    static async login(req, res, next){
        
      try {
        const { email, password } = req.body
        const foundEmail = await Author.findOne({
            where: {
                email: email
            }
        });
        if(!foundEmail) throw{name: 'invalid email/password'}

        const validatingPassword = comparePassword(password, foundEmail.password)

        if(!validatingPassword) throw{name: 'invalid email/password'}

        const payload = {
            id: foundEmail.id,
            email: foundEmail.email,
            role: foundEmail.role
        }

        const accessToken = createToken(payload)
        res.status(200).json({
            msg: 'success log in',
            token: accessToken,
            id: foundEmail.id,
            email: foundEmail.email
        })
      }  
      catch(err){
        next(err)
      }
    }

    static async authGoogle(req, res, next){
        try{
            const { idToken } = req.body
            const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
            const ticket = await client.verifyIdToken({
                idToken,
                audience: process.env.GOOGLE_CLIENT_ID
            })
            const payload = ticket.getPayload()
            const foundEmail = await Author.findOne({
                where: {
                    email: payload.email
                } 
            })
    
            if (foundEmail) {
                const payload2 = {
                    id: foundEmail.id,
                    email: foundEmail.email,
                    role: foundEmail.role
                }
                const accessToken = createToken(payload2)
    
                res.status(200).json({
                    msg: 'success log in with google',
                    token: accessToken,
                    id: foundEmail.id,
                    email: foundEmail.email
                })

            } else {
                const newAccount = await Author.create({
                    email: payload.email,
                    password: (Math.floor(Math.random() * 999999) + Math.floor(Math.random() * 999999)).toString(),
                    role: 'Staff',
                    phoneNumber: Math.floor(Math.random() * 999999),
                    address: (Math.random() + 1).toString(36).substring(7)
                })
                const payload3 = {
                    id: newAccount.id,
                    email: newAccount.email,
                    role: newAccount.role
                }
                const accessToken = createToken(payload3)
    
                res.status(200).json({
                    msg: 'success log in with google',
                    token: accessToken,
                    id: newAccount.id,
                    email: newAccount.email
                })
            }
            res.json({ idToken })
        }
        catch(err){
            next(err)
        }
    }

}

module.exports = AuthController