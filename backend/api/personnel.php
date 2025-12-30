<?php
/**
 * Personnel API Endpoint
 * Handles personnel/employee management (admin only)
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/../database/Personnel.php';
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
    $personnel = new Personnel();
    $method = $_SERVER['REQUEST_METHOD'];
    
    // GET - List personnel or get single
    if ($method === 'GET') {
        // Get positions list
        if (isset($_GET['positions'])) {
            $positions = $personnel->getPositions();
            sendJson([
                'success' => true,
                'data' => $positions
            ]);
        }
        
        // Get single personnel
        if (isset($_GET['id'])) {
            $personnelData = $personnel->getWithProjects($_GET['id']);
            
            if (!$personnelData) {
                sendJson(['success' => false, 'message' => 'Empleado no encontrado'], 404);
            }
            
            sendJson([
                'success' => true,
                'data' => $personnelData
            ]);
        }
        
        // List personnel
        $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
        $perPage = isset($_GET['per_page']) ? (int)$_GET['per_page'] : 20;
        $search = $_GET['search'] ?? '';
        $position = $_GET['position'] ?? '';
        $status = $_GET['status'] ?? '';
        
        $personnelList = $personnel->getAll($page, $perPage, $search, $position, $status);
        $total = $personnel->getCount($search, $position, $status);
        
        sendJson([
            'success' => true,
            'data' => [
                'personnel' => $personnelList,
                'pagination' => [
                    'current_page' => $page,
                    'per_page' => $perPage,
                    'total' => $total,
                    'total_pages' => ceil($total / $perPage)
                ]
            ]
        ]);
    }
    
    // POST - Create personnel
    elseif ($method === 'POST') {
        $input = getJsonInput();
        
        $required = ['name', 'email', 'position'];
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
        
        $id = $personnel->create($input);
        
        sendJson([
            'success' => true,
            'message' => 'Empleado creado exitosamente',
            'data' => ['id' => $id]
        ], 201);
    }
    
    // PATCH - Update personnel
    elseif ($method === 'PATCH') {
        $input = getJsonInput();
        
        if (!isset($input['id'])) {
            sendJson(['success' => false, 'message' => 'ID es requerido'], 400);
        }
        
        $required = ['name', 'email', 'position', 'status'];
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
        
        $updated = $personnel->update($input['id'], $input);
        
        if (!$updated) {
            sendJson(['success' => false, 'message' => 'Empleado no encontrado'], 404);
        }
        
        sendJson([
            'success' => true,
            'message' => 'Empleado actualizado exitosamente'
        ]);
    }
    
    // DELETE - Delete personnel
    elseif ($method === 'DELETE') {
        $input = getJsonInput();
        
        if (!isset($input['id'])) {
            sendJson(['success' => false, 'message' => 'ID es requerido'], 400);
        }
        
        try {
            $deleted = $personnel->delete($input['id']);
            
            if (!$deleted) {
                sendJson(['success' => false, 'message' => 'Empleado no encontrado'], 404);
            }
            
            sendJson([
                'success' => true,
                'message' => 'Empleado eliminado exitosamente'
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
