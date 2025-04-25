/*
  Warnings:

  - Added the required column `productStatus` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `inventory` ADD COLUMN `productStatus` ENUM('Available', 'OutOfStock') NOT NULL;

-- AlterTable
ALTER TABLE `shipments` MODIFY `deliveryDate` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);
