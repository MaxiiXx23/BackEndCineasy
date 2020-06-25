const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const methodOverride = require('method-override');
const exphbs  = require('express-handlebars');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash');
const cors = require('cors');

app.use(cookieParser())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))
app.use(flash());
app.use(bodyParser.urlencoded({extended:false})) 
app.use(bodyParser.json()) // o app só json como entrada de dados
// middleware usado para conseguirmos usar todos methods como get,post, put e delete com estruturas html
app.use(methodOverride('_method'))
//pasta public para puxar os arquivos estaticos como imagens, html(ejs) etc.
app.use(express.static('public'));


// ejs para testar o ulpload
app.set('view engine', 'ejs')
//app.engine('handlebars', exphbs());
//app.set('view engine', 'handlebars');

const RotaUsuario = require('./rotas/usuario');
const RotaComentario = require('./rotas/comentarios');
const RotaPost = require('./rotas/posts');
const RotaFilme = require('./rotas/filmes');
const RotaPagamento = require('./rotas/compra')
const RotaEmpresa = require('./rotas/dadosempresa')

app.get('/', function (req, res) {
  res.send('Hello World')
})
//Routa para os usuarios, cadastro, login e etc
app.use('/usuarios',RotaUsuario);
app.use('/comentarios',RotaComentario);
app.use('/posts',RotaPost);
app.use('/filmes',RotaFilme);
app.use('/pagamento',RotaPagamento);
app.use('/empresa',RotaEmpresa);

 


app.listen(3000,function(){
  console.log('Servidor rodando na url: http://localhost:3000/')
})