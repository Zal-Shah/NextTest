// src/app/page.tsx (or wherever your Home lives)
'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<{ text: string; completed: boolean }[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === '') return;
    setTasks([...tasks, { text: task.trim(), completed: false }]);
    setTask('');
  };

  const toggleTask = (i: number) => {
    const updated = [...tasks];
    updated[i].completed = !updated[i].completed;
    setTasks(updated);
  };

  const deleteTask = (i: number) => {
    setTasks(tasks.filter((_, idx) => idx !== i));
  };

  return (
    <div className="container">
      <h1 className="title">📝 To-Do List</h1>
      <div className="inputGroup">
        <input
          className="taskInput"
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task…"
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
        />
        <button className="addButton" onClick={addTask}>
          Add
        </button>
      </div>

      <ul className="taskList">
        {tasks.map((t, i) => (
          <li className="taskItem" key={i}>
            <input
              className="checkbox"
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleTask(i)}
            />
            <span className={`taskText ${t.completed ? 'completed' : ''}`}>
              {t.text}
            </span>
            <button
              className="completeButton"
              onClick={() => toggleTask(i)}
            >
              {t.completed ? 'Undo' : 'Complete'}
            </button>
            <button
              className="deleteButton"
              onClick={() => deleteTask(i)}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>

      <style jsx>{`
        .container {
          max-width: 500px;
          margin: 40px auto;
          padding: 20px;
          background: #073e1a;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        .title {
          text-align: center;
          margin-bottom: 24px;
          color: #fff;
          font-size: 1.8rem;
        }
        .inputGroup {
          display: flex;
          margin-bottom: 20px;
        }
        .taskInput {
          flex: 1;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px 0 0 4px;
          font-size: 1rem;
          outline: none;
        }
        .taskInput:focus {
          border-color: #082647;
        }
        .addButton {
          padding: 0 16px;
          background: #0053b2;
          color: white;
          border: none;
          border-radius: 0 4px 4px 0;
          cursor: pointer;
          font-size: 1rem;
          transition: background 0.2s;
        }
        .addButton:hover {
          background: #004099;
        }
        .taskList {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .taskItem {
          display: flex;
          align-items: center;
          padding: 10px;
          border-bottom: 1px solid #eaeaea;
        }
        .checkbox {
          transform: scale(1.2);
          cursor: pointer;
        }
        .taskText {
          flex: 1;
          margin-left: 12px;
          font-size: 1rem;
          color: #eee;
          transition: color 0.2s, text-decoration 0.2s;
        }
        .taskText.completed {
          text-decoration: line-through;
          color: #888;
        }
        .completeButton {
          background: #28a745;
          border: none;
          color: white;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          margin-left: 12px;
          font-size: 0.9rem;
          transition: background 0.2s;
        }
        .completeButton:hover {
          background: #218838;
        }
        .deleteButton {
          background: transparent;
          border: none;
          font-size: 1.2rem;
          cursor: pointer;
          margin-left: 8px;
          transition: color 0.2s;
        }
        .deleteButton:hover {
          color: #e00;
        }
      `}</style>
    </div>
  );
}
