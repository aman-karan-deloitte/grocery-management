/*
  Warnings:

  - You are about to drop the `shipment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `shipmentStatus` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orders` ADD COLUMN `shipmentStatus` ENUM('Pending', 'Completed', 'InTransit', 'Failed') NOT NULL;

-- DropTable
DROP TABLE `shipment`;
