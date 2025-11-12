import { useState, useEffect } from "react";


const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

 
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!newTodo.trim()) return;
    setTodos([...todos, { content: newTodo, isStarred: false, completed: false }]);
    setNewTodo("");
  };

  const toggleComplete = (index) => {
    setTodos(todos.map((t, i) => i === index ? { ...t, completed: !t.completed } : t));
  };

  const toggleStar = (index) => {
    setTodos(todos.map((t, i) => i === index ? { ...t, isStarred: !t.isStarred } : t));
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          onClick={addTodo}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Add
        </button>
      </div>

      <div className="space-y-3">
        {todos.map((todo, index) => (
          <div
            key={index}
            className={`flex justify-between items-center p-4 bg-white rounded shadow ${
              todo.completed ? "opacity-70 line-through" : ""
            }`}
          >
            <div className="flex items-center gap-2">
              <button onClick={() => toggleStar(index)}>
                {todo.isStarred ? "⭐" : "☆"}
              </button>
              <span>{todo.content}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => toggleComplete(index)}
                className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                {todo.completed ? "Undo" : "Done"}
              </button>
              <button
                onClick={() => deleteTodo(index)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {todos.length === 0 && (
          <p className="text-gray-500">No tasks. Add something!</p>
        )}
      </div>
    </div>
  );
};

export default Todo;
