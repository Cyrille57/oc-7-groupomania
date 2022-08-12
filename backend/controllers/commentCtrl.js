///////////////////////////////////////////////
// Logique globale de l'app (comment)) ////////
///////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////
// Importation :

// Fatest-validator: (validateur de saisie)
const Validator = require("fastest-validator");

// Model:
const Comment = require('../models/comment')

// Model:
const Post = require('../models/post')

const User = require('../models/user')


//////////////////////////////////////////////////////////////////////////////////////////////
// CRUD:

// Créer un comment :
exports.createComment = (req, res) => {

  // *****************************************************************************************
  // Déclarations:
  const comment = {
    userId: req.body.userId,
    postId: req.body.postId,
    content: req.body.content,
  }

  // *****************************************************************************************
  // Vakidation des saisies utilisateur:
  const schemaValidator = {
    content: {
      type: "string",
      optional: false,
      min: 2,
      max: 250
    }
  }

  const v = new Validator();
  const validationResponse = v.validate(comment, schemaValidator)

  if (validationResponse !== true) {
    return res.status(400).json({
      message: "Validation échouée",
      errors: validationResponse
    })
  }

  // *****************************************************************************************
  // Code création:

  Comment.create(comment)
    .then((result) => {
      res.status(201).json({
        message: 'Votre commentaire a correctement été ajouter!',
        comment: result
      })
    })
    .catch((error) => {
      res.status(500).json({
        message: "Désolé, impossible d'ajouter votre commentaire !"
      })
    })

}

// Modifie le comment:
exports.modifyComment = (req, res) => {

  let commentObject = {}

  commentObject = {
    ...req.body,
  }

  // *****************************************************************************************
  // Vakidation des saisies utilisateur:
  const schemaValidator = {
    content: {
      type: "string",
      optional: false,
      min: 2,
      max: 50
    }
  }

  const v = new Validator();
  const validationResponse = v.validate(commentObject, schemaValidator)

  if (validationResponse !== true) {
    return res.status(400).json({
      message: "Validation échouée",
      errors: validationResponse
    })
  }

  // *****************************************************************************************
  // Code update:
  //if( )
  Comment.update({
      _id: req.params.id,
      ...commentObject
    }, {
      where: {
        id: req.params.id,
      },

    })
    .then(() =>
      res.status(200).json({
        message: 'Votre commentaire a correctement été modifié !',
      })
    )
    .catch((error) =>
      res.status(400).json({
        message: "Désolé, votre commentaire n'a pas pu être modifié"
      })
    )
}

// Supprime le comment:
exports.deleteComment = (req, res) => {

  Comment.findOne({
      where: {
        id: req.params.id
      },
    })
    .then((comment) => {

      Comment.destroy({
          where: {
            id: req.params.id,
          },
        })
        .then(() =>
          res.status(200).json({
            message: 'Votre commentaire a correctement été supprimé !',
          })
        )
        .catch((error) =>
          res.status(400).json({
            error,
          })
        )

    })
    .catch((error) =>
      res.status(500).json({
        message: 'Désolé, votre commentaire n\'a pas pu être supprimé !',
        error: error
      })
    )
}

// Récupére via l'id:
exports.getOneComment = (req, res) => {
  console.log(req.params)
  Comment.findOne({
      where: {
        id: req.params.id,
        postId: req.params.postId
      },
    })
    .then((comment) => {
      console.log(' 176' + req.params)

      if (comment) {
        res.status(200).json(comment)
      } else {
        res.status(404).json({
          message: 'Commentaire introuvable !',
        })
      }

    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      })
    })
}

// Récupére tout:
exports.getAllComments = (req, res) => {

  Comment.findAll({
      where: {
        postId: req.params.id
      },
      include: [{
        all: true,
        nested: true
      }],
    })
    .then((comment) => {
      res.status(200).json(comment)
    })
    .catch((error) => {
      console.log(error)
      res.status(400).json({
        message: 'Désolés, les commentaires n\'ont pas pu être chargés',
        error: error
      })
    })
}
