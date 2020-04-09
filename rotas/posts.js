const express = require('express')
const router = express.Router();
const path = require('path')
const fs = require('fs');
const mysql = require('../models/conexao')
const { check, validationResult } = require('express-validator');
const multer = require("multer")

router.get('/', (req, res, next) => {

    res.render('../view/home')
});
// lista as postagens, ainda falta arrumar com WHERE com a data da postagem para pegar as postagens mais recentes
router.get('/ver/:limite', (req, res, next) => {
    const limite = req.params.limite;
    const numLimite = Number(limite)
    const data = new Date();
    const verficarMes = (data.getMonth() + 1).toString();
    const verificarDia = data.getDate();
    //console.log(verificarDia)
    if (verficarMes >= 10) {
        dataOficial = data.getFullYear() + '/' + (data.getMonth() + 1).toString() + '/' + data.getDate();
    } else {
        if (verificarDia >= 10) {
            dataBetween = data.getFullYear() + '/0' + (data.getMonth() + 1).toString() + '/' + (data.getDate() - 1).toString();
        } else {
            dataBetween = data.getFullYear() + '/0' + (data.getMonth() + 1).toString() + '/0' + (data.getDate() - 1).toString();
            //console.log(dataBetween)
        }
    }
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send({ error: err })
        } else {
            // res.status(200).send({mensagem:"conexao realizada"})
            const query = `SELECT id_post,nome,note,img,img_post,DATE_FORMAT( data_post, "%d/%m/%Y" ) as data_post,qntLikes,qntComent FROM post WHERE data_post between '${dataBetween}' and curdate() LIMIT ?`;
            conn.query(query, [numLimite], (eror, result) => {
                conn.release();
                if (eror) {
                    return res.status(500).send({ error: eror })
                } else {
                    return res.status(200).send(result)
                }
            })
        }
    })
})
// rota para postar posts com multer para fazer upload das imagens

//multer 
const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'public/posts/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({ storage })

router.post('/', upload.single('img'), (req, res, next) => {
    const data = new Date();
    const verficarMes = (data.getMonth() + 1).toString();
    
    //console.log(data.getFullYear()+'/'+(data.getMonth()+1).toString()+'/'+data.getDate())
    if (verficarMes >= 10) {
        dataOficial = data.getFullYear() + '/' + (data.getMonth() + 1).toString() + '/' + data.getDate();
    } else {
        dataOficial = data.getFullYear() + '/0' + (data.getMonth() + 1).toString() + '/' + data.getDate();
        //console.log(dataOficial)
    }
    const note = req.body.note;
    const img_post = req.file.filename;
    const fk_usuario = req.body.fk_usuario;
    const qntLikes = 0;
    const qntComent = 0;
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(404).send({ error: err })
        } else {
            const query = `INSERT INTO post(note,img_post,qntLikes,qntComent,data_post,fk_usuario)values(?,?,?,?,?,?)`;
            conn.query(query, [note, img_post,qntLikes,qntComent, dataOficial, fk_usuario], (eror, result) => {
                conn.release();
                if (eror) {
                    return res.status(500).send({ error: eror })
                } else {
                    return res.status(200).send({
                        mensagem: "Post realizado com sucesso"
                    })
                }
            })
        }
    })
})
//Após curir o post a quantidade de likes aumenta +1
router.put('/like', (req, res, next) => {
    const like = req.body.like
    const id_post = req.body.id_post
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(404).send({ error: err })
        } else {
            const query = `UPDATE post SET qntLikes = (?)+1 WHERE id_post=?;`;
            conn.query(query, [like,id_post], (eror, result) => {
                conn.release();
                if (eror) {
                    return res.status(500).send({ error: eror })
                } else {
                    return res.status(200).send({
                        mensagem: "Post Curtido com sucessso"
                    })
                }
            })
        }
    })
});
//Após deletar o comentário a quantidade de comentário aumenta +1
router.put('/qntcoment/', (req, res, next) => {
    const qntcoment = req.body.qntcoment
    const id_post = req.body.id_post
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(404).send({ error: err })
        } else {
            const query = `UPDATE post SET qntComent = (?)+1 WHERE id_post=?;`;
            conn.query(query, [qntcoment,id_post], (eror, result) => {
                conn.release();
                if (eror) {
                    return res.status(500).send({ error: eror })
                } else {
                    return res.status(200).send({
                        mensagem: "Post comentado com sucessso"
                    })
                }
            })
        }
    })
});
//Após deletar o comentário a quantidade de comentário diminui -1
router.put('/qntcomentnova/', (req, res, next) => {
    const qntcoment = req.body.qntcoment
    const id_post = req.body.id_post
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(404).send({ error: err })
        } else {
            const query = `UPDATE post SET qntComent = (?)-1 WHERE id_post=?;`;
            conn.query(query, [qntcoment,id_post], (eror, result) => {
                conn.release();
                if (eror) {
                    return res.status(500).send({ error: eror })
                } else {
                    return res.status(200).send({
                        mensagem: "Post comentado com sucessso"
                    })
                }
            })
        }
    })
});

module.exports = router;