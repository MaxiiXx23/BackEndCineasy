const express = require('express')
const router = express.Router();
const mysql = require('../models/conexao')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JwtKey = 'Zapzip';
const { check, validationResult } = require('express-validator');
const nodemailer = require('nodemailer')
const myValidationResult = validationResult.withDefaults({
    formatter: (error) => {
      return {
        MsgError: error.msg,
      };
    }
  });
const config = {
    host: "smtp.gmail.com",
    secure:false,
    port: 587,
    auth: {
      user: "vidaboaetec@gmail.com",
      pass: "vidaboa1234567"
    },
    tls:{
        rejectUnauthorized:false
    }
}
const transporter = nodemailer.createTransport(config)

// router.get é o select, router.delete é deletar, router.post é para inserir e router.patch é para atualizar
router.post('/sendmail', (req, res, next) => {
    const mensagem = {
        from:"vidaboaetec@gmail.com",
        to:"maxuel.barbeiro43@gmail.com",
        subject:"Olá Maxuel,",
        text:"Olá max jonatas, aqui é a Cineasy sua conta foi criado com sucesso!"
    };
    transporter.sendMail(mensagem,(error,info)=>{
        if(error){
            res.status(400).send(
                error
            )
        }else{
            res.status(200).send({
                mensagem: 'Email enviado'
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
    check('senha').not().isEmpty(),
    check('nome').not().isEmpty(),
    check('telefone').isMobilePhone(['pt-BR'])
], (req, res, next) => {
    const ErrValidator = myValidationResult(req);
    const email = req.body.email;
    const nome = req.body.nome;
    const telefone = req.body.telefone;
    if (!ErrValidator.isEmpty()) {
        return res.status(422).json({ ErrValidator: ErrValidator.array() })
    } else {
        mysql.getConnection((err, conn) => {
            if (err) { return res.status(500).send({ error: err }) }
            bcrypt.hash(req.body.senha, 5, (errBcrypt, hash) => {
                if (errBcrypt) { return res.status(500).send({ error: errBcrypt }) }
                conn.query(`INSERT INTO usuarios(email,nome,telefone,senha)values(?,?,?,?)`,
                    [email,nome,telefone, hash],
                    (eror, results) => {
                        conn.release();
                        if (eror) { return res.status(500).send({ error: eror }) } else {
                            return res.status(200).send({ mensagem: 'Usuário criado com sucesso' })
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
                if(eror){
                    return res.status(500).send({ error: eror })
                }else{
                    return res.status(200).send(
                        result
                    )
                }
            })
        }
    })
})
module.exports = router;