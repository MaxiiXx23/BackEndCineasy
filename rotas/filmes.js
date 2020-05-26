const express = require('express')
const router = express.Router()
const mysql = require('../models/conexao')
const { check, validationResult } = require('express-validator')
const multer = require("multer")

//Rota de inserção, nela chamarei a view e dou um select em generos para ser usado no select do front-end
router.get('/', (req, res, next) => {
    mysql.getConnection((err, conn) => {
        if (err) {
            res.status(404).send({
                memsagem: "Conexão com o bau não realizada"
            })
        } else {

            const query = `SELECT * FROM generos`;
            conn.query(query, (eror, result) => {
                conn.release();
                if (eror) {
                    res.status(404).send({ mensagem: "Error ao executar a Query" })
                } else {
                    res.render('../view/filmes', { generos: result });
                }
            })
        }
    })
});
//Rota App: trás os filmes na tela do usuario
router.get('/films/:limit', (req, res, next) => {
    const limite = req.params.limit;
    const numLimite = Number(limite);
    //console.log(numLimite)
    mysql.getConnection((err, conn) => {
        if (err) {
            res.status(404).send({
                memsagem: "Conexão com o bau não realizada"
            })
        } else {

            const query = `SELECT id_films,nome,foto,status_filme FROM films LIMIT ?`;
            conn.query(query, [numLimite], (eror, result) => {
                conn.release();
                if (eror) {
                    res.status(404).send({ mensagem: "Error ao executar a Query" })
                } else {
                    return res.status(200).send(result)
                }
            })
        }
    })
})
router.get('/listaemcartaz/:limit', (req, res, next) => {
    const limite = req.params.limit;
    const numLimite = Number(limite);
    //console.log(numLimite)
    mysql.getConnection((err, conn) => {
        if (err) {
            res.status(404).send({
                memsagem: "Conexão com o bau não realizada"
            })
        } else {

            const query = `SELECT id_films,nome,foto,status_filme FROM films where status_filme = 1 LIMIT ?`;
            conn.query(query,[numLimite], (eror, result) => {
                conn.release();
                if (eror) {
                    res.status(404).send({ mensagem: "Error ao executar a Query" })
                } else {
                    return res.status(200).send(result)
                }
            })
        }
    })
})
router.get('/listaestreia/:limit', (req, res, next) => {
    const limite = req.params.limit;
    const numLimite = Number(limite);
    //console.log(numLimite)
    mysql.getConnection((err, conn) => {
        if (err) {
            res.status(404).send({
                memsagem: "Conexão com o bau não realizada"
            })
        } else {

            const query = `SELECT id_films,nome,foto,status_filme FROM films where status_filme = 3 LIMIT ?`;
            conn.query(query,[numLimite], (eror, result) => {
                conn.release();
                if (eror) {
                    res.status(404).send({ mensagem: "Error ao executar a Query" })
                } else {
                    return res.status(200).send(result)
                }
            })
        }
    })
})
router.get('/listaemalta/:limit', (req, res, next) => {
    const limite = req.params.limit;
    const numLimite = Number(limite);
    //console.log(numLimite)
    mysql.getConnection((err, conn) => {
        if (err) {
            res.status(404).send({
                memsagem: "Conexão com o bau não realizada"
            })
        } else {

            const query = `SELECT id_films,nome,foto,status_filme FROM films where status_filme = 2 LIMIT ?`;
            conn.query(query,[numLimite], (eror, result) => {
                conn.release();
                if (eror) {
                    res.status(404).send({ mensagem: "Error ao executar a Query" })
                } else {
                    return res.status(200).send(result)
                }
            })
        }
    })
})
//Rota App: traz os detalhes dos filmes de acordo com o Id dele
router.get('/detalhes/:id', (req, res, next) => {
    const limite = req.params.id;
    const numLimite = Number(limite);
    //console.log(numLimite)
    mysql.getConnection((err, conn) => {
        if (err) {
            res.status(404).send({
                mensagem: "Conexão com o bau não realizada"
            })
        } else {

            const query = `SELECT * FROM films where id_films= ?`;
            conn.query(query, [numLimite], (eror, result) => {
                conn.release();
                if (eror) {
                    res.status(404).send({ mensagem: "Error ao executar a Query" })
                } else {
                    return res.status(200).send(result)

                }
            })
        }
    })
})
//multer 
const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'public/filmes/poster')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({ storage })
//Rota de inserção de filme com upload de imagem
// status filme : 1 EM CARTAZ; 2 EM ALTA, 3 ESTREIA, 4 Fora das bilheterias
router.post('/', upload.single('img'), (req, res, next) => {
    let generoArray = req.body.genero;
    if (Array.isArray(generoArray)) {
        genero = generoArray.join()
    } else {
        genero = generoArray;
    }
    const nome = req.body.nome;
    const nome_ori = req.body.nome_ori;
    const sinopse = req.body.sinopse;
    const img_filme = req.file.filename;
    const classif = req.body.class;
    const duracao = req.body.duracao;
    const trailer = req.body.trailer;
    const diretor = req.body.diretor;
    const distribuidor = req.body.distribuidor;
    const pais_ori = req.body.pais_ori;
    const data_estreia = req.body.data_estreia;
    const status_filme = req.body.status_filme;
    mysql.getConnection((err, conn) => {
        if (err) {
            res.status(404).send({
                mensagem: "Conexão com o bau não realizada"
            })
        } else {
            const query = `INSERT INTO films (nome,nome_ori,sinopse,foto,classficacao,genero,duracao,trailler,diretor,distribuidor,pais_ori,data_estreia,status_filme) VAlUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`;
            conn.query(query, [nome, nome_ori, sinopse, img_filme, classif, genero, duracao, trailer, diretor, distribuidor, pais_ori, data_estreia, status_filme], (eror, result) => {
                conn.release();
                if (eror) {
                    return res.status(500).send({ error: eror })
                } else {
                    return res.status(200).send({
                        mensagem: "Filme inserido com sucesso",
                        result
                    })
                }
            })
        }
    })
})
//Rota de update, nela chamarei a view e dou um select em generos para ser usado no select do front-end

