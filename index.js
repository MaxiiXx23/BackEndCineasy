const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const methodOverride = require('method-override');
app.use(bodyParser.urlencoded({extended:false})) 
app.use(bodyParser.json()) // o app só json como entrada de dados
// middleware usado para conseguirmos usar todos methods como get,post, put e delete com estruturas html
app.use(methodOverride('_method'))
//pasta public para puxar os arquivos estaticos como imagens, html(ejs) etc.
app.use(express.static('public'));

// ejs para testar o ulpload
app.set('view engine', 'ejs')

const RotaUsuario = require('./route/usuario');
const RotaComentario = require('./route/comentarios');
const RotaPost = require('./route/posts');
const RotaFilme = require('./route/filmes');

app.get('/', function (req, res) {
  res.send('Hello World')
})
//Routa para os usuarios, cadastro, login e etc
app.use('/usuarios',RotaUsuario);
app.use('/comentarios',RotaComentario);
app.use('/posts',RotaPost);
app.use('/filmes',RotaFilme);

 


app.listen(3000,function(){
  console.log('Servidor rodando na url: http://localhost:3000/')
})