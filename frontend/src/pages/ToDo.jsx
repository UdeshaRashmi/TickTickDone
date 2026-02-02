import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import {
  FaPlus,
  FaCheckCircle,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
  FaCalendarAlt,
  FaTag,
  FaBell,
  FaFilter,
} from "react-icons/fa";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState("");

  const token = localStorage.getItem("token"); // must have been set at login

  // Axios instance with auth header
  const api = axios.create({
    baseURL: "http://localhost:5000/api/todos",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  // Fetch todos from backend
  const fetchTodos = async () => {
    try {
      const res = await api.get("/");
      setTasks(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add new todo
  const addTask = async () => {
    if (!newTask.trim()) return;
    try {
      const res = await api.post("/", { title: newTask });
      setTasks([...tasks, res.data]);
      setNewTask("");
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  // Toggle completed
  const toggleTask = async (task) => {
    try {
      const res = await api.put(`/${task._id}`, {
        completed: !task.completed,
      });
      setTasks(tasks.map((t) => (t._id === task._id ? res.data : t)));
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  // Delete todo
  const deleteTask = async (id) => {
    try {
      await api.delete(`/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  // Start editing
  const startEditing = (task) => {
    setEditingTask(task._id);
    setEditText(task.title);
  };

  // Save edit
  const saveEdit = async (task) => {
    try {
      const res = await api.put(`/${task._id}`, { title: editText });
      setTasks(tasks.map((t) => (t._id === task._id ? res.data : t)));
      setEditingTask(null);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#A29BFE]/5 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2D3436] mb-2">
            My Tasks
          </h1>
          <div className="flex items-center space-x-2 text-[#2D3436]/60">
            <FaCheckCircle className="text-[#81ECEC]" />
            <span>
              {tasks.filter((t) => t.completed).length} of {tasks.length} tasks
              completed
            </span>
          </div>
        </div>

        {/* Add Task */}
        <div className="flex space-x-3 mb-8">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTask()}
            placeholder="What needs to be done?"
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:border-[#A29BFE] focus:ring-2 focus:ring-[#A29BFE]/20 outline-none text-[#2D3436]"
          />
          <button
            onClick={addTask}
            className="bg-gradient-to-r from-[#A29BFE] to-[#81ECEC] text-white px-6 py-3 rounded-xl font-medium hover:shadow-md transition"
          >
            <FaPlus /> Add Task
          </button>
        </div>

        {/* Task List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {tasks.length === 0 ? (
            <div className="p-12 text-center">
              <h3 className="text-xl font-semibold text-[#2D3436] mb-2">
                No tasks found
              </h3>
              <p className="text-[#2D3436]/70">Add a new task to get started!</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                className={`p-4 hover:bg-gray-50 transition ${
                  task.completed ? "opacity-60" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => toggleTask(task)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        task.completed
                          ? "bg-[#81ECEC] border-[#81ECEC]"
                          : "border-gray-300 hover:border-[#A29BFE]"
                      }`}
                    >
                      {task.completed && <FaCheck className="text-white text-xs" />}
                    </button>

                    {editingTask === task._id ? (
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && saveEdit(task)}
                        className="px-3 py-1 border border-[#A29BFE] rounded-lg focus:outline-none"
                        autoFocus
                      />
                    ) : (
                      <span className={`${task.completed ? "line-through" : ""}`}>
                        {task.title}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    {editingTask === task._id ? (
                      <>
                        <button
                          onClick={() => saveEdit(task)}
                          className="p-2 text-[#81ECEC] hover:bg-[#81ECEC]/10 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={() => setEditingTask(null)}
                          className="p-2 text-[#FDCB82] hover:bg-[#FDCB82]/10 rounded-lg"
                        >
                          <FaTimes />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditing(task)}
                          className="p-2 text-[#2D3436]/40 hover:text-[#A29BFE] hover:bg-[#A29BFE]/10 rounded-lg transition"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => deleteTask(task._id)}
                          className="p-2 text-[#2D3436]/40 hover:text-[#FDCB82] hover:bg-[#FDCB82]/10 rounded-lg transition"
                        >
                          <FaTrash />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;
