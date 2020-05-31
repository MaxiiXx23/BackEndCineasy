use Cineasy;
describe films;

insert into generos(genero)values('Fantasia');
describe generos;
alter table generos add fk_filme int;
alter table generos add foreign key (fk_filme) references films(id_films);
SELECT id_films,nome,nome_ori FROM films WHERE status_filme = 2 ;
SELECT nome, foto, status_filme FROM films limit 2;
select * from post;
delete id_films from films where id_films=1;
describe usuarios;
select* from films;
UPDATE films
SET foto = 'https://conteudo.imguol.com.br/blogs/312/files/2019/10/coringa-1570627206677_v2_1125x750-1024x683.jpg'
WHERE id_films=1;
UPDATE films
SET status_filme = 2
WHERE id_films=6;
select nome, fotoUser,capaUser from usuarios where id_user= 11;
select * from usuarios;
describe usuarios;
alter table usuarios add frase varchar(100);
update usuarios set fotoUser = '1584661437327-maxPuch.jpg'  where id_user = 11;
insert into usuarios(nome,fotoUser) values('Max Jonatas','http://localhost:3000/imgs/1583688845268-images.jpeg');

create table generos(
	id_genero int auto_increment primary key,
    genero varchar(200)
);
select* from films where id_films = 21;
DELETE FROM films WHERE id_films = 27;
describe generos;
describe films;
describe filmes_genero;
drop table generos;
drop table filmes_genero;
CREATE TABLE filmes_genero(
Id int auto_increment primary key,
IdFilms INT(5)UNSIGNED NOT NULL,
IdGenero INT(5)UNSIGNED NOT NULL
);
insert into generos(genero)values('Drama');
select * from films;
select * from generos;
select * from filmes_genero;
ALTER TABLE films ADD data_estreia varchar(10);
ALTER TABLE filmes_genero ADD FOREIGN KEY(IdFilms) REFERENCES films(id_films);
ALTER TABLE filmes_genero ADD FOREIGN KEY(IdGenero) REFERENCES generos(id_genero);
INSERT INTO filmes_genero(IdFilms, IdGenero) VALUES (1,4);
select films.nome,
       generos.genero
From films inner join filmes_genero
On films.id_films = filmes_genero.IdFilms
Inner join generos
On generos.id_genero = filmes_genero.IdGenero
where films.id_films =1;
ALTER TABLE films MODIFY COLUMN elenco varchar(200);
INSERT INTO films (nome,nome_ori,sinopse,foto,classficacao,duracao,trailler,diretor,distribuidor,elenco,pais_ori,status_filme) VAlUES(?,?,?,?,?,?,?,?,?,?,?,?);

UPDATE films SET nome = ?, nome_ori = ?, sinopse = ?, foto = ?,classficacao = ?,duracao = ?,trailler = ?,diretor= ?,distribuidor= ?,elenco = ?,elenco= ?,pais_ori = ?,status_filme = ? WHERE id_films = ? ;
delete from generos where id_genero  = 6;
describe post;
alter table post drop column data_post;
ALTER TABLE post
ADD COLUMN data_post date;
select * from post;
delete from post where id_post = 11;

SELECT id_post,nome,note,img,img_post,DATE_FORMAT( data_post, "%d/%m/%Y" ) as data_post,qntLikes,qntComent FROM post where data_post between '2020-04-1' and curdate() LIMIT 3;
SELECT COUNT(comentario) FROM comentarios INNER JOIN post ON post.id_post = comentarios.fk_post INNER JOIN usuarios ON usuarios.id_user = comentarios.fk_usuario WHERE comentarios.fk_post = 13 LIMIT 10;
SELECT id_comentario, comentario,usuarios.nome,post.qntLikes FROM comentarios INNER JOIN post ON post.id_post = comentarios.fk_post INNER JOIN usuarios ON usuarios.id_user = comentarios.fk_usuario WHERE comentarios.fk_post = 13  LIMIT 10;
select qntLikes from post where id_post = 13;
UPDATE post
SET qntComent = 0
WHERE id_post=15;
delete from usuarios where id_user = 46;
select * from usuarios;
select senha from usuarios where id_user = 47;
describe usuarios;
UPDATE usuarios
SET fotoUser = 'avatarperfil.png'
WHERE id_user=49;

