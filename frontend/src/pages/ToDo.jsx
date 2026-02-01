import { useState, useEffect } from 'react';
import React from "react";
import { 
  FaPlus, 
  FaCheckCircle, 
  FaEdit, 
  FaTrash, 
  FaFilter,
  FaCalendarAlt,
  FaTimes,
  FaCheck,
  FaBell,
  FaTag
} from 'react-icons/fa';

const Todo = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Complete project proposal", completed: true, priority: "high", category: "work", dueDate: "2024-01-15" },
    { id: 2, text: "Buy groceries", completed: false, priority: "medium", category: "personal", dueDate: "2024-01-12" },
    { id: 3, text: "Call the dentist", completed: false, priority: "low", category: "personal", dueDate: "2024-01-14" },
    { id: 4, text: "Prepare presentation slides", completed: true, priority: "high", category: "work", dueDate: "2024-01-11" },
    { id: 5, text: "Read 30 pages of book", completed: false, priority: "medium", category: "learning", dueDate: "2024-01-16" },
  ]);

  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState("");

  const categories = [
    { id: "all", name: "All Tasks", color: "#A29BFE", count: tasks.length },
    { id: "work", name: "Work", color: "#81ECEC", count: tasks.filter(t => t.category === "work").length },
    { id: "personal", name: "Personal", color: "#FDCB82", count: tasks.filter(t => t.category === "personal").length },
    { id: "learning", name: "Learning", color: "#A29BFE", count: tasks.filter(t => t.category === "learning").length },
  ];

  const addTask = () => {
    if (newTask.trim()) {
      const newTaskObj = {
        id: Date.now(),
        text: newTask,
        completed: false,
        priority: "medium",
        category: "personal",
        dueDate: new Date().toISOString().split('T')[0]
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask("");
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const startEditing = (task) => {
    setEditingTask(task.id);
    setEditText(task.text);
  };

  const saveEdit = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: editText } : task
    ));
    setEditingTask(null);
  };

  const filteredTasks = filter === "all" 
    ? tasks 
    : tasks.filter(task => task.category === filter);

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#A29BFE]/5 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2D3436] mb-2">
            My Tasks
          </h1>
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <p className="text-[#2D3436]/70 mb-4 md:mb-0">
              Track and manage your daily tasks efficiently
            </p>
            <div className="flex items-center space-x-2 text-[#2D3436]/60">
              <FaCheckCircle className="text-[#81ECEC]" />
              <span>{completedTasks} of {totalTasks} tasks completed</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition"
              onClick={() => setFilter(cat.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: cat.color }}
                  ></div>
                  <span className="font-medium text-[#2D3436]">{cat.name}</span>
                </div>
                <span className="text-2xl font-bold" style={{ color: cat.color }}>
                  {cat.count}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Add Task Section */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-[#A29BFE]/10 rounded-lg flex items-center justify-center">
              <FaPlus className="text-[#A29BFE]" />
            </div>
            <h2 className="text-xl font-semibold text-[#2D3436]">Add New Task</h2>
          </div>
          <div className="flex space-x-3">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              placeholder="What needs to be done?"
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:border-[#A29BFE] focus:ring-2 focus:ring-[#A29BFE]/20 outline-none text-[#2D3436]"
            />
            <button
              onClick={addTask}
              className="bg-gradient-to-r from-[#A29BFE] to-[#81ECEC] text-white px-6 py-3 rounded-xl font-medium hover:shadow-md transition"
            >
              Add Task
            </button>
          </div>
        </div>

        {/* Tasks List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* List Header */}
          <div className="border-b border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#2D3436]">Your Tasks</h2>
              <div className="flex items-center space-x-3">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-[#2D3436] bg-white"
                >
                  <option value="all">All Tasks</option>
                  <option value="work">Work</option>
                  <option value="personal">Personal</option>
                  <option value="learning">Learning</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tasks */}
          <div className="divide-y divide-gray-100">
            {filteredTasks.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-[#FDCB82]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheckCircle className="text-[#FDCB82] text-3xl" />
                </div>
                <h3 className="text-xl font-semibold text-[#2D3436] mb-2">No tasks found</h3>
                <p className="text-[#2D3436]/70">Add a new task to get started!</p>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-4 hover:bg-gray-50 transition ${task.completed ? 'opacity-60' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${task.completed ? 'bg-[#81ECEC] border-[#81ECEC]' : 'border-gray-300 hover:border-[#A29BFE]'}`}
                      >
                        {task.completed && <FaCheck className="text-white text-xs" />}
                      </button>
                      
                      {editingTask === task.id ? (
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && saveEdit(task.id)}
                          className="px-3 py-1 border border-[#A29BFE] rounded-lg focus:outline-none"
                          autoFocus
                        />
                      ) : (
                        <div className="flex-1">
                          <span className={`text-[#2D3436] ${task.completed ? 'line-through' : ''}`}>
                            {task.text}
                          </span>
                          <div className="flex items-center space-x-3 mt-1">
                            <span 
                              className="text-xs px-2 py-1 rounded-full"
                              style={{ 
                                backgroundColor: task.category === 'work' ? '#81ECEC' : 
                                               task.category === 'personal' ? '#FDCB82' : '#A29BFE',
                                color: '#2D3436'
                              }}
                            >
                              {task.category}
                            </span>
                            {task.dueDate && (
                              <span className="flex items-center space-x-1 text-xs text-[#2D3436]/60">
                                <FaCalendarAlt />
                                <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      {editingTask === task.id ? (
                        <>
                          <button
                            onClick={() => saveEdit(task.id)}
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
                            onClick={() => deleteTask(task.id)}
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

          {/* Footer Stats */}
          <div className="border-t border-gray-100 p-4">
            <div className="flex items-center justify-between text-sm text-[#2D3436]/60">
              <span>{filteredTasks.length} tasks shown</span>
              <span>{completedTasks} completed • {totalTasks - completedTasks} remaining</span>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-[#A29BFE]/5 to-white p-4 rounded-xl border border-gray-100">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-[#A29BFE]/20 rounded-lg flex items-center justify-center">
                <FaBell className="text-[#A29BFE]" />
              </div>
              <span className="font-medium text-[#2D3436]">Set Reminders</span>
            </div>
            <p className="text-sm text-[#2D3436]/70">
              Add due dates and get notified before deadlines
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-[#FDCB82]/5 to-white p-4 rounded-xl border border-gray-100">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-[#FDCB82]/20 rounded-lg flex items-center justify-center">
                <FaTag className="text-[#FDCB82]" />
              </div>
              <span className="font-medium text-[#2D3436]">Use Categories</span>
            </div>
            <p className="text-sm text-[#2D3436]/70">
              Organize tasks by project, priority, or context
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-[#81ECEC]/5 to-white p-4 rounded-xl border border-gray-100">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-[#81ECEC]/20 rounded-lg flex items-center justify-center">
                <FaFilter className="text-[#81ECEC]" />
              </div>
              <span className="font-medium text-[#2D3436]">Filter Views</span>
            </div>
            <p className="text-sm text-[#2D3436]/70">
              Focus on what's important with smart filtering
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;