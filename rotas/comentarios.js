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
        if (!ErrValidator.isEmpty()) {
            return res.status(422).json({ ErrValidator: ErrValidator.array() })
        } else {
            mysql.getConnection((err, conn) => {
                if (err) { return res.status(500).send({ error: err }) } else {
                    const query = `INSERT INTO comentarios(comentario,fk_post)values(?,?)`;
                    conn.query(query, [req.body.comentario, req.body.FkPost], (eror, result) => {
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
router.get('/ver/:FkPost', (req, res, next) => {
    const id = req.params.FkPost
    mysql.getConnection((err, conn) => {
        const query = `SELECT comentario,post.note FROM comentarios INNER JOIN post ON post.id_post = comentarios.fk_post  WHERE comentarios.fk_post = ?`;
        conn.query(query, [id], (eror, result) => {
            conn.release();
            if (eror) {
                return res.status(500).send({ error: eror })
            } else {
                return res.status(200).send({
                    result
                })
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