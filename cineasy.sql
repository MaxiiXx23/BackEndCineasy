CREATE TABLE amigos (
  id_amigos int(11) NOT NULL AUTO_INCREMENT,
  id_solicitante int(11) DEFAULT NULL,
  id_solicitado int(11) DEFAULT NULL,
  situacao char(1) DEFAULT NULL,
  PRIMARY KEY (id_amigos),
  KEY id_solicitante (id_solicitante),
  KEY id_solicitado (id_solicitado)
);

CREATE TABLE avaliacao (
  Id_avalia int(11) NOT NULL AUTO_INCREMENT,
  IdFilms int(5) unsigned NOT NULL,
  IdUsuario int(5) unsigned NOT NULL,
  rating int(11) NOT NULL,
  PRIMARY KEY (Id_avalia),
  KEY IdFilms (IdFilms),
  KEY IdUsuario (IdUsuario)
);

CREATE TABLE cinema (
  id_cinema int(11) NOT NULL AUTO_INCREMENT,
  nome varchar(100) DEFAULT NULL,
  logo varchar(200) DEFAULT NULL,
  endereco varchar(200) DEFAULT NULL,
  PRIMARY KEY (id_cinema)
);

CREATE TABLE comentarios (
  id_comentario int(11) NOT NULL AUTO_INCREMENT,
  status_comentario int(11) DEFAULT NULL,
  comentario text,
  fk_usuario int(11) DEFAULT NULL,
  fk_post int(11) DEFAULT NULL,
  PRIMARY KEY (id_comentario),
  KEY fk_usuario (fk_usuario),
  KEY fk_post (fk_post)
);

CREATE TABLE filmes_genero (
  Id int(11) NOT NULL AUTO_INCREMENT,
  IdFilms int(5) unsigned NOT NULL,
  IdGenero int(5) unsigned NOT NULL,
  PRIMARY KEY (Id)
);

CREATE TABLE films (
  id_films int(11) NOT NULL AUTO_INCREMENT,
  nome varchar(50) NOT NULL,
  nome_ori varchar(50) NOT NULL,
  sinopse text NOT NULL,
  genero varchar(200) DEFAULT NULL,
  foto text,
  classficacao varchar(5) NOT NULL,
  duracao int(11) NOT NULL,
  trailler varchar(100) NOT NULL,
  diretor varchar(50) NOT NULL,
  distribuidor varchar(50) NOT NULL,
  elenco varchar(200) DEFAULT NULL,
  pais_ori varchar(50) NOT NULL,
  status_filme int(11) DEFAULT NULL,
  data_estreia varchar(10) DEFAULT NULL,
  PRIMARY KEY (id_films)
);
ALTER TABLE films
ADD banner varchar(255);
desc films;
CREATE TABLE generos (
  id_genero int(11) NOT NULL AUTO_INCREMENT,
  genero varchar(200) DEFAULT NULL,
  PRIMARY KEY (id_genero)
);

CREATE TABLE like_post (
  Id_like int(11) NOT NULL AUTO_INCREMENT,
  IdPost int(5) unsigned NOT NULL,
  IdUsuario int(5) unsigned NOT NULL,
  PRIMARY KEY (Id_like),
  KEY IdPost (IdPost),
  KEY IdUsuario (IdUsuario)
);

CREATE TABLE poltronas (
  id int(11) NOT NULL AUTO_INCREMENT,
  sala_id int(11) NOT NULL,
  local varchar(4) DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE post (
  id_post int(11) NOT NULL AUTO_INCREMENT,
  nome varchar(70) DEFAULT NULL,
  note varchar(150) DEFAULT NULL,
  img varchar(500) DEFAULT NULL,
  img_post varchar(1000) DEFAULT NULL,
  qntLikes int(11) DEFAULT NULL,
  qntComent int(11) DEFAULT NULL,
  fk_usuario int(11) DEFAULT NULL,
  data_post date DEFAULT NULL,
  tipo_file varchar(100) DEFAULT NULL,
  PRIMARY KEY (id_post),
  KEY fk_usuario (fk_usuario)
);

CREATE TABLE reservas (
  id_reserva int(11) NOT NULL AUTO_INCREMENT,
  poltrona_id int(11) DEFAULT NULL,
  sessao int(11) DEFAULT NULL,
  cliente_id int(11) DEFAULT NULL,
  PRIMARY KEY (id_reserva),
  KEY poltrona_id (poltrona_id)
);

CREATE TABLE seguir (
  id_seguir int(11) NOT NULL AUTO_INCREMENT,
  id_solicitante int(11) DEFAULT NULL,
  id_solicitado int(11) DEFAULT NULL,
  situacao char(1) DEFAULT NULL,
  PRIMARY KEY (id_seguir),
  KEY id_solicitante (id_solicitante),
  KEY id_solicitado (id_solicitado)
);

CREATE TABLE sessao (
  id_sessao int(11) NOT NULL AUTO_INCREMENT,
  id_rede int(11) DEFAULT NULL,
  horario time DEFAULT NULL,
  sala varchar(4) DEFAULT NULL,
  PRIMARY KEY (id_sessao)
);

CREATE TABLE usuarios (
  id_user int(11) NOT NULL AUTO_INCREMENT,
  nome varchar(50) DEFAULT NULL,
  email varchar(60) DEFAULT NULL,
  senha varchar(60) DEFAULT NULL,
  razaoSocial varchar(100) DEFAULT NULL,
  nomeFantasia varchar(80) DEFAULT NULL,
  cnpj varchar(18) DEFAULT NULL,
  fotoUser varchar(255) DEFAULT NULL,
  capaUser varchar(255) DEFAULT NULL,
  frase varchar(100) DEFAULT NULL,
  telefone varchar(16) DEFAULT NULL,
  FK_amigos int(11) DEFAULT NULL,
  tipo_user char(1) DEFAULT NULL,
  PRIMARY KEY (id_user),
  UNIQUE KEY email (email),
  KEY FK_amigos (FK_amigos)
);
CREATE TABLE compra_plano (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    fk_user int,
    plano char(1),
    cartao varchar(150),
    CPF varchar (19),
    data_compra date,
    FOREIGN KEY (fk_user) REFERENCES usuarios(id_user)
); 