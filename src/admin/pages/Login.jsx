import { useState } from 'react';
import { PiSignInBold, PiSpinnerBold, PiWarningCircleBold } from 'react-icons/pi';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="h-16 w-16 rounded-2xl bg-pink mx-auto flex items-center justify-center font-display font-bold text-white text-2xl mb-4">
            P
          </div>
          <h1 className="text-2xl font-display font-semibold text-white">Puपुरुष Admin</h1>
          <p className="text-gray-400 mt-1">Sign in to manage your store</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-2xl p-8 flex flex-col gap-5">
          {error && (
            <div className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              <PiWarningCircleBold className="text-lg flex-shrink-0" />
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm text-gray-400 mb-2">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              className="w-full rounded-xl bg-gray-700 border border-gray-600 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink focus:ring-1 focus:ring-pink/30 transition-colors"
              placeholder="admin@purushcollection.in"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-400 mb-2">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl bg-gray-700 border border-gray-600 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink focus:ring-1 focus:ring-pink/30 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-pink hover:bg-pink-deep text-white py-3 font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <><PiSpinnerBold className="animate-spin-slow" /> Signing in...</>
            ) : (
              <><PiSignInBold /> Sign In</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}