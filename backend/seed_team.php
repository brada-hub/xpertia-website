<?php
require_once __DIR__ . '/database/Database.php';

try {
    echo "Iniciando importación del equipo...\n";
    
    $db = Database::getInstance();
    $pdo = $db->getConnection();
    
    // Team data from Equipo.jsx
    $team = [
        [
            'name' => 'Ing. Jose James Claure Ricaldi',
            'position' => 'Director de Estrategia y Consultoría (CEO)',
            'email' => 'jose.claure@xpertia.com', // Generated email
            'phone' => '',
            'status' => 'active'
        ],
        [
            'name' => 'Msc. Ariel Denys Cámara Arze',
            'position' => 'Director Técnico (CTO) y Arquitecto de Soluciones',
            'email' => 'ariel.camara@xpertia.com',
            'phone' => '',
            'status' => 'active'
        ],
        [
            'name' => 'Ing. Harold Marco Antonio Rojas Torres',
            'position' => 'Líder de Calidad y Desarrollo de Software',
            'email' => 'harold.rojas@xpertia.com',
            'phone' => '',
            'status' => 'active'
        ],
        [
            'name' => 'Ing. Juan Jose Mamani Via',
            'position' => 'Especialista en Integración de IA y Desarrollo Senior',
            'email' => 'juan.mamani@xpertia.com',
            'phone' => '',
            'status' => 'active'
        ],
        [
            'name' => 'Msc. Gustavo Magariños Camacho',
            'position' => 'Especialista Líder en Ciberseguridad y Auditoría',
            'email' => 'gustavo.magarinos@xpertia.com',
            'phone' => '',
            'status' => 'active'
        ],
        [
            'name' => 'Brayan David Padilla Siles',
            'position' => 'Desarrollador Frontend (Especialista en Interfaces)',
            'email' => 'brayan.padilla@xpertia.com',
            'phone' => '',
            'status' => 'active'
        ],
        [
            'name' => 'Juan Pablo Sandagorda',
            'position' => 'Desarrollador Backend (Especialista en Arquitectura de Datos)',
            'email' => 'juan.sandagorda@xpertia.com',
            'phone' => '',
            'status' => 'active'
        ]
    ];
    
    // Disable foreign key checks
    $pdo->exec("SET FOREIGN_KEY_CHECKS = 0");
    
    // Clear existing personnel
    $pdo->exec("TRUNCATE TABLE personnel");
    // Also clear the pivot table to avoid orphaned records if we are resetting personnel
    $pdo->exec("TRUNCATE TABLE project_personnel");
    
    $pdo->exec("SET FOREIGN_KEY_CHECKS = 1");
    
    echo "Tablas 'personnel' y 'project_personnel' limpiadas.\n";
    
    $stmt = $pdo->prepare("INSERT INTO personnel (name, position, email, phone, status, created_at) VALUES (?, ?, ?, ?, ?, NOW())");
    
    foreach ($team as $member) {
        $stmt->execute([
            $member['name'],
            $member['position'],
            $member['email'],
            $member['phone'],
            $member['status']
        ]);
        echo "Insertado: " . $member['name'] . "\n";
    }
    
    echo "✅ Importación completada exitosamente.\n";
    
} catch (Exception $e) {
    echo "❌ Error durante la importación: " . $e->getMessage() . "\n";
}
