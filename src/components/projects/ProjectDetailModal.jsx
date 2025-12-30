import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProject, assignPersonnel, unassignPersonnel, getPersonnel } from '../../utils/projectsApi';

const ProjectDetailModal = ({ isOpen, onClose, projectId }) => {
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [personnelList, setPersonnelList] = useState([]);
    const [assignForm, setAssignForm] = useState({
        personnel_id: '',
        role: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen && projectId) {
            loadProjectData();
            loadPersonnelList();
        }
    }, [isOpen, projectId]);

    const loadProjectData = async () => {
        try {
            setLoading(true);
            const response = await getProject(projectId);
            if (response.success) {
                setProject(response.data);
            }
        } catch (err) {
            console.error('Error loading project:', err);
            setError('Error al cargar detalles del proyecto');
        } finally {
            setLoading(false);
        }
    };

    const loadPersonnelList = async () => {
        try {
            const response = await getPersonnel({ per_page: 100, status: 'active' });
            if (response.success) {
                setPersonnelList(response.data.personnel);
            }
        } catch (err) {
            console.error('Error loading personnel:', err);
        }
    };

    const handleAssign = async (e) => {
        e.preventDefault();
        if (!assignForm.personnel_id || !assignForm.role) return;

        try {
            await assignPersonnel(projectId, assignForm.personnel_id, assignForm.role);
            setAssignForm({ personnel_id: '', role: '' });
            loadProjectData(); // Reload to show new assignment
        } catch (err) {
            console.error('Error assigning personnel:', err);
            setError('Error al asignar personal');
        }
    };

    const handleUnassign = async (personnelId) => {
        if (!confirm('¿Remover a esta persona del proyecto?')) return;

        try {
            await unassignPersonnel(projectId, personnelId);
            loadProjectData();
        } catch (err) {
            console.error('Error unassigning personnel:', err);
            setError('Error al remover personal');
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
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${badges[status] || ''} shadow-sm`}>
                {labels[status] || status}
            </span>
        );
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-slate-200"
                >
                    <div className="p-6 border-b border-slate-200 flex justify-between items-center sticky top-0 bg-white z-10">
                        <h2 className="text-xl font-bold text-slate-900">Detalles del Proyecto</h2>
                        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">✕</button>
                    </div>

                    {loading ? (
                        <div className="p-12 text-center text-slate-500">Cargando...</div>
                    ) : project ? (
                        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column: Project Info */}
                            <div className="lg:col-span-2 space-y-8">
                                <div>
                                    <div className="flex items-center gap-4 mb-4">
                                        <h1 className="text-3xl font-bold text-slate-900">{project.name}</h1>
                                        {getStatusBadge(project.status)}
                                    </div>
                                    <p className="text-slate-600 leading-relaxed">{project.description}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                        <p className="text-slate-500 text-sm mb-1 font-semibold">Cliente</p>
                                        <p className="text-slate-900 font-bold">{project.client_company}</p>
                                        <p className="text-slate-500 text-xs">{project.client_name}</p>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                        <p className="text-slate-500 text-sm mb-1 font-semibold">Presupuesto</p>
                                        <p className="text-slate-900 font-bold">
                                            {project.budget ? `$${parseFloat(project.budget).toLocaleString()}` : 'No definido'}
                                        </p>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                        <p className="text-slate-500 text-sm mb-1 font-semibold">Fecha Inicio</p>
                                        <p className="text-slate-900 font-bold">{project.start_date}</p>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                        <p className="text-slate-500 text-sm mb-1 font-semibold">Fecha Fin</p>
                                        <p className="text-slate-900 font-bold">{project.end_date || 'Pendiente'}</p>
                                    </div>
                                </div>

                                {project.observations && (
                                    <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                                        <h4 className="text-amber-800 font-bold mb-2">Observaciones</h4>
                                        <p className="text-amber-700 text-sm">{project.observations}</p>
                                    </div>
                                )}
                            </div>

                            {/* Right Column: Personnel */}
                            <div className="lg:col-span-1 space-y-6">
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                    <h3 className="text-lg font-bold text-slate-900 mb-4">Equipo Asignado</h3>

                                    <div className="space-y-3 mb-6">
                                        {project.personnel && project.personnel.length > 0 ? (
                                            project.personnel.map(p => (
                                                <div key={p.id} className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                                                    <div>
                                                        <p className="text-slate-900 font-bold text-sm">{p.name}</p>
                                                        <p className="text-blue-600 text-xs font-medium">{p.role}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => handleUnassign(p.id)}
                                                        className="text-red-400 hover:text-red-600 text-xs font-bold"
                                                        title="Remover del proyecto"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-slate-500 text-sm text-center py-2">No hay personal asignado</p>
                                        )}
                                    </div>

                                    <div className="border-t border-slate-200 pt-4">
                                        <h4 className="text-sm font-bold text-slate-700 mb-3">Asignar Personal</h4>
                                        <form onSubmit={handleAssign} className="space-y-3">
                                            <select
                                                value={assignForm.personnel_id}
                                                onChange={e => setAssignForm({ ...assignForm, personnel_id: e.target.value })}
                                                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                            >
                                                <option value="">Seleccionar Empleado</option>
                                                {personnelList
                                                    .filter(p => !project.personnel?.find(assigned => assigned.id === p.id))
                                                    .map(p => (
                                                        <option key={p.id} value={p.id}>{p.name} - {p.position}</option>
                                                    ))
                                                }
                                            </select>
                                            <input
                                                type="text"
                                                placeholder="Rol en el proyecto (ej. Lead Dev)"
                                                value={assignForm.role}
                                                onChange={e => setAssignForm({ ...assignForm, role: e.target.value })}
                                                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                            />
                                            <button
                                                type="submit"
                                                disabled={!assignForm.personnel_id || !assignForm.role}
                                                className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 font-bold shadow-sm"
                                            >
                                                Asignar
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="p-12 text-center text-red-500">Error al cargar el proyecto</div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ProjectDetailModal;
