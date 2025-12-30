<?php
/**
 * Export Contacts to CSV
 * Exports all contacts or filtered contacts to CSV file
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/../database/Contact.php';
require_once __DIR__ . '/../database/User.php';
require_once __DIR__ . '/helpers.php';

// Authenticate user
$token = getAuthToken();

if (!$token) {
    header('Content-Type: application/json');
    sendJson(['success' => false, 'message' => 'No autorizado'], 401);
}

$user = new User();
$session = $user->validateSession($token);

if (!$session) {
    header('Content-Type: application/json');
    sendJson(['success' => false, 'message' => 'Sesión inválida o expirada'], 401);
}

try {
    $contact = new Contact();
    
    // Get filters from query params
    $search = $_GET['search'] ?? '';
    $service = $_GET['service'] ?? '';
    $status = $_GET['status'] ?? '';
    
    // Get all contacts (no pagination for export)
    $contacts = $contact->getAll(1, 10000, $search, $service, $status);
    
    // Set headers for CSV download
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename="contactos_xpertia_' . date('Y-m-d_His') . '.csv"');
    
    // Create output stream
    $output = fopen('php://output', 'w');
    
    // Add BOM for Excel UTF-8 support
    fprintf($output, chr(0xEF).chr(0xBB).chr(0xBF));
    
    // Add CSV headers
    fputcsv($output, [
        'ID',
        'Nombre',
        'Email',
        'Servicio',
        'Mensaje',
        'Estado',
        'IP',
        'Navegador',
        'Fecha de Creación',
        'Última Actualización'
    ]);
    
    // Add data rows
    foreach ($contacts as $contact) {
        fputcsv($output, [
            $contact['id'],
            $contact['name'],
            $contact['email'],
            $contact['service'],
            $contact['message'],
            $contact['status'],
            $contact['ip_address'],
            $contact['user_agent'],
            $contact['created_at'],
            $contact['updated_at']
        ]);
    }
    
    fclose($output);
    exit;
    
} catch (Exception $e) {
    header('Content-Type: application/json');
    sendJson([
        'success' => false,
        'message' => 'Error al exportar: ' . $e->getMessage()
    ], 500);
}
