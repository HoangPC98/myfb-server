CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255) UNIQUE,
  `user_type_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `desc` text NOT NULL
);

CREATE TABLE `user_types` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `desc` varchar(255) NOT NULL
);

CREATE TABLE `reviews` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `status` ENUM ('pending', 'approved', 'rejected') NOT NULL,
  `reviewer_id` int,
  `note` text
);

CREATE TABLE `work_types` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `desc` varchar(255) NOT NULL COMMENT 'overtime, remote, offleco'
);

CREATE TABLE `worktimes` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `work_type_id` int NOT NULL,
  `review_id` int,
  `reg_start_at` datetime,
  `reg_end_at` datetime,
  `checkin_at` datetime NOT NULL,
  `checkout_at` datetime NOT NULL,
  `desc` varchar(255)
);

CREATE TABLE `offworks` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `review_id` int NOT NULL,
  `reg_start_at` datetime NOT NULL,
  `reg_end_at` datetime NOT NULL,
  `reason` text NOT NULL
);

ALTER TABLE `users` ADD FOREIGN KEY (`user_type_id`) REFERENCES `user_types` (`id`);

ALTER TABLE `reviews` ADD FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`id`);

ALTER TABLE `worktimes` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `worktimes` ADD FOREIGN KEY (`work_type_id`) REFERENCES `work_types` (`id`);

ALTER TABLE `offworks` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `worktimes` ADD FOREIGN KEY (`review_id`) REFERENCES `reviews` (`id`);

ALTER TABLE `offworks` ADD FOREIGN KEY (`review_id`) REFERENCES `reviews` (`id`);

ALTER TABLE `worktimes` COMMENT = "this table use for work offline, remote work and remote time also";
