import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    getContacts,
    getContactStats,
    updateContactStatus,
    deleteContact,
    adminLogout,
    getCurrentUser,
    exportContacts,
} from '../utils/api';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Filters and pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [serviceFilter, setServiceFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [selectedContact, setSelectedContact] = useState(null);

    useEffect(() => {
        const currentUser = getCurrentUser();
        setUser(currentUser);
        loadData();
    }, [currentPage, search, serviceFilter, statusFilter]);

    const loadData = async () => {
        try {
            setLoading(true);
            setError('');

            const params = {
                page: currentPage,
                per_page: 10,
            };

            if (search) params.search = search;
            if (serviceFilter) params.service = serviceFilter;
            if (statusFilter) params.status = statusFilter;

            const [contactsResponse, statsResponse] = await Promise.all([
                getContacts(params),
                getContactStats(),
            ]);

            if (contactsResponse.success) {
                setContacts(contactsResponse.data.contacts);
                setTotalPages(contactsResponse.data.pagination.total_pages);
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

    const handleLogout = async () => {
        try {
            await adminLogout();
            navigate('/admin/login');
        } catch (err) {
            console.error('Logout error:', err);
        }
    };

    const handleStatusChange = async (contactId, newStatus) => {
        try {
            await updateContactStatus(contactId, newStatus);
            loadData();
        } catch (err) {
            setError('Error al actualizar el estado');
            console.error('Error updating status:', err);
        }
    };

    const handleDelete = async (contactId) => {
        if (!confirm('¿Estás seguro de eliminar este contacto?')) return;

        try {
            await deleteContact(contactId);
            loadData();
            setSelectedContact(null);
        } catch (err) {
            setError('Error al eliminar el contacto');
            console.error('Error deleting contact:', err);
        }
    };

    const handleExport = () => {
        const params = {};
        if (search) params.search = search;
        if (serviceFilter) params.service = serviceFilter;
        if (statusFilter) params.status = statusFilter;

        exportContacts(params);
    };

    const getStatusBadge = (status) => {
        const badges = {
            new: 'bg-blue-100 text-blue-800 border-blue-200',
            read: 'bg-amber-100 text-amber-800 border-amber-200',
            replied: 'bg-emerald-100 text-emerald-800 border-emerald-200',
            archived: 'bg-slate-100 text-slate-600 border-slate-200',
        };

        const labels = {
            new: 'Nuevo',
            read: 'Leído',
            replied: 'Respondido',
            archived: 'Archivado',
        };

        return (
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${badges[status]} shadow-sm`}>
                {labels[status]}
            </span>
        );
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
            {/* Header */}
            {/* Header */}
            <div className="bg-white border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                                Panel de <span className="text-blue-600">Administración</span>
                            </h1>
                            <p className="text-slate-500 text-sm mt-1">
                                Bienvenido, {user?.name}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                className="px-4 py-2 bg-slate-900 text-white rounded-lg cursor-default shadow-sm font-medium"
                            >
                                Contactos
                            </button>
                            <button
                                onClick={() => navigate('/admin/projects')}
                                className="px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all font-medium"
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
                                onClick={() => navigate('/')}
                                className="px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all font-medium"
                            >
                                Ver Sitio Web
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <p className="text-slate-500 text-sm mb-1 font-medium uppercase tracking-wider">Total</p>
                            <p className="text-3xl font-bold text-slate-900">{stats.stats.total}</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <p className="text-slate-500 text-sm mb-1 font-medium uppercase tracking-wider">Nuevos</p>
                            <p className="text-3xl font-bold text-blue-600">{stats.stats.new_count}</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <p className="text-slate-500 text-sm mb-1 font-medium uppercase tracking-wider">Leídos</p>
                            <p className="text-3xl font-bold text-amber-500">{stats.stats.read_count}</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <p className="text-slate-500 text-sm mb-1 font-medium uppercase tracking-wider">Respondidos</p>
                            <p className="text-3xl font-bold text-emerald-600">{stats.stats.replied_count}</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <p className="text-slate-500 text-sm mb-1 font-medium uppercase tracking-wider">Archivados</p>
                            <p className="text-3xl font-bold text-slate-400">{stats.stats.archived_count}</p>
                        </div>
                    </div>
                )}

                {/* Filters */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                        />

                        <select
                            value={serviceFilter}
                            onChange={(e) => {
                                setServiceFilter(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                        >
                            <option value="">Todos los servicios</option>
                            <option value="consultoria">Consultoría</option>
                            <option value="desarrollo">Desarrollo</option>
                            <option value="ia">IA</option>
                            <option value="marketing">Marketing</option>
                            <option value="seguridad">Seguridad</option>
                            <option value="diseno">Diseño</option>
                        </select>

                        <select
                            value={statusFilter}
                            onChange={(e) => {
                                setStatusFilter(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                        >
                            <option value="">Todos los estados</option>
                            <option value="new">Nuevo</option>
                            <option value="read">Leído</option>
                            <option value="replied">Respondido</option>
                            <option value="archived">Archivado</option>
                        </select>

                        <button
                            onClick={handleExport}
                            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-sm"
                        >
                            📥 Exportar CSV
                        </button>
                    </div>
                </div>

                {/* Contacts Table */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    {loading ? (
                        <div className="p-12 text-center text-slate-500">
                            Cargando contactos...
                        </div>
                    ) : contacts.length === 0 ? (
                        <div className="p-12 text-center text-slate-500">
                            No se encontraron contactos
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Nombre</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Servicio</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Estado</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Fecha</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {contacts.map((contact) => (
                                        <tr key={contact.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 text-slate-900 font-medium">{contact.name}</td>
                                            <td className="px-6 py-4 text-slate-600">{contact.email}</td>
                                            <td className="px-6 py-4 text-slate-600 capitalize">{contact.service}</td>
                                            <td className="px-6 py-4">{getStatusBadge(contact.status)}</td>
                                            <td className="px-6 py-4 text-slate-500 text-sm">{formatDate(contact.created_at)}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => setSelectedContact(contact)}
                                                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                                                    >
                                                        Ver
                                                    </button>
                                                    <select
                                                        value={contact.status}
                                                        onChange={(e) => handleStatusChange(contact.id, e.target.value)}
                                                        className="px-2 py-1 bg-white border border-slate-300 rounded text-slate-700 text-sm focus:border-blue-500 outline-none"
                                                    >
                                                        <option value="new">Nuevo</option>
                                                        <option value="read">Leído</option>
                                                        <option value="replied">Respondido</option>
                                                        <option value="archived">Archivado</option>
                                                    </select>
                                                    <button
                                                        onClick={() => handleDelete(contact.id)}
                                                        className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors text-sm font-medium"
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

            {/* Contact Detail Modal */}
            {selectedContact && (
                <div className="fixed inset-0 bg-slate-900/75 flex items-center justify-center p-4 z-50 backdrop-blur-sm" onClick={() => setSelectedContact(null)}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 border border-slate-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-start justify-between mb-6 border-b border-slate-100 pb-4">
                            <h2 className="text-2xl font-bold text-slate-900">Detalle del Contacto</h2>
                            <button
                                onClick={() => setSelectedContact(null)}
                                className="text-slate-400 hover:text-slate-600 transition-colors text-xl"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Nombre</label>
                                <p className="text-slate-900 text-lg font-medium">{selectedContact.name}</p>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Email</label>
                                <p className="text-slate-700">{selectedContact.email}</p>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Servicio</label>
                                <p className="text-slate-700 capitalize">{selectedContact.service}</p>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Mensaje</label>
                                <p className="text-slate-700 bg-slate-50 p-4 rounded-lg border border-slate-200 mt-1">{selectedContact.message}</p>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Estado</label>
                                <div className="mt-2">{getStatusBadge(selectedContact.status)}</div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Fecha de Creación</label>
                                    <p className="text-slate-600 text-sm">{formatDate(selectedContact.created_at)}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Última Actualización</label>
                                    <p className="text-slate-600 text-sm">{formatDate(selectedContact.updated_at)}</p>
                                </div>
                            </div>

                            {selectedContact.ip_address && (
                                <div>
                                    <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">IP</label>
                                    <p className="text-slate-600 text-sm">{selectedContact.ip_address}</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-8 flex gap-4 pt-6 border-t border-slate-100">
                            <button
                                onClick={() => {
                                    window.location.href = `mailto:${selectedContact.email}`;
                                }}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold shadow-sm"
                            >
                                📧 Responder por Email
                            </button>
                            <button
                                onClick={() => handleDelete(selectedContact.id)}
                                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium border border-red-200"
                            >
                                Eliminar
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
