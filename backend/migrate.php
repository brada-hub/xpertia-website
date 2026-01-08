<?php
/**
 * Quick Database Creator
 */
$config = require __DIR__ . '/config/database.php';

try {
    // Conectar sin base de datos específica primero
    $dsn = "mysql:host={$config['host']};charset={$config['charset']}";
    $pdo = new PDO(
        $dsn,
        $config['username'],
        $config['password']
    );
    
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `{$config['database']}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;");
    echo "Base de datos '{$config['database']}' creada o ya existía.\n";
    
    // Ahora conectar a la base de datos para crear las tablas
    $pdo->exec("USE `{$config['database']}`");
    
    // Leer e importar migration.sql
    $migrationSql = file_get_contents(__DIR__ . '/database/migration.sql');
    if ($migrationSql) {
        $pdo->exec($migrationSql);
        echo "Tablas base importadas (migration.sql).\n";
    }

    // Leer e importar projects_migration.sql
    $projectsMigrationSql = file_get_contents(__DIR__ . '/database/projects_migration.sql');
    if ($projectsMigrationSql) {
        $pdo->exec($projectsMigrationSql);
        echo "Tablas de proyectos importadas (projects_migration.sql).\n";
    }

    echo "¡Migración completada con éxito!\n";
    
    // Forzar actualización de contraseña del admin por si ya existía
    $adminPass = password_hash('12345678', PASSWORD_BCRYPT);
    $pdo->prepare("UPDATE users SET password = ? WHERE email = 'admin@xpertia.com'")->execute([$adminPass]);
    echo "Contraseña de administrador actualizada a '12345678'.\n";
    
} catch (PDOException $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
}
