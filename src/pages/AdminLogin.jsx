import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../utils/api';
import { useTheme } from '../context/ThemeContext';

const AdminLogin = () => {
    const { isDark } = useTheme();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await adminLogin(formData.email, formData.password);

            if (response.success) {
                navigate('/admin/dashboard');
            } else {
                setError(response.message || 'Credenciales inválidas');
            }
        } catch (err) {
            setError('Error al iniciar sesión. Por favor intenta de nuevo.');
            console.error('Login error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError('');
    };

    return (
        <div className="min-h-screen bg-primary flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        Panel de <span className="text-gradient">Administración</span>
                    </h1>
                    <p className="text-gray-400">Xpertia - Gestión de Contactos</p>
                </div>

                <div className="bg-primary-light p-8 rounded-2xl border border-white/5 shadow-2xl">
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl">
                            <p className="text-red-300 text-sm">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-primary border border-white/10 rounded-xl text-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                                placeholder="admin@xpertia.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-primary border border-white/10 rounded-xl text-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full btn-glow disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => navigate('/')}
                            className="text-gray-400 hover:text-accent transition-colors text-sm"
                        >
                            ← Volver al sitio web
                        </button>
                    </div>
                </div>

                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>Credenciales por defecto:</p>
                    <p className="text-gray-400 mt-1">
                        Email: admin@xpertia.com | Password: password
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
