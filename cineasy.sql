create database cineasy;
use cineasy;
-- drop database cineasy;
 show tables;
 
create table cinema(
	id_cinema int primary key auto_increment,
    fk_usuario int,
    fk_endereco_cinema int
);

create table categoria_filme(
	id_categoria int primary key auto_increment,
    categoria varchar (30)
  
);
create table filmes(
	id_filme int primary key auto_increment,
    nome_filme varchar (80),
    sinopse text (100),
    diretor varchar (80),
    classificacao varchar (5),
    duracao int,
    elenco varchar (200),
    data_lancamento date,
    poster varchar (250),
    status_filme int,
    trailer varchar(250),
    fk_categoria int
);

create table sessao(
	id_sessao int primary key auto_increment,
    horario varchar (9),
    tipo_sessao char (3),
    preco decimal (4,2),
    fk_cinema int,
    fk_filme int,
    fk_sala int
);

create table ingresso(
	id_ingresso int primary key auto_increment,
    fk_usuario int,
    fk_filme int,
    fk_sessao int,
    fk_sala int
);
create table pagamento(
	id_pagamento int primary key auto_increment,
    bandeira_cartao varchar (50),
    nome_user varchar(50),
    sobrenome_user varchar (50),
    validade date,
    cod_seguranca varchar (5),
    fk_endereco_cinema int
);

create table post(
	id_post int primary key auto_increment,
    titulo varchar (150),
    descricacao text,
    data_post date,
    fk_usuario int
);

create table comentario(
	id_comentario int primary key auto_increment,
    comentarios text,
    status_aprov int,
    data_comentario date,
	fk_post int,
    fk_usuario int
);
create table usuarios(
	id_usuarios int primary key auto_increment,
    nome varchar(80),
    razao_social varchar(100),
    email varchar(80),
    foto text,
    endereco varchar (50),
    fk_end int,
    fk_pag int
);

create table endereco_user(
	id_end int primary key auto_increment,
    estado char(2),
    bairro varchar(50),
    rua varchar(50),
    numero int,
    cep int
);

create table endereco_cine(
	id_end_cine int primary key auto_increment,
	estado char(2),
    bairro varchar(50),
    rua varchar(50),
    numero int,
    cep int
);

create table sala(
	id_sala int primary key auto_increment,
    fila char(1),
    lugar int,
    status_assento int,
    num_sala int
);
   ALTER TABLE cinema ADD COLUMN ligacao INT; ALTER TABLE cinema ADD FOREIGN KEY (ligacao) REFERENCES sessao (id_sessao);
   
   ALTER TABLE categoria_filme ADD COLUMN ligacao INT; ALTER TABLE categoria_filme ADD FOREIGN KEY (ligacao) REFERENCES filmes (id_filme);
   
   ALTER TABLE filmes ADD COLUMN ligacao INT; ALTER TABLE filmes ADD FOREIGN KEY (ligacao) REFERENCES ingresso (id_ingresso);
   
   ALTER TABLE sessao ADD COLUMN ligacao INT; ALTER TABLE sessao ADD FOREIGN KEY (ligacao) REFERENCES sala (id_sala);
   
   ALTER TABLE ingresso ADD COLUMN ligacao INT; ALTER TABLE ingresso ADD FOREIGN KEY (ligacao) REFERENCES usuarios (id_usuarios);
   
   ALTER TABLE pagamento ADD COLUMN ligacao INT; ALTER TABLE pagamento ADD FOREIGN KEY (ligacao) REFERENCES usuarios (id_usuarios);
   
   ALTER TABLE pagamento ADD COLUMN ligacao2 INT; ALTER TABLE pagamento ADD FOREIGN KEY (ligacao2) REFERENCES endereco_user (id_end);
   
   ALTER TABLE comentario ADD COLUMN ligacao INT; ALTER TABLE comentario ADD FOREIGN KEY (ligacao) REFERENCES post (id_post);
   
   ALTER TABLE usuarios ADD COLUMN ligacao INT; ALTER TABLE usuarios ADD FOREIGN KEY (ligacao) REFERENCES comentario (id_comentario);
   
   ALTER TABLE usuarios ADD COLUMN ligacao2 INT; ALTER TABLE usuarios ADD FOREIGN KEY (ligacao2) REFERENCES post (id_post);
   
   ALTER TABLE endereco_user ADD COLUMN ligacao INT; ALTER TABLE endereco_user ADD FOREIGN KEY (ligacao) REFERENCES usuarios (id_usuarios);
   
   ALTER TABLE endereco_cine ADD COLUMN ligacao INT; ALTER TABLE endereco_cine ADD FOREIGN KEY (ligacao) REFERENCES cinema (id_cinema);

