///////////////////////////////////////////////
// Middleware d'authentification: /////////////
///////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////
// Importe dotEnv :
//const dotEnv = require("dotenv").config();

// Importe le package qui créer et vérifie les tokens d'authentification:
//const jwt = require('jsonwebtoken');
// Model:
const User = require('../models/user');

module.exports = (req, res, next) => {

  console.log('NFO REQ.BODY.ADMIN DU AUTHADMIN')
  console.log(req.body.admin)

  if (req.body.admin !== 'false') {

    console.log('NFO REQ.BODY.ADMIN DU AUTHADMIN du if')
    console.log(req.body.admin)

    res.status(500)
    return res.send('non autorisé tu ne passera pas !')
  }
  next()
}
