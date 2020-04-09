const express = require('express')
const router = express.Router();
const mysql = require('../models/conexao')
const { check, validationResult } = require('express-validator');
// rota padrão de teste da rota comentarios
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Usando a rota comentarios'
    })
});
// realiza o comentario
router.post('/comentar',
    [check('comentario').not().isEmpty()],
    (req, res, next) => {
        const ErrValidator = validationResult(req);
        const data = new Date();
        const verficarMes = (data.getMonth()+1).toString();
        //console.log(data.getFullYear()+'/'+(data.getMonth()+1).toString()+'/'+data.getDate())
        if(verficarMes >=10){
            dataOficial = data.getFullYear()+'/'+(data.getMonth()+1).toString()+'/'+data.getDate();
        }else{
            dataOficial = data.getFullYear()+'/0'+(data.getMonth()+1).toString()+'/'+data.getDate();
            //console.log(dataOficial)
        }
        if (!ErrValidator.isEmpty()) {
            return res.status(422).json({ ErrValidator: ErrValidator.array() })
        } else {
            mysql.getConnection((err, conn) => {
                if (err) { return res.status(500).send({ error: err }) } else {
                    const query = `INSERT INTO comentarios(comentario,fk_post,fk_usuario)values(?,?,?)`;
                    conn.query(query, [req.body.comentario, req.body.FkPost,req.body.FkUsuario], (eror, result) => {
                        conn.release();
                        if (eror) { return res.status(500).send({ error: eror }) } else {
                            return res.status(200).send({ mensagem: 'comentario criado com sucesso' })
                        }
                    }
                    )
                }
            })
        }

    })
// seleciona os comentarios
router.get('/ver/:FkPost/:limite', (req, res, next) => {
    const limite = req.params.limite;
    const numLimite = Number(limite)
    const id = req.params.FkPost
    mysql.getConnection((err, conn) => {
        const query = `SELECT id_comentario, comentario,usuarios.nome, usuarios.id_user FROM comentarios INNER JOIN post ON post.id_post = comentarios.fk_post INNER JOIN usuarios ON usuarios.id_user = comentarios.fk_usuario WHERE comentarios.fk_post = ? LIMIT ?`;
        conn.query(query, [id,numLimite], (eror, result) => {
            conn.release();
            if (eror) {
                return res.status(500).send({ error: eror })
            } else {
                return res.status(200).send(
                    result
                )
            }
        })
    })
})

router.put('/update',
    [check('comentario').not().isEmpty()],
    (req, res, next) => {
        const ErrValidator = validationResult(req);
        if (!ErrValidator.isEmpty()) {
            return res.status(422).json({ ErrValidator: ErrValidator.array() })
        } else {
            mysql.getConnection((err, conn) => {
                const query = `UPDATE comentarios SET comentario=? WHERE id_comentario =?`;
                conn.query(query, [req.body.comentario, req.body.IdComentario], (eror, result) => {
                    conn.release();
                    if (eror) {
                        return res.status(500).send({ error: eror })
                    } else {
                        return res.status(200).send({
                            mensagem: "Comentario atualizado com sucesso!"
                        })
                    }
                })
            })
        }
    })

router.delete('/deletar', (req, res, next) => {
    mysql.getConnection((err, conn) => {
        const query = `DELETE FROM comentarios WHERE id_comentario = ?`;
        conn.query(query, [req.body.IdComentario], (eror, result) => {
            conn.release();
            if (eror) {
                return res.status(500).send({ error: eror })
            } else {
                return res.status(200).send({
                    mensagem: "Comentario deletado com sucesso!"
                })
            }
        })
    })
})


module.exports = router;