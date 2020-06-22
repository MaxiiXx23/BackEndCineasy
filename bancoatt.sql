-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: cineasy
-- ------------------------------------------------------
-- Server version	5.7.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `amigos`
--

DROP TABLE IF EXISTS `amigos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `amigos` (
  `id_amigos` int(11) NOT NULL AUTO_INCREMENT,
  `id_solicitante` int(11) DEFAULT NULL,
  `id_solicitado` int(11) DEFAULT NULL,
  `situacao` char(1) DEFAULT NULL,
  PRIMARY KEY (`id_amigos`),
  KEY `id_solicitante` (`id_solicitante`),
  KEY `id_solicitado` (`id_solicitado`)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `amigos`
--

LOCK TABLES `amigos` WRITE;
/*!40000 ALTER TABLE `amigos` DISABLE KEYS */;
INSERT INTO `amigos` VALUES (10,50,51,'p'),(2,50,49,'p'),(20,47,11,'p'),(4,50,48,'p'),(19,50,47,'a'),(6,51,23,'p'),(7,51,23,'p'),(8,51,49,'p'),(9,51,50,'a'),(21,47,54,'p'),(17,47,51,'p'),(13,51,48,'p'),(14,51,11,'p'),(15,47,49,'p'),(22,56,47,'p'),(23,57,56,'p'),(24,57,56,'p'),(26,47,59,'a');
/*!40000 ALTER TABLE `amigos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `avaliacao`
--

DROP TABLE IF EXISTS `avaliacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `avaliacao` (
  `Id_avalia` int(11) NOT NULL AUTO_INCREMENT,
  `IdFilms` int(5) unsigned NOT NULL,
  `IdUsuario` int(5) unsigned NOT NULL,
  `rating` int(11) NOT NULL,
  PRIMARY KEY (`Id_avalia`),
  KEY `IdFilms` (`IdFilms`),
  KEY `IdUsuario` (`IdUsuario`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avaliacao`
--

