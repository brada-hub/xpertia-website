<?php
/**
 * Admin Contacts Management API
 * Handles listing, viewing, updating, and deleting contacts
 */

require_once __DIR__ . '/cors.php';

header('Content-Type: application/json');

require_once __DIR__ . '/../database/Contact.php';
require_once __DIR__ . '/../database/User.php';
require_once __DIR__ . '/helpers.php';

// Authenticate user
$token = getAuthToken();

if (!$token) {
    sendJson(['success' => false, 'message' => 'No autorizado'], 401);
}

$user = new User();
$session = $user->validateSession($token);

if (!$session) {
    sendJson(['success' => false, 'message' => 'Sesión inválida o expirada'], 401);
}

try {
    $contact = new Contact();
    $method = $_SERVER['REQUEST_METHOD'];
    
    // GET - List contacts or get single contact
    if ($method === 'GET') {
        // Check if requesting single contact
        if (isset($_GET['id'])) {
            $contactData = $contact->getById($_GET['id']);
            
            if (!$contactData) {
                sendJson(['success' => false, 'message' => 'Contacto no encontrado'], 404);
            }
            
            sendJson([
                'success' => true,
                'data' => $contactData
            ]);
        }
        
        // Check if requesting stats
        if (isset($_GET['stats'])) {
            $stats = $contact->getStats();
            $byService = $contact->getByService();
            
            sendJson([
                'success' => true,
                'data' => [
                    'stats' => $stats,
                    'by_service' => $byService
                ]
            ]);
        }
        
        // List contacts with pagination and filters
        $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
        $perPage = isset($_GET['per_page']) ? (int)$_GET['per_page'] : 20;
        $search = $_GET['search'] ?? '';
        $service = $_GET['service'] ?? '';
        $status = $_GET['status'] ?? '';
        
        $contacts = $contact->getAll($page, $perPage, $search, $service, $status);
        $total = $contact->getCount($search, $service, $status);
        
        sendJson([
            'success' => true,
            'data' => [
                'contacts' => $contacts,
                'pagination' => [
                    'current_page' => $page,
                    'per_page' => $perPage,
                    'total' => $total,
                    'total_pages' => ceil($total / $perPage)
                ]
            ]
        ]);
    }
    
    // PATCH - Update contact status
    elseif ($method === 'PATCH') {
        $input = getJsonInput();
        
        if (!isset($input['id']) || !isset($input['status'])) {
            sendJson(['success' => false, 'message' => 'ID y status son requeridos'], 400);
        }
        
        $validStatuses = ['new', 'read', 'replied', 'archived'];
        if (!in_array($input['status'], $validStatuses)) {
            sendJson(['success' => false, 'message' => 'Status inválido'], 400);
        }
        
        $updated = $contact->updateStatus($input['id'], $input['status']);
        
        if (!$updated) {
            sendJson(['success' => false, 'message' => 'Contacto no encontrado'], 404);
        }
        
        sendJson([
            'success' => true,
            'message' => 'Estado actualizado exitosamente'
        ]);
    }
    
    // DELETE - Delete contact
    elseif ($method === 'DELETE') {
        $input = getJsonInput();
        
        if (!isset($input['id'])) {
            sendJson(['success' => false, 'message' => 'ID es requerido'], 400);
        }
        
        $deleted = $contact->delete($input['id']);
        
        if (!$deleted) {
            sendJson(['success' => false, 'message' => 'Contacto no encontrado'], 404);
        }
        
        sendJson([
            'success' => true,
            'message' => 'Contacto eliminado exitosamente'
        ]);
    }
    
    else {
        sendJson(['success' => false, 'message' => 'Método no permitido'], 405);
    }
    
} catch (Exception $e) {
    sendJson([
        'success' => false,
        'message' => 'Error al procesar la solicitud: ' . $e->getMessage()
    ], 500);
}
