<?php
/**
 * Client Model
 * Handles client/company management
 */

require_once __DIR__ . '/Database.php';

class Client {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance();
    }
    
    /**
     * Create a new client
     */
    public function create($data) {
        $sql = "INSERT INTO clients (name, contact_person, email, phone, company, address) 
                VALUES (:name, :contact_person, :email, :phone, :company, :address)";
        
        $params = [
            ':name' => $data['name'],
            ':contact_person' => $data['contact_person'],
            ':email' => $data['email'],
            ':phone' => $data['phone'] ?? null,
            ':company' => $data['company'],
            ':address' => $data['address'] ?? null
        ];
        
        $this->db->execute($sql, $params);
        return $this->db->lastInsertId();
    }
    
    /**
     * Get all clients with pagination and search
     */
    public function getAll($page = 1, $perPage = 20, $search = '') {
        $offset = ($page - 1) * $perPage;
        
        $sql = "SELECT * FROM clients WHERE 1=1";
        $params = [];
        
        if (!empty($search)) {
            $sql .= " AND (name LIKE :search OR company LIKE :search OR email LIKE :search)";
            $params[':search'] = "%{$search}%";
        }
        
        $sql .= " ORDER BY created_at DESC LIMIT :limit OFFSET :offset";
        
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
    public function getCount($search = '') {
        $sql = "SELECT COUNT(*) as total FROM clients WHERE 1=1";
        $params = [];
        
        if (!empty($search)) {
            $sql .= " AND (name LIKE :search OR company LIKE :search OR email LIKE :search)";
            $params[':search'] = "%{$search}%";
        }
        
        $result = $this->db->fetchOne($sql, $params);
        return (int)$result['total'];
    }
    
    /**
     * Get a single client by ID
     */
    public function getById($id) {
        $sql = "SELECT * FROM clients WHERE id = :id";
        return $this->db->fetchOne($sql, [':id' => $id]);
    }
    
    /**
     * Get client with their projects
     */
    public function getWithProjects($id) {
        $client = $this->getById($id);
        
        if ($client) {
            $sql = "SELECT * FROM projects WHERE client_id = :client_id ORDER BY created_at DESC";
            $client['projects'] = $this->db->fetchAll($sql, [':client_id' => $id]);
        }
        
        return $client;
    }
    
    /**
     * Update client
     */
    public function update($id, $data) {
        $sql = "UPDATE clients SET 
                name = :name,
                contact_person = :contact_person,
                email = :email,
                phone = :phone,
                company = :company,
                address = :address,
                updated_at = NOW()
                WHERE id = :id";
        
        $params = [
            ':id' => $id,
            ':name' => $data['name'],
            ':contact_person' => $data['contact_person'],
            ':email' => $data['email'],
            ':phone' => $data['phone'] ?? null,
            ':company' => $data['company'],
            ':address' => $data['address'] ?? null
        ];
        
        $this->db->execute($sql, $params);
        return $this->db->getConnection()->rowCount() > 0;
    }
    
    /**
     * Delete a client
     */
    public function delete($id) {
        // Check if client has projects
        $sql = "SELECT COUNT(*) as count FROM projects WHERE client_id = :id";
        $result = $this->db->fetchOne($sql, [':id' => $id]);
        
        if ($result['count'] > 0) {
            throw new Exception('No se puede eliminar el cliente porque tiene proyectos asociados');
        }
        
        $sql = "DELETE FROM clients WHERE id = :id";
        $this->db->execute($sql, [':id' => $id]);
        return $this->db->getConnection()->rowCount() > 0;
    }
}
