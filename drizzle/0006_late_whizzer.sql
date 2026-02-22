CREATE TABLE `feedback_submissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phoneNumber` varchar(20) NOT NULL,
	`rating` int NOT NULL,
	`comment` text NOT NULL,
	`sourceUrl` varchar(1000),
	`ipAddress` varchar(45),
	`userAgent` text,
	`emailSent` enum('yes','no') NOT NULL DEFAULT 'no',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `feedback_submissions_id` PRIMARY KEY(`id`)
);
