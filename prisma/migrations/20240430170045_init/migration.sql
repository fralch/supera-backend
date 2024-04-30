-- CreateTable
CREATE TABLE `Usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dni` INTEGER NOT NULL,
    `usuario` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `celular` INTEGER NOT NULL,
    `correo` VARCHAR(191) NULL,
    `direccion` VARCHAR(191) NULL,

    UNIQUE INDEX `Usuarios_dni_key`(`dni`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Casos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cliente` VARCHAR(191) NOT NULL,
    `condicion` VARCHAR(191) NULL,
    `celular` INTEGER NOT NULL,
    `expediente` VARCHAR(191) NULL,
    `fiscal` VARCHAR(191) NULL,
    `materia` VARCHAR(191) NOT NULL,
    `proceso` VARCHAR(191) NULL,
    `mesa` VARCHAR(191) NOT NULL,
    `contrato` VARCHAR(191) NOT NULL,
    `acto_procesal` VARCHAR(191) NULL,
    `fecha` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
