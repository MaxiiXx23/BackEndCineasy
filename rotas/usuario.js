const express = require('express')
const router = express.Router();
const mysql = require('../models/conexao')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const JwtKey = 'Zapzip';
const { check, validationResult } = require('express-validator');
const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars');
const multer = require("multer")
const myValidationResult = validationResult.withDefaults({
    formatter: (error) => {
        return {
            MsgError: error.msg,
        };
    }
});
const config = {
    host: "smtp.gmail.com",
    secure: false,
    port: 587,
    auth: {
        user: "vidaboaetec@gmail.com",
        pass: "hppi7u6G"
    },
    tls: {
        rejectUnauthorized: false
    }
}
const transporter = nodemailer.createTransport(config)
transporter.use('compile', hbs({
    viewEngine: {
        extName: '.hbs',
        partialsDir: './view/',
        layoutsDir: './view/',
        defaultLayout: undefined,
    },
    viewPath: './view/'
}));

// router.get é o select, router.delete é deletar, router.post é para inserir e router.patch é para atualizar
router.put('/updatepass', (req, res) => {
    const email = req.body.email;
    const newPass = crypto.randomBytes(5).toString('hex')

    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send({ error: err })
        } else {
            bcrypt.hash(newPass, 10, (errBcrypt, hash) => {
                if (errBcrypt) {
                    return res.status(500).send({ error: errBcrypt })
                } else {
                    const query = `UPDATE usuarios SET senha=? WHERE email =?`;
                    conn.query(query, [hash, email], (eror, results) => {
                        conn.release();
                        if (eror) {
                            return res.status(500).send({ eror, mensagem: 'error' })
                        } else {
                            const mensagem = {
                                from: "vidaboaetec@gmail.com",
                                to: email,
                                subject: "Olá somos a Cineasy,solicitação de redefinição de senha do app Cineasy",
                                template: 'emailrecupera',
                                context: {
                                    Email: email,
                                    Senha: newPass
                                }
                            };
                            transporter.sendMail(mensagem, (error, info) => {
                                if (error) {
                                    res.status(400).send(
                                        error,
                                    )
                                } else {
                                    res.status(200).send({
                                        mensagem: 'Senha redefinida com sucesso'
                                    })
                                }
                            })

                        }
                    })
                }
            })
        }
    })
})
router.put('/editapass', (req, res) => {
    const email = req.body.email;
    const newPass = req.body.newsenha

    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send({ error: err })
        } else {
            bcrypt.hash(newPass, 10, (errBcrypt, hash) => {
                if (errBcrypt) {
                    return res.status(500).send({ error: errBcrypt })
                } else {
                    const query = `UPDATE usuarios SET senha=? WHERE email =?`;
                    conn.query(query, [hash, email], (eror, results) => {
                        conn.release();
                        if (eror) {
                            return res.status(500).send({ eror, mensagem: 'error' })
                        } else {
                            const mensagem = {
                                from: "vidaboaetec@gmail.com",
                                to: email,
                                subject: "Olá somos a Cineasy, você redefiniu sua senha do app Cineasy",
                                template: 'emailrecupera',
                                context: {
                                    Email: email,
                                    Senha: newPass
                                }
                            };
                            transporter.sendMail(mensagem, (error, info) => {
                                if (error) {
                                    res.status(400).send(
                                        error,
                                    )
                                } else {
                                    res.status(200).send({
                                        mensagem: 'Senha redefinida com sucesso'
                                    })
                                }
                            })

                        }
                    })
                }
            })
        }
    })
})
/*router.post('/sendpass', (req, res, next) => {
    const email = req.body.email;
    const nome = 'Max Jonatas';
    const newPass = crypto.randomBytes(5).toString('hex')
    const mensagem = {
        from: "vidaboaetec@gmail.com",
        to: email,
        subject: "Olá " + nome + ",redefinição de senha do app Cineasy",
        template: 'emailrecupera',
        context: {
            Email: email,
            Nome: nome,
            Senha: newPass
        }
    };
    transporter.sendMail(mensagem, (error, info) => {
        if (error) {
            res.status(400).send(
                error
            )
        } else {
            res.status(200).send({
                mensagem: 'Nova senha enviada com sucesso.'
            })
        }
    })
});*/

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Usando a porta Usuarios'
    })
});
// rota de cadastro
router.post('/', [
    check('email').isEmail().withMessage('Email inválido'),
    check('senha').not().isEmpty().isLength({ min: 8, max: 14 }).withMessage('Senha inválida'),
    check('nome').not().isEmpty(),
    check('telefone').isMobilePhone(['pt-BR']).withMessage('Número inválido')
], (req, res, next) => {
    const ErrValidator = myValidationResult(req);
    const email = req.body.email;
    const nome = req.body.nome;
    const fotoUser = 'avatarperfil.png'
    const telefone = req.body.telefone;
    if (!ErrValidator.isEmpty()) {
        return res.status(422).json({ ErrValidator: ErrValidator.array(), mensagem: 'error validator' })
    } else {
        mysql.getConnection((err, conn) => {
            if (err) { return res.status(500).send({ error: err }) }
            bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
                if (errBcrypt) { return res.status(500).send({ error: errBcrypt }) }
                conn.query(`INSERT INTO usuarios(email,nome,fotoUser,telefone,senha)values(?,?,?,?,?)`,
                    [email, nome,fotoUser, telefone, hash],
                    (eror, results) => {

                        conn.release();
                        if (eror) {
                            return res.status(500).send({ eror, mensagem: 'error' })
                        } else {
                            const mensagem = {
                                from: "vidaboaetec@gmail.com",
                                to: email,
                                subject: "Olá " + nome + ",o cadastro em nosso app foi feita com sucesso",
                                template: 'emailcadastro',
                            };
                            transporter.sendMail(mensagem, (error, info) => {
                                if (error) {
                                    res.status(400).send(
                                        error
                                    )
                                } else {
                                    res.status(200).send({
                                        mensagem: 'Usuário criado com sucesso'
                                    })
                                }
                            })


                        }
                        // retornar o RESULTS para tirar o loop infinito
                    }
                )
            })
        })
    }
});
// login com jwt 
router.post('/login', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        const query = `SELECT * from usuarios WHERE email=?`;
        conn.query(query, [req.body.email], (error, results, fields) => {
            conn.release();
            if (error) { return res.status(500).send({ error: error }) }
            if (results.length < 1) {
                return res.status(401).send({ mensagem: 'Falha na autenticação' })
            }
            bcrypt.compare(req.body.senha, results[0].senha, (err, result) => {
                if (err) {
                    return res.status(401).send({ mensagem: 'Falha na autenticação' })
                }
                if (result) {
                    let token = jwt.sign({
                        id_usuario: results[0].id_user,
                        email: results[0].email
                    }, JwtKey, {
                        expiresIn: '1h'
                    })
                    return res.status(200).send({
                        mensagem: 'Login feito com sucesso!',
                        token, id: results[0].id_user, nome: results[0].nome
                    })
                }
                return res.status(401).send({ mensagem: 'Falha na autenticação' })
            })
        })
    })
})
// caminho da pasta para upload das foto de perfil

