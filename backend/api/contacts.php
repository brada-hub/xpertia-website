<?php
/**
 * Contact API Endpoint
 * Handles contact form submissions
 */

require_once __DIR__ . '/cors.php';

header('Content-Type: application/json');

require_once __DIR__ . '/../database/Contact.php';
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
    
    // Sanitize input
    $data = sanitize($input);
    
    // Validate required fields
    $errors = validateRequired($data, ['name', 'email', 'service', 'message']);
    
    // Validate email format
    if (isset($data['email']) && !validateEmail($data['email'])) {
        $errors['email'] = 'El email no es válido';
    }
    
    // Validate message length
    if (isset($data['message']) && strlen(trim($data['message'])) < 10) {
        $errors['message'] = 'El mensaje debe tener al menos 10 caracteres';
    }
    
    if (!empty($errors)) {
        sendJson([
            'success' => false,
            'message' => 'Error de validación',
            'errors' => $errors
        ], 422);
    }
    
    // Add IP and user agent
    $data['ip_address'] = getClientIp();
    $data['user_agent'] = getUserAgent();
    
    // Create contact
    $contact = new Contact();
    $id = $contact->create($data);
    
    sendJson([
        'success' => true,
        'message' => '¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.',
        'data' => ['id' => $id]
    ], 201);
    
} catch (Exception $e) {
    sendJson([
        'success' => false,
        'message' => 'Error al procesar la solicitud: ' . $e->getMessage()
    ], 500);
}
