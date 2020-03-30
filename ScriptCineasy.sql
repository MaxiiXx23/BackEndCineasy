describe films;
create table generos(
	id_genero int auto_increment primary key,
    genero varchar(200)
);
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
