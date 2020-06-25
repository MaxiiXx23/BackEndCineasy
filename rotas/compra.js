const express = require('express')
const router = express.Router();
const mysql = require('../models/conexao')
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
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
        plano = '';
        valor = '';
        if(idplano=='1'){
            plano = 'Plano Hero'
            valor = 'R$18,00/mês';
        }else{
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
                if(errBcrypt){
                    return res.status(500).send({ error: errBcrypt })
                }else{
                    const dadosconfirma = {
                        nome: nome,
                        plano: plano,
                        idplano: idplano,
                        valorPlano: valor,
                        NewnumeroCard: NewnumeroCard
                    }
                    req.flash('info', dadosconfirma);
                    res.redirect('/pagamento/confirmar');
                }
            })
        }
    });
// finalizar compra
router.get('/confirmar',
    (req, res, next) => {
        // aqui já vou inserir os dados na tabela de compras;
        res.render('../view/confirmacao', { dadoscompra: req.flash('info') });
    });
router.get('/sessao', (req, res, next) => {
    res.render('../view/sessao')
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