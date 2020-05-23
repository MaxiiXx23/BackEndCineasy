const express = require('express')
const router = express.Router();
const mysql = require('../models/conexao')
const { check, validationResult } = require('express-validator');
// campos de pagemento : número de cartão, nome completo, data de vencimento e código de segurança e cpf
/*
    numberCardTest: 5031 7557 3453 0604
                    5567 6603 2721 9742
    tabela de compras deve conter o id do usuario, dados da compra
    (sala, id da rede de cinema com endereço,filme e horário, e se é dublado ou não  ) 
    e o que ele comprou;
    . A tela de escolha de assentos, deve levar a tela de 
*/
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Usando a rota de pagamento'
    })
});
router.post('/ckeckdados', [check('NumberCard').isCreditCard().withMessage('Number card fail'),
check('nomeFull').not().isEmpty().withMessage('Nome vazio'),
check('codCard').isLength({ min: 3, max: 3 }).withMessage('cod invalido'),
check('cpf').isLength({ min: 14, max: 14 }).withMessage('cpf invalido'),
check('data_vencim').contains('/').withMessage('data card invalido')],
    (req, res, next) => {
        const ErrValidator = validationResult(req);

        if (!ErrValidator.isEmpty()) {
            return res.status(422).json({ ErrValidator: ErrValidator.array() })
        } else {
            res.status(200).send({
                mensagem: 'dados aceitos'
            })
        }
    });
// finalizar compra
router.post('/pagamento',
    (req, res, next) => {
        const NumberCard = req.body.NumberCard;
        const nomeFull = req.body.nomeFull;
        const codCard = req.body.codCard;
        const cpf = req.body.cpf;
        const data_vencim = req.body.data_vencim;
        // aqui já vou inserir os dados na tabela de compras;
        res.status(200).send({
            mensagem: 'Pagamento aceito'
        })
    });
router.get('/sessao', (req, res, next) => {
    res.render('../view/sessao')
});
router.get('/checkout', (req, res, next) => {
    res.render('../view/checkout')
});
router.post('/escolheassento', (req, res, next) => {
    // nos values passar o assento e o numero 
     poltronaArray = req.body.poltronasSelecionadas;
    console.log('Protronas no servidor: '+poltronaArray)
    res.redirect('checkout')
});
module.exports = router;