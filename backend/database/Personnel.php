<?php
/**
 * Personnel Model
 * Handles employee/staff management
 */

require_once __DIR__ . '/Database.php';

class Personnel {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance();
    }
    
    /**
     * Create a new personnel
     */
    public function create($data) {
        $sql = "INSERT INTO personnel (name, email, position, phone, status) 
                VALUES (:name, :email, :position, :phone, :status)";
        
        $params = [
            ':name' => $data['name'],
            ':email' => $data['email'],
            ':position' => $data['position'],
            ':phone' => $data['phone'] ?? null,
            ':status' => $data['status'] ?? 'active'
        ];
        
        $this->db->execute($sql, $params);
        return $this->db->lastInsertId();
    }
    
    /**
     * Get all personnel with pagination and filters
     */
    public function getAll($page = 1, $perPage = 20, $search = '', $position = '', $status = '') {
        $offset = ($page - 1) * $perPage;
        
        $sql = "SELECT * FROM personnel WHERE 1=1";
        $params = [];
        
        if (!empty($search)) {
            $sql .= " AND (name LIKE :search OR email LIKE :search)";
            $params[':search'] = "%{$search}%";
        }
        
        if (!empty($position)) {
            $sql .= " AND position = :position";
            $params[':position'] = $position;
        }
        
        if (!empty($status)) {
            $sql .= " AND status = :status";
            $params[':status'] = $status;
        }
        
        $sql .= " ORDER BY name ASC LIMIT :limit OFFSET :offset";
        
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
    public function getCount($search = '', $position = '', $status = '') {
        $sql = "SELECT COUNT(*) as total FROM personnel WHERE 1=1";
        $params = [];
        
        if (!empty($search)) {
            $sql .= " AND (name LIKE :search OR email LIKE :search)";
            $params[':search'] = "%{$search}%";
        }
        
        if (!empty($position)) {
            $sql .= " AND position = :position";
            $params[':position'] = $position;
        }
        
        if (!empty($status)) {
            $sql .= " AND status = :status";
            $params[':status'] = $status;
        }
        
        $result = $this->db->fetchOne($sql, $params);
        return (int)$result['total'];
    }
    
    /**
     * Get a single personnel by ID
     */
    public function getById($id) {
        $sql = "SELECT * FROM personnel WHERE id = :id";
        return $this->db->fetchOne($sql, [':id' => $id]);
    }
    
    /**
     * Get personnel with their assigned projects
     */
    public function getWithProjects($id) {
        $personnel = $this->getById($id);
        
        if ($personnel) {
            $sql = "SELECT p.*, pp.role, c.company as client_company
                    FROM projects p
                    JOIN project_personnel pp ON p.id = pp.project_id
                    JOIN clients c ON p.client_id = c.id
                    WHERE pp.personnel_id = :personnel_id
                    ORDER BY p.created_at DESC";
            
            $personnel['projects'] = $this->db->fetchAll($sql, [':personnel_id' => $id]);
        }
        
        return $personnel;
    }
    
    /**
     * Update personnel
     */
    public function update($id, $data) {
        $sql = "UPDATE personnel SET 
                name = :name,
                email = :email,
                position = :position,
                phone = :phone,
                status = :status,
                updated_at = NOW()
                WHERE id = :id";
        
        $params = [
            ':id' => $id,
            ':name' => $data['name'],
            ':email' => $data['email'],
            ':position' => $data['position'],
            ':phone' => $data['phone'] ?? null,
            ':status' => $data['status']
        ];
        
        $stmt = $this->db->execute($sql, $params);
        return $stmt->rowCount() > 0;
    }
    
    /**
     * Delete personnel
     */
    public function delete($id) {
        // Check if personnel is assigned to projects
        $sql = "SELECT COUNT(*) as count FROM project_personnel WHERE personnel_id = :id";
        $result = $this->db->fetchOne($sql, [':id' => $id]);
        
        if ($result['count'] > 0) {
            throw new Exception('No se puede eliminar el empleado porque está asignado a proyectos');
        }
        
        $sql = "DELETE FROM personnel WHERE id = :id";
        $stmt = $this->db->execute($sql, [':id' => $id]);
        return $stmt->rowCount() > 0;
    }
    
    /**
     * Get all unique positions
     */
    public function getPositions() {
        $sql = "SELECT DISTINCT position FROM personnel ORDER BY position ASC";
        return $this->db->fetchAll($sql);
    }
}
