CREATE TABLE `contact_submissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(50),
	`role` enum('farmer','partner','investor') NOT NULL,
	`message` text NOT NULL,
	`waitlistFeatures` text,
	`status` enum('new','contacted','closed') NOT NULL DEFAULT 'new',
	`followUpSentAt` timestamp,
	`submittedAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `contact_submissions_id` PRIMARY KEY(`id`)
);
