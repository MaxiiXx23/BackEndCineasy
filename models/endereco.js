const db = require('./conexao')
const ModelUser = require('./User')
referencia = db.sequelize
const Endereco = db.sequelize.define('Endereco',{
    id:{
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull: false
    },
    uf:{
        allowNull: false,
        type:db.Sequelize.CHAR(2),

    },
    cidade:{
        allowNull: false,
        type:db.Sequelize.STRING
    },
    bairro:{
        allowNull: false,
        type:db.Sequelize.STRING
    },
    rua:{
        allowNull: false,
        type:db.Sequelize.STRING
    },
    numero:{
        allowNull: false,
        type:db.Sequelize.INTEGER
    },
    cep:{
        allowNull: false,
        type:db.Sequelize.CHAR(9)
    },
    complemto:{
        allowNull: false,
        type:db.Sequelize.STRING(3)
    },

},{
    referencia,
    modelName :'User'
})
//relacionamento (associação entre as tabelas User e endereco)
ModelUser.hasMany(Endereco)
module.exports = Endereco
//Endereco.sync({ force: true })