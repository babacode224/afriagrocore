CREATE TABLE `email_templates` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`type` enum('contact_admin','contact_user','followup_farmer','followup_partner','followup_investor') NOT NULL,
	`subject` varchar(500) NOT NULL,
	`body` text NOT NULL,
	`variables` text,
	`isActive` enum('yes','no') NOT NULL DEFAULT 'yes',
	`version` int DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `email_templates_id` PRIMARY KEY(`id`)
);
