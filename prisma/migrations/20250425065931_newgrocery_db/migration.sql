/*
  Warnings:

  - Added the required column `shipperId` to the `shipments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `shipments` ADD COLUMN `shipperId` VARCHAR(191) NOT NULL;
