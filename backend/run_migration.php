<?php
require_once __DIR__ . '/database/Database.php';

try {
    echo "Iniciando migración de base de datos...\n";
    
    // Connect to database
    $db = Database::getInstance();
    $pdo = $db->getConnection();
    
    // Read SQL file
    $sqlFile = __DIR__ . '/database/projects_migration.sql';
    if (!file_exists($sqlFile)) {
        die("Error: No se encontró el archivo SQL en $sqlFile\n");
    }
    
    $sql = file_get_contents($sqlFile);
    
    // Execute SQL
    // Split by semicolon to handle multiple statements if necessary, 
    // but PDO::exec can sometimes handle multiple statements depending on driver settings.
    // For safety with migrations containing delimiters or complex logic, raw exec is often okay for simple dumps.
    
    $pdo->exec($sql);
    
    echo "✅ Migración completada exitosamente.\n";
    echo "Las tablas 'clients', 'personnel', 'projects' y 'project_personnel' han sido creadas.\n";
    
} catch (Exception $e) {
    echo "❌ Error durante la migración: " . $e->getMessage() . "\n";
}
