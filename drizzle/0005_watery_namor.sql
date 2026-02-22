CREATE TABLE `email_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`emailType` enum('admin_notification','user_confirmation','follow_up') NOT NULL,
	`recipientEmail` varchar(320) NOT NULL,
	`recipientName` varchar(255),
	`senderEmail` varchar(320) NOT NULL,
	`subject` varchar(500) NOT NULL,
	`bodyHtml` text NOT NULL,
	`bodyText` text,
	`contactSubmissionId` int,
	`userRole` enum('farmer','partner','investor'),
	`waitlistFeatures` text,
	`status` enum('queued','sending','sent','failed','bounced') NOT NULL DEFAULT 'queued',
	`sentAt` timestamp,
	`failedAt` timestamp,
	`errorMessage` text,
	`attempts` int NOT NULL DEFAULT 0,
	`messageId` varchar(500),
	`provider` varchar(50),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `email_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `email_logs` ADD CONSTRAINT `email_logs_contactSubmissionId_contact_submissions_id_fk` FOREIGN KEY (`contactSubmissionId`) REFERENCES `contact_submissions`(`id`) ON DELETE no action ON UPDATE no action;