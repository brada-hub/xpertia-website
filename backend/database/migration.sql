-- Create database
CREATE DATABASE IF NOT EXISTS xpertia_contacts CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE xpertia_contacts;

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    service VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    ip_address VARCHAR(45) NULL,
    user_agent TEXT NULL,
    status ENUM('new', 'read', 'replied', 'archived') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_service (service),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create users table for admin authentication
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create sessions table for authentication tokens
CREATE TABLE IF NOT EXISTS sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token VARCHAR(64) NOT NULL UNIQUE,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_token (token),
    INDEX idx_expires_at (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default admin user (password: '12345678')
INSERT IGNORE INTO users (id, name, email, password) VALUES 
(1, 'Admin', 'admin@xpertia.com', '$2y$10$vO/oJ3lXh.L6yK7f.6mSye7Z3xWv3.z05d9yF7Z8tG2y8v9u8m8k.');

-- Insert sample contacts for testing
INSERT INTO contacts (name, email, service, message, status) VALUES
('Juan Pérez', 'juan@example.com', 'consultoria', 'Me interesa una consultoría para mi empresa de tecnología.', 'new'),
('María García', 'maria@example.com', 'desarrollo', 'Necesito desarrollar una aplicación web para mi negocio.', 'read'),
('Carlos López', 'carlos@example.com', 'ia', 'Quiero implementar IA en mi empresa.', 'new'),
('Ana Martínez', 'ana@example.com', 'marketing', 'Necesito ayuda con marketing digital.', 'replied'),
('Luis Rodríguez', 'luis@example.com', 'diseno', 'Busco rediseñar mi sitio web.', 'new');
