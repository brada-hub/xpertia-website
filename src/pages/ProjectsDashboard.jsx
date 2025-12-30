import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    getProjects,
    getProjectStats,
    getClients,
    deleteProject,
    adminLogout,
    getCurrentUser,
} from '../utils/projectsApi';
import ProjectFormModal from '../components/projects/ProjectFormModal';
import ProjectDetailModal from '../components/projects/ProjectDetailModal';

const ProjectsDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [projects, setProjects] = useState([]);
    const [clients, setClients] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Modals state
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [editingProject, setEditingProject] = useState(null);

    // Filters and pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [clientFilter, setClientFilter] = useState('');

    useEffect(() => {
        const currentUser = getCurrentUser();
        setUser(currentUser);
        loadData();
        loadClients();
    }, [currentPage, search, statusFilter, clientFilter]);

    const loadData = async () => {
        try {
            setLoading(true);
            setError('');

            const params = {
                page: currentPage,
                per_page: 10,
            };

            if (search) params.search = search;
            if (statusFilter) params.status = statusFilter;
            if (clientFilter) params.client_id = clientFilter;

            const [projectsResponse, statsResponse] = await Promise.all([
                getProjects(params),
                getProjectStats(),
            ]);

            if (projectsResponse.success) {
                setProjects(projectsResponse.data.projects);
                setTotalPages(projectsResponse.data.pagination.total_pages);
            }

            if (statsResponse.success) {
                setStats(statsResponse.data);
            }
        } catch (err) {
            setError('Error al cargar los datos');
            console.error('Error loading data:', err);
        } finally {
            setLoading(false);
        }
    };

    const loadClients = async () => {
        try {
            const response = await getClients({ per_page: 100 });
            if (response.success) {
                setClients(response.data.clients);
            }
        } catch (err) {
            console.error('Error loading clients:', err);
        }
    };

    const handleLogout = async () => {
        try {
            await adminLogout();
            navigate('/admin/login');
        } catch (err) {
            console.error('Logout error:', err);
        }
    };

    const handleDelete = async (projectId) => {
        if (!confirm('¿Estás seguro de eliminar este proyecto?')) return;

        try {
            await deleteProject(projectId);
            loadData();
            if (selectedProject === projectId) setSelectedProject(null);
        } catch (err) {
            setError('Error al eliminar el proyecto');
            console.error('Error deleting project:', err);
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            planning: 'bg-blue-100 text-blue-800 border-blue-200',
            development: 'bg-purple-100 text-purple-800 border-purple-200',
            testing: 'bg-amber-100 text-amber-800 border-amber-200',
            completed: 'bg-emerald-100 text-emerald-800 border-emerald-200',
            paused: 'bg-orange-100 text-orange-800 border-orange-200',
            cancelled: 'bg-red-100 text-red-800 border-red-200',
        };

        const labels = {
            planning: 'Planificación',
            development: 'Desarrollo',
            testing: 'Pruebas',
            completed: 'Completado',
            paused: 'Pausado',
            cancelled: 'Cancelado',
        };

        return (
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${badges[status]} shadow-sm`}>
                {labels[status]}
            </span>
        );
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                                Gestión de <span className="text-blue-600">Proyectos</span>
                            </h1>
                            <p className="text-slate-500 text-sm mt-1">
                                Bienvenido, {user?.name}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate('/admin/dashboard')}
                                className="px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all font-medium"
                            >
                                Contactos
                            </button>
                            <button
                                className="px-4 py-2 bg-slate-900 text-white rounded-lg cursor-default shadow-sm font-medium"
                            >
                                Proyectos
                            </button>
                            <button
                                onClick={() => navigate('/admin/clients')}
                                className="px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all font-medium"
                            >
                                Clientes
                            </button>
                            <button
                                onClick={() => navigate('/admin/personnel')}
                                className="px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all font-medium"
                            >
                                Personal
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors shadow-sm font-medium border border-red-100"
                            >
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {error && (
                    <div className="mb-6 p-4 bg-red-100 border border-red-200 rounded-xl shadow-sm">
                        <p className="text-red-700 font-medium">{error}</p>
                    </div>
                )}

                {/* Statistics */}
                {stats && (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4 mb-8">
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <p className="text-slate-500 text-sm mb-1 font-medium uppercase tracking-wider">Total</p>
                            <p className="text-3xl font-bold text-slate-900">{stats.stats.total}</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <p className="text-slate-500 text-sm mb-1 font-medium uppercase tracking-wider">Planificación</p>
                            <p className="text-3xl font-bold text-blue-600">{stats.stats.planning_count}</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <p className="text-slate-500 text-sm mb-1 font-medium uppercase tracking-wider">Desarrollo</p>
                            <p className="text-3xl font-bold text-purple-600">{stats.stats.development_count}</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <p className="text-slate-500 text-sm mb-1 font-medium uppercase tracking-wider">Pruebas</p>
                            <p className="text-3xl font-bold text-amber-500">{stats.stats.testing_count}</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <p className="text-slate-500 text-sm mb-1 font-medium uppercase tracking-wider">Completados</p>
                            <p className="text-3xl font-bold text-emerald-600">{stats.stats.completed_count}</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <p className="text-slate-500 text-sm mb-1 font-medium uppercase tracking-wider">Pausados</p>
                            <p className="text-3xl font-bold text-orange-500">{stats.stats.paused_count}</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <p className="text-slate-500 text-sm mb-1 font-medium uppercase tracking-wider">Cancelados</p>
                            <p className="text-3xl font-bold text-red-600">{stats.stats.cancelled_count}</p>
                        </div>
                    </div>
                )}

                {/* Filters */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <input
                            type="text"
                            placeholder="Buscar proyecto..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                        />

                        <select
                            value={statusFilter}
                            onChange={(e) => {
                                setStatusFilter(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                        >
                            <option value="">Todos los estados</option>
                            <option value="planning">Planificación</option>
                            <option value="development">Desarrollo</option>
                            <option value="testing">Pruebas</option>
                            <option value="completed">Completado</option>
                            <option value="paused">Pausado</option>
                            <option value="cancelled">Cancelado</option>
                        </select>

                        <select
                            value={clientFilter}
                            onChange={(e) => {
                                setClientFilter(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                        >
                            <option value="">Todos los clientes</option>
                            {clients.map((client) => (
                                <option key={client.id} value={client.id}>
                                    {client.company}
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={() => {
                                setEditingProject(null);
                                setIsFormOpen(true);
                            }}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
                        >
                            + Nuevo Proyecto
                        </button>
                    </div>
                </div>

                {/* Projects Table */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    {loading ? (
                        <div className="p-12 text-center text-slate-500">
                            Cargando proyectos...
                        </div>
                    ) : projects.length === 0 ? (
                        <div className="p-12 text-center text-slate-500">
                            No se encontraron proyectos
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Proyecto</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Cliente</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Estado</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Inicio</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Fin</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {projects.map((project) => (
                                        <tr key={project.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="text-slate-900 font-medium">{project.name}</p>
                                                    <p className="text-slate-500 text-sm truncate max-w-xs">{project.description}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600">{project.client_company}</td>
                                            <td className="px-6 py-4">{getStatusBadge(project.status)}</td>
                                            <td className="px-6 py-4 text-slate-500 text-sm">{formatDate(project.start_date)}</td>
                                            <td className="px-6 py-4 text-slate-500 text-sm">{formatDate(project.end_date)}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedProject(project.id);
                                                            setIsDetailOpen(true);
                                                        }}
                                                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                                                    >
                                                        Ver
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setEditingProject(project);
                                                            setIsFormOpen(true);
                                                        }}
                                                        className="px-3 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors text-sm font-medium shadow-sm"
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(project.id)}
                                                        className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors text-sm font-medium border border-red-200"
                                                    >
                                                        Eliminar
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-slate-50">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors font-medium shadow-sm"
                            >
                                Anterior
                            </button>
                            <span className="text-slate-600 font-medium">
                                Página {currentPage} de {totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors font-medium shadow-sm"
                            >
                                Siguiente
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Modals */}
            <ProjectFormModal
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                project={editingProject}
                onSuccess={loadData}
            />

            <ProjectDetailModal
                isOpen={isDetailOpen}
                onClose={() => setIsDetailOpen(false)}
                projectId={selectedProject}
            />
        </div>
    );
};

export default ProjectsDashboard;
