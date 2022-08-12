///////////////////////////////////////////////
// Logique de routing auth: ///////////////////
///////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////
// Importation :

// Framework Express:
const express = require('express')

// Création de gestionnaires de route modulaires:
const router = express.Router()

// AuthAdmin:
const authAdmin = require('../middleware/authAdmin')

// auth.js:
const auth = require('../middleware/auth')

// User Controller:
const userCtrl = require('../controllers/userCtrl')

//////////////////////////////////////////////////////////////////////////////////////////////
// Routes:

// *****************************************************************************************
// Authentification:

// Signup:
router.post('/signup', userCtrl.signup)

// Login:
router.post('/login', userCtrl.login)

// *****************************************************************************************
// Crud User:

// Récupére via l'id:
router.get('/:id', userCtrl.getOneUser)

// Récupére tout:
router.get('/', userCtrl.getAllUsers)

// Modifie le user via l'admin:
router.put('/:id', auth, userCtrl.modifyUser);

// Modifie du user via l'user:
router.put('/user/:id', auth, userCtrl.modifyOfUserByUser);

// Supprime le user:
router.delete('/:id', auth, userCtrl.deleteUser);

//////////////////////////////////////////////////////////////////////////////////////////////
// Exportation:
module.exports = router
