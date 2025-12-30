<?php
/**
 * User Model
 * Handles user authentication and session management
 */

require_once __DIR__ . '/Database.php';

class User {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance();
    }
    
    /**
     * Authenticate user
     */
    public function authenticate($email, $password) {
        $sql = "SELECT * FROM users WHERE email = :email";
        $user = $this->db->fetchOne($sql, [':email' => $email]);
        
        if ($user && password_verify($password, $user['password'])) {
            return $user;
        }
        
        return false;
    }
    
    /**
     * Create session token
     */
    public function createSession($userId) {
        // Generate secure token
        $token = bin2hex(random_bytes(32));
        
        // Token expires in 24 hours
        $expiresAt = date('Y-m-d H:i:s', time() + 86400);
        
        $sql = "INSERT INTO sessions (user_id, token, expires_at) VALUES (:user_id, :token, :expires_at)";
        $this->db->execute($sql, [
            ':user_id' => $userId,
            ':token' => $token,
            ':expires_at' => $expiresAt
        ]);
        
        return $token;
    }
    
    /**
     * Validate session token
     */
    public function validateSession($token) {
        $sql = "SELECT s.*, u.* FROM sessions s 
                JOIN users u ON s.user_id = u.id 
                WHERE s.token = :token AND s.expires_at > NOW()";
        
        return $this->db->fetchOne($sql, [':token' => $token]);
    }
    
    /**
     * Delete session (logout)
     */
    public function deleteSession($token) {
        $sql = "DELETE FROM sessions WHERE token = :token";
        $this->db->execute($sql, [':token' => $token]);
        return $this->db->getConnection()->rowCount() > 0;
    }
    
    /**
     * Clean expired sessions
     */
    public function cleanExpiredSessions() {
        $sql = "DELETE FROM sessions WHERE expires_at < NOW()";
        $this->db->execute($sql);
    }
}
