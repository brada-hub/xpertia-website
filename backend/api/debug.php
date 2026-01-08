<?php
/**
 * Debug endpoint to test authentication
 */

require_once __DIR__ . '/cors.php';
header('Content-Type: application/json');

require_once __DIR__ . '/helpers.php';

// Debug information
$debug = [
    'method' => $_SERVER['REQUEST_METHOD'],
    'headers' => [],
    'server_vars' => [],
    'token' => null,
];

// Get all headers
if (function_exists('getallheaders')) {
    $debug['headers'] = getallheaders();
}

// Check $_SERVER for auth headers
$authKeys = ['HTTP_AUTHORIZATION', 'REDIRECT_HTTP_AUTHORIZATION', 'Authorization'];
foreach ($authKeys as $key) {
    if (isset($_SERVER[$key])) {
        $debug['server_vars'][$key] = $_SERVER[$key];
    }
}

// Try to get token
$debug['token'] = getAuthToken();

// Response
echo json_encode([
    'success' => true,
    'message' => 'Debug info',
    'debug' => $debug
], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
