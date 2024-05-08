CREATE DATABASE  IF NOT EXISTS `db_homies2` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci */;
USE `db_homies2`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: db_homies2
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

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
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'nike','2024-02-24 22:55:21','2024-02-24 22:55:21'),(2,'adidas','2024-02-24 22:55:26','2024-02-24 22:55:26'),(3,'puma','2024-02-24 22:55:36','2024-02-24 22:55:36'),(4,'levis','2024-02-24 22:56:01','2024-02-24 22:56:01');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'hombre','2024-02-24 22:56:20','2024-02-24 22:56:20'),(2,'mujer','2024-02-24 22:56:25','2024-02-24 22:56:25'),(3,'niño','2024-02-24 22:56:30','2024-02-24 22:56:30'),(4,'niña','2024-02-24 22:56:32','2024-02-24 22:56:32'),(5,'bebe','2024-02-24 22:56:36','2024-02-24 22:56:36');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colors`
--

DROP TABLE IF EXISTS `colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `colors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colors`
--

LOCK TABLES `colors` WRITE;
/*!40000 ALTER TABLE `colors` DISABLE KEYS */;
INSERT INTO `colors` VALUES (1,'azul','2024-02-24 22:57:06','2024-02-24 22:57:06'),(2,'rojo','2024-02-24 22:57:11','2024-02-24 22:57:11'),(3,'amarillo','2024-02-24 22:57:18','2024-02-24 22:57:18'),(4,'verde','2024-02-24 22:57:24','2024-02-24 22:57:24'),(5,'blanco','2024-02-24 22:57:33','2024-02-24 22:57:33'),(6,'negro','2024-02-24 22:57:39','2024-02-24 22:57:39');
/*!40000 ALTER TABLE `colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(255) NOT NULL,
  `product_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,'product-1705525912189.jpg',1,'2024-02-28 21:48:41','2024-02-28 21:48:41'),(2,'product-1710984280150.jpg',15,'2024-03-21 01:24:40','2024-03-21 01:24:40'),(3,'product-1712016785883.jpg',34,'2024-04-02 00:13:05','2024-04-02 00:13:05'),(4,'product-1712016990870.jpg',35,'2024-04-02 00:16:30','2024-04-02 00:16:30'),(5,'product-1712702871108.jpg',36,'2024-04-02 00:18:34','2024-04-09 22:47:51'),(6,'product-1712017235676.jpg',37,'2024-04-02 00:20:35','2024-04-02 00:20:35'),(7,'product-1712017674056.jpg',39,'2024-04-02 00:27:54','2024-04-02 00:27:54'),(8,'product-1712018212118.jpg',40,'2024-04-02 00:36:52','2024-04-02 00:36:52'),(9,'product-1712018437430.jpg',41,'2024-04-02 00:40:37','2024-04-02 00:40:37'),(10,'product-1712018623675.jpg',42,'2024-04-02 00:43:43','2024-04-02 00:43:43'),(11,'product-1712018690722.jpg',43,'2024-04-02 00:44:50','2024-04-02 00:44:50'),(12,'product-1712716394716.jpg',44,'2024-04-02 00:48:26','2024-04-10 02:33:14'),(13,'product-1712071812287.jpg',50,'2024-04-02 15:30:12','2024-04-02 15:30:12'),(14,'product-1712693529889.jpg',51,'2024-04-09 20:12:09','2024-04-09 20:12:09'),(15,'product-1712697230707.jpg',52,'2024-04-09 21:13:50','2024-04-09 21:13:50'),(16,'product-1712698451873.jpg',53,'2024-04-09 21:34:11','2024-04-09 21:34:11'),(17,'product-1712702697546.jpg',54,'2024-04-09 21:40:19','2024-04-09 22:44:57'),(18,'product-1712711013995.jpg',55,'2024-04-10 00:59:32','2024-04-10 01:03:34'),(19,'product-1712716308614.jpg',56,'2024-04-10 02:31:48','2024-04-10 02:31:48');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES ('20240213193103-create-rol.js'),('20240213214828-create-table-users.js'),('20240213223015-create-table-category.js'),('20240213224242-create-table-brand.js'),('20240213230958-create-table-product.js'),('20240213231937-create-table-images.js'),('20240213233103-create-table-color.js'),('20240213234335-create-table-product_color.js'),('20240213235951-create-table-size.js'),('20240214002011-create-table-product_size.js');
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_color`
--

DROP TABLE IF EXISTS `product_color`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_color` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `color_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `color_id` (`color_id`),
  CONSTRAINT `product_color_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `product_color_ibfk_2` FOREIGN KEY (`color_id`) REFERENCES `colors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_color`
--

LOCK TABLES `product_color` WRITE;
/*!40000 ALTER TABLE `product_color` DISABLE KEYS */;
INSERT INTO `product_color` VALUES (1,1,2,'2024-02-26 21:02:04','2024-02-26 21:02:04'),(2,1,3,'2024-02-26 21:02:09','2024-02-26 21:02:09'),(3,32,6,'2024-04-02 00:01:25','2024-04-02 00:01:25'),(4,33,6,'2024-04-02 00:03:42','2024-04-02 00:03:42'),(5,34,6,'2024-04-02 00:13:05','2024-04-02 00:13:05'),(6,35,1,'2024-04-02 00:16:30','2024-04-02 00:16:30'),(7,35,2,'2024-04-02 00:16:30','2024-04-02 00:16:30'),(8,36,1,'2024-04-02 00:18:34','2024-04-02 00:18:34'),(9,37,1,'2024-04-02 00:20:35','2024-04-02 00:20:35'),(10,39,1,'2024-04-02 00:27:54','2024-04-02 00:27:54'),(11,40,1,'2024-04-02 00:36:52','2024-04-02 00:36:52'),(12,41,1,'2024-04-02 00:40:37','2024-04-02 00:40:37'),(13,42,1,'2024-04-02 00:43:43','2024-04-02 00:43:43'),(14,43,1,'2024-04-02 00:44:50','2024-04-02 00:44:50'),(15,44,2,'2024-04-02 00:48:26','2024-04-02 00:48:26'),(16,44,6,'2024-04-02 00:48:26','2024-04-02 00:48:26'),(17,50,1,'2024-04-02 15:30:12','2024-04-02 15:30:12'),(18,50,6,'2024-04-02 15:30:12','2024-04-02 15:30:12'),(19,51,6,'2024-04-09 20:12:09','2024-04-09 20:12:09'),(20,51,2,'2024-04-09 20:12:09','2024-04-09 20:12:09'),(21,51,1,'2024-04-09 20:12:09','2024-04-09 20:12:09'),(22,52,6,'2024-04-09 21:13:50','2024-04-09 21:13:50'),(23,52,1,'2024-04-09 21:13:50','2024-04-09 21:13:50'),(24,53,6,'2024-04-09 21:34:11','2024-04-09 21:34:11'),(25,53,1,'2024-04-09 21:34:11','2024-04-09 21:34:11'),(26,54,6,'2024-04-09 21:40:19','2024-04-09 21:40:19'),(27,54,1,'2024-04-09 21:40:19','2024-04-09 21:40:19'),(28,33,6,'2024-04-09 22:41:39','2024-04-09 22:41:39'),(29,27,6,'2024-04-09 22:43:32','2024-04-09 22:43:32'),(30,54,1,'2024-04-09 22:44:57','2024-04-09 22:44:57'),(31,54,6,'2024-04-09 22:44:57','2024-04-09 22:44:57'),(32,36,1,'2024-04-09 22:47:51','2024-04-09 22:47:51'),(33,55,6,'2024-04-10 00:59:32','2024-04-10 00:59:32'),(34,55,1,'2024-04-10 00:59:32','2024-04-10 00:59:32'),(35,55,1,'2024-04-10 01:01:12','2024-04-10 01:01:12'),(36,55,6,'2024-04-10 01:01:12','2024-04-10 01:01:12'),(37,55,1,'2024-04-10 01:03:34','2024-04-10 01:03:34'),(38,55,6,'2024-04-10 01:03:34','2024-04-10 01:03:34'),(39,56,6,'2024-04-10 02:31:48','2024-04-10 02:31:48'),(40,56,1,'2024-04-10 02:31:48','2024-04-10 02:31:48'),(41,44,6,'2024-04-10 02:33:14','2024-04-10 02:33:14'),(42,44,2,'2024-04-10 02:33:14','2024-04-10 02:33:14');
/*!40000 ALTER TABLE `product_color` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_size`
--

DROP TABLE IF EXISTS `product_size`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_size` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `size_id` int(11) NOT NULL,
  `amount` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `size_id` (`size_id`),
  CONSTRAINT `product_size_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `product_size_ibfk_2` FOREIGN KEY (`size_id`) REFERENCES `sizes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_size`
--

LOCK TABLES `product_size` WRITE;
/*!40000 ALTER TABLE `product_size` DISABLE KEYS */;
INSERT INTO `product_size` VALUES (1,1,1,50,'2024-02-26 20:50:12','2024-02-26 20:50:12'),(2,1,2,70,'2024-02-26 20:50:34','2024-02-26 20:50:34'),(3,1,4,15,'2024-02-26 20:50:58','2024-02-26 20:50:58'),(4,2,3,8,'2024-02-26 20:51:13','2024-04-09 22:06:34'),(5,2,2,80,'2024-02-26 20:51:24','2024-04-09 22:06:34'),(6,42,1,12,'2024-04-02 00:43:43','2024-04-02 00:43:43'),(7,43,1,12,'2024-04-02 00:44:50','2024-04-02 00:44:50'),(8,44,2,20,'2024-04-02 00:48:26','2024-04-10 02:33:14'),(9,44,2,20,'2024-04-02 00:48:26','2024-04-10 02:33:14'),(10,50,3,12,'2024-04-02 15:30:12','2024-04-02 15:30:12'),(11,50,1,12,'2024-04-02 15:30:12','2024-04-02 15:30:12'),(12,51,3,12,'2024-04-09 20:12:09','2024-04-09 20:12:09'),(13,51,2,10,'2024-04-09 20:12:09','2024-04-09 20:12:09'),(14,51,1,10,'2024-04-09 20:12:09','2024-04-09 20:12:09'),(15,54,8,20,'2024-04-09 21:40:19','2024-04-09 22:44:57'),(16,54,8,20,'2024-04-09 21:40:19','2024-04-09 22:44:57'),(17,55,1,12,'2024-04-10 00:59:32','2024-04-10 01:01:12'),(18,55,1,12,'2024-04-10 00:59:32','2024-04-10 01:01:12'),(19,56,3,12,'2024-04-10 02:31:48','2024-04-10 02:31:48'),(20,56,1,12,'2024-04-10 02:31:48','2024-04-10 02:31:48');
/*!40000 ALTER TABLE `product_size` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `brand_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `category_id` (`category_id`),
  KEY `brand_id` (`brand_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Remera The Original Teen ','Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, dicta!',50,2,4,'2024-02-24 23:17:11','2024-03-02 01:13:51','2024-03-06 23:26:47'),(2,'Perfect Tee Stripe','camisa azul mujer edutado',3000,3,4,'2024-02-26 20:48:24','2024-04-09 22:06:34','2024-04-09 22:45:14'),(4,'Hi Rise Skinny','Pantalon de mujer',60,2,4,'2024-02-28 17:11:37','2024-02-28 17:11:37','2024-02-28 17:12:19'),(5,'Camisa roja','ROJA',20,2,NULL,'2024-02-29 22:04:17','2024-02-29 22:04:17','2024-04-09 22:45:37'),(6,'Camisa Negra nueva','Negra',90,5,NULL,'2024-02-29 22:51:32','2024-03-02 00:58:11','2024-04-09 22:45:32'),(7,'Camisa azul','azul',10,3,NULL,'2024-02-29 22:53:18','2024-02-29 22:53:18','2024-03-21 01:27:37'),(8,'Camisa verde','verde',80,2,NULL,'2024-02-29 22:54:39','2024-02-29 22:54:39','2024-02-29 22:59:43'),(9,'Camisa amarilla','amarilla',50,5,NULL,'2024-02-29 22:56:38','2024-02-29 22:56:38','2024-04-09 22:45:22'),(11,'Camisa blanca','blanca',234,3,NULL,'2024-02-29 22:58:33','2024-02-29 22:58:33','2024-04-09 22:45:27'),(12,'Camisa roja nueva','asdasda',20,1,NULL,'2024-03-01 02:00:27','2024-03-01 02:00:27','2024-03-01 02:00:43'),(13,'Remera','remera hombre de verano',1243,1,NULL,'2024-03-21 00:51:27','2024-03-21 00:51:27','2024-03-21 01:27:23'),(14,'pantalon','pantalon de verano para hombre',1243,1,NULL,'2024-03-21 00:52:40','2024-03-21 00:52:40','2024-03-21 00:53:11'),(15,'Remera Levis','Remera hombre levis negra',1243,1,4,'2024-03-21 01:24:40','2024-03-21 01:24:40',NULL),(21,'Remera adidas','Remera adidas hombre        \r\n          ',1243,1,2,'2024-04-01 22:01:59','2024-04-01 22:01:59','2024-04-09 22:46:03'),(27,'Remera levis mujer','remera levis mujer            \r\n          ',2300,2,4,'2024-04-01 23:52:46','2024-04-09 22:43:32','2024-04-09 22:45:54'),(28,'producto 1','descripcion producto1    \r\n          ',1243,1,2,'2024-04-01 23:54:46','2024-04-01 23:54:46','2024-04-09 22:45:59'),(29,'producto 2','descripcion producto2  \r\n          ',1243,1,2,'2024-04-01 23:57:24','2024-04-01 23:57:24','2024-04-09 22:46:12'),(30,'producto 3','descripcion product3  \r\n          ',1243,1,2,'2024-04-01 23:58:45','2024-04-01 23:58:45','2024-04-09 22:46:08'),(32,'producto 4','descripcion producto 4            \r\n          ',1243,1,1,'2024-04-02 00:01:25','2024-04-02 00:01:25','2024-04-09 22:46:22'),(33,'producto 5','descripcion producto 5        \r\n          ',1243,1,1,'2024-04-02 00:03:42','2024-04-09 22:41:39','2024-04-09 22:46:17'),(34,'producto 6','descripcion producto 6        \r\n          ',1243,3,3,'2024-04-02 00:13:05','2024-04-02 00:13:05',NULL),(35,'producto 7','descripcion producto 7            \r\n          ',2000,4,2,'2024-04-02 00:16:30','2024-04-02 00:16:30',NULL),(36,'producto 8','descripcion producto 8           \r\n          ',2000,1,1,'2024-04-02 00:18:34','2024-04-09 22:47:51',NULL),(37,'producto 9','descripcion producto 9          \r\n          ',2000,1,4,'2024-04-02 00:20:35','2024-04-02 00:20:35',NULL),(39,'producto 10','descripcion producto 10          \r\n          ',2000,1,4,'2024-04-02 00:27:54','2024-04-02 00:27:54',NULL),(40,'producto 11','descripcion producto 11          \r\n          ',2000,1,4,'2024-04-02 00:36:52','2024-04-02 00:36:52',NULL),(41,'producto 12','descripcion producto 11          \r\n          ',2000,1,4,'2024-04-02 00:40:37','2024-04-02 00:40:37',NULL),(42,'producto 13','descripcion producto 11          \r\n          ',2000,1,4,'2024-04-02 00:43:43','2024-04-02 00:43:43',NULL),(43,'producto 14','descripcion producto 11          \r\n          ',2000,1,4,'2024-04-02 00:44:50','2024-04-02 00:44:50',NULL),(44,'producto 15','descripcion producto 15            \r\n          ',25000,1,1,'2024-04-02 00:48:26','2024-04-10 02:33:14',NULL),(50,'Remera Levis Azul','Remera levis azul hombre            \r\n          ',1243,1,4,'2024-04-02 15:30:12','2024-04-02 15:30:12','2024-04-09 22:45:48'),(51,'Pantalon Adidas Hombre','Pantalon Adidas Hombre',20000,1,2,'2024-04-09 20:12:09','2024-04-09 20:12:09',NULL),(52,'Zapatillas Nike','Zapatillas nike hombre',300000,1,1,'2024-04-09 21:13:50','2024-04-09 21:13:50','2024-04-09 21:41:58'),(53,'Zapatillas Levis','Zapatillas levis mujer',20000,2,4,'2024-04-09 21:34:11','2024-04-09 21:34:11','2024-04-09 21:41:44'),(54,'Zapatillas Pumas','Zapatillas pumas hombre',30000,1,3,'2024-04-09 21:40:19','2024-04-09 22:44:57',NULL),(55,'Producto 0001','producto editado 1231',1234,1,1,'2024-04-10 00:59:32','2024-04-10 01:03:34','2024-04-10 01:03:46'),(56,'Remera Levis niño','sdafjdsklfhjlksdjkjflfdsf',12345,1,4,'2024-04-10 02:31:48','2024-04-10 02:31:48','2024-04-10 02:32:15');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rols`
--

DROP TABLE IF EXISTS `rols`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rols` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rols`
--

LOCK TABLES `rols` WRITE;
/*!40000 ALTER TABLE `rols` DISABLE KEYS */;
INSERT INTO `rols` VALUES (1,'user','2024-02-24 22:58:26','2024-02-24 22:58:26'),(2,'administrator','2024-02-24 22:58:36','2024-02-24 22:58:36'),(3,'invited','2024-02-24 22:58:44','2024-02-24 22:58:44');
/*!40000 ALTER TABLE `rols` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sizes`
--

DROP TABLE IF EXISTS `sizes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sizes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sizes`
--

LOCK TABLES `sizes` WRITE;
/*!40000 ALTER TABLE `sizes` DISABLE KEYS */;
INSERT INTO `sizes` VALUES (1,'s','2024-02-24 23:01:24','2024-02-24 23:01:24'),(2,'m','2024-02-24 23:01:34','2024-02-24 23:01:34'),(3,'l','2024-02-24 23:01:37','2024-02-24 23:01:37'),(4,'xl','2024-02-24 23:01:44','2024-02-24 23:01:44'),(5,'xxl','2024-02-24 23:01:48','2024-02-24 23:01:48'),(6,'xs','2024-02-24 23:02:00','2024-02-24 23:02:00'),(7,'41','2024-04-09 21:40:19','2024-04-09 21:40:19'),(8,'42','2024-04-09 21:40:19','2024-04-09 21:40:19');
/*!40000 ALTER TABLE `sizes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `last_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone` int(20) NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `birth_date` datetime NOT NULL,
  `address` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `image_profile` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `rol_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `rol_id` (`rol_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `rols` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Danilo','Barbosa',0,'dbarbosaf@yahoo.com','0000-00-00 00:00:00','','',NULL,2,'2024-02-24 23:05:07','2024-02-24 23:05:07'),(2,'Enzo ','Soliz',2147483647,'enzosoliz95@gmail.com','1995-10-26 00:00:00','paraguay 2763','$2a$08$1qs0EkNXSBpRB4/zbN3/deJmk7v0UckCvS/CwO7dcK0ZB6Ee8hGAm','user-1710947229893.png',2,'2024-03-20 15:07:09','2024-03-20 15:07:09'),(6,'Enzo ','Soliz',2147483647,'admin1@gmail.com','1996-06-28 00:00:00','paraguay 2763','$2a$10$rGywA20SDUWcgW7lHmEH2e45i60wotQvnzIYzyEfligxD.HDDYM8q','user-1710981034653',1,'2024-03-21 00:30:34','2024-03-21 00:30:34'),(8,'Vale','Fulano',1234345334,'vale@gmail.com','1999-10-12 00:00:00','Av San martin 111','$2a$10$BsztoYNPwIDmD2bho1UOT.fTCFhqDENRq9qN2LgcgYGwUsm0AKhiG','user-1712696772993',1,'2024-04-09 21:06:13','2024-04-09 21:06:13'),(9,'admin','admin',123456,'admin@gmail.com','1995-10-26 00:00:00','Belgrano 1104','$2a$10$Bc5y9mPrR58If7HbsBo1wO7vb8ZcLj35rhJaeP.4WvG3/EGVF4GPm','user-1712709610288',2,'2024-04-10 00:40:10','2024-04-10 00:40:10'),(10,'Enzo','Soliz',23232433,'enzo@gmail.com','1999-10-12 00:00:00','Av San martin 111','$2a$10$13xge1gPNdWXFEH0GomwUeRIspJitRKisglmAI/b8SoRo/1xes3a2','user-1712716007979',1,'2024-04-10 02:26:48','2024-04-10 02:26:48');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'db_homies2'
--

--
-- Dumping routines for database 'db_homies2'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-08 19:27:39
