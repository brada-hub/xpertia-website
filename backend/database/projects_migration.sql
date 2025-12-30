-- =====================================================
-- MIGRATION: Project Management Module
-- Adds tables for clients, personnel, and projects
-- =====================================================

USE xpertia_contacts;

-- =====================================================
-- Table: clients
-- Stores client/company information
-- =====================================================
CREATE TABLE IF NOT EXISTS clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NULL,
    company VARCHAR(255) NOT NULL,
    address TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_name (name),
    INDEX idx_company (company),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Table: personnel
-- Stores Xpertia employees/staff information
-- =====================================================
CREATE TABLE IF NOT EXISTS personnel (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    position VARCHAR(100) NOT NULL COMMENT 'Developer, Designer, Project Manager, etc.',
    phone VARCHAR(50) NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_name (name),
    INDEX idx_position (position),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Table: projects
-- Stores project information
-- =====================================================
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    client_id INT NOT NULL,
    status ENUM('planning', 'development', 'testing', 'completed', 'paused', 'cancelled') DEFAULT 'planning',
    start_date DATE NOT NULL,
    end_date DATE NULL,
    budget DECIMAL(10, 2) NULL,
    observations TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE RESTRICT,
    INDEX idx_name (name),
    INDEX idx_client_id (client_id),
    INDEX idx_status (status),
    INDEX idx_dates (start_date, end_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Table: project_personnel
-- Pivot table for many-to-many relationship
-- =====================================================
CREATE TABLE IF NOT EXISTS project_personnel (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    personnel_id INT NOT NULL,
    role VARCHAR(100) NOT NULL COMMENT 'Role in this specific project',
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (personnel_id) REFERENCES personnel(id) ON DELETE CASCADE,
    UNIQUE KEY unique_assignment (project_id, personnel_id),
    INDEX idx_project_id (project_id),
    INDEX idx_personnel_id (personnel_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- SAMPLE DATA
-- =====================================================

-- Insert sample clients
INSERT INTO clients (name, contact_person, email, phone, company, address) VALUES
('Juan Pérez', 'Juan Pérez', 'juan.perez@techcorp.com', '+591 70123456', 'TechCorp S.A.', 'Av. Arce 2345, La Paz'),
('María González', 'María González', 'maria@innovasoft.com', '+591 71234567', 'InnovaSoft Ltda.', 'Calle 21 de Calacoto, La Paz'),
('Carlos Mamani', 'Carlos Mamani', 'carlos@digitalbolivia.com', '+591 72345678', 'Digital Bolivia', 'Zona Sur, La Paz'),
('Ana Torres', 'Ana Torres', 'ana.torres@ecommerce.bo', '+591 73456789', 'E-Commerce Bolivia', 'Sopocachi, La Paz'),
('Roberto Silva', 'Roberto Silva', 'roberto@startuplab.bo', '+591 74567890', 'StartupLab', 'Obrajes, La Paz');

-- Insert sample personnel
INSERT INTO personnel (name, email, position, phone, status) VALUES
('Diego Vargas', 'diego.vargas@xpertia.com', 'Full Stack Developer', '+591 60111111', 'active'),
('Laura Mendoza', 'laura.mendoza@xpertia.com', 'Frontend Developer', '+591 60222222', 'active'),
('Miguel Quispe', 'miguel.quispe@xpertia.com', 'Backend Developer', '+591 60333333', 'active'),
('Sofia Rojas', 'sofia.rojas@xpertia.com', 'UI/UX Designer', '+591 60444444', 'active'),
('Fernando Cruz', 'fernando.cruz@xpertia.com', 'Project Manager', '+591 60555555', 'active'),
('Gabriela Flores', 'gabriela.flores@xpertia.com', 'QA Tester', '+591 60666666', 'active'),
('Andrés Morales', 'andres.morales@xpertia.com', 'DevOps Engineer', '+591 60777777', 'active'),
('Valentina Paz', 'valentina.paz@xpertia.com', 'Data Analyst', '+591 60888888', 'active');

-- Insert sample projects
INSERT INTO projects (name, description, client_id, status, start_date, end_date, budget, observations) VALUES
(
    'Sistema de Gestión Empresarial',
    'Desarrollo de ERP completo para gestión de inventarios, ventas, compras y contabilidad.',
    1,
    'development',
    '2025-01-15',
    '2025-07-30',
    85000.00,
    'Cliente requiere integración con sistema contable existente. Reuniones semanales los lunes.'
),
(
    'Aplicación Móvil de Delivery',
    'App móvil para iOS y Android con sistema de pedidos en tiempo real y tracking GPS.',
    2,
    'planning',
    '2025-02-01',
    '2025-08-15',
    65000.00,
    'Pendiente definición de pasarela de pagos. Cliente prefiere React Native.'
),
(
    'Portal Web Corporativo',
    'Sitio web institucional con CMS, blog, galería y formularios de contacto.',
    3,
    'testing',
    '2024-11-01',
    '2025-01-31',
    25000.00,
    'En fase de pruebas finales. Pendiente aprobación de contenidos por parte del cliente.'
),
(
    'E-Commerce Multitienda',
    'Plataforma de comercio electrónico con múltiples vendedores, carrito y pagos online.',
    4,
    'development',
    '2024-12-01',
    '2025-05-30',
    95000.00,
    'Integración con QR de bancos bolivianos. Sistema de comisiones por venta.'
),
(
    'Dashboard de Analytics',
    'Panel de control con visualización de datos en tiempo real y reportes personalizados.',
    5,
    'completed',
    '2024-09-01',
    '2024-12-15',
    45000.00,
    'Proyecto completado exitosamente. Cliente muy satisfecho. Posible fase 2 en marzo.'
);

-- Assign personnel to projects
INSERT INTO project_personnel (project_id, personnel_id, role) VALUES
-- Sistema de Gestión Empresarial (Project 1)
(1, 5, 'Project Manager'),
(1, 1, 'Lead Developer'),
(1, 3, 'Backend Developer'),
(1, 2, 'Frontend Developer'),
(1, 6, 'QA Tester'),

-- Aplicación Móvil de Delivery (Project 2)
(2, 5, 'Project Manager'),
(2, 1, 'Mobile Developer'),
(2, 4, 'UI/UX Designer'),

-- Portal Web Corporativo (Project 3)
(3, 2, 'Frontend Developer'),
(3, 4, 'UI/UX Designer'),
(3, 6, 'QA Tester'),

-- E-Commerce Multitienda (Project 4)
(4, 5, 'Project Manager'),
(4, 1, 'Full Stack Developer'),
(4, 3, 'Backend Developer'),
(4, 2, 'Frontend Developer'),
(4, 7, 'DevOps Engineer'),
(4, 6, 'QA Tester'),

-- Dashboard de Analytics (Project 5)
(5, 1, 'Lead Developer'),
(5, 8, 'Data Analyst'),
(5, 4, 'UI/UX Designer');

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Uncomment to verify data:
-- SELECT * FROM clients;
-- SELECT * FROM personnel;
-- SELECT * FROM projects;
-- SELECT * FROM project_personnel;

-- Get projects with client info:
-- SELECT p.*, c.company as client_company 
-- FROM projects p 
-- JOIN clients c ON p.client_id = c.id;

-- Get project with assigned personnel:
-- SELECT p.name as project, pe.name as employee, pp.role
-- FROM projects p
-- JOIN project_personnel pp ON p.id = pp.project_id
-- JOIN personnel pe ON pp.personnel_id = pe.id
-- WHERE p.id = 1;
