/*
  Warnings:

  - Added the required column `culminado` to the `Casos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clave` to the `Usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `casos` ADD COLUMN `culminado` INTEGER NOT NULL,
    MODIFY `celular` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `clave` VARCHAR(191) NOT NULL,
    MODIFY `celular` VARCHAR(191) NOT NULL;
