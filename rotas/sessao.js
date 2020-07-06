const express = require('express')
const router = express.Router();
const mysql = require('../models/conexao')

router.get('/', (req, res, next) => {
    res.send('Usando a porta Sessão!!')
});
router.get('/sessao', (req, res, next) => {
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send({ error: err })
        }else{
            const query = `SELECT * from poltronas order by rowId, columnId;`;
            conn.query(query,
                (eror, results) => {
                    conn.release();
                    if (eror) {
                        return res.status(500).send({ eror, mensagem: 'error' })
                    } else {
                        //console.log(results)
                        const assentos =  results;
                        res.render('../view/sessao',{
                            assentos
                        })
                    }
                }
            )
        }
    })
});
module.exports = router;