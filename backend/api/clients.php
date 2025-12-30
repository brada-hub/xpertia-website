<?php
/**
 * Clients API Endpoint
 * Handles client management (admin only)
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/../database/Client.php';
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
    $client = new Client();
    $method = $_SERVER['REQUEST_METHOD'];
    
    // GET - List clients or get single client
    if ($method === 'GET') {
        if (isset($_GET['id'])) {
            $clientData = $client->getWithProjects($_GET['id']);
            
            if (!$clientData) {
                sendJson(['success' => false, 'message' => 'Cliente no encontrado'], 404);
            }
            
            sendJson([
                'success' => true,
                'data' => $clientData
            ]);
        }
        
        // List clients
        $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
        $perPage = isset($_GET['per_page']) ? (int)$_GET['per_page'] : 20;
        $search = $_GET['search'] ?? '';
        
        $clients = $client->getAll($page, $perPage, $search);
        $total = $client->getCount($search);
        
        sendJson([
            'success' => true,
            'data' => [
                'clients' => $clients,
                'pagination' => [
                    'current_page' => $page,
                    'per_page' => $perPage,
                    'total' => $total,
                    'total_pages' => ceil($total / $perPage)
                ]
            ]
        ]);
    }
    
    // POST - Create client
    elseif ($method === 'POST') {
        $input = getJsonInput();
        
        $required = ['name', 'contact_person', 'email', 'company'];
        $errors = validateRequired($input, $required);
        
        if (!validateEmail($input['email'])) {
            $errors['email'] = 'Email inválido';
        }
        
        if (!empty($errors)) {
            sendJson([
                'success' => false,
                'message' => 'Error de validación',
                'errors' => $errors
            ], 422);
        }
        
        $id = $client->create($input);
        
        sendJson([
            'success' => true,
            'message' => 'Cliente creado exitosamente',
            'data' => ['id' => $id]
        ], 201);
    }
    
    // PATCH - Update client
    elseif ($method === 'PATCH') {
        $input = getJsonInput();
        
        if (!isset($input['id'])) {
            sendJson(['success' => false, 'message' => 'ID es requerido'], 400);
        }
        
        $required = ['name', 'contact_person', 'email', 'company'];
        $errors = validateRequired($input, $required);
        
        if (!validateEmail($input['email'])) {
            $errors['email'] = 'Email inválido';
        }
        
        if (!empty($errors)) {
            sendJson([
                'success' => false,
                'message' => 'Error de validación',
                'errors' => $errors
            ], 422);
        }
        
        $updated = $client->update($input['id'], $input);
        
        if (!$updated) {
            sendJson(['success' => false, 'message' => 'Cliente no encontrado'], 404);
        }
        
        sendJson([
            'success' => true,
            'message' => 'Cliente actualizado exitosamente'
        ]);
    }
    
    // DELETE - Delete client
    elseif ($method === 'DELETE') {
        $input = getJsonInput();
        
        if (!isset($input['id'])) {
            sendJson(['success' => false, 'message' => 'ID es requerido'], 400);
        }
        
        try {
            $deleted = $client->delete($input['id']);
            
            if (!$deleted) {
                sendJson(['success' => false, 'message' => 'Cliente no encontrado'], 404);
            }
            
            sendJson([
                'success' => true,
                'message' => 'Cliente eliminado exitosamente'
            ]);
        } catch (Exception $e) {
            sendJson([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
        }
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
