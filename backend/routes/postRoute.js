///////////////////////////////////////////////
// Logique de routing post: ///////////////////
///////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////
// Importation :

// Framework Express:
const express = require('express')

// Création de gestionnaires de route modulaires:
const router = express.Router()

// PostController:
const postCtrl = require('../controllers/postCtrl')

// auth.js:
const auth = require('../middleware/auth')

//////////////////////////////////////////////////////////////////////////////////////////////
// Routes:

// Créer un post:
router.post('/', postCtrl.createPost)

// Modifie le post:
router.put('/:id', auth, postCtrl.modifyPost)

// Supprime le post:
router.delete('/:id', auth, postCtrl.deletePost)

// Récupére via l'id:
router.get('/:id', postCtrl.getOnePost)

// Récupére tout:
router.get('/', postCtrl.getAllPosts)

//////////////////////////////////////////////////////////////////////////////////////////////
// Exportation:
module.exports = router
