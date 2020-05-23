use Cineasy;
describe usuarios;
show tables;
CREATE TABLE poltronas (
    id int auto_increment ,
    sala_id int not null,
    local varchar(4),
    primary key(id)
);
DROP TABLE reservas;
CREATE TABLE sessao (
	id_sessao int auto_increment primary key,
    id_rede		int,
    horario		TIME,
    sala varchar(4)
);
CREATE TABLE reservas (
    id_reserva int auto_increment primary key,
    poltrona_id int,
    sessao int,
    cliente_id integer null,
    foreign key (poltrona_id) references poltronas(id)
);