router.get('/dados/:id_user', (req, res, next) => {
    const id = req.params.id_user
    const numId = Number(id)
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send({ error: err })
        } else {
            const query = `select nome, fotoUser,capaUser,frase,capaUser,telefone from usuarios where id_user= ?`;
            conn.query(query, [numId], (eror, result) => {
                conn.release();
                if (eror) {
                    return res.status(500).send({ error: eror })
                } else {
                    return res.status(200).send(
                        result
                    )
                }
            })
        }
    })
})
// editar perfil
const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'public/fotoperfil/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({ storage })


router.put('/uploadperfil/:id', upload.single('fileData'), (req, res, next) => {
    const fotoperfil = req.file.filename;
    const idUser = req.params.id;
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send({ error: err })
        } else {
            const query = `UPDATE usuarios SET fotouser = ? WHERE id_user=?`
            conn.query(query, [fotoperfil,idUser], (eror, result) => {
                conn.release();
                if (eror) {
                    console.log(eror)
                } else {
                    return res.status(200).send({ mensagem: 'Ok' })
                }
            })
        }
    })
})
router.put('/uploadcapa/:id', upload.single('fileCapa'), (req, res, next) => {
    const fotocapa = req.file.filename;
    const idUser = req.params.id;
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send({ error: err })
        } else {
            const query = `UPDATE usuarios SET capauser = ? WHERE id_user=?`
            conn.query(query, [fotocapa,idUser], (eror, result) => {
                conn.release();
                if (eror) {
                    console.log(eror)
                } else {
                    return res.status(200).send({ mensagem: 'Ok' })
                }
            })
        }
    })
})
// editar dados de perfil 
router.put('/editadados/:id', (req, res, next) => {
    const idUser = req.params.id;
    const nome = req.body.nome;
    const frase = req.body.frase;
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send({ error: err })
        } else {
            const query = `UPDATE usuarios SET nome = ?,frase = ? WHERE id_user=?`
            conn.query(query, [nome,frase,idUser], (eror, result) => {
                conn.release();
                if (eror) {
                    //console.log(eror)
                    return res.status(500).send({ mensagem: 'error' })
                } else {
                    return res.status(200).send({ mensagem: 'Ok' })
                }
            })
        }
    })
})
// buscar usuarios
router.get('/buscarusuarios/:nome', (req, res, next) => {
    const nome = req.params.nome;
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send({ error: err })
        } else {
            const query = `select id_user,nome, fotouser FROM usuarios WHERE nome LIKE "%${nome}%"`
            conn.query(query, (eror, result) => {
                conn.release();
                if (eror) {
                    //console.log(eror)
                    return res.status(500).send({ mensagem: 'Erro' })
                } else {
                    return res.status(200).send(result)
                }
            })
        }
    })
})

