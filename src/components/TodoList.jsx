import { useState } from 'react';
import { useTodo } from '../contexts/TodoContext';
import { useAuth } from '../contexts/AuthContext';
import { PlusCircle, Edit2, Trash2, Check, X } from 'lucide-react';

export const TodoList = () => {
  const { state, addTodo, toggleTodo, deleteTodo, updateTodo } = useTodo();
  const { state: authState } = useAuth();
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const userTodos = state.todos.filter(
    (todo) => todo.userId === authState.user?.username
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim() && authState.user) {
      addTodo(newTodo.trim(), authState.user.username);
      setNewTodo('');
    }
  };

  const handleEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const handleUpdate = (id) => {
    if (editText.trim()) {
      updateTodo(id, editText.trim());
      setEditingId(null);
      setEditText('');
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center gap-2"
          >
            <PlusCircle className="h-5 w-5" />
            Add
          </button>
        </div>
      </form>

      <div className="space-y-3">
        {userTodos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center gap-3 bg-white p-4 rounded-lg shadow"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            
            {editingId === todo.id ? (
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-1 p-1 border border-gray-300 rounded"
                />
                <button
                  onClick={() => handleUpdate(todo.id)}
                  className="text-green-600 hover:text-green-800"
                >
                  <Check className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="text-red-600 hover:text-red-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <>
                <span
                  className={`flex-1 ${
                    todo.completed ? 'line-through text-gray-500' : ''
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => handleEdit(todo.id, todo.text)}
                  className="text-yellow-600 hover:text-yellow-800"
                >
                  <Edit2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};