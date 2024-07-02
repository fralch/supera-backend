-- CreateTable
CREATE TABLE `Usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dni` INTEGER NOT NULL,
    `usuario` VARCHAR(191) NOT NULL,
    `clave` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `celular` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(191) NULL,
    `direccion` VARCHAR(191) NULL,
    `cargo` VARCHAR(191) NOT NULL,
    `estado` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Usuarios_dni_key`(`dni`),
    UNIQUE INDEX `Usuarios_usuario_dni_key`(`usuario`, `dni`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Casos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cliente_dni` INTEGER NOT NULL,
    `condiciones` VARCHAR(191) NULL,
    `expediente` VARCHAR(191) NULL,
    `fiscal` VARCHAR(191) NULL,
    `materia` VARCHAR(191) NOT NULL,
    `proceso` VARCHAR(191) NULL,
    `mesa` VARCHAR(191) NOT NULL,
    `contrato` VARCHAR(191) NOT NULL,
    `acto_procesal` VARCHAR(2000) NULL,
    `culminado` INTEGER NOT NULL,
    `fecha` DATETIME(3) NOT NULL,
    `tiempo` JSON NULL,
    `usuarios_dni` JSON NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CasosUsuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `caso_id` INTEGER NOT NULL,
    `colaborador_dni` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `CasosUsuarios_caso_id_colaborador_dni_key`(`caso_id`, `colaborador_dni`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Clientes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dni` INTEGER NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `celular` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(191) NULL,
    `direccion` VARCHAR(191) NULL,
    `condicion` VARCHAR(191) NULL,
    `estado` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Clientes_dni_key`(`dni`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pagos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `caso_id` INTEGER NOT NULL,
    `monto` DOUBLE NOT NULL,
    `fecha_pago` DATETIME(3) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `metodo_pago` VARCHAR(191) NULL,
    `monto_total` DOUBLE NOT NULL,
    `saldo_restante` DOUBLE NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Casos` ADD CONSTRAINT `Casos_cliente_dni_fkey` FOREIGN KEY (`cliente_dni`) REFERENCES `Clientes`(`dni`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CasosUsuarios` ADD CONSTRAINT `CasosUsuarios_caso_id_fkey` FOREIGN KEY (`caso_id`) REFERENCES `Casos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CasosUsuarios` ADD CONSTRAINT `CasosUsuarios_colaborador_dni_fkey` FOREIGN KEY (`colaborador_dni`) REFERENCES `Usuarios`(`dni`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pagos` ADD CONSTRAINT `Pagos_caso_id_fkey` FOREIGN KEY (`caso_id`) REFERENCES `Casos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
