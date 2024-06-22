-- --------------------------------------------------------
-- Хост:                         127.0.0.1
-- Версия сервера:               10.11.5-MariaDB-1:10.11.5+maria~deb11 - mariadb.org binary distribution
-- Операционная система:         debian-linux-gnu
-- HeidiSQL Версия:              12.7.0.6850
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Дамп структуры базы данных vue3fi
CREATE DATABASE IF NOT EXISTS `vue3fi` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `vue3fi`;

-- Дамп структуры для таблица vue3fi.item
CREATE TABLE IF NOT EXISTS `item` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `descr` varchar(400) NOT NULL,
  `unit` varchar(20) NOT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `target` enum('top','mid','bot') NOT NULL DEFAULT 'top',
  `image` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Дамп данных таблицы vue3fi.item: ~9 rows (приблизительно)
REPLACE INTO `item` (`id`, `name`, `descr`, `unit`, `price`, `target`, `image`, `created_at`, `deleted_at`) VALUES
	(1, 'Материал-111', 'описание 111', 'м', 100.00, 'top', 'https://i.pravatar.cc/150?img=6', '2024-06-21 18:11:00', NULL),
	(3, 'Новый материал', '', '', 1.00, 'bot', '', '2024-06-20 12:06:42', '2024-06-20 12:06:42'),
	(4, 'Середина-1', '', 'грам', 1.00, 'mid', '', '2024-06-20 12:24:36', NULL),
	(5, 'Новый материал5', 'обновитьewfwef', '', 111.00, 'mid', '', '2024-06-20 12:06:48', '2024-06-20 12:06:48'),
	(6, 'Верх-2', '', '', 10.00, 'top', '', '2024-06-20 12:22:01', NULL),
	(7, 'Низ-1', '', '', 1.00, 'bot', '', '2024-06-20 12:24:58', NULL),
	(8, 'Низ-2', '', '', 1.00, 'bot', '', '2024-06-21 12:14:12', '2024-06-21 12:14:12'),
	(9, 'sdgvdsgvsdf', '', '', 1.00, 'bot', '', '2024-06-20 12:20:36', '2024-06-20 12:20:36'),
	(10, 'Середина2', 'fvdfv', '', 1.00, 'mid', 'http://vue3-fi.backend/upload/a4f96cb5e23014c25afdccb2135ca838.jpg', '2024-06-21 20:29:48', NULL),
	(11, 'Новый материал 11', '', '', 1.00, 'bot', '', '2024-06-21 18:16:41', '2024-06-21 18:16:41'),
	(12, 'Новый материал 12', '', '', 1.00, 'mid', 'https://i.pravatar.cc/150?img=46', '2024-06-21 18:12:58', '2024-06-21 18:12:58');

-- Дамп структуры для таблица vue3fi.product
CREATE TABLE IF NOT EXISTS `product` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `descr` varchar(400) NOT NULL,
  `image` varchar(200) NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Дамп данных таблицы vue3fi.product: ~0 rows (приблизительно)
REPLACE INTO `product` (`id`, `name`, `descr`, `image`, `deleted_at`, `created_at`) VALUES
	(1, 'Новое изделие 1', '', 'https://i.pravatar.cc/150?img=49', NULL, '2024-06-22 10:51:37'),
	(2, 'Новое изделие 3', 'sdvsdvsv', '', '2024-06-21 12:05:03', '2024-06-21 12:05:03'),
	(3, 'Новое изделие', '', '', '2024-06-21 12:05:48', '2024-06-21 12:05:48'),
	(4, 'Новое изделие 333', '', '', '2024-06-21 12:17:48', '2024-06-21 12:17:48'),
	(5, 'Новое изделие', '', 'https://api.vue3fi.karasev.ru/upload/6c065d07e7edac35f0c09f6ee2f4568e.png', NULL, '2024-06-22 10:52:50'),
	(6, 'Новое изделие', '', '', '2024-06-21 12:17:36', '2024-06-21 12:17:36'),
	(7, 'Новое изделие 7', '', '', '2024-06-21 12:17:29', '2024-06-21 12:17:29');

-- Дамп структуры для таблица vue3fi.product_bot
CREATE TABLE IF NOT EXISTS `product_bot` (
  `product` int(10) unsigned NOT NULL,
  `item` int(10) unsigned NOT NULL,
  KEY `product` (`product`),
  KEY `item` (`item`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Дамп данных таблицы vue3fi.product_bot: ~2 rows (приблизительно)
REPLACE INTO `product_bot` (`product`, `item`) VALUES
	(5, 7);

-- Дамп структуры для таблица vue3fi.product_mid
CREATE TABLE IF NOT EXISTS `product_mid` (
  `product` int(10) unsigned NOT NULL,
  `item` int(10) unsigned NOT NULL,
  KEY `product` (`product`),
  KEY `item` (`item`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Дамп данных таблицы vue3fi.product_mid: ~2 rows (приблизительно)
REPLACE INTO `product_mid` (`product`, `item`) VALUES
	(1, 4),
	(5, 4),
	(5, 10);

-- Дамп структуры для таблица vue3fi.product_price
CREATE TABLE IF NOT EXISTS `product_price` (
  `product` int(10) unsigned NOT NULL,
  `top_item` int(10) unsigned NOT NULL,
  `mid_item` int(10) unsigned NOT NULL,
  `price` decimal(10,2) unsigned NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Дамп данных таблицы vue3fi.product_price: ~4 rows (приблизительно)
REPLACE INTO `product_price` (`product`, `top_item`, `mid_item`, `price`) VALUES
	(1, 1, 4, 111.00),
	(1, 6, 4, 3.00),
	(5, 1, 4, 22.00),
	(5, 1, 10, 0.00),
	(5, 6, 4, 2222.00),
	(5, 6, 10, 111.00);

-- Дамп структуры для таблица vue3fi.product_top
CREATE TABLE IF NOT EXISTS `product_top` (
  `product` int(10) unsigned NOT NULL,
  `item` int(10) unsigned NOT NULL,
  KEY `product` (`product`),
  KEY `item` (`item`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Дамп данных таблицы vue3fi.product_top: ~2 rows (приблизительно)
REPLACE INTO `product_top` (`product`, `item`) VALUES
	(1, 1),
	(1, 6),
	(5, 1),
	(5, 6);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