LOCK TABLES `avaliacao` WRITE;
/*!40000 ALTER TABLE `avaliacao` DISABLE KEYS */;
INSERT INTO `avaliacao` VALUES (2,1,51,4),(3,2,51,3),(4,3,51,4),(5,1,56,4),(6,1,57,3),(7,1,47,5),(8,1,50,5),(9,18,47,3);
/*!40000 ALTER TABLE `avaliacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cinema`
--

DROP TABLE IF EXISTS `cinema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `cinema` (
  `id_cinema` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) DEFAULT NULL,
  `logo` varchar(200) DEFAULT NULL,
  `endereco` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_cinema`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cinema`
--

LOCK TABLES `cinema` WRITE;
/*!40000 ALTER TABLE `cinema` DISABLE KEYS */;
INSERT INTO `cinema` VALUES (1,'Moviecom','/img/logocine/moviecom.png','R. Borba Gato, 59 - Santo Amaro'),(2,'Moviecom','/img/logocine/moviecom.png','R. Dr. João Ribeiro , 304 - Penha'),(3,'Cinemark','/img/logocine/cinemark.jpg','Av. Cruzeiro do Sul, 1100 - Ponte Pequena'),(4,'Cinemark','/img/logocine/cinemark.jpg','R. Domingos de Agostim, 91 - Tatuapé'),(5,'Cinépolis','/img/logocine/cinepolis.png','Estrada da Pedrira, 0 - Itaquera'),(6,'Cinépolis','/img/logocine/cinepolis.png','Amador Bueno, 219 - Santo Amaro');
/*!40000 ALTER TABLE `cinema` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comentarios`
--

DROP TABLE IF EXISTS `comentarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `comentarios` (
  `id_comentario` int(11) NOT NULL AUTO_INCREMENT,
  `status_comentario` int(11) DEFAULT NULL,
  `comentario` text,
  `fk_usuario` int(11) DEFAULT NULL,
  `fk_post` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_comentario`),
  KEY `fk_usuario` (`fk_usuario`),
  KEY `fk_post` (`fk_post`)
) ENGINE=MyISAM AUTO_INCREMENT=132 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comentarios`
--

LOCK TABLES `comentarios` WRITE;
/*!40000 ALTER TABLE `comentarios` DISABLE KEYS */;
INSERT INTO `comentarios` VALUES (2,NULL,'o filme é muito daora',NULL,2),(15,NULL,'Filme incrivel demais nao vejo a hora de ve-lo kk',NULL,2),(18,NULL,'Oscar esta chegandoooooooo!!!',10,2),(19,NULL,'Não aguento mais adiamentossss!!!',11,13),(8,NULL,'Os zumbis ficaram surreais mano',NULL,3),(9,NULL,'ta em shooook coringo',NULL,2),(17,NULL,'Joaquin Felix ficou incrivel nesse papel!!!',9,2),(16,NULL,'O Coronga ficou brabissimo',11,2),(20,NULL,'Como assim?????!!! :(',11,13),(21,NULL,'affs Mais alguns meses de ansiedade...',11,13),(22,NULL,'Espero que não pfv Wanner',11,14),(23,NULL,'Mais um adiamento não!!! Affs',11,14),(24,NULL,'Já não  via a hora de assistir, triste dms :(',11,13),(25,NULL,'Wanner nao faça issoooo',11,14),(26,NULL,'Meu Deus, mais ummm',11,14),(27,NULL,'Como assim Marvel???? ',11,13),(28,NULL,'É... Terei que esperar :(',11,13),(29,NULL,'Não acredito',11,13),(30,NULL,'Viúva Negra e agora Shazam?',11,14),(31,NULL,'Shazam tbm???',11,14),(32,NULL,'Serio isso???',11,13),(33,NULL,'Afffffss velhooo. Não  via a hora de começar a nova saga',11,13),(34,NULL,'Aaaah não ',11,13),(35,NULL,'Coronavirus você passou dos limites!',11,13),(36,NULL,'Queria ver logo o inicio da nova saga',11,13),(37,NULL,'Faz isso como não marvel ',11,13),(38,NULL,'Coronavirus pfv  neh',11,14),(39,NULL,'What???? Não  vem essa Wanner',11,14),(40,NULL,'Shazam!!!',11,14),(41,NULL,'What?? Tomara que nao',11,14),(42,NULL,'Que isso? Ah não :(',11,14),(43,NULL,'Opaaa!!',11,15),(44,NULL,'Sensacional, quero assitir logo!',11,16),(45,NULL,'<3 Gal gadot',11,16),(46,NULL,'Incrível!',11,16),(113,NULL,'Queria muito ver esse filme nos cinemas',11,17),(119,NULL,'S2',46,29),(114,NULL,'Seria um filmaço!!!!',11,17),(120,NULL,'S3',46,29),(122,NULL,'Incrível ',11,29),(123,NULL,'Dgd',47,29),(124,NULL,'Gdhd',50,29),(125,NULL,'Kkk',50,30),(126,NULL,'Mt legal ',51,30),(129,NULL,'Foda pra caraiiii',56,33),(118,NULL,'Gal gadolt maravilhosa ',11,25),(131,NULL,'Fodase?',57,33);
/*!40000 ALTER TABLE `comentarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `filmes_genero`
--

DROP TABLE IF EXISTS `filmes_genero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `filmes_genero` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `IdFilms` int(5) unsigned NOT NULL,
  `IdGenero` int(5) unsigned NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `filmes_genero`
--

LOCK TABLES `filmes_genero` WRITE;
/*!40000 ALTER TABLE `filmes_genero` DISABLE KEYS */;
INSERT INTO `filmes_genero` VALUES (1,1,5),(2,1,4);
/*!40000 ALTER TABLE `filmes_genero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `films`
--

DROP TABLE IF EXISTS `films`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `films` (
  `id_films` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `nome_ori` varchar(50) NOT NULL,
  `sinopse` text NOT NULL,
  `genero` varchar(200) DEFAULT NULL,
  `foto` text,
  `classficacao` varchar(5) NOT NULL,
  `duracao` int(11) NOT NULL,
  `trailler` varchar(100) NOT NULL,
  `diretor` varchar(50) NOT NULL,
  `distribuidor` varchar(50) NOT NULL,
  `elenco` varchar(200) DEFAULT NULL,
  `pais_ori` varchar(50) NOT NULL,
  `status_filme` int(11) DEFAULT NULL,
  `data_estreia` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id_films`)
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `films`
--

LOCK TABLES `films` WRITE;
/*!40000 ALTER TABLE `films` DISABLE KEYS */;
INSERT INTO `films` VALUES (1,'Coringa','Joker','O comediante falido Arthur Fleck encontra violentos bandidos pelas ruas de Gotham City. Desconsiderado pela sociedade, Fleck começa a ficar louco e se transforma no criminoso conhecido como Coringa.','ficção','1585701261133-coringa.jpg','16',122,'jfVTJm9NilA','Todd Phillips','Warner Bros','Joaquin Phoenix, Robert De Niro, Zazie Beetz','Estados Unidos',2,NULL),(2,'Malévola - Dona do Mal','Maleficent: Mistress of Evi','Malévola e sua afilhada Aurora começam a questionar os complexos laços familiares que as prendem à medida que são puxadas em direções diferentes por casamentos, aliados inesperados e novas forças sombrias em jogo.','Fantasia,Aventura','1585787798303-malevola2.jpg','L',119,'nVyz6VjCSVA','Joachim Ronning','Walt Disney Studios','Elle Fanning, Angelina Jolie, Chiwetel Ejiofor','Estados Unidos',4,NULL),(3,'Zumbilândia - Atire Duas Vezes','Zombieland 2: Double Tap','Uma década depois de Zumbilândia se transformar em um hit cult, o elenco original \\n(Woody Harrelson, Jesse Eisenberg, Abigail Breslin e Emma Stone) se reúne ao diretor Ruben Fleischer (Venom) e roteiristas \\nRhett Reese & Paul Wernick (Deadpool) para Zumbilândia: Atire duas vezes. Na sequência, esses quatro caçadores devem seguir através do hilário \\ncaos que se espalhou desde a Casa Branca até o coração do país, para novamente combater os novos tipos de zumbis que evoluíram \\ndesde o primeiro filme; e também lidar com alguns sobreviventes humanos. Mas, acima de tudo, eles devem lidar com os problemas de relacionamento\\nque surgem em seu sarcástico e improvisado núcleo familiar.','Aventura,Terror','1585868631117-zumbilandia2.jpg','16',100,'-CmLc8dM9kY','Ruben Fleischer','Sony Pictures','Woody Harrelson, Jesse Eisenberg, Abigail Breslin','Estados Unidos',4,NULL),(4,'Star Wars: A Ascensão Skywalker','Star Wars: Episódio IX','Lucasfilm e o diretor J.J. Abrams juntam forças mais uma vez para levar os espectadores a uma jornada épica em uma galáxia muito, muito distante em Star Wars: A Ascensão Skywalker, a fascinante conclusão da saga Skywalker, na qual novas lendas nascerão e a batalha final pela liberdade ainda está por vir.','Aventura','1585870028726-starwars9.jpg','14',155,'jiRTfUYOHCs','J.J. Abrams','Walt Disney Studios','Daisy Ridley, Adam Driver, John Boyega','Estados Unidos',4,NULL),(6,'A Família Addams','The Addams Family','Prepare-se para estalar os dedos! A Família Addams está de volta às telonas na primeira animação de comédia sobre o clã mais excêntrico do pedaço. Engraçada, estranha e completamente icônica, A Família Addams redefine o que significa ser um bom vizinho.','Animação','1585870840790-familiaaddams.jpg','L',99,'3AM6A04zcAg','Conrad Vernon e Greg Tiernan','Universal Pictures Brasil','Charlize Theron, Oscar Isaac, Chloë Grace Moretz','Estados Unidos',4,NULL),(7,'Segredos Oficiais','Official Secrets','Depois de passar anos trabalhando como tradutora de mandarim para inglês, Katharine Gun tornou-se mundialmente famosa ao expôr segredos extremamente confidenciais da Agência de Segurança Nacional. Depois de obter acesso a memorandos secretos, ela foi capaz de provar que ocorreu uma grande pressão a seis países para que eles votassem a favor da invasão ao Iraque em 2003.','Policial','1585871916670-secredosoficiais.jpg','12',112,'65oJNmjuOos','Gavin Hood','Diamond Films','Keira Knightley, Matt Smith (IV) e Matthew Goode','Estados Unidos e Reino Unido',4,NULL),(14,'O Exterminador do Futuro: Destino Sombrio','Terminator: Dark Fate','Linda Hamilton (“Sarah Connor”) e Arnold Schwarzenegger (“T-800”) retornam aos seus papéis icônicos em #OExterminadorDoFuturoDestinoSombrio, dirigido por Tim Miller (Deadpool) e produzido pelo visionário cineasta James Cameron e David Ellison. Após os eventos de O Exterminador do Futuro 2: O Julgamento Final, O Exterminador Do Futuro: Destino Sombrio também conta com Mackenzie Davis, Natalia Reyes, Gabriel Luna e Diego Boneta.','Ficção,Ação','1585872787061-terminatordarkfate.jpg','14',128,'XZXufNKqJJI','Tim Miller','Fox Film','Arnold Schwarzenegger, Mackenzie Davis, Linda Hamilton, Diego Boneta, Gabriel Luna, Natalia Reyes','Estados Unidos',4,NULL),(15,'Dora e a Cidade Perdida','Dora and the Lost City of Gold','Tendo passado a maior parte de sua vida explorando a floresta com seus pais, nada poderia preparar Dora para a aventura mais perigosa de todos os tempos - o ensino médio. A aventureira Dora rapidamente se vê liderando o macaco Boots , o primo Diego, um misterioso habitante da selva, seus pais e um grupo de adolescentes em uma aventura para resolver um mistério impossível por trás de uma cidade perdida de ouro.','Fantasia,Aventura,Ficção,Ação','1585873190345-doraeacidadeperdida.jpg','10',120,'-9cmonLiCc4','James Bobin','Paramount','Isabela Moner, Michael Peña, Eva Longoria, Eugenio Derbez ','Estados Unidos',4,NULL),(16,'As Panteras','Charlie\'s Angels','A diretora Elizabeth Banks assume o controle de uma nova geração de destemidas Panteras. Na ousada visão de Banks; Kristen Stewart, Naomi Scott e Ella Balinska trabalham para o misterioso Charles Townsend, cuja agência de segurança se expandiu e agora tem atuação internacional. Contando com as mais brilhantes, corajosas e mais bem treinadas mulheres; diferentes times de Panteras sob o comando de múltiplos Bosleys assumem os trabalhos mais perigosos disponíveis pelo globo. O roteiro foi escrito por Elizabeth Banks a partir de uma história de Evan Spiliotopoulos e David Auburn.','Aventura,Ação','1585873432397-aspanteras.jpg','14',118,'kRhgc7uWItM','Elizabeth Banks','Sony Pictures','Elizabeth Banks, Naomi Scott, Kristen Stewart, Ella Balinska','Estados Unidos',4,NULL),(18,'A Ilha da Fantasia','Fantasy Island','Uma ilha mágica no meio do Oceano Pacífico oferece aos seus visitantes a possibilidade de realizar seus sonhos e viver aventuras que parecem impossíveis em qualquer outro lugar. Porém, como avisa o anfitrião da ilha, Sr. Roarke, realizar seus desejos pode não acontecer da maneira esperada.',NULL,'1585614402101-ailhadafantasia.jpg','16',122,'adkmIMpHyfU','Jeff Wadlow','Sony Pictures',NULL,'Estados Unidos',3,NULL);
/*!40000 ALTER TABLE `films` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `generos`
--

DROP TABLE IF EXISTS `generos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `generos` (
  `id_genero` int(11) NOT NULL AUTO_INCREMENT,
  `genero` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_genero`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `generos`
--

LOCK TABLES `generos` WRITE;
/*!40000 ALTER TABLE `generos` DISABLE KEYS */;
INSERT INTO `generos` VALUES (1,'Fantasia'),(2,'Aventura'),(3,'Terror'),(4,'Suspense'),(5,'Drama'),(7,'Animação'),(8,'Policial'),(9,'Ficção'),(10,'Ação');
/*!40000 ALTER TABLE `generos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `like_post`
--

DROP TABLE IF EXISTS `like_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `like_post` (
  `Id_like` int(11) NOT NULL AUTO_INCREMENT,
  `IdPost` int(5) unsigned NOT NULL,
  `IdUsuario` int(5) unsigned NOT NULL,
  PRIMARY KEY (`Id_like`),
  KEY `IdPost` (`IdPost`),
  KEY `IdUsuario` (`IdUsuario`)
) ENGINE=MyISAM AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like_post`
--

LOCK TABLES `like_post` WRITE;
/*!40000 ALTER TABLE `like_post` DISABLE KEYS */;
INSERT INTO `like_post` VALUES (15,33,47),(31,32,47),(29,39,47),(33,40,47),(19,34,47),(32,31,47);
/*!40000 ALTER TABLE `like_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `poltronas`
--

DROP TABLE IF EXISTS `poltronas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `poltronas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sala_id` int(11) NOT NULL,
  `local` varchar(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `poltronas`
--

LOCK TABLES `poltronas` WRITE;
/*!40000 ALTER TABLE `poltronas` DISABLE KEYS */;
/*!40000 ALTER TABLE `poltronas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `post` (
  `id_post` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(70) DEFAULT NULL,
  `note` varchar(150) DEFAULT NULL,
  `img` varchar(500) DEFAULT NULL,
  `img_post` varchar(1000) DEFAULT NULL,
  `qntLikes` int(11) DEFAULT NULL,
  `qntComent` int(11) DEFAULT NULL,
  `fk_usuario` int(11) DEFAULT NULL,
  `data_post` date DEFAULT NULL,
  `tipo_file` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_post`),
  KEY `fk_usuario` (`fk_usuario`)
) ENGINE=MyISAM AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (26,NULL,'Vingadores: Ultimato | Cena deletada mostra final alternativo para Natasha',NULL,'1586567351855-vingadoresalternativodq.png',1,0,1,'2020-04-10','image/png'),(17,NULL,'O filme do Ciborgue que nunca aconteceu',NULL,'1586303577526-2020-04-07-hyper-dq.png',4,2,1,'2020-04-07',NULL),(24,NULL,'Gif ',NULL,'1586545697721-gif-mulher-maravilha-5.gif',4,0,2,'2020-04-10','image/gif'),(25,NULL,'Mulher-Maravilha 1984 - Trailer Oficial',NULL,'1586559459269-Mulher-Maravilha 1984 - Trailer Oficial.mp4',2,2,1,'2020-04-10','video/mp4'),(16,NULL,'Mulher-Maravilha 1984 estampa revista alemã e ganha artes inéditas',NULL,'1586116550059-CAPA-mulher-maravilha_df9hIF3.png',10,3,1,'2020-04-05',NULL),(15,NULL,'Tenet | Tudo o que sabemos sobre o novo filme de Christopher Nolan',NULL,'1586102412205-2020-04-02-hyper-dq.png',28,1,1,'2020-04-05',NULL),(14,NULL,'Shazam! 2 pode ser adiado?',NULL,'1586024062535-shazam_2019.png',27,11,1,'2020-04-04',NULL),(12,NULL,'Viuva Negra vem ai! E ai, já pegou todas as referências?',NULL,'1585960551223-posterviuvanegra.jpg',NULL,NULL,1,NULL,NULL),(13,NULL,'Novo calendário do MCU após o Coronavírus',NULL,'1586021895685-destaque-marvel.jpg',21,13,1,'2020-04-04',NULL),(23,NULL,'asdasds',NULL,'1586545060331-justice_league_wonder_woman_png_by_stark3879-dbtz2eg.png',0,0,2,'2020-04-10','image/png'),(22,NULL,'Matt Reeves compara The Batman com Chinatown e diz querer filme emocionante',NULL,'1586539945209-the_batman_robert_2b_IHORbux.jpg',2,0,1,'2020-04-10','image/jpeg'),(27,NULL,'10 filmes que você (provavelmente) não sabia que são inspirados em quadrinhos',NULL,'1586818407645-capa_H8IBzTN.jpg',0,0,1,'2020-04-13','image/jpeg'),(28,NULL,'Novo calendário do MCU após o Coronavírus',NULL,'1586993043797-destaque-marvel.jpg',0,0,1,'2020-04-15','image/jpeg'),(29,NULL,'Nova foto de Mulher-Maravilha 1984',NULL,'1587311444934-CAPA-mulher-maravilha_df9hIF3.png',0,6,1,'2020-04-19','image/png'),(30,NULL,'Nova foto de Mulher-Maravilha 1984',NULL,'1587489278208-mm_eDAxxKC.jpg',0,2,2,'2020-04-21','image/jpeg'),(31,NULL,'Novo calendário do MCU após o Coronavírus',NULL,'1589494246958-destaque-marvel.jpg',2,0,55,'2020-05-14','image/jpeg'),(32,NULL,'Novo trailer Mulher-Maravilha 1984',NULL,'1589494372903-Mulher-Maravilha 1984 - Trailer Oficial (1).mp4',2,0,55,'2020-05-14','video/mp4'),(33,NULL,'Nova foto de Mulher-Maravilha 1984',NULL,'1590433379371-mm_eDAxxKC.jpg',3,2,1,'2020-05-25','image/jpeg'),(34,NULL,'Novo trailer Mulher-Maravilha 1984',NULL,'1590433456520-Mulher-Maravilha 1984 - Trailer Oficial.mp4',2,0,1,'2020-05-25','video/mp4'),(35,NULL,'Gif ',NULL,'1590536510320-gif-mulher-maravilha-5.gif',2,0,1,'2020-05-26','image/gif'),(36,NULL,'Nova foto de Mulher-Maravilha 1984',NULL,'1590539939413-mm_eDAxxKC.jpg',1,0,1,'2020-05-26','image/jpeg'),(37,NULL,'Novo calendário do MCU após o Coronavírus',NULL,'1590539961082-destaque-marvel.jpg',2,0,1,'2020-05-26','image/jpeg'),(38,NULL,'Nova foto de Mulher-Maravilha 1984',NULL,'1590955272542-CAPA-mulher-maravilha_df9hIF3.png',0,0,58,'2020-05-31','image/png'),(39,NULL,'Novo calendário do MCU após o Coronavírus',NULL,'1590958407727-destaque-marvel.jpg',1,0,59,'2020-05-31','image/jpeg'),(40,NULL,'Nova foto de Mulher-Maravilha 1984',NULL,'1591049902455-mm_eDAxxKC.jpg',1,0,59,'2020-06-01','image/jpeg'),(41,NULL,'Por que Vingadores: Era de Ultron é um dos filmes mais importantes do MCU',NULL,'1591222221898-2020-04-06-omeletv-dq.png',0,0,59,'2020-06-03','image/png'),(42,NULL,'Novo filme do Ciborg está chegando!',NULL,'1591316578766-2020-04-07-hyper-dq.png',0,0,60,'2020-06-04','image/png');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservas`
--

DROP TABLE IF EXISTS `reservas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `reservas` (
  `id_reserva` int(11) NOT NULL AUTO_INCREMENT,
  `poltrona_id` int(11) DEFAULT NULL,
  `sessao` int(11) DEFAULT NULL,
  `cliente_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_reserva`),
  KEY `poltrona_id` (`poltrona_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservas`
--

LOCK TABLES `reservas` WRITE;
/*!40000 ALTER TABLE `reservas` DISABLE KEYS */;
/*!40000 ALTER TABLE `reservas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seguir`
--

DROP TABLE IF EXISTS `seguir`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `seguir` (
  `id_seguir` int(11) NOT NULL AUTO_INCREMENT,
  `id_solicitante` int(11) DEFAULT NULL,
  `id_solicitado` int(11) DEFAULT NULL,
  `situacao` char(1) DEFAULT NULL,
  PRIMARY KEY (`id_seguir`),
  KEY `id_solicitante` (`id_solicitante`),
  KEY `id_solicitado` (`id_solicitado`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seguir`
--

LOCK TABLES `seguir` WRITE;
/*!40000 ALTER TABLE `seguir` DISABLE KEYS */;
INSERT INTO `seguir` VALUES (7,47,59,'a'),(6,56,59,'a'),(8,47,58,'a'),(9,47,60,'a');
/*!40000 ALTER TABLE `seguir` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessao`
--

DROP TABLE IF EXISTS `sessao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sessao` (
  `id_sessao` int(11) NOT NULL AUTO_INCREMENT,
  `id_rede` int(11) DEFAULT NULL,
  `horario` time DEFAULT NULL,
  `sala` varchar(4) DEFAULT NULL,
  PRIMARY KEY (`id_sessao`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessao`
--

LOCK TABLES `sessao` WRITE;
/*!40000 ALTER TABLE `sessao` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `usuarios` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) DEFAULT NULL,
  `email` varchar(60) DEFAULT NULL,
  `senha` varchar(60) DEFAULT NULL,
  `razaoSocial` varchar(100) DEFAULT NULL,
  `nomeFantasia` varchar(80) DEFAULT NULL,
  `cnpj` varchar(18) DEFAULT NULL,
  `fotoUser` varchar(255) DEFAULT NULL,
  `capaUser` varchar(255) DEFAULT NULL,
  `frase` varchar(100) DEFAULT NULL,
  `telefone` varchar(16) DEFAULT NULL,
  `FK_amigos` int(11) DEFAULT NULL,
  `tipo_user` char(1) DEFAULT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `email` (`email`),
  KEY `FK_amigos` (`FK_amigos`)
) ENGINE=MyISAM AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (55,'Cinemark','jonathan.darkisader3455@gmail.com','$2b$10$vyZfwkeLHQGNqpbYGqtUqeSZmlqqBxlZuUbz2QITCceDVfY2rUgSi',NULL,NULL,NULL,'avatarperfil.png',NULL,NULL,'5511962315462',NULL,NULL),(56,'Jhonathan Felix Braz','jhony.braz@hotmail.com','$2b$10$xjUVqU4q2vn6vMvGpjQD.elAeCJ9.7Rdy7EFNZNpatl8hnBZMCEBy',NULL,NULL,NULL,'1590433998753-Screenshot_20200525-161411_WhatsApp.jpg','1590433943649-images (4).jpeg','Wubba lubba dub dub','5511964315245',NULL,NULL),(11,'Max Jonatas','maxuel@gmail.com','$2b$05$BK/dUQPTslxERZL/KIBHQeHXkWr5Bd7sf.ARjKVukpgYAy9GPLF1u',NULL,NULL,NULL,'maxPuch.jpg','https://c4.wallpaperflare.com/wallpaper/700/524/23/mob-psycho-100-kageyama-ritsu-hd-wallpaper-preview.jpg','Com grandes poderes vem grandes responsabilidades',NULL,NULL,NULL),(54,'Felipe Augustus','felipe541clash@gmail.com','$2b$10$lSApJIdfs3uAbvasbfPTnuTFGP7t95qeE3dZRhq9Ncz.buvVFkZ9e',NULL,NULL,NULL,'avatarperfil.png',NULL,NULL,'5511962315462',NULL,NULL),(57,'Emerson Fernandes ','emersonfernandes.17@hotmail.com','$2b$10$ff6.uQkwi/7yX/TGPr1C3O5uSURXvw.vDSr5uD5JgMskBBRhmxxui',NULL,NULL,NULL,'1590435923227-images (13).jpeg','1590435869631-images (4).jpeg','Se melhor do que eu é fácil, difícil é ser pior.','5511967843125',NULL,NULL),(47,'Max Jonatas','max.232017@gmail.com','$2b$10$lJVIWG.SR3cnHEqssurMyuW6vYCEYpwVZgG7Q1JdEaOVCqkbJvZaO',NULL,NULL,NULL,'1591477595958-image-ce4a303e-ae42-4641-bd97-5e0d2e0c491e.jpg','1588728891812-FB_IMG_1586605373016.jpg','Homem-aranha!!','5511961248346',NULL,NULL),(50,'Kaique Junior','kaique.junior2014@gmail.com','$2b$10$SZ4DG2lJr8RxDTdmdZZC2u8lTzkYkHxbL.NBCZc7v.LM3Tq42FcRu',NULL,NULL,NULL,'1587499924996-Screenshot_20200420-010133_Facebook.jpg','1587502102676-images (8).jpeg',NULL,'5511964349734',NULL,NULL),(51,'Maxuel Silva','maxuel.barbeiro43@gmail.com','$2b$10$gWe.ZMlN1nvENRGiaSjrge1lqU5TiVokX8xXYFEWKsupSmlniw.ZK',NULL,NULL,NULL,'1588542625644-FB_IMG_1588423676985.jpg','1587502952000-images (8).jpeg','I\'ll be back.','11954872175',NULL,NULL),(58,NULL,'cinemark@gmail.com','$2b$10$/7ym.9rVo4YubcYJZfN0/upV/P6eRy6ZFOJBrCxoKYflBL9w70IVO','CINEMARK BRASIL S.A.','CINEMARK BRASIL','43.447.044/0004-10','1590959529725-cinr.jpg',NULL,NULL,'5511962315462',NULL,NULL),(59,'Cinépolis','cinepolis@gmail.com','$2b$10$8ggIDXUIo2PyZZlWK8MjJufSSS1HaHgL4SsHO3p7QLoXS4cylN8y6','CINEPOLIS OPERADORA DE CINEMAS DO BRASIL LTDA','Cinépolis','09.652.820/0001-32','1590959671893-cinepolislogo.png',NULL,'A maior rede de cinemas da América Latina!','5511962315462',NULL,NULL),(60,NULL,'moviecom@gmail.com','$2b$10$QzdbJdAXx4WuHTeIPiuguuaxkogOo2qdx.htnrLj645sBF/ZlmBy2','Movie Cinemas Ltda','Moviecom','09.652.820/0001-32','1591316453547-movicom.png',NULL,NULL,'5511962315462',NULL,'1');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'cineasy'
--

--
-- Dumping routines for database 'cineasy'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-22 18:47:51
