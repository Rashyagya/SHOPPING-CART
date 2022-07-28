const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')
const Validator = require("../validation/validation");

//---------------------------------------Authentication------------------------------------------------//

const authentication = async function (req, res, next) {
  try {
    let token = req.header("Authorization")
    if(!token) return res.status(400).send({status:false,message:"Token is required"})
    
    token = token.replace("Bearer ","")
    jwt.verify(token,"group-22-productManangement",function(err,decodedToken){
      if(err) return res.status(401).send({ status: false, message: "invalid Token" });
      req.idDecoded = decodedToken.userId
      next()
    })
  }
  catch (err) {
    return res.status(500).send({ err: err.message })
  }
}

//--------------------------------------------Authorization--------------------------------------//

// const authorization = async function (req , res , next){
//   try{
//     let userId = req.params.userId
//     if(Validator.isValidObjectId) return return res.status(401).send({ status: false, msg: "enter valid UserId" });

    
//   }
//   catch(err){
//     return res.status(500).send({ err: err.message })
//   }
//   }

module.exports = {authentication}