CREATE DATABASE  IF NOT EXISTS `tov_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `tov_db`;
-- MySQL dump 10.13  Distrib 8.0.36, for macos14 (x86_64)
--
-- Host: localhost    Database: tov_db
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `all_groups`
--

DROP TABLE IF EXISTS `all_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `all_groups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `about` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `all_groups`
--

LOCK TABLES `all_groups` WRITE;
/*!40000 ALTER TABLE `all_groups` DISABLE KEYS */;
INSERT INTO `all_groups` VALUES (1,'cats','cute cats');
/*!40000 ALTER TABLE `all_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment_to_post`
--

DROP TABLE IF EXISTS `comment_to_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment_to_post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `comment_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `comment_to_post_fk2` (`comment_id`),
  KEY `idx` (`post_id`,`comment_id`),
  CONSTRAINT `comment_to_post_fk1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
  CONSTRAINT `comment_to_post_fk2` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_to_post`
--

LOCK TABLES `comment_to_post` WRITE;
/*!40000 ALTER TABLE `comment_to_post` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment_to_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `text` text NOT NULL,
  `ref_to_comment` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `comments_fk1` (`user_id`),
  KEY `comments_fk3` (`ref_to_comment`),
  CONSTRAINT `comments_fk1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `comments_fk3` FOREIGN KEY (`ref_to_comment`) REFERENCES `comments` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groups_to_posts`
--

DROP TABLE IF EXISTS `groups_to_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groups_to_posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `groups_to_posts_fk2` (`group_id`),
  KEY `idx` (`post_id`,`group_id`),
  CONSTRAINT `groups_to_posts_fk1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
  CONSTRAINT `groups_to_posts_fk2` FOREIGN KEY (`group_id`) REFERENCES `all_groups` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups_to_posts`
--

LOCK TABLES `groups_to_posts` WRITE;
/*!40000 ALTER TABLE `groups_to_posts` DISABLE KEYS */;
/*!40000 ALTER TABLE `groups_to_posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comment_id` int DEFAULT NULL,
  `post_id` int DEFAULT NULL,
  `likes_cnt` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `likes_fk1` (`comment_id`),
  KEY `likes_fk2` (`post_id`),
  CONSTRAINT `likes_fk1` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`id`),
  CONSTRAINT `likes_fk2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `post_date` date NOT NULL,
  `public` tinyint(1) NOT NULL DEFAULT '0',
  `post_content` varchar(255) NOT NULL,
  `background` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `posts_fk1` (`user_id`),
  KEY `posts_fk5` (`background`),
  CONSTRAINT `posts_fk1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `posts_fk5` FOREIGN KEY (`background`) REFERENCES `tovit_backgrounds` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (4,7,'2024-12-31',1,'\"adva ohana\"',2),(6,7,'2024-12-18',1,'\"shmuel atar\"',2),(7,7,'2024-12-03',1,'njfrne nejwfn',2),(9,7,'2024-12-20',0,'We just having fun',2),(10,7,'2024-12-23',0,'SADASD%DF1%F23F%23F%23F%23%1D1%asdasd%d12%asdsad%asdsad%שדגשדגדשג%sadasdsad',2),(11,7,'2024-12-23',0,'SADASD%DF1%F23F%23F%23F%23%1D1%asdasd%d12%asdsad%asdsad%שדגשדגדשג%sadasdsad',2),(12,7,'2024-12-23',0,'SADASD%DF1%F23F%23F%23F%23%1D1%asdasd%d12%asdsad%asdsad%שדגשדגדשג%sadasdsad',2),(13,7,'2024-12-23',0,'SADASD%DF1%F23F%23F%23F%23%1D1%asdasd%d12%asdsad%asdsad%שדגשדגדשג%sadasdsad',2),(14,7,'2024-12-23',0,'SADASD%DF1%F23F%23F%23F%23%1D1%asdasd%d12%asdsad%asdsad%שדגשדגדשג%sadasdsad',2),(15,7,'2024-12-31',0,'asdasd%dasdsa',2),(16,7,'2025-01-01',0,'asdasd%asd%asdf%assf',2),(19,7,'2025-01-02',0,'sdfsdfsdf%5h%2222',2),(23,7,'2024-12-27',0,'dasdsads',2),(26,7,'2025-01-07',1,'sadsad%fefwefw',2),(27,7,'2025-01-09',0,'dsadasd%wqeqweqwr%r2%rf32%f3g%ggiu',2),(28,7,'2025-01-10',0,'asdasd%asdasdsad',2),(30,7,'2025-01-12',0,'buibinino',2),(31,7,'2025-01-13',0,'buibinino%dshsodjdsjos%sddsfds%fdsf%dsf%dsf%wefw%ef%wef%we%fw%ef%wef%wfwe%fwe%fwef%wef%we%gew%wwefwf%asdadads',2),(40,7,'2025-01-14',0,'sadsaf f2 2%f2%3f23%f2%3f%2f%23f%32f',1);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tovit_backgrounds`
--

DROP TABLE IF EXISTS `tovit_backgrounds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tovit_backgrounds` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tovit_backgrounds`
--

LOCK TABLES `tovit_backgrounds` WRITE;
/*!40000 ALTER TABLE `tovit_backgrounds` DISABLE KEYS */;
INSERT INTO `tovit_backgrounds` VALUES (1,'https://www.photo-art.co.il/wp-content/uploads/2015/09/BY1A4457.jpg'),(2,'https://www.photo-art.co.il/wp-content/uploads/2015/06/BY1A48501.jpg');
/*!40000 ALTER TABLE `tovit_backgrounds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_types`
--

DROP TABLE IF EXISTS `user_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_types`
--

LOCK TABLES `user_types` WRITE;
/*!40000 ALTER TABLE `user_types` DISABLE KEYS */;
INSERT INTO `user_types` VALUES (1,'owner');
/*!40000 ALTER TABLE `user_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_type` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `country` varchar(255) NOT NULL,
  `img_path` varchar(255) DEFAULT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `last_login_date` date NOT NULL,
  `login_cnt` int NOT NULL,
  `last_post_time` date NOT NULL,
  `tovit_template` int NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `defIsPublic` tinyint(1) NOT NULL DEFAULT '0',
  `defTheme` varchar(255) NOT NULL DEFAULT 'dark',
  PRIMARY KEY (`id`),
  KEY `users_fk1` (`user_type`),
  KEY `users_fk13` (`tovit_template`),
  CONSTRAINT `users_fk1` FOREIGN KEY (`user_type`) REFERENCES `user_types` (`id`),
  CONSTRAINT `users_fk13` FOREIGN KEY (`tovit_template`) REFERENCES `tovit_backgrounds` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (7,1,'test1@test1.com','123','adva','ohana','5245569','israel','654685','dshdjskd','2024-11-29',56,'2024-11-29',2,'',0,'dark'),(8,1,'test@test.com','234','אדווה','אוחנה','5245569','israel','654685','dshdjskd','2024-11-29',56,'2024-11-29',2,'adva123',1,'dark');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_to_groups`
--

DROP TABLE IF EXISTS `users_to_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_to_groups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `groupId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `users_to_groups_fk1` (`userId`),
  KEY `users_to_groups_fk2` (`groupId`),
  CONSTRAINT `users_to_groups_fk1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `users_to_groups_fk2` FOREIGN KEY (`groupId`) REFERENCES `all_groups` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_to_groups`
--

LOCK TABLES `users_to_groups` WRITE;
/*!40000 ALTER TABLE `users_to_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_to_groups` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-16 17:18:32
