CREATE TABLE IF NOT EXISTS `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_type` int NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`first_name` varchar(255) NOT NULL,
	`last_name` varchar(255) NOT NULL,
	`phone` varchar(255),
	`country` varchar(255) NOT NULL,
	`img_path` varchar(255),
	`bio` varchar(255),
	`last_login_date` date NOT NULL,
	`login_cnt` int NOT NULL,
	`last_post_time` date NOT NULL,
	`tovit_template` int NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `user_types` (
	`id` int NOT NULL,
	`type` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `posts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`post_date` date NOT NULL,
	`public` bool NOT NULL DEFAULT false,
	`post_info` int NOT NULL,
	`background` int,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `comments` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`user_id` int NOT NULL,
	`text` text NOT NULL,
	`ref_to_comment` int,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `likes` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`comment_id` int,
	`post_id` int,
	`likes_cnt` int NOT NULL DEFAULT '0',
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `comment_to_post` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`post_id` int NOT NULL,
	`comment_id` int NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `all_groups` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`name` text NOT NULL,
	`about` text NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `users_to_groups` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`userId` int NOT NULL,
	`groupId` int NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `groups_to_posts` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`post_id` int NOT NULL,
	`group_id` int NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `tovit_backgrounds` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`url` text NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `users` ADD CONSTRAINT `users_fk1` FOREIGN KEY (`user_type`) REFERENCES `user_types`(`id`);

ALTER TABLE `users` ADD CONSTRAINT `users_fk13` FOREIGN KEY (`tovit_template`) REFERENCES `tovit_backgrounds`(`id`);

ALTER TABLE `posts` ADD CONSTRAINT `posts_fk1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);

ALTER TABLE `posts` ADD CONSTRAINT `posts_fk5` FOREIGN KEY (`background`) REFERENCES `tovit_backgrounds`(`id`);
ALTER TABLE `comments` ADD CONSTRAINT `comments_fk1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);

ALTER TABLE `comments` ADD CONSTRAINT `comments_fk3` FOREIGN KEY (`ref_to_comment`) REFERENCES `comments`(`id`);
ALTER TABLE `likes` ADD CONSTRAINT `likes_fk1` FOREIGN KEY (`comment_id`) REFERENCES `comments`(`id`);

ALTER TABLE `likes` ADD CONSTRAINT `likes_fk2` FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`);
ALTER TABLE `comment_to_post` ADD CONSTRAINT `comment_to_post_fk1` FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`);

ALTER TABLE `comment_to_post` ADD CONSTRAINT `comment_to_post_fk2` FOREIGN KEY (`comment_id`) REFERENCES `comments`(`id`);

ALTER TABLE `users_to_groups` ADD CONSTRAINT `users_to_groups_fk1` FOREIGN KEY (`userId`) REFERENCES `users`(`id`);

ALTER TABLE `users_to_groups` ADD CONSTRAINT `users_to_groups_fk2` FOREIGN KEY (`groupId`) REFERENCES `all_groups`(`id`);
ALTER TABLE `groups_to_posts` ADD CONSTRAINT `groups_to_posts_fk1` FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`);

ALTER TABLE `groups_to_posts` ADD CONSTRAINT `groups_to_posts_fk2` FOREIGN KEY (`group_id`) REFERENCES `all_groups`(`id`);
