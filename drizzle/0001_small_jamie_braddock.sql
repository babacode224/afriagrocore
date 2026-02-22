CREATE TABLE `consultant_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`fullName` varchar(255),
	`specializations` text,
	`certifications` text,
	`hourlyRate` int,
	`bio` text,
	`profilePicture` varchar(500),
	`availability` varchar(100),
	`languages` text,
	`rating` varchar(10),
	`verified` enum('pending','verified','rejected') DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `consultant_profiles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `farmer_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`farmName` varchar(255),
	`farmSize` varchar(100),
	`cropTypes` text,
	`location` varchar(255),
	`yearsExperience` int,
	`phoneNumber` varchar(20),
	`bio` text,
	`profilePicture` varchar(500),
	`verified` enum('pending','verified','rejected') DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `farmer_profiles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `seller_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`businessName` varchar(255),
	`registrationNumber` varchar(100),
	`productCategories` text,
	`location` varchar(255),
	`phoneNumber` varchar(20),
	`bio` text,
	`profilePicture` varchar(500),
	`rating` varchar(10),
	`verified` enum('pending','verified','rejected') DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `seller_profiles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `consultant_profiles` ADD CONSTRAINT `consultant_profiles_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `farmer_profiles` ADD CONSTRAINT `farmer_profiles_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `seller_profiles` ADD CONSTRAINT `seller_profiles_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;