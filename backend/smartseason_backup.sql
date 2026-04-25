-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: smartseason
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `field_updates`
--

DROP TABLE IF EXISTS `field_updates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `field_updates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `field_id` int NOT NULL,
  `agent_id` int NOT NULL,
  `stage` enum('planted','growing','ready','harvested') NOT NULL,
  `notes` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `field_id` (`field_id`),
  KEY `agent_id` (`agent_id`),
  CONSTRAINT `field_updates_ibfk_1` FOREIGN KEY (`field_id`) REFERENCES `fields` (`id`) ON DELETE CASCADE,
  CONSTRAINT `field_updates_ibfk_2` FOREIGN KEY (`agent_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=140 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `field_updates`
--

LOCK TABLES `field_updates` WRITE;
/*!40000 ALTER TABLE `field_updates` DISABLE KEYS */;
INSERT INTO `field_updates` VALUES (1,1,6,'planted','Organic treatment applied','2026-03-16 09:57:48'),(2,1,6,'planted','Applied fertilizer today','2026-03-19 09:57:48'),(3,2,11,'growing','Weeds removed, field clean','2026-04-13 09:57:48'),(4,2,11,'planted','Soil moisture levels optimal','2026-04-06 09:57:48'),(5,2,11,'growing','Weather conditions favorable','2026-03-11 09:57:48'),(6,2,11,'planted','New irrigation system installed','2026-03-08 09:57:48'),(7,3,10,'planted','Slight delay due to dry spell','2026-04-01 09:57:48'),(8,3,10,'growing','New irrigation system installed','2026-04-21 09:57:48'),(9,3,10,'planted','Applied fertilizer today','2026-04-14 09:57:48'),(10,3,10,'planted','Growth on track for expected harvest','2026-03-16 09:57:48'),(11,3,10,'growing','Slight delay due to dry spell','2026-04-04 09:57:48'),(12,4,4,'planted','Soil moisture levels optimal','2026-04-18 09:57:48'),(13,4,4,'planted','New irrigation system installed','2026-03-09 09:57:48'),(14,4,4,'planted','Slight delay due to dry spell','2026-04-07 09:57:48'),(15,4,4,'planted','Soil moisture levels optimal','2026-03-15 09:57:48'),(16,4,4,'planted','Growth on track for expected harvest','2026-03-24 09:57:48'),(17,5,7,'planted','Irrigation completed','2026-03-18 09:57:48'),(18,5,7,'planted','Soil moisture levels optimal','2026-03-17 09:57:48'),(19,5,7,'planted','Disease prevention applied','2026-04-22 09:57:48'),(20,5,7,'planted','Growth on track for expected harvest','2026-04-05 09:57:48'),(21,6,5,'growing','Organic treatment applied','2026-03-25 09:57:48'),(22,6,5,'planted','Soil moisture levels optimal','2026-03-13 09:57:48'),(23,6,5,'growing','Quality check passed','2026-03-20 09:57:48'),(24,6,5,'growing','Growth on track for expected harvest','2026-02-26 09:57:48'),(25,6,5,'planted','Irrigation completed','2026-02-26 09:57:48'),(26,7,10,'ready','New irrigation system installed','2026-02-23 09:57:48'),(27,7,10,'ready','New irrigation system installed','2026-03-09 09:57:48'),(28,7,10,'planted','Organic treatment applied','2026-03-28 09:57:48'),(29,7,10,'planted','Crop rotation completed','2026-03-05 09:57:48'),(30,8,10,'planted','Weeds removed, field clean','2026-04-03 09:57:48'),(31,8,10,'ready','Soil moisture levels optimal','2026-03-22 09:57:48'),(32,8,10,'growing','Slight delay due to dry spell','2026-03-10 09:57:48'),(33,8,10,'planted','New irrigation system installed','2026-04-22 09:57:48'),(34,8,10,'ready','Disease prevention applied','2026-04-09 09:57:48'),(35,9,11,'growing','Slight delay due to dry spell','2026-04-21 09:57:48'),(36,9,11,'growing','Growth on track for expected harvest','2026-04-18 09:57:48'),(37,9,11,'planted','Disease prevention applied','2026-04-13 09:57:48'),(38,9,11,'growing','Crop rotation completed','2026-04-17 09:57:48'),(39,10,5,'planted','Weather conditions favorable','2026-03-10 09:57:48'),(40,10,5,'planted','Irrigation completed','2026-04-11 09:57:48'),(41,10,5,'planted','Applied fertilizer today','2026-03-17 09:57:48'),(42,10,5,'planted','Soil moisture levels optimal','2026-03-20 09:57:48'),(43,11,6,'growing','Disease prevention applied','2026-03-04 09:57:48'),(44,11,6,'growing','Slight delay due to dry spell','2026-03-24 09:57:48'),(45,12,7,'harvested','Crop looking healthy, good growth rate','2026-03-10 09:57:48'),(46,12,7,'planted','Slight delay due to dry spell','2026-04-16 09:57:48'),(47,12,7,'ready','Noticed some pest activity, taking action','2026-03-04 09:57:48'),(48,12,7,'planted','Slight delay due to dry spell','2026-03-19 09:57:48'),(49,12,7,'ready','Weather conditions favorable','2026-03-09 09:57:48'),(50,13,6,'planted','Quality check passed','2026-03-14 09:57:48'),(51,13,6,'growing','Harvesting in progress','2026-02-28 09:57:48'),(52,13,6,'planted','Quality check passed','2026-04-06 09:57:48'),(53,14,4,'planted','Weather conditions favorable','2026-04-06 09:57:48'),(54,14,4,'planted','Quality check passed','2026-02-25 09:57:48'),(55,15,10,'planted','Quality check passed','2026-02-23 09:57:48'),(56,15,10,'ready','Slight delay due to dry spell','2026-04-14 09:57:48'),(57,16,7,'growing','Quality check passed','2026-04-14 09:57:48'),(58,16,7,'growing','Noticed some pest activity, taking action','2026-03-01 09:57:48'),(59,16,7,'growing','Slight delay due to dry spell','2026-03-11 09:57:48'),(60,17,4,'planted','Quality check passed','2026-03-11 09:57:48'),(61,17,4,'growing','Quality check passed','2026-03-17 09:57:48'),(62,17,4,'growing','Organic treatment applied','2026-04-08 09:57:48'),(63,17,4,'planted','Weeds removed, field clean','2026-03-12 09:57:48'),(64,18,8,'growing','Crop looking healthy, good growth rate','2026-03-01 09:57:48'),(65,18,8,'planted','Quality check passed','2026-04-01 09:57:48'),(66,18,8,'planted','Slight delay due to dry spell','2026-02-26 09:57:48'),(67,18,8,'planted','Weeds removed, field clean','2026-03-20 09:57:48'),(68,19,5,'ready','Crop rotation completed','2026-03-23 09:57:48'),(69,19,5,'harvested','Applied fertilizer today','2026-02-23 09:57:48'),(70,20,4,'planted','Applied fertilizer today','2026-04-14 09:57:48'),(71,20,4,'growing','Soil moisture levels optimal','2026-03-12 09:57:48'),(72,20,4,'ready','New irrigation system installed','2026-03-01 09:57:48'),(73,20,4,'ready','Soil moisture levels optimal','2026-04-12 09:57:48'),(74,21,7,'growing','Organic treatment applied','2026-04-18 09:57:48'),(75,21,7,'growing','New irrigation system installed','2026-03-29 09:57:48'),(76,22,5,'ready','Noticed some pest activity, taking action','2026-03-26 09:57:48'),(77,22,5,'ready','Organic treatment applied','2026-03-17 09:57:48'),(78,22,5,'planted','Applied fertilizer today','2026-04-04 09:57:48'),(79,22,5,'planted','Quality check passed','2026-03-12 09:57:48'),(80,22,5,'ready','Growth on track for expected harvest','2026-03-26 09:57:48'),(81,23,5,'growing','Crop rotation completed','2026-03-21 09:57:48'),(82,23,5,'growing','Irrigation completed','2026-04-08 09:57:48'),(83,23,5,'planted','Crop rotation completed','2026-04-17 09:57:48'),(84,23,5,'planted','Slight delay due to dry spell','2026-04-11 09:57:48'),(85,24,8,'planted','Growth on track for expected harvest','2026-03-08 09:57:48'),(86,24,8,'planted','Harvesting in progress','2026-04-17 09:57:48'),(87,24,8,'planted','Irrigation completed','2026-03-18 09:57:48'),(88,24,8,'planted','Crop rotation completed','2026-04-21 09:57:48'),(89,25,11,'planted','Disease prevention applied','2026-03-30 09:57:48'),(90,25,11,'planted','Irrigation completed','2026-03-25 09:57:48'),(91,25,11,'planted','Weather conditions favorable','2026-03-10 09:57:48'),(92,26,10,'harvested','New irrigation system installed','2026-03-28 09:57:48'),(93,26,10,'planted','Noticed some pest activity, taking action','2026-04-08 09:57:48'),(94,26,10,'harvested','Weather conditions favorable','2026-04-14 09:57:48'),(95,26,10,'growing','Applied fertilizer today','2026-03-31 09:57:48'),(96,27,9,'planted','Growth on track for expected harvest','2026-03-25 09:57:48'),(97,27,9,'planted','Crop rotation completed','2026-02-22 09:57:48'),(98,28,9,'planted','Growth on track for expected harvest','2026-03-06 09:57:48'),(99,28,9,'planted','Weather conditions favorable','2026-03-03 09:57:48'),(100,28,9,'planted','Quality check passed','2026-03-22 09:57:48'),(101,29,6,'growing','Crop looking healthy, good growth rate','2026-04-10 09:57:48'),(102,29,6,'growing','Harvesting in progress','2026-03-14 09:57:48'),(103,29,6,'growing','Harvesting in progress','2026-03-01 09:57:48'),(104,29,6,'planted','Organic treatment applied','2026-03-09 09:57:48'),(105,30,7,'ready','Disease prevention applied','2026-04-21 09:57:49'),(106,30,7,'ready','Applied fertilizer today','2026-04-09 09:57:49'),(107,31,7,'planted','Disease prevention applied','2026-03-01 09:57:49'),(108,31,7,'planted','Slight delay due to dry spell','2026-03-31 09:57:49'),(109,31,7,'planted','Weeds removed, field clean','2026-04-18 09:57:49'),(110,31,7,'planted','Weather conditions favorable','2026-02-24 09:57:49'),(111,31,7,'planted','Weeds removed, field clean','2026-02-24 09:57:49'),(112,32,10,'planted','New irrigation system installed','2026-04-20 09:57:49'),(113,32,10,'planted','Growth on track for expected harvest','2026-03-22 09:57:49'),(114,32,10,'planted','Quality check passed','2026-03-11 09:57:49'),(115,33,9,'growing','Irrigation completed','2026-04-13 09:57:49'),(116,33,9,'growing','Applied fertilizer today','2026-03-21 09:57:49'),(117,33,9,'planted','Organic treatment applied','2026-03-07 09:57:49'),(118,34,6,'planted','New irrigation system installed','2026-03-03 09:57:49'),(119,34,6,'growing','Noticed some pest activity, taking action','2026-02-26 09:57:49'),(120,35,5,'planted','Noticed some pest activity, taking action','2026-04-10 09:57:49'),(121,35,5,'planted','Harvesting in progress','2026-04-14 09:57:49'),(122,36,5,'growing','Irrigation completed','2026-04-08 09:57:49'),(123,36,5,'planted','Harvesting in progress','2026-04-02 09:57:49'),(124,36,5,'harvested','Noticed some pest activity, taking action','2026-04-11 09:57:49'),(125,36,5,'harvested','Noticed some pest activity, taking action','2026-02-27 09:57:49'),(126,36,5,'harvested','New irrigation system installed','2026-02-25 09:57:49'),(127,37,5,'growing','Quality check passed','2026-03-06 09:57:49'),(128,37,5,'growing','Slight delay due to dry spell','2026-03-08 09:57:49'),(129,37,5,'growing','Irrigation completed','2026-04-16 09:57:49'),(130,38,4,'planted','Slight delay due to dry spell','2026-04-07 09:57:49'),(131,38,4,'planted','Quality check passed','2026-02-26 09:57:49'),(132,39,10,'planted','Soil moisture levels optimal','2026-03-18 09:57:49'),(133,39,10,'planted','Irrigation completed','2026-04-03 09:57:49'),(134,39,10,'growing','Weeds removed, field clean','2026-03-07 09:57:49'),(135,39,10,'growing','New irrigation system installed','2026-03-31 09:57:49'),(136,40,7,'planted','Soil moisture levels optimal','2026-03-19 09:57:49'),(137,40,7,'planted','Irrigation completed','2026-04-07 09:57:49'),(138,40,7,'growing','Slight delay due to dry spell','2026-03-02 09:57:49'),(139,22,3,'harvested','plenty harvest','2026-04-22 10:41:46');
/*!40000 ALTER TABLE `field_updates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fields`
--

DROP TABLE IF EXISTS `fields`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fields` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `crop_type` varchar(50) NOT NULL,
  `planting_date` date NOT NULL,
  `current_stage` enum('planted','growing','ready','harvested') DEFAULT 'planted',
  `assigned_agent_id` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `assigned_agent_id` (`assigned_agent_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `fields_ibfk_1` FOREIGN KEY (`assigned_agent_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fields_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fields`
--

LOCK TABLES `fields` WRITE;
/*!40000 ALTER TABLE `fields` DISABLE KEYS */;
INSERT INTO `fields` VALUES (1,'Maple Fields 1','Beans','2026-03-19','harvested',6,3,'2026-04-22 09:57:43','2026-04-22 09:57:43'),(2,'Birch Fields 2','Tea','2026-04-12','growing',11,2,'2026-04-22 09:57:44','2026-04-22 09:57:44'),(3,'Maple Fields 3','Tomatoes','2026-03-29','growing',10,1,'2026-04-22 09:57:44','2026-04-22 09:57:44'),(4,'Green Valley Farm 4','Potatoes','2026-01-12','planted',4,3,'2026-04-22 09:57:44','2026-04-22 09:57:44'),(5,'Riverside Farm 5','Beans','2026-01-24','planted',7,1,'2026-04-22 09:57:45','2026-04-22 09:57:45'),(6,'Birch Fields 6','Maize','2026-03-04','growing',5,3,'2026-04-22 09:57:45','2026-04-22 09:57:45'),(7,'Aspen Grove 7','Potatoes','2026-03-25','ready',10,1,'2026-04-22 09:57:46','2026-04-22 09:57:46'),(8,'Pine Hill Farm 8','Beans','2026-02-24','harvested',10,2,'2026-04-22 09:57:46','2026-04-22 09:57:46'),(9,'Valley View Farm 9','Wheat','2026-03-30','growing',11,1,'2026-04-22 09:57:46','2026-04-22 09:57:46'),(10,'Willow Creek 10','Onions','2026-03-29','planted',5,1,'2026-04-22 09:57:47','2026-04-22 09:57:47'),(11,'Maple Fields 11','Wheat','2026-02-25','growing',6,3,'2026-04-22 09:57:47','2026-04-22 09:57:47'),(12,'Sunrise Plantation 12','Potatoes','2026-01-08','harvested',7,2,'2026-04-22 09:57:47','2026-04-22 09:57:47'),(13,'Aspen Grove 13','Tomatoes','2026-03-05','growing',6,3,'2026-04-22 09:57:47','2026-04-22 09:57:47'),(14,'Riverside Farm 14','Potatoes','2026-03-28','planted',4,3,'2026-04-22 09:57:47','2026-04-22 09:57:47'),(15,'Golden Fields 15','Wheat','2026-02-18','harvested',10,1,'2026-04-22 09:57:47','2026-04-22 09:57:47'),(16,'Valley View Farm 16','Potatoes','2026-01-25','growing',7,2,'2026-04-22 09:57:47','2026-04-22 09:57:47'),(17,'Spring Gardens 17','Wheat','2026-03-23','ready',4,3,'2026-04-22 09:57:47','2026-04-22 09:57:47'),(18,'Cypress Gardens 18','Soybeans','2026-03-02','growing',8,2,'2026-04-22 09:57:47','2026-04-22 09:57:47'),(19,'Pine Hill Farm 19','Maize','2026-02-18','harvested',5,1,'2026-04-22 09:57:47','2026-04-22 09:57:47'),(20,'Cypress Gardens 20','Beans','2026-01-07','ready',4,1,'2026-04-22 09:57:47','2026-04-22 09:57:47'),(21,'Aspen Grove 21','Soybeans','2025-12-26','harvested',7,1,'2026-04-22 09:57:47','2026-04-22 09:57:47'),(22,'Cedar Valley 22','Tomatoes','2026-03-12','harvested',5,3,'2026-04-22 09:57:47','2026-04-22 10:41:46'),(23,'Green Valley Farm 23','Coffee','2026-02-04','ready',5,1,'2026-04-22 09:57:47','2026-04-22 09:57:47'),(24,'Green Valley Farm 24','Beans','2026-03-27','planted',8,1,'2026-04-22 09:57:47','2026-04-22 09:57:47'),(25,'Spring Gardens 25','Tea','2025-12-28','planted',11,3,'2026-04-22 09:57:47','2026-04-22 09:57:47'),(26,'Sunrise Plantation 26','Rice','2026-02-12','harvested',10,1,'2026-04-22 09:57:47','2026-04-22 09:57:47'),(27,'Highland Estate 27','Rice','2026-02-05','growing',9,2,'2026-04-22 09:57:47','2026-04-22 09:57:47'),(28,'Green Valley Farm 28','Soybeans','2026-03-09','planted',9,3,'2026-04-22 09:57:47','2026-04-22 09:57:47'),(29,'Golden Fields 29','Tea','2026-02-19','ready',6,2,'2026-04-22 09:57:47','2026-04-22 09:57:47'),(30,'Cypress Gardens 30','Rice','2026-02-14','harvested',7,3,'2026-04-22 09:57:47','2026-04-22 09:57:47'),(31,'Aspen Grove 31','Tomatoes','2026-03-09','planted',7,2,'2026-04-22 09:57:47','2026-04-22 09:57:47'),(32,'Birch Fields 32','Onions','2025-12-26','growing',10,1,'2026-04-22 09:57:47','2026-04-22 09:57:47'),(33,'Pine Hill Farm 33','Onions','2026-02-10','growing',9,2,'2026-04-22 09:57:47','2026-04-22 09:57:47'),(34,'Birch Fields 34','Rice','2026-01-24','harvested',6,2,'2026-04-22 09:57:47','2026-04-22 09:57:47'),(35,'Green Valley Farm 35','Tea','2025-12-24','growing',5,2,'2026-04-22 09:57:47','2026-04-22 09:57:47'),(36,'Oak Grove Plantation 36','Coffee','2026-04-01','harvested',5,2,'2026-04-22 09:57:47','2026-04-22 09:57:47'),(37,'Valley View Farm 37','Tomatoes','2026-01-28','ready',5,3,'2026-04-22 09:57:47','2026-04-22 09:57:47'),(38,'Valley View Farm 38','Coffee','2026-03-20','planted',4,1,'2026-04-22 09:57:47','2026-04-22 09:57:47'),(39,'Aspen Grove 39','Potatoes','2026-01-02','growing',10,1,'2026-04-22 09:57:47','2026-04-22 09:57:47'),(40,'Sunrise Plantation 40','Onions','2026-03-01','growing',7,3,'2026-04-22 09:57:47','2026-04-22 09:57:47'),(41,'karatina farm','Tea','2026-04-24','planted',30,1,'2026-04-22 16:12:59','2026-04-22 16:12:59');
/*!40000 ALTER TABLE `fields` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedules`
--

DROP TABLE IF EXISTS `schedules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedules` (
  `id` int NOT NULL AUTO_INCREMENT,
  `field_id` int NOT NULL,
  `agent_id` int NOT NULL,
  `task_type` varchar(50) NOT NULL,
  `scheduled_date` date NOT NULL,
  `status` enum('pending','completed','cancelled') DEFAULT 'pending',
  `notes` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `field_id` (`field_id`),
  KEY `agent_id` (`agent_id`),
  CONSTRAINT `schedules_ibfk_1` FOREIGN KEY (`field_id`) REFERENCES `fields` (`id`) ON DELETE CASCADE,
  CONSTRAINT `schedules_ibfk_2` FOREIGN KEY (`agent_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedules`
--

LOCK TABLES `schedules` WRITE;
/*!40000 ALTER TABLE `schedules` DISABLE KEYS */;
INSERT INTO `schedules` VALUES (1,1,6,'Harvesting','2026-05-17','pending','Scheduled harvesting task','2026-04-22 09:57:48'),(2,1,6,'Soil Testing','2026-04-23','cancelled','Scheduled soil testing task','2026-04-22 09:57:48'),(3,2,11,'Pest Control','2026-05-16','cancelled','Scheduled pest control task','2026-04-22 09:57:48'),(4,3,10,'Soil Testing','2026-05-01','completed','Scheduled soil testing task','2026-04-22 09:57:48'),(5,4,4,'Pest Control','2026-05-20','cancelled','Scheduled pest control task','2026-04-22 09:57:48'),(6,5,7,'Harvesting','2026-04-23','cancelled','Scheduled harvesting task','2026-04-22 09:57:48'),(7,5,7,'Inspection','2026-04-27','pending','Scheduled inspection task','2026-04-22 09:57:48'),(8,6,5,'Irrigation','2026-05-09','pending','Scheduled irrigation task','2026-04-22 09:57:48'),(9,6,5,'Soil Testing','2026-05-05','completed','Scheduled soil testing task','2026-04-22 09:57:48'),(10,6,5,'Fertilization','2026-04-25','completed','Scheduled fertilization task','2026-04-22 09:57:48'),(11,7,10,'Irrigation','2026-05-10','pending','Scheduled irrigation task','2026-04-22 09:57:48'),(12,7,10,'Irrigation','2026-04-27','pending','Scheduled irrigation task','2026-04-22 09:57:48'),(13,7,10,'Soil Testing','2026-05-01','completed','Scheduled soil testing task','2026-04-22 09:57:48'),(14,8,10,'Soil Testing','2026-05-11','cancelled','Scheduled soil testing task','2026-04-22 09:57:48'),(15,8,10,'Pest Control','2026-04-25','pending','Scheduled pest control task','2026-04-22 09:57:49'),(16,8,10,'Irrigation','2026-04-27','completed','Scheduled irrigation task','2026-04-22 09:57:49'),(17,9,11,'Soil Testing','2026-04-27','cancelled','Scheduled soil testing task','2026-04-22 09:57:49'),(18,9,11,'Irrigation','2026-05-21','completed','Scheduled irrigation task','2026-04-22 09:57:49'),(19,10,5,'Pest Control','2026-05-03','cancelled','Scheduled pest control task','2026-04-22 09:57:49'),(20,10,5,'Harvesting','2026-05-06','pending','Scheduled harvesting task','2026-04-22 09:57:49'),(21,10,5,'Irrigation','2026-04-25','cancelled','Scheduled irrigation task','2026-04-22 09:57:49'),(22,11,6,'Irrigation','2026-05-03','cancelled','Scheduled irrigation task','2026-04-22 09:57:49'),(23,12,7,'Harvesting','2026-05-02','completed','Scheduled harvesting task','2026-04-22 09:57:49'),(24,12,7,'Harvesting','2026-05-12','cancelled','Scheduled harvesting task','2026-04-22 09:57:49'),(25,13,6,'Fertilization','2026-05-08','pending','Scheduled fertilization task','2026-04-22 09:57:49'),(26,14,4,'Fertilization','2026-04-28','pending','Scheduled fertilization task','2026-04-22 09:57:49'),(27,14,4,'Inspection','2026-05-02','cancelled','Scheduled inspection task','2026-04-22 09:57:49'),(28,15,10,'Inspection','2026-05-21','completed','Scheduled inspection task','2026-04-22 09:57:49'),(29,15,10,'Irrigation','2026-04-27','completed','Scheduled irrigation task','2026-04-22 09:57:49'),(30,16,7,'Fertilization','2026-04-30','pending','Scheduled fertilization task','2026-04-22 09:57:49'),(31,16,7,'Inspection','2026-05-21','cancelled','Scheduled inspection task','2026-04-22 09:57:49'),(32,17,4,'Pest Control','2026-05-15','completed','Scheduled pest control task','2026-04-22 09:57:49'),(33,17,4,'Harvesting','2026-05-03','completed','Scheduled harvesting task','2026-04-22 09:57:49'),(34,18,8,'Harvesting','2026-05-06','cancelled','Scheduled harvesting task','2026-04-22 09:57:49'),(35,19,5,'Harvesting','2026-05-05','cancelled','Scheduled harvesting task','2026-04-22 09:57:49'),(36,19,5,'Pest Control','2026-05-10','completed','Scheduled pest control task','2026-04-22 09:57:49'),(37,19,5,'Inspection','2026-04-29','cancelled','Scheduled inspection task','2026-04-22 09:57:49'),(38,20,4,'Soil Testing','2026-05-18','completed','Scheduled soil testing task','2026-04-22 09:57:49'),(39,20,4,'Fertilization','2026-05-14','completed','Scheduled fertilization task','2026-04-22 09:57:49'),(40,20,4,'Harvesting','2026-04-24','pending','Scheduled harvesting task','2026-04-22 09:57:49'),(41,21,7,'Fertilization','2026-05-16','cancelled','Scheduled fertilization task','2026-04-22 09:57:49'),(42,22,5,'Irrigation','2026-05-04','pending','Scheduled irrigation task','2026-04-22 09:57:49'),(43,22,5,'Pest Control','2026-04-27','cancelled','Scheduled pest control task','2026-04-22 09:57:49'),(44,23,5,'Pest Control','2026-05-21','completed','Scheduled pest control task','2026-04-22 09:57:49'),(45,24,8,'Harvesting','2026-05-03','pending','Scheduled harvesting task','2026-04-22 09:57:49'),(46,24,8,'Fertilization','2026-05-07','completed','Scheduled fertilization task','2026-04-22 09:57:49'),(47,25,11,'Soil Testing','2026-05-19','pending','Scheduled soil testing task','2026-04-22 09:57:49'),(48,26,10,'Irrigation','2026-05-08','completed','Scheduled irrigation task','2026-04-22 09:57:49'),(49,27,9,'Irrigation','2026-05-03','pending','Scheduled irrigation task','2026-04-22 09:57:49'),(50,27,9,'Harvesting','2026-05-11','completed','Scheduled harvesting task','2026-04-22 09:57:49'),(51,27,9,'Harvesting','2026-05-14','cancelled','Scheduled harvesting task','2026-04-22 09:57:49'),(52,28,9,'Soil Testing','2026-05-04','cancelled','Scheduled soil testing task','2026-04-22 09:57:49'),(53,28,9,'Harvesting','2026-05-17','cancelled','Scheduled harvesting task','2026-04-22 09:57:49'),(54,29,6,'Inspection','2026-05-13','completed','Scheduled inspection task','2026-04-22 09:57:49'),(55,30,7,'Inspection','2026-04-23','cancelled','Scheduled inspection task','2026-04-22 09:57:49'),(56,30,7,'Inspection','2026-05-16','cancelled','Scheduled inspection task','2026-04-22 09:57:49'),(57,31,7,'Harvesting','2026-05-21','pending','Scheduled harvesting task','2026-04-22 09:57:49'),(58,31,7,'Inspection','2026-04-29','cancelled','Scheduled inspection task','2026-04-22 09:57:49'),(59,31,7,'Irrigation','2026-05-13','pending','Scheduled irrigation task','2026-04-22 09:57:49'),(60,32,10,'Harvesting','2026-05-03','pending','Scheduled harvesting task','2026-04-22 09:57:49'),(61,32,10,'Pest Control','2026-05-21','completed','Scheduled pest control task','2026-04-22 09:57:49'),(62,33,9,'Irrigation','2026-05-21','completed','Scheduled irrigation task','2026-04-22 09:57:49'),(63,34,6,'Soil Testing','2026-05-10','completed','Scheduled soil testing task','2026-04-22 09:57:49'),(64,35,5,'Pest Control','2026-05-18','pending','Scheduled pest control task','2026-04-22 09:57:49'),(65,35,5,'Harvesting','2026-05-16','cancelled','Scheduled harvesting task','2026-04-22 09:57:49'),(66,35,5,'Irrigation','2026-04-27','completed','Scheduled irrigation task','2026-04-22 09:57:49'),(67,36,5,'Harvesting','2026-05-16','completed','Scheduled harvesting task','2026-04-22 09:57:49'),(68,36,5,'Pest Control','2026-05-09','pending','Scheduled pest control task','2026-04-22 09:57:49'),(69,36,5,'Irrigation','2026-04-30','completed','Scheduled irrigation task','2026-04-22 09:57:49'),(70,37,5,'Soil Testing','2026-04-28','pending','Scheduled soil testing task','2026-04-22 09:57:49'),(71,37,5,'Fertilization','2026-04-23','cancelled','Scheduled fertilization task','2026-04-22 09:57:49'),(72,37,5,'Irrigation','2026-05-20','pending','Scheduled irrigation task','2026-04-22 09:57:49'),(73,38,4,'Harvesting','2026-05-03','completed','Scheduled harvesting task','2026-04-22 09:57:49'),(74,38,4,'Inspection','2026-05-21','pending','Scheduled inspection task','2026-04-22 09:57:49'),(75,39,10,'Fertilization','2026-05-09','cancelled','Scheduled fertilization task','2026-04-22 09:57:49'),(76,39,10,'Soil Testing','2026-05-15','pending','Scheduled soil testing task','2026-04-22 09:57:49'),(77,39,10,'Fertilization','2026-04-22','completed','Scheduled fertilization task','2026-04-22 09:57:49'),(78,40,7,'Pest Control','2026-05-17','completed','Scheduled pest control task','2026-04-22 09:57:49'),(79,40,7,'Inspection','2026-05-07','completed','Scheduled inspection task','2026-04-22 09:57:49');
/*!40000 ALTER TABLE `schedules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('admin','agent') NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin@smartseason.com','$2b$10$TZi1t9Yz1jsv4z6BzzhaO.MCoyB5Fx40Vxyj7qJGQALuKMHsg30KS','admin','System Administrator','2026-04-22 09:57:34'),(2,'farmmanager','manager@smartseason.com','$2b$10$uZTsbqE0CIaAR9OpfDVFKuiwZfxqUBD.5TaFpee9NzuADMbWqyhsG','admin','Sarah Farm Manager','2026-04-22 09:57:34'),(3,'coordinator','coordinator@smartseason.com','$2b$10$4SyRtVlFrKF5EvW33vbijOIRADXKFGB168bRZzRALfs44XdITtfN6','admin','James Coordinator','2026-04-22 09:57:35'),(4,'john_doe','john@smartseason.com','$2b$10$KwEP6KRPJL6hrxln.A2iRermf2R/BKxqOdNpIMtYsfPVFfdWrraje','agent','John Doe','2026-04-22 09:57:37'),(5,'jane_smith','jane@smartseason.com','$2b$10$mVZ8VJML3XmeS0CYSfEUz.PTrIqfLc7MHbEckYWqbGP9kcAo37w4W','agent','Jane Smith','2026-04-22 09:57:37'),(6,'mike_wilson','mike@smartseason.com','$2b$10$qA0zBd.Pv2n/ayNxn73lWunXkUtjFkjp6rhQmrfaaHZaMom3pfISm','agent','Mike Wilson','2026-04-22 09:57:37'),(7,'sarah_johnson','sarah@smartseason.com','$2b$10$ntsW3UHSotKwyGBJ01UqiuudM01arp4XggDWxUzhjHbtl1aXb1VBC','agent','Sarah Johnson','2026-04-22 09:57:40'),(8,'peter_mbugua','peter@smartseason.com','$2b$10$nfjIvJjNhI9oEy0o4QYnMO3HJsb9rxTKEzyjOYmktjlqs2qAMAIV2','agent','Peter Mbugua','2026-04-22 09:57:40'),(9,'grace_nduta','grace@smartseason.com','$2b$10$wpU988n7AZuFWd2eKM6vC.SRngcpurC9E8pQWcoobUyaiCQ0joP7m','agent','Grace Nduta','2026-04-22 09:57:40'),(10,'james_kariuki','james@smartseason.com','$2b$10$YrxQ6IhRNiCXfZXHg/z0I.sxh7eATeBLnZ8QkvW2xGvzloSZn6KKa','agent','James Kariuki','2026-04-22 09:57:41'),(11,'mary_wanjiku','mary@smartseason.com','$2b$10$u9BTwZJzkRX/ZTUEN6rN6OTzgS4G9nNC.EffmQ7.uATfAUI4pglhW','agent','Mary Wanjiku','2026-04-22 09:57:42'),(13,'agent1','agent@smartseason.com','$2b$10$Cf.81rJIzDa3opXwfoZv6.Ezfqg7/sparggNPrKrLcxgsK.yESfa.','agent','John Field Agent','2026-04-22 09:58:10'),(30,'cinch','musaufabian7@gmail.com','$2b$10$yDAhYm59djKjD7Jx5AMhw.sikEo6j4LBnVasmaY7cq63c90VKEQZ2','agent','Fabian Musau','2026-04-22 15:55:14');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-25  7:53:35
