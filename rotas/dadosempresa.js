const express = require('express')
const router = express.Router();
const mysql = require('../models/conexao')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const JwtKey = 'Zapzip';
const { check, validationResult } = require('express-validator');
const multer = require("multer")
// caminho de upload de foto de perfil da empresa
const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'public/fotoperfil/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({ storage })
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Usando a porta Empresa'
    })
});

// login empresa
router.post('/loginempresa', (req, res, next) => {
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
                    return res.status(401).send({err, mensagem: 'Falha na autenticação' })
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
                        token, id: results[0].id_user, nome: results[0].nomeFantasia
                    })
                }
            })
        })
    })
})

router.put('/fotoempresa/:id', upload.single('fileData'), (req, res, next) => {
    const fotoperfil = req.file.filename;
    const idUser = req.params.id;
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send({ error: err })
        } else {
            const query = `UPDATE usuarios SET fotouser = ? WHERE id_user=?`
            conn.query(query, [fotoperfil, idUser], (eror, result) => {
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
// editar senha da empresa
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
                            return res.status(200).send({ mensagem: 'Senha da empresa editada.' })
                        }
                    })
                }
            })
        }
    })
})
module.exports = router;