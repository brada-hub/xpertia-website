<?php
/**
 * Admin Authentication API
 * Handles admin login and logout
 */

require_once __DIR__ . '/cors.php';

header('Content-Type: application/json');

require_once __DIR__ . '/../database/User.php';
require_once __DIR__ . '/helpers.php';

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJson(['success' => false, 'message' => 'Método no permitido'], 405);
}

try {
    $input = getJsonInput();
    
    if (!$input) {
        sendJson(['success' => false, 'message' => 'Datos inválidos'], 400);
    }
    
    $action = $input['action'] ?? '';
    
    $user = new User();
    
    if ($action === 'login') {
        // Validate credentials
        $errors = validateRequired($input, ['email', 'password']);
        
        if (!empty($errors)) {
            sendJson([
                'success' => false,
                'message' => 'Error de validación',
                'errors' => $errors
            ], 422);
        }
        
        // Authenticate user
        $authenticatedUser = $user->authenticate($input['email'], $input['password']);
        
        if (!$authenticatedUser) {
            sendJson([
                'success' => false,
                'message' => 'Credenciales inválidas'
            ], 401);
        }
        
        // Create session
        $token = $user->createSession($authenticatedUser['id']);
        
        sendJson([
            'success' => true,
            'message' => 'Inicio de sesión exitoso',
            'data' => [
                'token' => $token,
                'user' => [
                    'id' => $authenticatedUser['id'],
                    'name' => $authenticatedUser['name'],
                    'email' => $authenticatedUser['email']
                ]
            ]
        ]);
        
    } elseif ($action === 'logout') {
        $token = getAuthToken();
        
        if (!$token) {
            sendJson(['success' => false, 'message' => 'Token no proporcionado'], 401);
        }
        
        $user->deleteSession($token);
        
        sendJson([
            'success' => true,
            'message' => 'Sesión cerrada exitosamente'
        ]);
        
    } else {
        sendJson(['success' => false, 'message' => 'Acción no válida'], 400);
    }
    
} catch (Exception $e) {
    sendJson([
        'success' => false,
        'message' => 'Error al procesar la solicitud: ' . $e->getMessage()
    ], 500);
}
