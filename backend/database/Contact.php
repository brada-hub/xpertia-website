<?php
/**
 * Contact Model
 * Handles all contact-related database operations
 */

require_once __DIR__ . '/Database.php';

class Contact {
    private $db;
    
    const STATUS_NEW = 'new';
    const STATUS_READ = 'read';
    const STATUS_REPLIED = 'replied';
    const STATUS_ARCHIVED = 'archived';
    
    public function __construct() {
        $this->db = Database::getInstance();
    }
    
    /**
     * Create a new contact
     */
    public function create($data) {
        $sql = "INSERT INTO contacts (name, email, service, message, ip_address, user_agent, status) 
                VALUES (:name, :email, :service, :message, :ip_address, :user_agent, :status)";
        
        $params = [
            ':name' => $data['name'],
            ':email' => $data['email'],
            ':service' => $data['service'],
            ':message' => $data['message'],
            ':ip_address' => $data['ip_address'] ?? null,
            ':user_agent' => $data['user_agent'] ?? null,
            ':status' => self::STATUS_NEW
        ];
        
        $this->db->execute($sql, $params);
        return $this->db->lastInsertId();
    }
    
    /**
     * Get all contacts with pagination, search, and filters
     */
    public function getAll($page = 1, $perPage = 20, $search = '', $service = '', $status = '') {
        $offset = ($page - 1) * $perPage;
        
        $sql = "SELECT * FROM contacts WHERE 1=1";
        $params = [];
        
        if (!empty($search)) {
            $sql .= " AND (name LIKE :search OR email LIKE :search OR message LIKE :search)";
            $params[':search'] = "%{$search}%";
        }
        
        if (!empty($service)) {
            $sql .= " AND service = :service";
            $params[':service'] = $service;
        }
        
        if (!empty($status)) {
            $sql .= " AND status = :status";
            $params[':status'] = $status;
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
    public function getCount($search = '', $service = '', $status = '') {
        $sql = "SELECT COUNT(*) as total FROM contacts WHERE 1=1";
        $params = [];
        
        if (!empty($search)) {
            $sql .= " AND (name LIKE :search OR email LIKE :search OR message LIKE :search)";
            $params[':search'] = "%{$search}%";
        }
        
        if (!empty($service)) {
            $sql .= " AND service = :service";
            $params[':service'] = $service;
        }
        
        if (!empty($status)) {
            $sql .= " AND status = :status";
            $params[':status'] = $status;
        }
        
        $result = $this->db->fetchOne($sql, $params);
        return (int)$result['total'];
    }
    
    /**
     * Get a single contact by ID
     */
    public function getById($id) {
        $sql = "SELECT * FROM contacts WHERE id = :id";
        return $this->db->fetchOne($sql, [':id' => $id]);
    }
    
    /**
     * Update contact status
     */
    public function updateStatus($id, $status) {
        $sql = "UPDATE contacts SET status = :status, updated_at = NOW() WHERE id = :id";
        $stmt = $this->db->execute($sql, [':status' => $status, ':id' => $id]);
        return $stmt->rowCount() > 0;
    }
    
    /**
     * Delete a contact
     */
    public function delete($id) {
        $sql = "DELETE FROM contacts WHERE id = :id";
        $stmt = $this->db->execute($sql, [':id' => $id]);
        return $stmt->rowCount() > 0;
    }
    
    /**
     * Get statistics
     */
    public function getStats() {
        $sql = "SELECT 
                    COUNT(*) as total,
                    SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) as new_count,
                    SUM(CASE WHEN status = 'read' THEN 1 ELSE 0 END) as read_count,
                    SUM(CASE WHEN status = 'replied' THEN 1 ELSE 0 END) as replied_count,
                    SUM(CASE WHEN status = 'archived' THEN 1 ELSE 0 END) as archived_count
                FROM contacts";
        
        return $this->db->fetchOne($sql);
    }
    
    /**
     * Get contacts by service
     */
    public function getByService() {
        $sql = "SELECT service, COUNT(*) as count 
                FROM contacts 
                GROUP BY service 
                ORDER BY count DESC";
        
        return $this->db->fetchAll($sql);
    }
}