// solocitação de amizade
router.post('/adicionaramigos/:id', (req, res, next) => {
    const idUser = req.params.id;
    const solicitado = req.body.idSolicitado;
    console.log(solicitado)
    const situacao = 'p'; // (P Pendente, A aprovada R Rejeitada)
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send({ error: err })
        } else {
            // a id_solicitado e id_solicitante devem ser foregery keys N:N para retornar os valores corretos
            const query = `INSERT INTO  amigos (id_solicitante,id_solicitado,situacao) VALUES (?,?,?)`;
            conn.query(query,[idUser,solicitado,situacao], (eror, result) => {
                conn.release();
                if (eror) {
                    console.log(eror)
                    //return res.status(500).send({ erro: eror })
                } else {
                    return res.status(200).send({mensagem: 'Solicitação de amizada enviada'})
                }
            })
        }
    })
})
//lista de amigos
router.get('/listaramigos/:id', (req, res, next) => {
    const idUser = req.params.id;
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send({ error: err })
        } else {
            const query = `select amigos.id_amigos,usuarios.id_user, usuarios.nome,usuarios.fotoUser 
            From amigos inner join 
            usuarios On (usuarios.id_user = amigos.id_solicitante AND amigos.id_solicitante != "${idUser}") 
            OR (usuarios.id_user = amigos.id_solicitado AND amigos.id_solicitado != "${idUser}") 
            where (amigos.id_solicitante = ${idUser} OR amigos.id_solicitado=${idUser}) and situacao = 'a'`;
            conn.query(query, (eror, result) => {
                conn.release();
                if (eror) {
                    //console.log(eror)
                    return res.status(500).send({ erro: eror })
                } else {
                    return res.status(200).send(result)
                }
            })
        }
    })
})
router.get('/listarpendentes/:id', (req, res, next) => {
    const idUser = req.params.id;
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send({ error: err })
        } else {
            const query = `select DISTINCT amigos.id_amigos,usuarios.id_user, usuarios.nome,usuarios.fotoUser 
            From amigos inner join 
            usuarios On (usuarios.id_user = amigos.id_solicitante AND amigos.id_solicitante != "${idUser}") 
            OR (usuarios.id_user = amigos.id_solicitado AND amigos.id_solicitado != "${idUser}") 
            where amigos.id_solicitado=${idUser} and situacao = 'p'`;
            conn.query(query, (eror, result) => {
                conn.release();
                if (eror) {
                    //console.log(eror)
                    return res.status(500).send({ erro: eror })
                } else {
                    return res.status(200).send(result)
                }
            })
        }
    })
})
// verifica se o usuário seleciona já são amigos ou não
router.get('/verificaamizade/:id/:idverifica', (req, res, next) => {
    const idUser = req.params.id;
    const idVerifica = req.params.idverifica;
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send({ error: err })
        } else {
            const query = `SELECT * 
            FROM amigos 
            WHERE 
            ((id_solicitante = ${idUser} and id_solicitado = ${idVerifica}) or (id_solicitante = ${idVerifica} and id_solicitado = ${idUser} ))`;
            conn.query(query, (eror, result) => {
                conn.release();
                //console.log(result[0].situacao)
                if (eror) {
                    //console.log(eror)
                    return res.status(500).send({ erro: eror })
                }else if(result){
                    if(result.length === 0){
                        // 0 == não são amigos
                        return res.status(200).send({mensagem:'0'})
                    }else if(result[0].situacao == 'a'){
                        // 1 são amigos 
                        //console.log(result)
                        return res.status(200).send({mensagem:'1'})
                    }else if((result[0].situacao == 'p')){
                        // 2 solocitação pendente
                        return res.status(200).send({mensagem:'2'})
                    }
                }else{
                    return res.status(200).send({mensagem:'erro, não há array'})
                }
            })
        }
    })
})
router.delete('/excluiramigos/:id_amigos', (req, res, next) => {
    const id_amigos = req.params.id_amigos;
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send({ error: err })
        } else {
            const query = `DELETE FROM amigos WHERE id_amigos=?`;
            conn.query(query,[id_amigos], (eror, result) => {
                conn.release();
                if (eror) {
                    //console.log(eror)
                    return res.status(500).send({ erro: eror })
                } else {
                    // Amigos excluido retorna 1
                    return res.status(200).send({mensagem:'1'})
                }
            })
        }
    })
})
router.put('/confirmaramizade/:id_amigos', (req, res, next) => {
    const id_amigos = req.params.id_amigos;
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send({ error: err })
        } else {
            const query = `UPDATE amigos
            SET situacao='a'
            WHERE id_amigos = ${id_amigos}`;
            conn.query(query, (eror, result) => {
                conn.release();
                if (eror) {
                    //console.log(eror)
                    return res.status(500).send({ erro: eror })
                } else {
                    // Aceitou a solicitação de amizades retorna 1
                    return res.status(200).send({mensagem:'1'})
                }
            })
        }
    })
})

module.exports = router;