router.get('/update', (req, res, next) => {

    mysql.getConnection((err, conn) => {
        if (err) {
            res.status(404).send({
                memsagem: "Conexão com o bau não realizada"
            })
        } else {

            const query = `SELECT * FROM generos`;
            conn.query(query, (eror, result) => {
                conn.release();
                if (eror) {
                    res.status(404).send({ mensagem: "Error ao executar a Query" })
                } else {
                    res.render('../view/filmesupdate', { generos: result });
                }
            })
        }
    })
});
//Rota de update com upload de imagem
router.put('/update', upload.single('img'), (req, res, next) => {
    let generoArray = req.body.genero;
    if (Array.isArray(generoArray)) {
        genero = generoArray.join()
    } else {
        genero = generoArray;
    }
    const id_films = req.body.id_films
    const nome = req.body.nome;
    const nome_ori = req.body.nome_ori;
    const sinopse = req.body.sinopse;
    const img_filme = req.file.filename;
    const classif = req.body.class;
    const duracao = req.body.duracao;
    const trailer = req.body.trailer;
    const diretor = req.body.diretor;
    const distribuidor = req.body.distribuidor;
    const pais_ori = req.body.pais_ori;
    const data_estreia = req.body.data_estreia;
    const status_filme = req.body.status_filme;
    mysql.getConnection((err, conn) => {
        if (err) {
            res.status(404).send({
                mensagem: "Conexão com o banco não realizada"
            })
        } else {
            const query = `UPDATE films SET nome = ?, nome_ori = ?, sinopse = ?, foto = ?,classficacao = ?,genero = ?, duracao = ?,trailler = ?,diretor= ?,distribuidor= ?,pais_ori = ?,data_estreia = ?,status_filme = ? WHERE id_films = ? `;
            conn.query(query, [nome, nome_ori, sinopse, img_filme, classif, genero, duracao, trailer, diretor, distribuidor, pais_ori, data_estreia, status_filme, id_films], (eror, result) => {
                conn.release();
                if (eror) {
                    return res.status(500).send({ error: eror })
                } else {
                    return res.status(200).send({
                        mensagem: "Filme atualizado com sucesso"
                    })
                }
            })
        }
    })
})

