/*
  Warnings:

  - You are about to drop the column `status` on the `shipment` table. All the data in the column will be lost.
  - Added the required column `cancelled` to the `Shipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `completed` to the `Shipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inTransit` to the `Shipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pending` to the `Shipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Shipment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `shipment` DROP COLUMN `status`,
    ADD COLUMN `cancelled` INTEGER NOT NULL,
    ADD COLUMN `completed` INTEGER NOT NULL,
    ADD COLUMN `inTransit` INTEGER NOT NULL,
    ADD COLUMN `pending` INTEGER NOT NULL,
    ADD COLUMN `total` INTEGER NOT NULL;
