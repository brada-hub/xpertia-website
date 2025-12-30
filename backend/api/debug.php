<?php
/**
 * Debug endpoint to test authentication
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

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
