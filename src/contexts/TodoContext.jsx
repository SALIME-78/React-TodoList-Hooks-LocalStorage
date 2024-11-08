import { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-hot-toast';
const TodoContext = createContext(null);
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo
        ),
      };
    case 'SET_TODOS':
      return {
        ...state,
        todos: action.payload,
      };
    default:
      return state;
  }
};

const loadTodosFromStorage = () => {
  try {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  } catch (error) {
    console.error('Error loading todos:', error);
    return [];
  }
};

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, { 
    todos: loadTodosFromStorage()
  });

  // Save todos to localStorage whenever they change
 useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(state.todos));
    } catch (error) {
      console.error('Error saving todos:', error);
    }
  }, [state.todos]);

  const addTodo = (text, userId) => {
    const newTodo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      userId,
    };
    dispatch({ type: 'ADD_TODO', payload: newTodo });
    toast.success('Task added successfully', {
      style: { background: '#10B981', color: 'white' },
    });
  };

  const toggleTodo = (id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const deleteTodo = (id) => {
    const confirmation = confirm('Are you sure you want to delete this task?')
    if(confirmation){
      dispatch({ type: 'DELETE_TODO', payload: id });
    toast.error('Task deleted successfully', {
      style: { background: '#EF4444', color: 'white' },
    });
    }
  };

  const updateTodo = (id, text) => {
    dispatch({ type: 'UPDATE_TODO', payload: { id, text } });
    toast('Task updated successfully', {
      icon: '📝',
      style: { background: '#F59E0B', color: 'white' },
    });
  };

  return (
    <TodoContext.Provider value={{ state, addTodo, toggleTodo, deleteTodo, updateTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};