///////////////////////////////////////////////
// post.js ////////////////////////////////////
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


const post = db.define('Post', {
  // Model attributes are defined here
  userId: DataTypes.INTEGER,
  content: DataTypes.STRING,
  attachment: DataTypes.STRING,
  likes: DataTypes.INTEGER,
}, {
  classMethods: {
    associate: function (models) {
      // Plusieurs posts appartient a un user:
      models.POST.belongsTo(models.User, {
        onDelete: 'cascade',
        foreignKey: {
          allowNull: false
        }
      })
      // Un post peut avoir plusieurs comments:
      models.Post.hasMany(models.Comment, {
        onDelete: 'cascade'
      })
    }
  }
})

module.exports = post
