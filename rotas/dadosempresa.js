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
        const tipo_user = 1;
        const query = `SELECT * from usuarios WHERE email=?`;
        conn.query(query, [req.body.email], (error, results, fields) => {
            conn.release();
            if (error) { return res.status(500).send({ error: error }) }
            if (results.length < 1 || tipo_user == 0) {
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
                        token, id: results[0].id_user, nome: results[0].nome
                    })
                }
            })
        })
    })
})
//Empresa info
router.get('/dados/:id_user', (req, res, next) => {
    const id = req.params.id_user
    const numId = Number(id)
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send({ error: err })
        } else {
            const query = `select nome, fotoUser,capaUser,frase,razaoSocial  from usuarios where id_user= ?`;
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

router.post('/seguir/:id', (req, res, next) => {
    const idUser = req.params.id;
    const solicitado = req.body.idSolicitado;
    const situacao = 'a'; // (P Pendente, A aprovada R Rejeitada)
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send({ error: err })
        } else {
            // a id_solicitado e id_solicitante devem ser foregery keys N:N para retornar os valores corretos
            const query = `INSERT INTO  seguir (id_solicitante,id_solicitado,situacao) VALUES (?,?,?)`;
            conn.query(query, [idUser, solicitado, situacao], (eror, result) => {
                conn.release();
                if (eror) {
                    //console.log(eror)
                    return res.status(500).send({ erro: eror })
                } else {
                    // 1 = seguindo
                    return res.status(200).send({ mensagem: '1' })
                }
            })
        }
    })
})
// listar redes seguidas
router.get('/listarseguindo/:id', (req, res, next) => {
    const idUser = req.params.id;
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send({ error: err })
        } else {
            const query = `select seguir.id_seguir,usuarios.id_user, usuarios.nome,usuarios.fotoUser 
            From seguir inner join 
            usuarios On (usuarios.id_user = seguir.id_solicitante AND seguir.id_solicitante != "${idUser}") 
            OR (usuarios.id_user = seguir.id_solicitado AND seguir.id_solicitado != "${idUser}") 
            where (seguir.id_solicitante = ${idUser} OR seguir.id_solicitado=${idUser}) and situacao = 'a'`;
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
//confira seguindo
router.get('/verificaseguir/:id/:idverifica', (req, res, next) => {
    const idUser = req.params.id;
    const idVerifica = req.params.idverifica;
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send({ error: err })
        } else {
            const query = `SELECT * 
            FROM seguir 
            WHERE 
            ((id_solicitante = ${idUser} and id_solicitado = ${idVerifica}) or (id_solicitante = ${idVerifica} and id_solicitado = ${idUser} ))`;
            conn.query(query, (eror, result) => {
                conn.release();
                //console.log(result[0].situacao)
                if (eror) {
                    //console.log(eror)
                    return res.status(500).send({ erro: eror })
                } else if (result) {
                    if (result.length === 0) {
                        // 0 == não são amigos
                        return res.status(200).send({ mensagem: '0' })
                    } else if (result[0].situacao == 'a') {
                        // 1 são amigos 
                        //console.log(result)
                        return res.status(200).send({ id_seguir: result[0].id_seguir,mensagem: '1' })
                    }
                } else {
                    return res.status(200).send({ mensagem: 'erro, não há array' })
                }
            })
        }
    })
})
// deixar de seguir
router.delete('/excluirseguir/:id_seguir', (req, res, next) => {
    const id_seguir = req.params.id_seguir;
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send({ error: err })
        } else {
            const query = `DELETE FROM seguir WHERE id_seguir=?`;
            conn.query(query, [id_seguir], (eror, result) => {
                conn.release();
                if (eror) {
                    //console.log(eror)
                    return res.status(500).send({ erro: eror })
                } else {
                    // Amigos excluido retorna 1
                    return res.status(200).send({ mensagem: '1' })
                }
            })
        }
    })
})
// buscar empresas
router.get('/buscarredes/:nome', (req, res, next) => {
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
// total de seguidores
router.get('/totalseguidores/:idempresa', (req, res, next) => {
    const idempresa = req.params.idempresa;
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send({ error: err })
        } else {
            const query = `select COUNT(id_seguir) as totalseguidores from seguir where id_solicitado = ?`;
            conn.query(query,[idempresa], (eror, result) => {
                conn.release();
                if (eror) {
                    //console.log(eror)
                    return res.status(500).send({ mensagem: 'Erro' })
                } else {
                    const total = result[0].totalseguidores
                    return res.status(200).send({ totalseguidores: total })
                }
            })
        }
    })
})
module.exports = router;
