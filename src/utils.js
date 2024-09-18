import { fileURLToPath } from "url"
import { dirname } from "path"
import bcrypt from "bcryptjs"
import passport from "passport"
import { error } from "console"

const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

export const createHash = password => bcrypt.hashSync(password,bcrypt.genSaltSync(10))
export const isValidPassword = (user, password) => bcrypt.compareSync(password,user.password)

export const passportCall = (strategy) => {
  return async (req,res,next)=>{
    passport.authenticate(strategy, function(err, user, info){
      if(err){
        return next(err)
      }
      if(!user){
        return res.status(401).send({ error: info.messages ? info.messages : info.toString() })
      }
      req.user = user
      next()
    })
    (req,res,next)
  }
}

export const authorization = (role) =>{
  return async (req, res, next) =>{
    if(!req.user) return res.status(401).send({error: "User unauthorized"})
    if(req.user.role!==role)  return res.status(403).send({error: "No permission for type of user"})
    next()  
  }
}