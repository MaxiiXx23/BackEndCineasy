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
) ENGINE=MyISAM AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comentarios`
--

LOCK TABLES `comentarios` WRITE;
/*!40000 ALTER TABLE `comentarios` DISABLE KEYS */;
INSERT INTO `comentarios` VALUES (2,NULL,'o filme é muito daora',NULL,2),(15,NULL,'Filme incrivel demais nao vejo a hora de ve-lo kk',NULL,2),(18,NULL,'Oscar esta chegandoooooooo!!!',10,2),(19,NULL,'Não aguento mais adiamentossss!!!',11,13),(8,NULL,'Os zumbis ficaram surreais mano',NULL,3),(9,NULL,'ta em shooook coringo',NULL,2),(17,NULL,'Joaquin Felix ficou incrivel nesse papel!!!',9,2),(16,NULL,'O Coronga ficou brabissimo',11,2),(20,NULL,'Como assim?????!!! :(',11,13),(21,NULL,'affs Mais alguns meses de ansiedade...',11,13),(22,NULL,'Espero que não pfv Wanner',11,14),(23,NULL,'Mais um adiamento não!!! Affs',11,14),(24,NULL,'Já não  via a hora de assistir, triste dms :(',11,13),(25,NULL,'Wanner nao faça issoooo',11,14),(26,NULL,'Meu Deus, mais ummm',11,14),(27,NULL,'Como assim Marvel???? ',11,13),(28,NULL,'É... Terei que esperar :(',11,13),(29,NULL,'Não acredito',11,13),(30,NULL,'Viúva Negra e agora Shazam?',11,14),(31,NULL,'Shazam tbm???',11,14),(32,NULL,'Serio isso???',11,13),(33,NULL,'Afffffss velhooo. Não  via a hora de começar a nova saga',11,13),(34,NULL,'Aaaah não ',11,13),(35,NULL,'Coronavirus você passou dos limites!',11,13),(36,NULL,'Queria ver logo o inicio da nova saga',11,13),(37,NULL,'Faz isso como não marvel ',11,13),(38,NULL,'Coronavirus pfv  neh',11,14),(39,NULL,'What???? Não  vem essa Wanner',11,14),(40,NULL,'Shazam!!!',11,14),(41,NULL,'What?? Tomara que nao',11,14),(42,NULL,'Que isso? Ah não :(',11,14),(43,NULL,'Opaaa!!',11,15),(44,NULL,'Sensacional <3',11,16),(45,NULL,'<3',11,16);
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
  PRIMARY KEY (`id_post`),
  KEY `fk_usuario` (`fk_usuario`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (16,NULL,'Mulher-Maravilha 1984 estampa revista alemã e ganha artes inéditas',NULL,'1586116550059-CAPA-mulher-maravilha_df9hIF3.png',5,2,1,'2020-04-05'),(15,NULL,'Tenet | Tudo o que sabemos sobre o novo filme de Christopher Nolan',NULL,'1586102412205-2020-04-02-hyper-dq.png',25,1,1,'2020-04-05'),(14,NULL,'Shazam! 2 pode ser adiado?',NULL,'1586024062535-shazam_2019.png',27,11,1,'2020-04-04'),(12,NULL,'Viuva Negra vem ai! E ai, já pegou todas as referências?',NULL,'1585960551223-posterviuvanegra.jpg',NULL,NULL,1,NULL),(13,NULL,'Novo calendário do MCU após o Coronavírus',NULL,'1586021895685-destaque-marvel.jpg',21,13,1,'2020-04-04');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
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
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,NULL,'max.232017@gmail.com','$2b$10$3qNXqH/8cIBpW3rxxShvYuRMDTTzJjUh3D81jfCcYy2eu46k2qR2W',NULL,NULL,NULL,NULL,NULL,NULL),(2,NULL,'maxcorno.232017@gmail.com','$2b$10$qncFHdGt/YiOI/8YyJMJiOBaHCTaP5Wl1y9eN49xpX69XL3K9HwZO',NULL,NULL,NULL,NULL,NULL,NULL),(3,NULL,'maxjonatas.232017@gmail.com','$2b$05$5HzSbIzk1CYuel3za6nw0e39FGUyhJPnLhdfJH02IP1MU1NbYQCj.',NULL,NULL,NULL,NULL,NULL,NULL),(4,NULL,'maxjonatdas.232017@gmail.com','$2b$05$rxiW/Ekt4QS0MSrf6K9KPe.QAaH0NDX9uJ0xQeYGWHHQUf8mOYC6m',NULL,NULL,NULL,NULL,NULL,NULL),(5,NULL,'maxjotdas.232017@gmail.com','$2b$05$LXu6WcnnjIBwPMzsTq7MKOJ.c8nhI6uH8475mFDiFW.lbpq5vg.p.',NULL,NULL,NULL,NULL,NULL,NULL),(6,NULL,'maxdas.232017@gmail.com','$2b$05$j9lqIlDuT9.AjZE1FLfEIOYFqKpbaQb3qwHfwO4WvGJqkruX3gxYq',NULL,NULL,NULL,NULL,NULL,NULL),(7,NULL,'mass.232017@gmail.com','$2b$05$aJnoZulLvalta/VmSyyGUOD7di/bfEd4FX.eKXEkQTQRZyUlI4Zhy',NULL,NULL,NULL,NULL,NULL,NULL),(8,NULL,'ruths.232017@gmail.com','$2b$05$OPopTHq7nZS1EQK3mawk6.eZDFQ11mCLRzVs0MkUVAfBPytUo0UXm',NULL,NULL,NULL,NULL,NULL,NULL),(9,NULL,'max23@gmail','$2b$05$lrQPq234VPCS2QQbWgxhze8tLBTeOx51k6auy5iwtrYBfJ/1fX8kW',NULL,NULL,NULL,NULL,NULL,NULL),(10,NULL,'max23@gmail.com','$2b$05$W9GPeCUy/xlRfvqmYLC3BOrDKOLQKtPMJhUNc12Ug0q/aSZGKFXTC',NULL,NULL,NULL,NULL,NULL,NULL),(11,'Max Jonatas','maxuel@gmail.com','$2b$05$BK/dUQPTslxERZL/KIBHQeHXkWr5Bd7sf.ARjKVukpgYAy9GPLF1u',NULL,NULL,NULL,'1584661437327-maxPuch.jpg','https://c4.wallpaperflare.com/wallpaper/700/524/23/mob-psycho-100-kageyama-ritsu-hd-wallpaper-preview.jpg','Com grandes poderes vem grandes responsabilidades'),(12,NULL,'kaique@gmail.com','$2b$05$hUG2A9eCFCCZrjfUVVz/huXmoeS5SrFc9WtBWGgi4XHIbB8w06UJm',NULL,NULL,NULL,NULL,NULL,NULL),(13,NULL,'michaelle@gmail.com','$2b$05$fgBIDkQOg12GqgMgkpnxG.jWDO3hh5a1zZeA.CRV.87UKUTSmES56',NULL,NULL,NULL,NULL,NULL,NULL),(14,NULL,'thais@gmail.com','$2b$05$hRVu.4Ica9BlRRqghg8YTuFLkwzyP62927Wj99dz886Qd/t6HRKyS',NULL,NULL,NULL,NULL,NULL,NULL),(15,NULL,'pedro@gmail.com','$2b$05$ZO28IIyD1KCI1DQSJCike.ktxHbrnA2.UsQkIOzl2h08Xlf9lit7u',NULL,NULL,NULL,NULL,NULL,NULL),(16,NULL,'felipe@gmail.com','$2b$05$WgYN1siauI0BJs/w3jHm7.QxEph6TMSvcUnALmCsQvKdg08KY6N4W',NULL,NULL,NULL,NULL,NULL,NULL),(17,NULL,'thwane@gmail.com','$2b$05$qkLTPyfj.UaFJV/9SjlquubPpw2dOxiUvixH8nZoT4u9D52iHQ97S',NULL,NULL,NULL,NULL,NULL,NULL),(18,NULL,'thwane2@gmail.com','$2b$05$SPnB4XDKG2Ek1xVUIR/2xec1H6GM6U.pNuN0J.Tlbqm6IIUuyvuFq',NULL,NULL,NULL,NULL,NULL,NULL),(19,NULL,'thwane3@gmail.com','$2b$05$u5aOOP.v4WcRIjHhTY58vOjXLg0746R55bK5KO0yp.wqO/pubAWhq',NULL,NULL,NULL,NULL,NULL,NULL),(20,NULL,'max3@gmail.com','$2b$05$1HuJRu./04ruJGrJHweR1e/sbtRydiRnmdspihOgqcyKNhNXQ75gS',NULL,NULL,NULL,NULL,NULL,NULL),(21,NULL,'max35@mail.com','$2b$05$eErHnFH47MrtE5qDlefVHeVsUjEhr7sYXAqWNHd3XEnwVFWmfw6fy',NULL,NULL,NULL,NULL,NULL,NULL),(22,NULL,'maxtest@gmail.com','$2b$05$vuAYSNGwTNVf680qMLu0G.fKE5/eJEJ/R0bn7Q.QflD487AyTGl/q',NULL,NULL,NULL,NULL,NULL,NULL),(23,'Max Jonatas',NULL,NULL,NULL,NULL,NULL,'http://localhost:3000/imgs/1583688845268-images.jpeg',NULL,NULL);
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

-- Dump completed on 2020-04-05 20:59:16