router.delete('/deletar', (req, res, next) => {
    mysql.getConnection((err, conn) => {
        const query = `DELETE FROM films WHERE id_films = ?`;
        conn.query(query, [req.body.IdFilme], (eror, result) => {
            conn.release();
            if (eror) {
                return res.status(500).send({ error: eror })
            } else {
                return res.status(200).send({
                    mensagem: "filme deletado com sucesso!"
                })
            }
        })
    })
})
//bucar filmes
router.get('/buscarfilmes/:nome', (req, res, next) => {
    const filme = req.params.nome;
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send({ error: err })
        } else {
            const query = `select id_films,nome, foto,status_filme FROM films WHERE nome LIKE "%${filme}%"`
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
// rotas de rating dos filmes 
// adciona rating
router.post('/addrating', (req, res, next) => {
    const Id_usuario = req.body.Id_usuario;
    const Id_filme = req.body.Id_filme;
    const rating = req.body.rating;
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send({ error: err })
        } else {
            const query = `INSERT INTO avaliacao (IdFilms,IdUsuario,rating) VALUES (?,?,?)`;
            conn.query(query,[Id_filme,Id_usuario,rating], (eror, result) => {
                conn.release();
                if (eror) {
                    //console.log(eror)
                    return res.status(500).send({ mensagem: 'Erro' })
                } else {
                    return res.status(200).send({ mensagem: 'Avaliação enviada' })
                }
            })
        }
    })
})
// confirma se o usuario já avaliou o filme
router.get('/confirmarating/:iduser/:idfilme', (req, res, next) => {
    const Id_usuario = req.params.iduser;
    const Id_filme = req.params.idfilme;
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send({ error: err })
        } else {
            const query = `SELECT rating from avaliacao where IdUsuario = ? && IdFilms = ?`;
            conn.query(query,[Id_usuario,Id_filme], (eror, result) => {
                conn.release();
                if (eror) {
                    //console.log(eror)
                    return res.status(500).send({ mensagem: 'Erro' })
                } else {
                    if(result ==""){
                        // nao avaliou
                        return res.status(200).send({ mensagem: '0' })
                    }else{
                        //avaliou
                        return res.status(200).send({ mensagem: '1' })
                    }
                }
            })
        }
    })
})
// atualiza o rating 
router.put('/updaterating', (req, res, next) => {
    const Id_usuario = req.body.Id_usuario;
    const Id_filme = req.body.Id_filme;
    const rating = req.body.rating;
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send({ error: err })
        } else {
            const query = `UPDATE  avaliacao SET rating = ? where IdFilms = ? && IdUsuario = ?`;
            conn.query(query,[rating,Id_filme,Id_usuario,rating], (eror, result) => {
                conn.release();
                if (eror) {
                    //console.log(eror)
                    return res.status(500).send({ mensagem: 'Erro' })
                } else {
                    // avaliação atualizada
                    return res.status(200).send({ mensagem: '1' })
                }
            })
        }
    })
})
router.get('/totalrating/:idfilme', (req, res, next) => {
    const Id_filme = req.params.idfilme;
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send({ error: err })
        } else {
            const query = `SELECT SUM(rating) as totalrating , COUNT(IdUsuario) as totaluser from avaliacao where  IdFilms = ?`;
            conn.query(query,[Id_filme], (eror, result) => {
                conn.release();
                if (eror) {
                    //console.log(eror)
                    return res.status(500).send({ mensagem: 'Erro' })
                } else {
                   const totalrating = result[0].totalrating
                   const totalusers  = result[0].totaluser
                   const ratingFinal = totalrating/totalusers
                   return res.status(200).send({ratingFinal})
                }
            })
        }
    })
})
module.exports = router;