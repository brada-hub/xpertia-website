<?php
/**
 * Project Model
 * Handles project management with relationships
 */

require_once __DIR__ . '/Database.php';

class Project {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance();
    }
    
    /**
     * Create a new project
     */
    public function create($data) {
        $sql = "INSERT INTO projects (name, description, client_id, status, start_date, end_date, budget, observations) 
                VALUES (:name, :description, :client_id, :status, :start_date, :end_date, :budget, :observations)";
        
        $params = [
            ':name' => $data['name'],
            ':description' => $data['description'],
            ':client_id' => $data['client_id'],
            ':status' => $data['status'] ?? 'planning',
            ':start_date' => $data['start_date'],
            ':end_date' => $data['end_date'] ?? null,
            ':budget' => $data['budget'] ?? null,
            ':observations' => $data['observations'] ?? null
        ];
        
        $this->db->execute($sql, $params);
        return $this->db->lastInsertId();
    }
    
    /**
     * Get all projects with pagination and filters
     */
    public function getAll($page = 1, $perPage = 20, $search = '', $status = '', $clientId = '') {
        $offset = ($page - 1) * $perPage;
        
        $sql = "SELECT p.*, c.company as client_company, c.name as client_name
                FROM projects p
                JOIN clients c ON p.client_id = c.id
                WHERE 1=1";
        $params = [];
        
        if (!empty($search)) {
            $sql .= " AND (p.name LIKE :search OR p.description LIKE :search)";
            $params[':search'] = "%{$search}%";
        }
        
        if (!empty($status)) {
            $sql .= " AND p.status = :status";
            $params[':status'] = $status;
        }
        
        if (!empty($clientId)) {
            $sql .= " AND p.client_id = :client_id";
            $params[':client_id'] = $clientId;
        }
        
        $sql .= " ORDER BY p.created_at DESC LIMIT :limit OFFSET :offset";
        
        $stmt = $this->db->getConnection()->prepare($sql);
        
        foreach ($params as $key => $value) {
            $stmt->bindValue($key, $value);
        }
        
        $stmt->bindValue(':limit', (int)$perPage, PDO::PARAM_INT);
        $stmt->bindValue(':offset', (int)$offset, PDO::PARAM_INT);
        
        $stmt->execute();
        return $stmt->fetchAll();
    }
    
    /**
     * Get total count for pagination
     */
    public function getCount($search = '', $status = '', $clientId = '') {
        $sql = "SELECT COUNT(*) as total FROM projects WHERE 1=1";
        $params = [];
        
        if (!empty($search)) {
            $sql .= " AND (name LIKE :search OR description LIKE :search)";
            $params[':search'] = "%{$search}%";
        }
        
        if (!empty($status)) {
            $sql .= " AND status = :status";
            $params[':status'] = $status;
        }
        
        if (!empty($clientId)) {
            $sql .= " AND client_id = :client_id";
            $params[':client_id'] = $clientId;
        }
        
        $result = $this->db->fetchOne($sql, $params);
        return (int)$result['total'];
    }
    
    /**
     * Get a single project by ID with full details
     */
    public function getById($id) {
        $sql = "SELECT p.*, c.company as client_company, c.name as client_name, c.email as client_email
                FROM projects p
                JOIN clients c ON p.client_id = c.id
                WHERE p.id = :id";
        
        $project = $this->db->fetchOne($sql, [':id' => $id]);
        
        if ($project) {
            // Get assigned personnel
            $sql = "SELECT pe.*, pp.role, pp.assigned_at
                    FROM personnel pe
                    JOIN project_personnel pp ON pe.id = pp.personnel_id
                    WHERE pp.project_id = :project_id
                    ORDER BY pp.assigned_at ASC";
            
            $project['personnel'] = $this->db->fetchAll($sql, [':project_id' => $id]);
        }
        
        return $project;
    }
    
    /**
     * Update project
     */
    public function update($id, $data) {
        $sql = "UPDATE projects SET 
                name = :name,
                description = :description,
                client_id = :client_id,
                status = :status,
                start_date = :start_date,
                end_date = :end_date,
                budget = :budget,
                observations = :observations,
                updated_at = NOW()
                WHERE id = :id";
        
        $params = [
            ':id' => $id,
            ':name' => $data['name'],
            ':description' => $data['description'],
            ':client_id' => $data['client_id'],
            ':status' => $data['status'],
            ':start_date' => $data['start_date'],
            ':end_date' => $data['end_date'] ?? null,
            ':budget' => $data['budget'] ?? null,
            ':observations' => $data['observations'] ?? null
        ];
        
        $this->db->execute($sql, $params);
        return $this->db->getConnection()->rowCount() > 0;
    }
    
    /**
     * Delete a project
     */
    public function delete($id) {
        // Personnel assignments will be deleted automatically (CASCADE)
        $sql = "DELETE FROM projects WHERE id = :id";
        $this->db->execute($sql, [':id' => $id]);
        return $this->db->getConnection()->rowCount() > 0;
    }
    
    /**
     * Assign personnel to project
     */
    public function assignPersonnel($projectId, $personnelId, $role) {
        $sql = "INSERT INTO project_personnel (project_id, personnel_id, role) 
                VALUES (:project_id, :personnel_id, :role)";
        
        $params = [
            ':project_id' => $projectId,
            ':personnel_id' => $personnelId,
            ':role' => $role
        ];
        
        $this->db->execute($sql, $params);
        return $this->db->lastInsertId();
    }
    
    /**
     * Remove personnel from project
     */
    public function unassignPersonnel($projectId, $personnelId) {
        $sql = "DELETE FROM project_personnel 
                WHERE project_id = :project_id AND personnel_id = :personnel_id";
        
        $this->db->execute($sql, [
            ':project_id' => $projectId,
            ':personnel_id' => $personnelId
        ]);
        
        return $this->db->getConnection()->rowCount() > 0;
    }
    
    /**
     * Get project statistics
     */
    public function getStats() {
        $sql = "SELECT 
                    COUNT(*) as total,
                    SUM(CASE WHEN status = 'planning' THEN 1 ELSE 0 END) as planning_count,
                    SUM(CASE WHEN status = 'development' THEN 1 ELSE 0 END) as development_count,
                    SUM(CASE WHEN status = 'testing' THEN 1 ELSE 0 END) as testing_count,
                    SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed_count,
                    SUM(CASE WHEN status = 'paused' THEN 1 ELSE 0 END) as paused_count,
                    SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled_count
                FROM projects";
        
        return $this->db->fetchOne($sql);
    }
    
    /**
     * Get projects by status
     */
    public function getByStatus() {
        $sql = "SELECT status, COUNT(*) as count 
                FROM projects 
                GROUP BY status 
                ORDER BY count DESC";
        
        return $this->db->fetchAll($sql);
    }
}
