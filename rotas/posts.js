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
        const verficarMes = (data.getMonth()+1).toString();
        const verificarDia = data.getDate();
        //console.log(verificarDia)
        if(verficarMes >=10){
            dataOficial = data.getFullYear()+'/'+(data.getMonth()+1).toString()+'/'+data.getDate();
        }else{
            if(verificarDia >=10){
                dataBetween = data.getFullYear()+'/0'+(data.getMonth()+1).toString()+'/'+(data.getDate()-1).toString();
            }else{
                dataBetween = data.getFullYear()+'/0'+(data.getMonth()+1).toString()+'/0'+(data.getDate()-1).toString();
            console.log(dataBetween)
            }
        }
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send({ error: err })
        } else {
            // res.status(200).send({mensagem:"conexao realizada"})
            const query = `SELECT id_post,nome,note,img,img_post,DATE_FORMAT( data_post, "%d/%m/%Y" ) as data_post,qntLikes,qntComent FROM post WHERE data_post between '${dataBetween}' and curdate() LIMIT ?`;
            conn.query(query,[numLimite], (eror, result) => {
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
        cb(null,'public/posts/')
    },
    filename: (req, file, cb) => {
        cb(null,Date.now()+'-'+file.originalname)
    }
})
const upload = multer({storage})

router.post('/',upload.single('img'), (req, res, next) => {
    const data = new Date();
        const verficarMes = (data.getMonth()+1).toString();
        //console.log(data.getFullYear()+'/'+(data.getMonth()+1).toString()+'/'+data.getDate())
        if(verficarMes >=10){
            dataOficial = data.getFullYear()+'/'+(data.getMonth()+1).toString()+'/'+data.getDate();
        }else{
            dataOficial = data.getFullYear()+'/0'+(data.getMonth()+1).toString()+'/'+data.getDate();
            //console.log(dataOficial)
    }
    const note = req.body.note;
    const img_post = req.file.filename;
    const fk_usuario = req.body.fk_usuario;
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(404).send({ error: err })
        } else {
            const query = `INSERT INTO post(note,img_post,data_post,fk_usuario)values(?,?,?,?)`;
            conn.query(query,[note,img_post,dataOficial,fk_usuario],(eror,result)=>{
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
router.post('/upload',upload.single('fileData'), (req, res,next) => {
    //console.log(res)
    res.send({mensagem:"Ok"})
  });

module.exports = router;