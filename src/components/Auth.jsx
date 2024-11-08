import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, UserPlus, KeyRound, User } from 'lucide-react';
import toast from 'react-hot-toast';

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, register } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    const success = isLogin 
      ? login(username, password)
      : register(username, password);

    if (success) {
      toast.success(`Successfully ${isLogin ? 'logged in' : 'registered'}!`);
      setUsername('');
      setPassword('');
    } else {
      toast.error(isLogin ? 'Invalid credentials' : 'Username already exists');
    }
  };

  return (
    <div className="w-full m-auto max-w-md">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
        <div className="flex items-center justify-center mb-6">
          {isLogin ? (
            <LogIn className="h-8 w-8 text-indigo-600" />
          ) : (
            <UserPlus className="h-8 w-8 text-indigo-600" />
          )}
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? 'Login' : 'Register'}
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Username
            </div>
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            <div className="flex items-center gap-2">
              <KeyRound className="h-4 w-4" />
              Password
            </div>
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
        <div className="flex flex-col gap-4">
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
          <button
            type="button"
            className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
          </button>
        </div>
      </form>
    </div>
  );
};