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
router.post('/dados', [check('NumberCard').isCreditCard(),
    check('nomeFull').not().isEmpty(), check('codCard').isLength({ min: 3, max: 3 }),
    check('cpf').isLength({ min: 14, max: 14 }),
    check('data').contains('/')],
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

module.exports = router;