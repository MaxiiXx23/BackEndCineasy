const express = require('express')
const router = express.Router();
const mysql = require('../models/conexao')
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer')
router.get('/', (req, res, next) => {
    res.render('../view/cnpj')
});
router.post('/checkdados', [check('NumeroCard').isLength({ min: 16, max: 16 }).withMessage('Número de cartão inválido.'),
check('nomeFull').not().isEmpty().withMessage('Nome vazio'),
check('codCard').isLength({ min: 3, max: 3 }).withMessage('Código do cartão inválido.'),
check('cpf').isLength({ min: 14, max: 14 }).withMessage('CPF inválido.')],
    (req, res, next) => {
        const ErrValidator = validationResult(req);
        const iduser = req.body.iduser
        const idplano = req.body.idplano
        const erros = ErrValidator.errors
        const nome = req.body.nomeFull
        const numeroCard = req.body.NumeroCard
        const NewnumeroCard = numeroCard.replace(/\d(?=\d{4})/g, "*");
        const tipoCartao = req.body.tipoCartao
        const data = new Date();
        const verficarMes = (data.getMonth() + 1).toString();
        const verificarDia = data.getDate();
        if (verficarMes >= 10 && verificarDia == '00') {
            dataOficial = data.getFullYear() + '/' + (data.getMonth() + 1).toString() + '/' + data.getDate();
        } else {
            if (verificarDia == '00') {
                dataOficial = data.getFullYear() + '/' + (data.getMonth() + 1).toString() + '/0' + data.getDate();
            } else {
                dataOficial = data.getFullYear() + '/' + (data.getMonth() + 1).toString() + '/0' + data.getDate();
            }
        }
        plano = '';
        valor = '';
        if (idplano == '1') {
            plano = 'Plano Hero'
            valor = 'R$18,00/mês';
        } else {
            plano = 'Plano Super-Hero'
            valor = 'R$22,00/mês';
        }
        const codCard = req.body.codCard
        const cpf = req.body.cpf
        const dataExp = req.body.mes + '/' + req.body.ano
        if (!ErrValidator.isEmpty()) {
            res.render('../view/checkout', {
                validacao: erros,
                idUsuario: iduser,
                idPlano: idplano
            })
        } else {
            bcrypt.hash(numeroCard, 10, (errBcrypt, hash) => {
                if (errBcrypt) {
                    return res.status(500).send({ error: errBcrypt })
                } else {
                    const dadosconfirma = {
                        idUsuario: iduser,
                        plano: plano,
                        idplano: idplano,
                        valorPlano: valor,
                        NewnumeroCard: NewnumeroCard,
                        HashCard: hash,
                        cpf: cpf,
                        dataCompra: dataOficial
                    }
                    req.flash('info', dadosconfirma);
                    res.redirect('/pagamento/confirmar');
                }
            })
        }
    });
// confirmar compra
router.get('/confirmar',
    (req, res, next) => {
        res.render('../view/confirmacao', { dadoscompra: req.flash('info') });
    });
// finalizar compra
router.post('/finalizar',
    (req, res, next) => {
        const fk_user = req.body.iduser;
        const idplano = req.body.idplano;
        const HashCard = req.body.HashCard;
        const cpf = req.body.cpf;
        const dataCompra = req.body.dataCompra;
        mysql.getConnection((err, conn) => {
            if (err) {
                return res.status(500).send({ error: err })
            }else{
                const query = `INSERT INTO compra_plano(fk_user,plano,cartao,CPF,data_compra)values(?,?,?,?,?)`;
                conn.query(query,
                    [fk_user,idplano,HashCard,cpf,dataCompra],
                    (eror, results) => {
                        conn.release();
                        if (eror) {
                            return res.status(500).send({ eror, mensagem: 'error' })
                        } else {
                            res.redirect('/pagamento/finalizado');
                        }
                    }
                )
            }
        })
    });
router.get('/finalizado', (req, res, next) => {
    res.render('../view/finalizado')
});
router.get('/checkout/:iduser/:idplano', (req, res, next) => {
    const idUser = req.params.iduser
    const idplano = req.params.idplano
    res.render('../view/checkout', {
        idUsuario: idUser,
        idPlano: idplano,
        validacao: {}
    }
    )
});
router.post('/escolheassento', (req, res, next) => {
    // nos values passar o assento e o numero 
    poltronaArray = req.body.poltronasSelecionadas;
    console.log('Protronas no servidor: ' + poltronaArray)
    res.redirect('checkout')
});
module.exports = router;