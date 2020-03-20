const db = require('./conexao')
referencia = db.sequelize
const User = db.sequelize.define('Usuarios',{
    idUser:{
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull: false
    },
    email:{
        type:db.Sequelize.STRING,
        allowNull: false
    },
    senha:{
        type:db.Sequelize.STRING(16),
        allowNull: false 
    },
    nome:{
        type: db.Sequelize.STRING
    },
    razaoSocial:{
        type:db.Sequelize.STRING
    },
    nomeFantasia:{
        type:db.Sequelize.STRING
    },
    cnpj:{
        type:db.Sequelize.STRING
    },
    fotoUser:{
        type:db.Sequelize.STRING
    },
    capaUser:{
        type:db.Sequelize.STRING
    },
    
},{
    referencia,
    modelName :'User'
})
module.exports = User
User.sync({ force: true }) //força a criação da table