describe amigos;
ALTER TABLE amigos ADD FOREIGN KEY(id_solicitante) REFERENCES usuarios(id_user);
ALTER TABLE amigos ADD FOREIGN KEY(id_solicitado) REFERENCES usuarios(id_user);
drop table amigos;
create table amigos(
	id_amigos int auto_increment primary key,
    id_solicitante int,
    id_solicitado int,
    situacao char(1)
);
select * from amigos;
select
amigos.id_amigos, 
usuarios.id_user,
usuarios.nome,
       usuarios.fotoUser
From amigos inner join usuarios
On (usuarios.id_user = amigos.id_solicitante AND amigos.id_solicitante != "51") OR (usuarios.id_user = amigos.id_solicitado AND amigos.id_solicitado != "51")
where ((amigos.id_solicitante = 51 and amigos.id_solicitado=51) or (amigos.id_solicitado = 51 and amigos.id_solicitante="51"))  and situacao = 'a';
SELECT * 
FROM amigos 
WHERE 
  ((id_solicitante = 50 and id_solicitado = 49) or (id_solicitante = 51 and id_solicitado = 49 )) and situacao = 'p';
  SELECT * 
FROM amigos 
WHERE 
  id_solicitante = 50 and situacao = 'a';
UPDATE amigos
SET situacao='p'
WHERE id_amigos = 10;

DELETE FROM amigos WHERE id_amigos=12;
select * from usuarios;
SELECT * 
FROM amigos 
WHERE 
  id_solicitado = 47 and situacao= 'p';
  
  
  drop table avaliacao;
  CREATE TABLE avaliacao(
Id_avalia int auto_increment primary key,
IdFilms INT(5)UNSIGNED NOT NULL,
IdUsuario INT(5)UNSIGNED NOT NULL,
rating int not null
);
select * from avaliacao;
delete from avaliacao where id_avalia = 1;
ALTER TABLE avaliacao ADD FOREIGN KEY(IdFilms) REFERENCES films(id_films);
ALTER TABLE avaliacao ADD FOREIGN KEY(IdUsuario) REFERENCES usuarios(id_user);

select * from like_post;
select * from post;
CREATE TABLE like_post(
Id_like int auto_increment primary key,
IdPost INT(5)UNSIGNED NOT NULL,
IdUsuario INT(5)UNSIGNED NOT NULL
);
ALTER TABLE like_post ADD FOREIGN KEY(IdPost) REFERENCES post(id_post);
ALTER TABLE like_post ADD FOREIGN KEY(IdUsuario) REFERENCES usuarios(id_user);
describe post;
ALTER TABLE usuarios
ADD tipo_user char(1);
select * from post;
select * from usuarios;
SELECT post.id_post,post.note,post.img_post,post.tipo_file,DATE_FORMAT( post.data_post, "%d/%m/%Y" ) as data_post,post.qntLikes,post.qntComent, 
usuarios.nomeFantasia as nomeFantasia, usuarios.fotoUser as fotoUser
FROM post
INNER JOIN usuarios
ON post.fk_usuario = usuarios.id_user where data_post between '${dataBetween}' and curdate() LIMIT 5;

SELECT post.id_post,post.note,post.img_post,post.tipo_file,DATE_FORMAT( post.data_post, "%d/%m/%Y" ) as data_post,post.qntLikes,post.qntComent, 
usuarios.nomeFantasia as nomeFantasia, usuarios.fotoUser as fotoUser
FROM post
INNER JOIN usuarios
ON post.fk_usuario = usuarios.id_user where post.fk_usuario = 58 order by data_post DESC limit 5;