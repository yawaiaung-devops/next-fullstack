-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `userName` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `isLocked` BOOLEAN NULL DEFAULT false,
    `loginAttempts` INTEGER NOT NULL DEFAULT 0,
    `loginAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isOnline` BOOLEAN NOT NULL DEFAULT false,
    `loginDevice` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdBy` VARCHAR(191) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedBy` VARCHAR(191) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Student` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Code` VARCHAR(255) NOT NULL,
    `FullNameInEnglish` VARCHAR(255) NOT NULL,
    `FullNameInMyanmar` VARCHAR(255) NOT NULL,
    `Email` VARCHAR(36) NOT NULL,
    `NRC` VARCHAR(191) NOT NULL,
    `Passport` VARCHAR(255) NULL,
    `Phone` VARCHAR(255) NOT NULL,
    `DOB` DATETIME(3) NOT NULL,
    `Gender` CHAR(1) NOT NULL,
    `Address` VARCHAR(191) NOT NULL,
    `GuardiandId` INTEGER NULL,
    `Profile` CHAR(255) NOT NULL,

    UNIQUE INDEX `Student_Code_key`(`Code`),
    UNIQUE INDEX `Student_NRC_key`(`NRC`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
