import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
    getPersonnel,
    createPersonnel,
    updatePersonnel,
    deletePersonnel,
    getCurrentUser,
    adminLogout
} from '../utils/projectsApi';

const PersonnelManagement = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [personnel, setPersonnel] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPersonnel, setEditingPersonnel] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        position: '',
        phone: '',
        status: 'active'
    });

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');

    useEffect(() => {
        setUser(getCurrentUser());
        loadPersonnel();
    }, [currentPage, search]);

    const loadPersonnel = async () => {
        try {
            setLoading(true);
            const params = {
                page: currentPage,
                per_page: 10,
                search
            };

            const response = await getPersonnel(params);
            if (response.success) {
                setPersonnel(response.data.personnel);
                setTotalPages(response.data.pagination.total_pages);
            }
        } catch (err) {
            setError('Error al cargar personal');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingPersonnel) {
                await updatePersonnel(editingPersonnel.id, formData);
            } else {
                await createPersonnel(formData);
            }
            setIsModalOpen(false);
            loadPersonnel();
            setEditingPersonnel(null);
            setFormData({
                name: '',
                email: '',
                position: '',
                phone: '',
                status: 'active'
            });
        } catch (err) {
            alert('Error al guardar personal');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('¿Eliminar este empleado? No se puede deshacer.')) return;
        try {
            await deletePersonnel(id);
            loadPersonnel();
        } catch (err) {
            alert('Error al eliminar: ' + (err.message || 'El empleado tiene proyectos asignados'));
        }
    };

    const openModal = (person = null) => {
        if (person) {
            setEditingPersonnel(person);
            setFormData({
                name: person.name,
                email: person.email,
                position: person.position,
                phone: person.phone || '',
                status: person.status
            });
        } else {
            setEditingPersonnel(null);
            setFormData({
                name: '',
                email: '',
                position: '',
                phone: '',
                status: 'active'
            });
        }
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                                Gestión de <span className="text-blue-600">Personal</span>
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
                                className="px-4 py-2 bg-slate-900 text-white rounded-lg cursor-default shadow-sm font-medium"
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
                                onClick={async () => {
                                    await adminLogout();
                                    navigate('/admin/login');
                                }}
                                className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors shadow-sm font-medium border border-red-100"
                            >
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6 flex justify-between gap-4">
                    <input
                        type="text"
                        placeholder="Buscar personal..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none w-full max-w-md"
                    />
                    <button
                        onClick={() => openModal()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
                    >
                        + Nuevo Empleado
                    </button>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    {loading ? (
                        <div className="p-12 text-center text-slate-500">Cargando...</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Nombre</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Cargo</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Estado</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {personnel.map((person) => (
                                        <tr key={person.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 text-slate-900 font-medium">{person.name}</td>
                                            <td className="px-6 py-4 text-slate-600">{person.position}</td>
                                            <td className="px-6 py-4 text-slate-600">{person.email}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-bold border ${person.status === 'active'
                                                    ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                                                    : 'bg-red-100 text-red-800 border-red-200'
                                                    }`}>
                                                    {person.status === 'active' ? 'Activo' : 'Inactivo'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => openModal(person)}
                                                        className="px-3 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors text-sm font-medium shadow-sm"
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(person.id)}
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
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 border border-slate-200"
                        >
                            <h2 className="text-xl font-bold text-slate-900 mb-6">
                                {editingPersonnel ? 'Editar Empleado' : 'Nuevo Empleado'}
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-slate-700">Nombre Completo *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none mt-1"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-slate-700">Cargo *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.position}
                                        onChange={e => setFormData({ ...formData, position: e.target.value })}
                                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none mt-1"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-slate-700">Email *</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none mt-1"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-slate-700">Teléfono</label>
                                        <input
                                            type="text"
                                            value={formData.phone}
                                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none mt-1"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-slate-700">Estado</label>
                                    <select
                                        value={formData.status}
                                        onChange={e => setFormData({ ...formData, status: e.target.value })}
                                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none mt-1"
                                    >
                                        <option value="active">Activo</option>
                                        <option value="inactive">Inactivo</option>
                                    </select>
                                </div>
                                <div className="flex justify-end gap-4 pt-4 border-t border-slate-100 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors font-medium"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
                                    >
                                        Guardar
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PersonnelManagement;
