///////////////////////////////////////////////
// connexion.js ///////////////////////////////
///////////////////////////////////////////////

// Contient la connexion à la bdd *************

//////////////////////////////////////////////////////////////////////////////////////////////
// Importation :

// dotEnv :
const dotEnv = require('dotenv').config()

//////////////////////////////////////////////////////////////////////////////////////////////
// Connexion de sequelize à mysql:
const {
  Sequelize
} = require('sequelize')

const db = new Sequelize(
  process.env.NAMEDB,
  process.env.USERDB,
  process.env.PASSWORDDB, {
    host: process.env.HOSTDB,
    dialect: process.env.DIALECTDB,
    pool: {
      min: 0, //  nombre minimum de connexion dans le pool
      max: 5, //  nombre maximum de connexion dans le pool
      acquire: 30000, //  durée maximale, en millisecondes, pendant laquelle ce pool essaiera d'obtenir la connexion avant de lancer une erreur
      idle: 10000, //  temps maximum, en millisecondes, pendant lequel une connexion peut être inactive avant d'être libérée
    },
  }
)

//////////////////////////////////////////////////////////////////////////////////////////////
// Etablit la connexion à mysql:
const dbConnect = async (db) => {
  await db
    .authenticate()
    .then(() => {
      db.sync()
      console.log('Connecté à la base de données MySQL!')
    })
    .catch((err) => {
      console.error('error: ' + err.message)
      setTimeout(() => {
        dbConnection(db)
      }, 5000)
    })
}

//////////////////////////////////////////////////////////////////////////////////////////////
// Exportation:
module.exports = {
  db,
  dbConnect,
}
