///////////////////////////////////////////////
// user.js ////////////////////////////////////
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


const user = db.define('User', {
  // Model attributes are defined here
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bio: DataTypes.TEXT,
  admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  }
}, {
  classMethods: {
    associate: function (models) {
      // Un user peut avoir plusieurs posts:
      models.User.hasMany(models.Post, {
        onDelete: 'cascade'
      })
      // Un user peut avoir plusieurs comments:
      models.User.hasMany(models.Comment, {
        onDelete: 'cascade'
      })
    }
  }
})

module.exports = user
