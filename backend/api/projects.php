<?php
/**
 * Projects API Endpoint
 * Handles project management with personnel assignment (admin only)
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/../database/Project.php';
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
    $project = new Project();
    $method = $_SERVER['REQUEST_METHOD'];
    
    // GET - List projects, get single, or get stats
    if ($method === 'GET') {
        // Get statistics
        if (isset($_GET['stats'])) {
            $stats = $project->getStats();
            $byStatus = $project->getByStatus();
            
            sendJson([
                'success' => true,
                'data' => [
                    'stats' => $stats,
                    'by_status' => $byStatus
                ]
            ]);
        }
        
        // Get single project
        if (isset($_GET['id'])) {
            $projectData = $project->getById($_GET['id']);
            
            if (!$projectData) {
                sendJson(['success' => false, 'message' => 'Proyecto no encontrado'], 404);
            }
            
            sendJson([
                'success' => true,
                'data' => $projectData
            ]);
        }
        
        // List projects
        $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
        $perPage = isset($_GET['per_page']) ? (int)$_GET['per_page'] : 20;
        $search = $_GET['search'] ?? '';
        $status = $_GET['status'] ?? '';
        $clientId = $_GET['client_id'] ?? '';
        
        $projects = $project->getAll($page, $perPage, $search, $status, $clientId);
        $total = $project->getCount($search, $status, $clientId);
        
        sendJson([
            'success' => true,
            'data' => [
                'projects' => $projects,
                'pagination' => [
                    'current_page' => $page,
                    'per_page' => $perPage,
                    'total' => $total,
                    'total_pages' => ceil($total / $perPage)
                ]
            ]
        ]);
    }
    
    // POST - Create project or assign/unassign personnel
    elseif ($method === 'POST') {
        $input = getJsonInput();
        
        // Handle personnel assignment
        if (isset($_GET['action'])) {
            $action = $_GET['action'];
            
            if ($action === 'assign') {
                $required = ['project_id', 'personnel_id', 'role'];
                $errors = validateRequired($input, $required);
                
                if (!empty($errors)) {
                    sendJson([
                        'success' => false,
                        'message' => 'Error de validación',
                        'errors' => $errors
                    ], 422);
                }
                
                try {
                    $id = $project->assignPersonnel(
                        $input['project_id'],
                        $input['personnel_id'],
                        $input['role']
                    );
                    
                    sendJson([
                        'success' => true,
                        'message' => 'Personal asignado exitosamente',
                        'data' => ['id' => $id]
                    ]);
                } catch (Exception $e) {
                    sendJson([
                        'success' => false,
                        'message' => 'Error al asignar personal: ' . $e->getMessage()
                    ], 400);
                }
            }
            
            elseif ($action === 'unassign') {
                $required = ['project_id', 'personnel_id'];
                $errors = validateRequired($input, $required);
                
                if (!empty($errors)) {
                    sendJson([
                        'success' => false,
                        'message' => 'Error de validación',
                        'errors' => $errors
                    ], 422);
                }
                
                $removed = $project->unassignPersonnel(
                    $input['project_id'],
                    $input['personnel_id']
                );
                
                if (!$removed) {
                    sendJson(['success' => false, 'message' => 'Asignación no encontrada'], 404);
                }
                
                sendJson([
                    'success' => true,
                    'message' => 'Personal removido exitosamente'
                ]);
            }
            
            else {
                sendJson(['success' => false, 'message' => 'Acción no válida'], 400);
            }
        }
        
        // Create project
        else {
            $required = ['name', 'description', 'client_id', 'start_date'];
            $errors = validateRequired($input, $required);
            
            if (!empty($errors)) {
                sendJson([
                    'success' => false,
                    'message' => 'Error de validación',
                    'errors' => $errors
                ], 422);
            }
            
            $id = $project->create($input);
            
            sendJson([
                'success' => true,
                'message' => 'Proyecto creado exitosamente',
                'data' => ['id' => $id]
            ], 201);
        }
    }
    
    // PATCH - Update project
    elseif ($method === 'PATCH') {
        $input = getJsonInput();
        
        if (!isset($input['id'])) {
            sendJson(['success' => false, 'message' => 'ID es requerido'], 400);
        }
        
        $required = ['name', 'description', 'client_id', 'status', 'start_date'];
        $errors = validateRequired($input, $required);
        
        if (!empty($errors)) {
            sendJson([
                'success' => false,
                'message' => 'Error de validación',
                'errors' => $errors
            ], 422);
        }
        
        $updated = $project->update($input['id'], $input);
        
        if (!$updated) {
            sendJson(['success' => false, 'message' => 'Proyecto no encontrado'], 404);
        }
        
        sendJson([
            'success' => true,
            'message' => 'Proyecto actualizado exitosamente'
        ]);
    }
    
    // DELETE - Delete project
    elseif ($method === 'DELETE') {
        $input = getJsonInput();
        
        if (!isset($input['id'])) {
            sendJson(['success' => false, 'message' => 'ID es requerido'], 400);
        }
        
        $deleted = $project->delete($input['id']);
        
        if (!$deleted) {
            sendJson(['success' => false, 'message' => 'Proyecto no encontrado'], 404);
        }
        
        sendJson([
            'success' => true,
            'message' => 'Proyecto eliminado exitosamente'
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
