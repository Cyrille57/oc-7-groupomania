///////////////////////////////////////////////
// comment.js /////////////////////////////////
///////////////////////////////////////////////


// Création des tables ************************

'use strict'
const {
  db
} = require('../config/connexion')

const {
  Sequelize,
  DataTypes
} = require('sequelize')

const comment = db.define('Comment', {
  // Model attributes are defined here
  userId: DataTypes.INTEGER,
  postId: DataTypes.INTEGER,
  content: DataTypes.TEXT
}, {
  classMethods: {
    associate: function (models) {
      // Plusieurs comments appartient a un user:
      models.Comment.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
      // Plusieurs comments appartient a un post:
      models.Comment.belongsTo(models.Post, {
        foreignKey: 'postId',
        as: 'post',
      });
    }
  }
})

module.exports = comment
