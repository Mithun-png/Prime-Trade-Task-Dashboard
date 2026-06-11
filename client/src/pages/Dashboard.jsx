import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../api/task.api";

function Dashboard() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // 🔒 Protect route + fetch tasks
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    getTasks()
      .then(setTasks)
      .catch(() => {
        alert("Backend not reachable");
      });
  }, [navigate]);

  // ➕ Add task
  const addTask = async () => {
    if (!title.trim()) return;

    const newTask = await createTask(title);
    setTasks([newTask, ...tasks]);
    setTitle("");
  };

  // 🔁 Toggle complete
  const toggleTask = async (task) => {
    const updated = await updateTask(task._id, {
      completed: !task.completed,
    });

    setTasks(tasks.map((t) => (t._id === task._id ? updated : t)));
  };

  // 🗑️ Delete task
  const removeTask = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter((t) => t._id !== id));
  };

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">
              Prime Trade Dashboard
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="text-red-600 hover:underline"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 mt-8">
        {/* Add Task */}
        <div className="bg-white p-4 rounded-lg shadow mb-6 flex gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 border px-3 py-2 rounded"
          />
          <button
            onClick={addTask}
            className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {tasks.length === 0 && (
            <p className="text-gray-500 text-center">
              No tasks yet. Add one above.
            </p>
          )}

          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white p-4 rounded-lg shadow flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task)}
                  className="w-4 h-4"
                />
                <span
                  className={
                    task.completed
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }
                >
                  {task.title}
                </span>
              </div>

              <button
                onClick={() => removeTask(task._id)}
                className="text-sm text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
