/*
  Warnings:

  - Added the required column `deliveryAddress` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryStatus` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentStatus` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trackingNumber` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orders` ADD COLUMN `deliveryAddress` VARCHAR(191) NOT NULL,
    ADD COLUMN `deliveryStatus` VARCHAR(191) NOT NULL,
    ADD COLUMN `orderDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `paymentMethod` ENUM('CreditCard', 'DebitCard', 'PayPal', 'BankTransfer') NOT NULL,
    ADD COLUMN `paymentStatus` ENUM('Pending', 'Completed', 'Failed') NOT NULL,
    ADD COLUMN `productId` VARCHAR(191) NOT NULL,
    ADD COLUMN `quantity` INTEGER NOT NULL,
    ADD COLUMN `totalPrice` DOUBLE NOT NULL,
    ADD COLUMN `trackingNumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;
