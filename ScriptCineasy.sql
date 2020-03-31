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
select* from films where id_films = 18;
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
select * from generos;
select * from filmes_genero;
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


