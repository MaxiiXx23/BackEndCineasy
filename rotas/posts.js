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
            const query = `SELECT post.id_post,post.note,post.img_post,post.tipo_file,DATE_FORMAT( post.data_post, "%d/%m/%Y" ) as data_post,post.qntLikes,post.qntComent, 
            usuarios.nomeFantasia as nomeFantasia, usuarios.fotoUser as fotoUser,usuarios.frase as frase,usuarios.id_user as id_user
            FROM post
            INNER JOIN usuarios
            ON post.fk_usuario = usuarios.id_user where data_post between '${dataBetween}' and curdate() LIMIT ?`;
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
// rota que traz os post de acordo com o usuário
router.get('/postempresa/:iduser/:limite', (req, res, next) => {
    const limite = req.params.limite;
    const iduser = req.params.iduser;
    const numLimite = Number(limite)
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send({ error: err })
        } else {
            // res.status(200).send({mensagem:"conexao realizada"})
            const query = `SELECT post.id_post,post.note,post.img_post,post.tipo_file,DATE_FORMAT( post.data_post, "%d/%m/%Y" ) as data_post,post.qntLikes,post.qntComent, 
            usuarios.nomeFantasia as nomeFantasia, usuarios.fotoUser as fotoUser,usuarios.frase as frase
            FROM post
            INNER JOIN usuarios
            ON post.fk_usuario = usuarios.id_user where post.fk_usuario = ? order by data_post DESC limit ?`;
            conn.query(query, [iduser,numLimite], (eror, result) => {
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
router.get('/post/:id_post', (req, res, next) => {
    const id_post = req.params.id_post;
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send({ error: err })
        } else {
            // res.status(200).send({mensagem:"conexao realizada"})
            const query = `SELECT id_post,note,img_post,tipo_file,DATE_FORMAT( data_post, "%d/%m/%Y" ) as data_post,qntLikes,qntComent
            FROM post
            where post.id_post = ?`;
            conn.query(query, [id_post], (eror, result) => {
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
    //console.log(req.file)
    if (verficarMes >= 10) {
        dataOficial = data.getFullYear() + '/' + (data.getMonth() + 1).toString() + '/' + data.getDate();
    } else {
        dataOficial = data.getFullYear() + '/0' + (data.getMonth() + 1).toString() + '/' + data.getDate();
        //console.log(dataOficial)
    }
    const note = req.body.note;
    const img_post = req.file.filename;
    const tipo_file = req.file.mimetype;
    const fk_usuario = req.body.fk_usuario;
    const qntLikes = 0;
    const qntComent = 0;
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(404).send({ error: err })
        } else {
            const query = `INSERT INTO post(note,img_post,qntLikes,tipo_file,qntComent,data_post,fk_usuario)values(?,?,?,?,?,?,?)`;
            conn.query(query, [note, img_post,qntLikes,tipo_file,qntComent, dataOficial, fk_usuario], (eror, result) => {
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
//Após deletar o comentário a quantidade de comentário aumenta +1
router.put('/qntcoment/', (req, res, next) => {
    const qntcoment = req.body.qntcoment
    const id_post = req.body.id_post
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(404).send({ error: err })
        } else {
            const query = `UPDATE post SET qntComent = (?)+1 WHERE id_post=?`;
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
// like post
//add like na table N:N para confirmação
router.post('/addlike', (req, res, next) => {
    const Id_usuario = req.body.Id_usuario;
    const Id_post = req.body.Id_post;
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send({ error: err })
        } else {
            const query = `INSERT INTO like_post (IdPost,IdUsuario) VALUES (?,?)`;
            conn.query(query,[Id_post,Id_usuario], (eror, result) => {
                conn.release();
                if (eror) {
                    //console.log(eror)
                    return res.status(500).send({ mensagem: '0' })
                } else {
                    return res.status(200).send({ mensagem: '1' })
                }
            })
        }
    })
})
//add like
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
                    return res.status(500).send({ mensagem:"0" })
                } else {
                    return res.status(200).send({
                        mensagem: "1"
                    })
                }
            })
        }
    })
});
// retira like
router.put('/retiralike', (req, res, next) => {
    const like = req.body.like
    const id_post = req.body.id_post
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(404).send({ error: err })
        } else {
            const query = `UPDATE post SET qntLikes = (?)-1 WHERE id_post=?`;
            conn.query(query, [like,id_post], (eror, result) => {
                conn.release();
                if (eror) {
                    return res.status(500).send({ mensagem:"0" })
                } else {
                    return res.status(200).send({
                        mensagem: "1"
                    })
                }
            })
        }
    })
});
//confirma like
router.get('/confirmalike/:iduser/:idpost', (req, res, next) => {
    const Id_usuario = req.params.iduser;
    const Id_post = req.params.idpost;
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send({ error: err })
        } else {
            const query = `SELECT IdUsuario from like_post where IdUsuario = ? && IdPost = ?`;
            conn.query(query,[Id_usuario,Id_post], (eror, result) => {
                conn.release();
                if (eror) {
                    //console.log(eror)
                    return res.status(500).send({ mensagem: 'Erro' })
                } else {
                    if(result ==""){
                        // nao curtiu
                        return res.status(200).send({ mensagem: '0' })
                    }else{
                        //Curtiu
                        return res.status(200).send({ mensagem: '1' })
                    }
                }
            })
        }
    })
})
router.delete('/deletelike', (req, res, next) => {
    const Id_usuario = req.body.Id_usuario;
    const Id_post = req.body.Id_post;
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send({ error: err })
        } else {
            const query = `DELETE FROM like_post where IdUsuario = ? && IdPost = ?`;
            conn.query(query,[Id_usuario,Id_post], (eror, result) => {
                conn.release();
                if (eror) {
                    //console.log(eror)
                    return res.status(500).send({ mensagem: '0' })
                } else {
                    return res.status(200).send({ mensagem: '1' })
                }
            })
        }
    })
})
// total de postagens empresa
router.get('/totalposts/:fkusuario', (req, res, next) => {
    const fk_usuario = req.params.fkusuario;
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send({ error: err })
        } else {
            const query = `select COUNT(id_post) as totalposts from post where fk_usuario = ?`;
            conn.query(query,[fk_usuario], (eror, result) => {
                conn.release();
                if (eror) {
                    //console.log(eror)
                    return res.status(500).send({ mensagem: 'Erro' })
                } else {
                    const total = result[0].totalposts
                    return res.status(200).send({ totalposts: total })
                }
            })
        }
    })
})
module.exports = router;