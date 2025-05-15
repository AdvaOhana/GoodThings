-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 15, 2025 at 08:01 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tovyomi_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `text` text NOT NULL,
  `ref_to_comment` int(11) DEFAULT NULL,
  `post_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `manager_id` int(11) DEFAULT NULL,
  `name` text NOT NULL,
  `about` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `groups_to_posts`
--

CREATE TABLE `groups_to_posts` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `comment_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `likes_cnt` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `post_date` date NOT NULL,
  `public` tinyint(1) NOT NULL DEFAULT 0,
  `background` int(11) DEFAULT NULL,
  `post_content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`post_content`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `user_id`, `post_date`, `public`, `background`, `post_content`) VALUES
(31, 5, '2025-05-15', 0, 1, '[\"Shmuel\",\"asd\",\"שדגשדג\",\"asd\",\"asdas\",\"dasd\",\"da\",\"sad\",\"asd\",\"das\",\"das\",\"dsa\",\"das\",\"dasd\",\"as\",\"sadsad\",\"asdasdasd\"]'),
(32, 5, '2025-05-14', 0, 1, '[\"item1\", \"item2\", \"item3\"]'),
(33, 5, '2025-05-13', 0, 1, '[\"item1\", \"item2\", \"item3\"]');

-- --------------------------------------------------------

--
-- Table structure for table `tovit_backgrounds`
--

CREATE TABLE `tovit_backgrounds` (
  `id` int(11) NOT NULL,
  `url` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tovit_backgrounds`
--

INSERT INTO `tovit_backgrounds` (`id`, `url`) VALUES
(1, ' '),
(2, 'https://parashat.co.il/wp-content/uploads/2023/09/shlomo0355_Beautiful_backgrounds_of_amazing_scenery_colorful_re_3ba64bc5-7579-479d-ba4e-b8ce4412fef9.png');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user_type` int(11) NOT NULL DEFAULT 4,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `img_path` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `last_login_date` date DEFAULT NULL,
  `login_cnt` int(11) NOT NULL DEFAULT 0,
  `last_post_time` date DEFAULT NULL,
  `tovit_template` int(11) NOT NULL DEFAULT 1,
  `user_name` varchar(255) NOT NULL,
  `defIsPublic` tinyint(1) NOT NULL DEFAULT 0,
  `defTheme` tinyint(1) NOT NULL DEFAULT 0,
  `forgot_password` int(11) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_type`, `email`, `password`, `first_name`, `last_name`, `phone`, `country`, `img_path`, `bio`, `last_login_date`, `login_cnt`, `last_post_time`, `tovit_template`, `user_name`, `defIsPublic`, `defTheme`, `forgot_password`, `isActive`) VALUES
(2, 4, 'test1@test1.com', '123', 'shmulik', 'hai-besert', NULL, NULL, 'https://www.tzomet-hrz.co.il/wp-content/uploads/2019/12/1318c8c679a76a7dc58fd67c2714fe54-e1576169232593.jpg', NULL, '2025-05-06', 0, '2025-05-06', 1, 'shimon', 0, 0, NULL, 1),
(3, 2, 'test@test.com', '123456', 'shula', 'hamlka', NULL, NULL, 'https://www.tzomet-hrz.co.il/wp-content/uploads/2019/12/1318c8c679a76a7dc58fd67c2714fe54-e1576169232593.jpg', NULL, NULL, 0, NULL, 1, 'shimon', 0, 0, NULL, 1),
(4, 1, 'test@test.com', '123456', 'shmulik', 'hai-besert', NULL, NULL, 'https://www.tzomet-hrz.co.il/wp-content/uploads/2019/12/1318c8c679a76a7dc58fd67c2714fe54-e1576169232593.jpg', NULL, NULL, 0, NULL, 1, 'shimon', 0, 0, NULL, 1),
(5, 4, 'adva1230@gmail.com', '$2b$10$b1N1q73RuxGc9JMiaecmSuxcF2MZnzEU6q2whksj91/EYpvy50hf6', 'adva', 'ohana', NULL, NULL, 'https://www.tzomet-hrz.co.il/wp-content/uploads/2019/12/1318c8c679a76a7dc58fd67c2714fe54-e1576169232593.jpg', NULL, '2025-05-15', 57, '2025-05-15', 1, 'Shula', 0, 0, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users_to_groups`
--

CREATE TABLE `users_to_groups` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_types`
--

CREATE TABLE `user_types` (
  `id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_types`
--

INSERT INTO `user_types` (`id`, `type`) VALUES
(1, 'owner'),
(2, 'admin'),
(3, 'group manager'),
(4, 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `comments_fk1` (`user_id`),
  ADD KEY `comments_fk3` (`ref_to_comment`),
  ADD KEY `comments_fk4` (`post_id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `groups_fk1` (`manager_id`);

--
-- Indexes for table `groups_to_posts`
--
ALTER TABLE `groups_to_posts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `groups_to_posts_fk1` (`post_id`),
  ADD KEY `groups_to_posts_fk2` (`group_id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `likes_fk1` (`comment_id`),
  ADD KEY `likes_fk2` (`post_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `posts_fk1` (`user_id`),
  ADD KEY `posts_fk5` (`background`);

--
-- Indexes for table `tovit_backgrounds`
--
ALTER TABLE `tovit_backgrounds`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `users_fk1` (`user_type`),
  ADD KEY `users_fk13` (`tovit_template`);

--
-- Indexes for table `users_to_groups`
--
ALTER TABLE `users_to_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `users_to_groups_fk1` (`user_id`),
  ADD KEY `users_to_groups_fk2` (`group_id`);

--
-- Indexes for table `user_types`
--
ALTER TABLE `user_types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `groups_to_posts`
--
ALTER TABLE `groups_to_posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `tovit_backgrounds`
--
ALTER TABLE `tovit_backgrounds`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users_to_groups`
--
ALTER TABLE `users_to_groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_types`
--
ALTER TABLE `user_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_fk1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `comments_fk3` FOREIGN KEY (`ref_to_comment`) REFERENCES `comments` (`id`),
  ADD CONSTRAINT `comments_fk4` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`);

--
-- Constraints for table `groups`
--
ALTER TABLE `groups`
  ADD CONSTRAINT `groups_fk1` FOREIGN KEY (`manager_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `groups_to_posts`
--
ALTER TABLE `groups_to_posts`
  ADD CONSTRAINT `groups_to_posts_fk1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
  ADD CONSTRAINT `groups_to_posts_fk2` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`);

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_fk1` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`id`),
  ADD CONSTRAINT `likes_fk2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`);

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_fk1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `posts_fk5` FOREIGN KEY (`background`) REFERENCES `tovit_backgrounds` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_fk1` FOREIGN KEY (`user_type`) REFERENCES `user_types` (`id`),
  ADD CONSTRAINT `users_fk13` FOREIGN KEY (`tovit_template`) REFERENCES `tovit_backgrounds` (`id`);

--
-- Constraints for table `users_to_groups`
--
ALTER TABLE `users_to_groups`
  ADD CONSTRAINT `users_to_groups_fk1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `users_to_groups_fk2` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
