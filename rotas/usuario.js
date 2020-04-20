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
        pass: "vidaboa1234567"
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
    const nome = req.body.nome;
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
router.post('/sendpass', (req, res, next) => {
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
});

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
    const telefone = req.body.telefone;
    if (!ErrValidator.isEmpty()) {
        return res.status(422).json({ ErrValidator: ErrValidator.array(), mensagem: 'error validator' })
    } else {
        mysql.getConnection((err, conn) => {
            if (err) { return res.status(500).send({ error: err }) }
            bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
                if (errBcrypt) { return res.status(500).send({ error: errBcrypt }) }
                conn.query(`INSERT INTO usuarios(email,nome,telefone,senha)values(?,?,?,?)`,
                    [email, nome, telefone, hash],
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
                        token, id: results[0].id_user
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
            const query = `select nome, fotoUser,capaUser,frase,capaUser from usuarios where id_user= ?`;
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
module.exports = router;