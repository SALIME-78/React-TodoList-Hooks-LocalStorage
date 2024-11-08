import React from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { TodoProvider } from './contexts/TodoContext';
import { Auth } from './components/Auth';
import { TodoList } from './components/TodoList';
import { LogOut, CheckSquare } from 'lucide-react';

function AppContent() {
  const { state, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="w-full">
        {state.isAuthenticated ? (
          <div className="space-y-6">
            <div className="w-full flex justify-end items-center pr-10 gap-8">
                <span className="text-gray-600">
                  Welcome, {state.user?.username}!
                </span>
                <button
                  onClick={logout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center gap-2"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </div>
            <div className="">
              <div className="flex justify-center gap-2">
                <CheckSquare className="h-8 w-8 text-indigo-600" />
                <h1 className="text-3xl font-bold text-gray-900">Todo List</h1>
              </div>
            </div>
            <div className="flex justify-center  w-2/5 m-auto">
            <TodoList />
            </div>
          </div>
        ) : (
          <Auth />
        )}
      </div>
      <Toaster position="top-center" />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <TodoProvider>
        <AppContent />
      </TodoProvider>
    </AuthProvider>
  );
}

export default App;
